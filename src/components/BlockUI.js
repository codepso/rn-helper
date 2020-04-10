import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {appStyle} from '../../assets/styles';
import Spinner from 'react-native-loading-spinner-overlay';

const BlockUI = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Loading...');

  useImperativeHandle(ref, () => ({
    open: (visible, content = '') => {
      setOpen(visible);
      if (content !== '') {
        setMessage(content);
      }
    },
  }));

  return (
    <Spinner
      visible={open}
      textContent={message}
      overlayColor={'rgba(0, 0, 0, 0.8)'}
      textStyle={{color: 'red'}}
      animation={'slide'}
    />
  );
});

export default BlockUI;
