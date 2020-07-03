import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const DialogUI = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [goTo, setGoTo] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useImperativeHandle(ref, () => ({
    open: (title, message, goTo = null, confirm = false) => {
      setOpen(true);
      setTitle(title);
      setMessage(message);
      setGoTo(goTo);
      setConfirm(confirm);
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
          <Button onPress={() => {
            setOpen(false);
          }}>Cancel</Button>
          }
          <Button onPress={() => {
            setOpen(false);
            if (goTo !== null) {
              const {navigation, screen} =  {...goTo};
              navigation.navigate(screen);
            }
          }}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DialogUI;
