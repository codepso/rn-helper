import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {merge, keys, pick, has, clone} from 'lodash';

/**
 * @typedef Structure
 * @type {object}
 * @property {object} nav
 * @property {object} nav.route
 * @property {function} nav.route.navigate
 */

const DialogUI = forwardRef((props, ref) => {

  const defaultStyles = {
    title: {},
    btnOk: {},
    btnCancel: {marginRight: 10},
  };

  const txtOk = has(props, 'txtOk') ? props['txtOk'] : 'Ok';
  const txtCancel = has(props, 'txtCancel') ? props['txtCancel'] : 'Cancel';
  const btnMode = has(props, 'btnMode') ? props['btnMode'] : 'text';
  const styles = has(props, 'styles') ? props['styles'] : defaultStyles;

  const template = {
    nav: {
      route: null,
      screen: '',
      params: null
    },
    btn: {
      mode: btnMode,
      ok: txtOk,
      cancel: txtCancel,
    },
    confirm: false,
    styles,
  };

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [structure, setStructure] = useState(template);

  useImperativeHandle(ref, () => ({
    open: (title, message, structure = null) => {
      setOpen(true);
      setTitle(title);
      setMessage(message);

      if (structure !== null) {
        const clean = pick(structure, keys(template));
        const copy = clone(template);
        const result = merge(copy, clean);
        setStructure(result);
      }
    }
  }));

  return (
    <Portal>
      <Dialog
        visible={open}
        onDismiss={false}>
        <Dialog.Title style={structure.styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {structure.confirm &&
          <Button style={structure.styles.btnCancel} uppercase={false} mode={structure.btn.mode} onPress={() => {
            setOpen(false);
          }}>{structure.btn.cancel}</Button>
          }
          <Button style={structure.styles.btnCancel} uppercase={false} mode={structure.btn.mode} onPress={() => {
            setOpen(false);
            if (structure.nav.route !== null) {
              if (structure.nav.params === null) {
                structure.nav.route.navigate(structure.nav.screen);
              } else {
                structure.nav.route.navigate(structure.nav.screen, structure.nav.params);
              }
            }
          }}>{structure.btn.ok}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DialogUI;
