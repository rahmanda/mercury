# Mercury
Mercury is chrome extension which enables you to convert JSON into CSV without hassle. All you need to do is to provide valid JSON array text.

## Features

1. Starting Point: If your array is deep inside JSON object, you can add starting point keys so Mercury can find it.

2. Filter Keys: You can add filter keys if you want to get subset keys of object in array. Filter can also be used to generate default value for object which has no certain key.

3. Download CSV: Add filename and hit the button. Your browser will automatically download the generated CSV for you.

## Installation

1. Grab a copy of the source code either by cloning the repository or by downloading and extracting the zipped source. You can download zip archive by opening the project page on GitHub and clicking on the "Download" button.

![Download source as zip](https://raw.githubusercontent.com/rahmanda/mercury/master/docs/chrome-extension-guide-1.png)

2. Next, open the "Extensions" page (chrome://extensions/) in the browser and turn on the "Developer mode".

![Open the extension page](https://raw.githubusercontent.com/rahmanda/mercury/master/docs/chrome-extension-guide-2.png)

3. Click on the "Load unpacked" button and select the `mercury/dist` directory located at the place you have saved the source.


## TODO
- [ ] Handle object inside object
