import React, {createRef} from 'react';
import {Text, View, Button} from 'react-native';
import {AlertUI, BlockUI, MainHelper} from '@codepso/rn-helper';

const alertUI = createRef();
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
      throw {message: 'Can not update user info'};
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
