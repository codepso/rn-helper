import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const BlockUI = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const [bgColor, setBgColor] = useState('rgba(0, 0, 0, 0.8)');
  const [txtColor, setTxtColor] = useState('white');

  useImperativeHandle(ref, () => ({
    open: (visible, content = '', bgColor = '', txtColor = '') => {
      setOpen(visible);
      if (content !== '') {
        setMessage(content);
      }
      if (bgColor !== '') {
        setBgColor(bgColor);
      }
      if (txtColor !== '') {
        setTxtColor(txtColor);
      }
    },
  }));

  return (
    <Spinner
      visible={open}
      textContent={message}
      overlayColor={bgColor}
      textStyle={{color: txtColor}}
      animation={'slide'}
    />
  );
});

export default BlockUI;
