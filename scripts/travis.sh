#!/bin/bash
# https://docs.travis-ci.com/user/customizing-the-build/#Implementing-Complex-Build-Steps
set -ev

if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_EVENT_TYPE" != "pull_request" ] && [[ ! "$TRAVIS_COMMIT_MESSAGE" =~ ^(chore).*(update dist)$ ]] && [[ ! "$TRAVIS_COMMIT_MESSAGE" =~ ^chore\(release\) ]]; then
  echo "Prepare Canary"
  git checkout master
fi

yarn install
if [ "${TRAVIS_MODE}" = "build" ]; then
  yarn run build:prod
elif [ "${TRAVIS_MODE}" = "lint" ]; then
  yarn run lint:check
elif [ "${TRAVIS_MODE}" = "types" ]; then
  yarn run types:check
elif [ "${TRAVIS_MODE}" = "unitTests" ]; then
	yarn run test
elif [ "${TRAVIS_MODE}" = "release" ] || [ "${TRAVIS_MODE}" = "releaseCanary" ]; then
  if [ "${TRAVIS_MODE}" = "releaseCanary" ]; then
    echo "Run standard-version"
    yarn run release --prerelease canary --skip.commit=true --skip.tag=true
    sha=$(git rev-parse --verify --short HEAD)
    echo "Current sha ${sha}"
    commitNumberAfterTag=$(git rev-list  `git rev-list --tags --no-walk --max-count=1`..HEAD --count)
    echo "Number of commit from last tag ${commitNumberAfterTag}"
    currentVersion=$(npx -c 'echo "$npm_package_version"')
    echo "Current version ${currentVersion}"
    newVersion=$(echo $currentVersion | sed -e "s/canary\.[[:digit:]]/canary.${commitNumberAfterTag}-${sha}/g")
    echo "New version ${newVersion}"
    sed -iE "s/$currentVersion/$newVersion/g" package.json
    sed -iE "s/$currentVersion/$newVersion/g" CHANGELOG.md
    rm package.jsonE
    rm CHANGELOG.mdE
  else
    echo "Run conventional-github-releaser"
    #ignore error to make sure release won't get stuck
    conventional-github-releaser -p angular -t $GH_TOKEN || true
  fi
  echo "Building..."
  yarn run build:prod
  echo "Finish building"
elif [ "${TRAVIS_MODE}" = "deploy" ]; then
  echo "Deploy..."
else
	echo "Unknown travis mode: ${TRAVIS_MODE}" 1>&2
	exit 1
fi
