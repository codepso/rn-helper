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
      let message = AppHelper.getErrorMessage(error);
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
