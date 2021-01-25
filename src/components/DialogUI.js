import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const DialogUI = forwardRef((props, ref) => {
  const txtOk = props.hasOwnProperty('txtOk') ? props.txtOk : 'Ok';
  const txtCancel = props.hasOwnProperty('txtCancel') ? props.txtCancel : 'Cancel';
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [goTo, setGoTo] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [btnMode, setBtnMode] = useState('text');

  useImperativeHandle(ref, () => ({
    open: (title, message, goTo = null, confirm = false, btnMode = 'text') => {
      setOpen(true);
      setTitle(title);
      setMessage(message);
      setGoTo(goTo);
      setConfirm(confirm);
      setBtnMode(btnMode);
    }
  }));

  return (
    <Portal>
      <Dialog
        visible={open}
        onDismiss={false}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {confirm &&
          <Button mode={btnMode} onPress={() => {
            setOpen(false);
          }}>{txtCancel}</Button>
          }
          <Button onPress={() => {
            setOpen(false);
            if (goTo !== null) {
              const {navigation, screen} =  {...goTo};
              navigation.navigate(screen);
            }
          }}>{txtOk}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DialogUI;
