#!/usr/bin/env bash
# Runs inside the mapp_e2e_wpcli container (make svn-set-tested-version), usually via bin/update-tested-version.sh.
# Sets "Tested up to" and "WC tested up to" in the readme.txt of the wordpress.org SVN trunk and of the tag
# of the released version (Version: in trunk/readme.txt), and commits both in one SVN commit.
# Only those two lines change, the rest of the SVN readme.txt stays as released.
#
# WP_VERSION and WC_VERSION default to the versions installed in the container.
# Needs SVN_USERNAME and SVN_PASSWORD. SVN_DRY_RUN=true shows the diff without committing.
set -euo pipefail

SVN_URL="https://plugins.svn.wordpress.org/mapp-intelligence"
WORKDIR="$(mktemp -d)"
trap 'rm -rf "${WORKDIR}"' EXIT
SVN=(svn --non-interactive --config-dir "${WORKDIR}/.subversion")

WP_VERSION="${WP_VERSION:-$(wp core version --path=/var/www/html)}"
WC_VERSION="${WC_VERSION:-$(wp plugin get woocommerce --field=version --path=/var/www/html)}"

for version in "${WP_VERSION}" "${WC_VERSION}"; do
	if [[ ! "${version}" =~ ^[0-9]+(\.[0-9]+)*$ ]]; then
		echo "Invalid version '${version}'" >&2
		exit 1
	fi
done

if [[ "${SVN_DRY_RUN:-false}" != "true" ]] && [[ -z "${SVN_USERNAME:-}" || -z "${SVN_PASSWORD:-}" ]]; then
	echo "SVN_USERNAME and SVN_PASSWORD must be set" >&2
	exit 1
fi

# check out only the readme folders: trunk and the released tag
cd "${WORKDIR}"
"${SVN[@]}" checkout --quiet --depth empty "${SVN_URL}" svn
cd svn
"${SVN[@]}" update --quiet --set-depth files trunk
RELEASED_VERSION="$(sed -n -E 's/^Version:[[:space:]]*([0-9.]+).*/\1/p' trunk/readme.txt)"
"${SVN[@]}" update --quiet --set-depth empty tags
"${SVN[@]}" update --quiet --set-depth files "tags/${RELEASED_VERSION}"
if [[ ! -f "tags/${RELEASED_VERSION}/readme.txt" ]]; then
	echo "tags/${RELEASED_VERSION}/readme.txt not found on SVN" >&2
	exit 1
fi

echo "Setting Tested up to: ${WP_VERSION}, WC tested up to: ${WC_VERSION} in trunk and tags/${RELEASED_VERSION}"
for readme in trunk/readme.txt "tags/${RELEASED_VERSION}/readme.txt"; do
	sed -i -E \
		-e "s/^Tested up to:.*/Tested up to: ${WP_VERSION}/" \
		-e "s/^WC tested up to:.*/WC tested up to: ${WC_VERSION}/" \
		"${readme}"
done

if [[ -z "$("${SVN[@]}" status trunk tags)" ]]; then
	echo "SVN readme.txt is already up to date"
	exit 0
fi
"${SVN[@]}" diff trunk tags

if [[ "${SVN_DRY_RUN:-false}" == "true" ]]; then
	echo "Dry run, nothing committed to SVN"
	exit 0
fi

# the password goes in via stdin, so it never shows up in the process list
"${SVN[@]}" commit trunk/readme.txt "tags/${RELEASED_VERSION}/readme.txt" --no-auth-cache \
	--username "${SVN_USERNAME}" --password-from-stdin \
	-m "Update tested up to WordPress ${WP_VERSION} and WooCommerce ${WC_VERSION}" <<<"${SVN_PASSWORD}"
