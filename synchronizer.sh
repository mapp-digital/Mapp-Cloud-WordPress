#!/usr/bin/env bash

WORDPRESS_VERSION=$1
TEST_OUTPUT_URL=$2
USER_NAME=$(id -un)
USER_ID=$(id -u)
GROUP_ID=$(id -g)
DOCKER_DIR_NAME="${WORDPRESS_VERSION//.}"

wait_for_test_ready()
{
  while :
  do
    if [[ $TEST_OUTPUT_URL == http* ]]; then
      JOB_RESULT=$(curl --silent "${TEST_OUTPUT_URL}"consoleText | sed -n "s/.*${DOCKER_DIR_NAME}_wordpress-mapp-dev_1\sexited\swith\scode\s\([0-9]*\).*/\1/p")
    else
      JOB_RESULT=$(cat "$TEST_OUTPUT_URL" | sed -n "s/.*${DOCKER_DIR_NAME}_wordpress-mapp-dev_1\sexited\swith\scode\s\([0-9]*\).*/\1/p")
    fi

    if [[ $JOB_RESULT != '' ]]; then
      break
    fi

    sleep 5
  done

  return "${JOB_RESULT}"
}

wait_to_start_test()
{
  while :
  do
    LAST_BUILD_STATUS=$(curl --silent "${JOB_URL}"$((BUILD_NUMBER-1))/api/json | sed -n 's/.*"building":\([A-Za-z]*\),.*/\1/p')

    if [[ $LAST_BUILD_STATUS == 'false' ]]; then
      sleep 30
      break
    fi

    sleep 5
  done

  return 0
}

if [[ $BUILD_NUMBER -gt "0" ]]; then
  wait_to_start_test
fi

TEST_WORDPRESS_VERSION="${WORDPRESS_VERSION}" USER_ID="${USER_ID}" GROUP_ID="${GROUP_ID}" USER_NAME="${USER_NAME}" bash -c "docker-compose -p ${WORDPRESS_VERSION} build && docker-compose -p ${WORDPRESS_VERSION} up --build" &

sleep 5m

wait_for_test_ready
JOB_RESULT=$?

docker-compose -p "${WORDPRESS_VERSION}" down --volumes

if [[ $TEST_OUTPUT_URL != http* ]]; then
  OUTPUT_NAME="output-$DOCKER_DIR_NAME.txt"
  rm "${OUTPUT_NAME}"
fi

exit $JOB_RESULT
