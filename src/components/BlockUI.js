import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const BlockUI = forwardRef((props, ref) => {
  const bgColorDefault = props.hasOwnProperty('bgColor') ? props.bgColor : 'rgba(0, 0, 0, 0.8)';
  const txtColorDefault = props.hasOwnProperty('txtColor') ? props.txtColor : 'white';
  const animationDefault = props.hasOwnProperty('animation') ? props.animation : 'none';
  const messageDefault = props.hasOwnProperty('message') ? props.message : 'Loading...';

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(messageDefault);
  const [bgColor, setBgColor] = useState(bgColorDefault);
  const [txtColor, setTxtColor] = useState(txtColorDefault);

  // Verify Changes
  if (bgColor !== bgColorDefault) {
    setBgColor(bgColorDefault);
  }

  if (txtColor !== txtColorDefault) {
    setTxtColor(txtColorDefault);
  }

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
      textStyle={{color: txtColor, fontWeight: 'normal'}}
      animation={animationDefault}
    />
  );
});

export default BlockUI;
