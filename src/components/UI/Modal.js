import React from "react";
import ReactDOM from "react-dom";

import { useSelector } from "react-redux";

import Backdrop from "./Backdrop";
import ModalSubmitting from "./ModalStatus/ModalSubmitting";
import ModalError from "./ModalStatus/ModalError";
import ModalIsSubmitted from "./ModalStatus/ModalSubmitted";
import AuthModal from "./ModalStatus/AuthModal";

import styles from "./Modal.module.scss";

const ModalOverlayStatus = (props) => {
  return (
    <div className={styles["modal-status"]}>
      <div>{props.children}</div>
    </div>
  );
};

const potralElement = document.getElementById("overlays");

const Modal = (props) => {
  const modalType = useSelector((state) => state.modal.type);
  const modalText = useSelector((state) => state.modal.text);

  const getModalContent = (type) => {
    switch (type) {
      case "submitting":
        return <ModalSubmitting />;
      case "error":
        return <ModalError errorMessage={modalText} />;
      case "isSubmitted":
        return <ModalIsSubmitted onClose={props.onClose} />;
      case "auth":
        return <AuthModal />;
      default:
        return <ModalError error={modalText} />;
    }
  };

  const modalContent = getModalContent(modalType);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <>
          <Backdrop onClose={props.onClose} />
          <ModalOverlayStatus>{modalContent}</ModalOverlayStatus>
        </>,
        potralElement
      )}
    </React.Fragment>
  );
};

export default Modal;
