import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Backdrop = props => {
  return (
    <div className={ styles.backdrop } onClick={ props.onClose } />
  );
};

const ModalOverlayStatus = props => {
  return (
    <div className={ styles.modalStatus }>
      <div className={ styles.content }>
        { props.children }
      </div>
    </div>
  );
};

const ModalOverlayInfo = props => {
  return (
    <div className={ styles.modalInfo }>
      <div className={ styles.contentInfo }>
        { props.children }
      </div>
    </div>
  )
}

const potralElement = document.getElementById('overlays');

const Modal = props => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Modal;
