import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import styles from "./Modal.module.scss";

const potralElement = document.getElementById("overlays");

const HeaderMenu = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose}>
          ReactDOM.createPortal((
          <div className={styles["modal-info"]}>
            <div>{props.children}</div>
          </div>
          ),potralElement)
        </Backdrop>,
        potralElement
      )}
    </React.Fragment>
  );
};

export default HeaderMenu;
