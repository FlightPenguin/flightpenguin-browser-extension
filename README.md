### Add the extension to Google Chrome

1. Open Chrome browser, paste in this url `chrome://extensions/`
2. Select "Load unpacked" and select this folder.
3. Toggle button should be dragged to the right so extension is enabled (blue).
4. Should see extension in toolbar, it will be the letter "F".
5. Select it to see the search form.

### Update the extension in Google Chrome

1. If you have new updates, on the extensions page, click the refresh icon to the left of the blue toggle button.

### How to use the extension

1. Select the extension icon in the toolbar and fill out the search form.
2. Select the "Search" button when ready.
3. When the results are ready, you will be taken to a new tab where the flight results will stream in.
4. Click on a row of flight information to select it.
5. Once you make all selections for your itinerary, you will be taken to the corresponding provider site. Your selection will be outlined in red. You will need to select them on the provider site to finish booking your itinerary.

### How to develop

1. Make changes.
2. Run `npm run build:dev`.

### How to deploy
1. Ensure versions match in webpack and manifest
2. Ensure all commits are pushed, that you're in the main branch, etc.
3. Run make_extension_folder_for_publishing.sh with the version number to be built
4. Follow [Add the extension to Google Chrome](#Add-the-extension-to-Google-Chrome) or [Update the extension in Google Chrome](#Update-the-extension-in-Google-Chrome).


### How to enable react-devtools

1. Run `npm install --save-dev react-devtools`
2. Add `"react-devtools": "react-devtools"` to package.json scripts
3. Add `http://localhost:8097/` to CSP in manifest.json (script-src)
4. Add to index.html: `<script src="http://localhost:8097"></script>`
5. Switch ReactDom import in index.js to use ReactDom/profiling
6. Run `npm run react-devtools`
7. Load page
8. Turn on profiling in react-devtools popup
9. Profile away!
10. Remove all this stuff...