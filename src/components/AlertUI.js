import {forwardRef, useImperativeHandle} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AlertUI = forwardRef((props, ref) => {
  const buttonsDefault = [{text: 'Ok', onPress: () => {}, style: 'cancel'}];
  let buttonsGoto = [];
  const {navigate} = useNavigation();

  useImperativeHandle(ref, () => ({
    open: (title, message, goTo = null) => {
      if (goTo !== null) {
        buttonsGoto = [
          {
            text: 'Ok',
            onPress: () => {
              navigate(goTo);
            },
          },
        ];
      }

      let buttons = goTo === null ? buttonsDefault : buttonsGoto;
      setTimeout(() => {
        Alert.alert(title, message, buttons, {cancelable: false});
      }, 300);
    },
  }));

  return null;
});

export default AlertUI;
