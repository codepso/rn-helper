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
  const [settings, setSettings] = useState(template);

  useImperativeHandle(ref, () => ({
    open: (title, message, settings = null) => {
      setOpen(true);
      setTitle(title);
      setMessage(message);

      // Settings
      let defaultSettings = clone(template);
      if (settings !== null) {
        const clean = pick(settings, keys(template));
        const copy = clone(template);
        defaultSettings = merge(copy, clean);
      }
      setSettings(defaultSettings);
    }
  }));

  return (
    <Portal>
      <Dialog
        visible={open}
        onDismiss={false}>
        <Dialog.Title style={settings.styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          {settings.confirm &&
          <Button style={settings.styles.btnCancel} uppercase={false} mode={settings.btn.mode} onPress={() => {
            setOpen(false);
          }}>{settings.btn.cancel}</Button>
          }
          <Button style={settings.styles.btnCancel} uppercase={false} mode={settings.btn.mode} onPress={() => {
            setOpen(false);
            if (settings.nav.route !== null) {
              if (settings.nav.params === null) {
                settings.nav.route.navigate(settings.nav.screen);
              } else {
                settings.nav.route.navigate(settings.nav.screen, settings.nav.params);
              }
            }
          }}>{settings.btn.ok}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default DialogUI;
