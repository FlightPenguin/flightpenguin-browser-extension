#!/bin/bash make_extension_folder_for_publishing.sh 1.0.x

VERSION=$1
ROOT_DIR=$(pwd)

TARGET_BROWSERS=("chrome" "firefox")

make_directory() {
  target=${1}
  mkdir -p ${target}
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to make directory ${target}"
    exit 97
  fi
}

copy_directory() {
  source_dir=$1
  destination_target=$2

  cp -rf ${source_dir} ${destination_target}
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to copy directory ${source_dir} to ${destination_target}"
    exit 99
  fi
}

build() {
  branch_name=$(git symbolic-ref --short -q HEAD)
  if [ ${branch_name} != "main" ]; then
    echo "ERROR: Build this project on the main branch"
    exit 89
  fi

  uncommitted_file_count=$(git status -s -uall | wc -l)
  if [ ${uncommitted_file_count} -ne 0 ]; then
    echo "ERROR: No building with uncommitted changes!"
    exit 88
  fi

  unpushed_commits=$(git cherry -v | wc -l)
  if [ ${unpushed_commits} -ne 0 ]; then
    echo "ERROR: No building with unpushed commits!"
    exit 87
  fi

  devtools_count=$(grep -c devtools build/*/manifest.json)
  if [ ${devtools_count} -ne 0 ]; then
    echo "ERROR: No building with react-devtools listener in manifest"
    exit 86
  fi

  for browser in "${TARGET_BROWSERS[@]}"; do
    npm run build:prod:${browser}
    exitcode=$?
    if [ $exitcode -ne 0 ]; then
      echo "ERROR: Failed to build the project for ${browser}"
      exit 80
    fi
  done;
}

package() {
  pushd ${TARGET_DIR} || exit 50
  for browser in "${TARGET_BROWSERS[@]}"; do
    zipFileName="${PACKAGE_NAME}.${browser}.zip"
    pushd ${browser} || exit 50

    zip -rq "${zipFileName}" ./
    exitcode=$?
    if [ $exitcode -ne 0 ]; then
      echo "ERROR: Failed to package ${PACKAGE_NAME} for ${browser}"
      exit 52
    fi

    mv "${zipFileName}" "./../../"
    exitcode=$?
    if [ $exitcode -ne 0 ]; then
      echo "ERROR: Failed to move package ${PACKAGE_NAME} for ${browser}"
      exit 53
    fi
    popd || exit 51
  done
  popd || exit 51

  zip -r "local/packaging/flightpenguin_ext_${VERSION}.source.zip" src package.json package-lock.json README.md setup.jest.js tsconfig.json web-ext.*.js webpack.*
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to build source package ${PACKAGE_NAME}}"
    exit 54
  fi
}

load_env() {
  if [ ! -x ".env" ] && [ ! -L ".env" ]; then
    echo "ERROR: .env file not available"
    exit 70
  fi

  source .env
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to source environment variables"
    exit 71
  fi
}

remove_source_maps() {
  find ${TARGET_DIR} -type f -name \*.map -exec rm -f {} \;
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to remove source maps for package ${PACKAGE_NAME}"
    exit 42
  fi
}

version_check () {
  if [ -z ${VERSION} ]; then
    echo "ERROR: Must provide version string (e.g. bash make_extension_folder_for_publishing.sh x.y.z"
    exit 2
  fi

  if [[ ! ${VERSION} =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    echo "ERROR: Must use semver version string (e.g. bash make_extension_folder_for_publishing.sh x.y.z"
    exit 3
  fi

  VERSION_COUNT=$(grep -c "\"version\": \"${VERSION}\"," package.json)
  if [ ${VERSION_COUNT} -ne 1 ]; then
    echo "ERROR: Update package.json file to match version ${VERSION}"
    exit 4
  fi
}


version_check
load_env
build

PACKAGE_NAME="flightpenguin_ext_${VERSION}"
TARGET_DIR="./local/packaging/${PACKAGE_NAME}"
make_directory "${TARGET_DIR}"

for browser in "${TARGET_BROWSERS[@]}"; do
  copy_directory "./build/${browser}" "${TARGET_DIR}"
done;

remove_source_maps
package

echo "Completed packaging ${PACKAGE_NAME}.zip"
