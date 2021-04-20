# sh make_extension_folder_for_publishing.sh 1.0.x
mkdir "flightpenguin_ext_$1"
cp ./manifest.json flightpenguin_ext_$1/
cp ./index.html flightpenguin_ext_$1/
cp -rf ./dist flightpenguin_ext_$1/
mkdir -p flightpenguin_ext_$1/src/
cp ./src/background.html flightpenguin_ext_$1/src/
mkdir -p flightpenguin_ext_$1/src/css
cp -rf ./src/css flightpenguin_ext_$1/src/
cp -rf ./src/icons flightpenguin_ext_$1/src/
mkdir -p flightpenguin_ext_$1/src/shared
cp ./src/shared/contentScript.css flightpenguin_ext_$1/src/shared/
cp ./src/shared/sentry.js flightpenguin_ext_$1/src/shared/
mkdir -p flightpenguin_ext_$1/src/skyscanner
cp ./src/skyscanner/emptySearchContentScript.js flightpenguin_ext_$1/src/skyscanner/
mkdir -p flightpenguin_ext_$1/src/southwest
cp ./src/southwest/emptySearchContentScript.js flightpenguin_ext_$1/src/southwest/
