#!/usr/bin/env bash
# Runs on the host after a green e2e run (Jenkins checkbox UPDATE_TESTED_UP_TO, make update-tested-version).
# Sets "Tested up to" and "WC tested up to" in readme.txt to the versions the tests ran against.
# If that changes readme.txt, the wordpress.org SVN gets the same change (trunk and the released tag),
# then readme.txt is committed and pushed to GitHub.
# SVN goes first: if the push fails, a rerun finds SVN up to date and only retries the push.
#
# Needs SVN_USERNAME and SVN_PASSWORD, and GIT_USER and GIT_TOKEN for the push on Jenkins.
# SVN_DRY_RUN=true shows the diffs and commits nothing.
set -euo pipefail
cd "$(dirname "$0")/.."

wpcli() {
	docker exec -u 33:33 mapp_e2e_wpcli wp --path=/var/www/html "$@" | tr -d '\r\n'
}

WP_VERSION="$(wpcli core version)"
WC_VERSION="$(wpcli plugin get woocommerce --field=version)"

for version in "${WP_VERSION}" "${WC_VERSION}"; do
	if [[ ! "${version}" =~ ^[0-9]+(\.[0-9]+)*$ ]]; then
		echo "Invalid version '${version}'" >&2
		exit 1
	fi
done
export WP_VERSION WC_VERSION

sed -i.bak -E \
	-e "s/^Tested up to:.*/Tested up to: ${WP_VERSION}/" \
	-e "s/^WC tested up to:.*/WC tested up to: ${WC_VERSION}/" \
	readme.txt
rm readme.txt.bak

if git diff --quiet -- readme.txt; then
	echo "readme.txt is already tested up to WordPress ${WP_VERSION} and WooCommerce ${WC_VERSION}"
	exit 0
fi
git --no-pager diff -- readme.txt

make svn-set-tested-version

# Jenkins checks out a detached HEAD and sets GIT_BRANCH, e.g. origin/main
BRANCH_NAME="${GIT_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}"
BRANCH_NAME="${BRANCH_NAME#origin/}"
MESSAGE="Update tested up to WordPress ${WP_VERSION} and WooCommerce ${WC_VERSION}"

if [[ "${SVN_DRY_RUN:-false}" == "true" ]]; then
	git checkout -- readme.txt
	echo "Dry run, would commit '${MESSAGE}' and push it to ${BRANCH_NAME}"
	exit 0
fi

# the agent has no git identity of its own
GIT_IDENTITY=()
if ! git config user.email >/dev/null; then
	GIT_IDENTITY=(-c user.name="Jenkins" -c user.email="jenkins@ci.nbg.webtrekk.com")
fi
git ${GIT_IDENTITY[@]+"${GIT_IDENTITY[@]}"} commit -m "${MESSAGE}" -- readme.txt

# Jenkins binds the GitHub credentials as GIT_USER and GIT_TOKEN; the helper hands them to git at push time,
# so the token is neither in the remote URL nor in .git/config. Without them git uses its own credentials.
GIT_AUTH=()
if [[ -n "${GIT_USER:-}" && -n "${GIT_TOKEN:-}" ]]; then
	GIT_AUTH=(-c credential.helper= -c 'credential.helper=!f() { echo "username=${GIT_USER}"; echo "password=${GIT_TOKEN}"; }; f')
fi
git ${GIT_AUTH[@]+"${GIT_AUTH[@]}"} push origin "HEAD:refs/heads/${BRANCH_NAME}"
