#!/bin/bash

NEW_USER_GROUP_NAME="${USER_NAME}"

if ! id -u "${NEW_USER_GROUP_NAME}" > /dev/null 2>&1; then
  NEW_USER_GROUP_NAME="abc123def456ghi789"
fi

echo "temporary group and user name: ${NEW_USER_GROUP_NAME}"

if ! id -gn "${GROUP_ID}" > /dev/null 2>&1; then
  echo "create new group: ${NEW_USER_GROUP_NAME} with id *${GROUP_ID}*"
  addgroup --gid "${GROUP_ID}" "${NEW_USER_GROUP_NAME}"
fi

if ! id -un "${USER_ID}" > /dev/null 2>&1; then
  echo "create new user: ${NEW_USER_GROUP_NAME} with id *${USER_ID}* for group id *${GROUP_ID}*"
  adduser --disabled-password --gecos '' --uid "${USER_ID}" --gid "${GROUP_ID}" "${NEW_USER_GROUP_NAME}"
fi

chown -R www-data:www-data /var/www/html/

cd /var/www/html/wp-content/plugins/mapp_intelligence/ || exit

echo "install npm dependencies"
npm install
echo "ready to install npm dependencies"

if [ ! -d "node_modules/puppeteer-utils/lib" ]; then
  cd node_modules/puppeteer-utils/ && npm run postinstall && cd ../..
fi

bash /tmp/wait-for-it.sh -t 0 wordpress-cli:9000

echo "run test"
npm run test:e2e

echo "change file permission back from 'www-data:www-data' to '${USER_ID}:${GROUP_ID}'"
chown -R "${USER_ID}:${GROUP_ID}" /var/www/html/

exec "$@"
