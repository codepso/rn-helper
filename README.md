# rn-helper
Components, Helpers for React Native Projects.
## Table of content
- [Requirements](#requirements)
- [Installation](#installation)
- [User Interface (UI)](#ui)
    - [BlockUI](#blockui)
    - [AlertUI](#alertui)
- [Helpers](#mainhelper)
    - [MainHelper](#mainhelper)
- [Use](#use)
- [Example](#example)
- [License](#license)
## Requirements
 - React Native 0.61+
 - React Navigation 5+
 - React Native Loading Spinner Overlay
 - Lodash 4.15+
 - React Native Paper 3.10+
 ```bash
yarn add react-native-loading-spinner-overlay
yarn add lodash
 ```
## Installation
```bash
yarn add @codepso/rn-helper
yarn upgrade @codepso/rn-helper@latest
```
## UI
### `blockUI(state, message, bgColor, txtColor)`
* **state**: `bool | required`
* **message**: `string | optional` default: Loading...
* **bgColor**: `string | optional` rgb value, default: rgba(0, 0, 0, 0.8)
* **txtColor**: `string | optional` hex value, default: white
### `DialogUI(title, message, goTo)`
React Native Paper
* **title**: `string | required`
* **message**: `string | required`
* **goTo**: `string | optional` screen name with react navigation 5
### `AlertUI(title, message, goTo)`
* **title**: `string | required`
* **message**: `string | required`
* **goTo**: `string | optional` screen name with react navigation 5
## Use
```javascript
import {createRef} from 'react';
import {Text, View, Button} from 'react-native';
import {AlertUI, DialogUI, BlockUI, MainHelper} from '@codepso/rn-helper';

const alertUI = createRef();
const dialogUI = createRef();
const blockUI = createRef();
const sleep = (m) => new Promise((r) => setTimeout(r, m));

const WelcomeScreen = () => {

  const onSend = async () => {
    // blockUI.current.open(true);
    // blockUI.current.open(true, 'Searching...');
    // blockUI.current.open(true, '', 'rgba(46, 139, 87, 0.8)');
    blockUI.current.open(true, '', 'rgba(255, 255, 255, 0.8)', 'black');

    try {
      await sleep(500);
      // throw {message: 'Can not update user info'};
      blockUI.current.open(false);
      dialogUI.current.open(
        'TestForm',
        'TestForm data has been sent',
        'About',
      );
      /*alertUI.current.open(
        'TestForm',
        'TestForm data has been sent',
        'About',
      );*/
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      dialogUI.current.open('Snap!', message);
      // alertUI.current.open('Snap!', message);
    }
  };

  return (
    <>
      <DialogUI ref={dialogUI} />
      <BlockUI ref={blockUI} />
      <AlertUI ref={alertUI} />
      <View>
        <Text>Welcome</Text>
        <Button
          onPress={onSend}
          title="Test"
        />
      </View>
    </>
  );
};

export default WelcomeScreen;
```
## Example
```bash
cd examples/TestRNHelper
yarn install

yarn remove @codepso/rn-helper
yarn cache clean @codepso/rn-helper --force

npm pack
yarn add ../../codepso-rn-helper-x.x.x.tgz

npx pod-install ios
npx react-native run-ios
```
## License
The React Native Helper is licensed under the terms of the GPL Open Source license and is available for free.
