import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Backdrop = props => {
  return (
    <div className={ styles.backdrop } onClick={ props.onClose } />
  );
};

const ModalOverlayStatus = props => {
  return (
    <div className={ styles['modal-status'] }>
      <div>
        { props.children }
      </div>
    </div>
  );
};

const ModalOverlayInfo = props => {
  return (
    <div className={ styles['modal-info'] }>
      <div>
        { props.children }
      </div>
    </div>
  )
}

const potralElement = document.getElementById('overlays');

const Modal = props => {
  return (
    <React.Fragment>
      { ReactDOM.createPortal(
        <Backdrop onClose={ props.onClose } />, potralElement
      ) }
      { props.type === 'status' && ReactDOM.createPortal(
        <ModalOverlayStatus>{ props.children }</ModalOverlayStatus>,
        potralElement
      ) }
      { props.type === 'info' && ReactDOM.createPortal(
        <ModalOverlayInfo>{ props.children }</ModalOverlayInfo>,
        potralElement
      ) }
    </React.Fragment>
  );
};

export default Modal;
