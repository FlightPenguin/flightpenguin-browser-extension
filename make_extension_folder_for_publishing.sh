#!/bin/bash make_extension_folder_for_publishing.sh 1.0.x

VERSION=$1
ROOT_DIR=$(pwd)

make_directory() {
  target=${1}
  mkdir -p ${target}
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to make directory ${target}"
    exit 97
  fi
}

copy_file() {
  source_file=$1
  destination_target=$2

  cp ${source_file} ${destination_target}
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to copy file ${source_file} to ${destination_target}"
    exit 98
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
    exit 89
  fi

  devtools_count=$(grep -c devtools manifest.json)
  if [ ${uncommitted_file_count} -ne 0 ]; then
    echo "ERROR: No building with react-devtools listener in manifest"
    exit 81
  fi

  npm run build
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to build the project"
    exit 80
  fi
}

package() {
  pushd ${TARGET_DIR}/../ || exit 50
  zip -rq "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}"
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to package ${PACKAGE_NAME}"
    exit 52
  fi
  popd || exit 51
}

push_to_sentry() {
  if [ ! -x ${ROOT_DIR}/node_modules/@sentry/cli/bin/sentry-cli ]; then
    echo "ERROR: missing sentry cli executable"
    exit 63
   fi

  SENTRY_VERSION="${SENTRY_PROJECT}@${VERSION}"

  ${ROOT_DIR}/node_modules/@sentry/cli/bin/sentry-cli releases new "${SENTRY_VERSION}"
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to create sentry release ${PACKAGE_NAME}"
    exit 64
  fi

  ${ROOT_DIR}/node_modules/@sentry/cli/bin/sentry-cli releases set-commits "${SENTRY_VERSION}" --auto
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to set commits for sentry release ${PACKAGE_NAME}"
    exit 62
  fi

  ${ROOT_DIR}/node_modules/@sentry/cli/bin/sentry-cli releases files "${SENTRY_VERSION}" upload \
    --ignore-file .sentryignore \
    --ext ts \
    --ext map \
    --ext js \
    --ext tsx \
    --ext jsx \
    --wait  \
    --url-prefix "chrome-extension://nofndgfpjopdpbcejgdpikmpdehlekac/" \
    .

  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to upload files for sentry release ${PACKAGE_NAME}"
    exit 65
  fi
}

load_envkey() {
  if [ ! -x "/usr/local/bin/envkey-source" ]; then
    echo "ERROR: envkey not installed/executable"
    echo "DEBUG: See https://github.com/envkey/envkey-source"
    exit 70
  fi

  eval $(envkey-source)
  exitcode=$?
  if [ $exitcode -ne 0 ]; then
    echo "ERROR: Failed to execute envkey-source"
    exit 71
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

  VERSION_COUNT=$(grep -c "\"version\": \"${VERSION}\"," manifest.json)
  if [ ${VERSION_COUNT} -ne 1 ]; then
    echo "ERROR: Update manifest file to match version ${VERSION}"
    exit 4
  fi

  VERSION_COUNT=$(grep -c "\"process.env.VERSION\": JSON.stringify(\"${VERSION}\")," webpack.config.ts)
  if [ ${VERSION_COUNT} -ne 1 ]; then
    echo "ERROR: Update webpack file to match version ${VERSION}"
    exit 4
  fi
}


version_check
load_envkey
build

PACKAGE_NAME="flightpenguin_ext_${VERSION}"
TARGET_DIR="./local/packaging/${PACKAGE_NAME}"
make_directory "${TARGET_DIR}"
make_directory "${TARGET_DIR}/src"
make_directory "${TARGET_DIR}/src/css"
make_directory "${TARGET_DIR}/src/shared"
make_directory "${TARGET_DIR}/src/southwest"

copy_file "./manifest.json" "${TARGET_DIR}"
copy_file "./index.html" "${TARGET_DIR}"
copy_file "./src/background.html" "${TARGET_DIR}/src/"
copy_file "./src/shared/contentScript.css" "${TARGET_DIR}/src/shared"
copy_file "./src/shared/sentry.js" "${TARGET_DIR}/src/shared"

copy_directory "./dist" "${TARGET_DIR}"
copy_directory "./images" "${TARGET_DIR}"
copy_directory "./src/css" "${TARGET_DIR}/src"
copy_directory "./src/icons" "${TARGET_DIR}/src"

push_to_sentry
package

echo "Completed packaging ${PACKAGE_NAME}.zip"
