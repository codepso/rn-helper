import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const DialogUI = forwardRef((props, ref) => {
  const txtOk = props.hasOwnProperty('txtOk') ? props.txtOk : 'Ok';
  const txtCancel = props.hasOwnProperty('txtCancel') ? props.txtCancel : 'Cancel';
  const btnMode = props.hasOwnProperty('btnMode') ? props.btnMode : 'text';
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [goTo, setGoTo] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [btnOk, setBtnOk] = useState(txtOk);
  const [btnCancel, setBtnCancel] = useState(txtCancel);

  useImperativeHandle(ref, () => ({
    open: (title, message, goTo = null, confirm = false, buttons = null) => {
      setOpen(true);
      setTitle(title);
      setMessage(message);
      setGoTo(goTo);
      setConfirm(confirm);

      const {btnOk, btnCancel} =  {...buttons};
      if (btnOk !== undefined) {
        setBtnOk(btnOk);
      }
      if (btnCancel !== undefined) {
        setBtnCancel(btnCancel);
      }
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
          <Button style={{marginRight: 10}} uppercase={false} mode={btnMode} onPress={() => {
            setOpen(false);
          }}>{btnCancel}</Button>
          }
          <Button mode={btnMode} uppercase={false} onPress={() => {
            setOpen(false);
            if (goTo !== null) {
              const {navigation, screen, params} =  {...goTo};
              if (params === undefined) {
                navigation.navigate(screen);
              } else {
                navigation.navigate(screen, params);
              }
            }
          }}>{btnOk}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DialogUI;
