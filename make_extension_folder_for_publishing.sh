#!/bin/bash make_extension_folder_for_publishing.sh 1.0.x

VERSION=$1

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

PACKAGE_NAME="flightpenguin_ext_${VERSION}"
TARGET_DIR="./local/packaging/${PACKAGE_NAME}"
make_directory "${TARGET_DIR}"
make_directory "${TARGET_DIR}/src"
make_directory "${TARGET_DIR}/src/css"
make_directory "${TARGET_DIR}/src/shared"
make_directory "${TARGET_DIR}/src/skyscanner"
make_directory "${TARGET_DIR}/src/southwest"

copy_file "./manifest.json" "${TARGET_DIR}"
copy_file "./index.html" "${TARGET_DIR}"
copy_file "./src/shared/contentScript.css" "${TARGET_DIR}/src/shared"
copy_file "./src/shared/sentry.js" "${TARGET_DIR}/src/shared"
copy_file "./src/skyscanner/emptySearchContentScript.js" "${TARGET_DIR}/src/skyscanner/"
copy_file "./src/southwest/emptySearchContentScript.js" "${TARGET_DIR}/src/southwest/"

copy_directory "./dist" "${TARGET_DIR}"
copy_directory "./src/css" "${TARGET_DIR}/src"
copy_directory "./src/icons" "${TARGET_DIR}/src"

pushd ${TARGET_DIR}/../ || exit 50
zip -rq "${PACKAGE_NAME}.zip" "${PACKAGE_NAME}"
exitcode=$?
if [ $exitcode -ne 0 ]; then
  echo "ERROR: Failed to package ${PACKAGE_NAME}"
  exit 52
fi
popd || exit 51

echo "Completed packaging ${PACKAGE_NAME}.zip"
