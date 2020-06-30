import React, {createRef} from 'react';
import {Text, View, Button} from 'react-native';
import {BlockUI, DialogUI, MainHelper} from '@codepso/rn-helper';

const HomePaperScreen = () => {
  const blockUI = createRef();
  const dialogUI = createRef();
  const sleep = (m) => new Promise((r) => setTimeout(r, m));

  const onSend = async () => {
    // blockUI.current.open(true);
    // blockUI.current.open(true, 'Searching...');
    // blockUI.current.open(true, '', 'rgba(46, 139, 87, 0.8)');
    blockUI.current.open(true, '', 'rgba(255, 255, 255, 0.8)', 'black');

    try {
      await sleep(500);
      throw {message: 'Can not update user info'};
      blockUI.current.open(false);
      dialogUI.current.open(
        'TestForm',
        'TestForm data has been sent',
        'About',
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      dialogUI.current.open('Snap!', message);
    }
  };

  return (
    <>
      <BlockUI ref={blockUI} />
      <DialogUI ref={dialogUI} />
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

export default HomePaperScreen;
