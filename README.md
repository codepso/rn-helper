# rn-helper
Components, Helpers for React Native Projects.
## Table of content
- [Requirements](#requirements)
- [Installation](#installation)
- [Use](#use)
- [License](#license)
## Requirements
 - React Native 0.61+
 - React Navigation 5+
 - React Native Loading Spinner Overlay
 - Lodash 4.15+
 ```bash
yarn add react-native-loading-spinner-overlay
yarn add lodash
 ```
## Installation
```bash
yarn add @codepso/rn-helper
yarn upgrade @codepso/rn-helper
```
## Use
```javascript
import React, {createRef} from 'react';
import {Text, View, Button} from 'react-native';
import {AlertUI, BlockUI} from 'rn-helper';

const alertUI = createRef();
const blockUI = createRef();
const sleep = (m) => new Promise((r) => setTimeout(r, m));

const WelcomeScreen = () => {

  const onSend = async () => {
    blockUI.current.open(true);

    try {
      await sleep(500);
      blockUI.current.open(false);
      alertUI.current.open(
        'TestForm',
        'TestForm data has been sent',
        'About',
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getErrorMessage(error);
      alertUI.current.open('Snap!', message);
    }
  };

  return (
    <>
      <AlertUI ref={alertUI} />
      <BlockUI ref={blockUI} />
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
## License
The React Native Helper is licensed under the terms of the GPL Open Source license and is available for free.
