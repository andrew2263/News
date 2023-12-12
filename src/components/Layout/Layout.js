import React from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { modalActions } from "../../store/modal-slice";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Modal from "../UI/Modal";

const Layout = (props) => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.modal.show);

  const closeModalHandler = () => {
    dispatch(modalActions.setCloseModal());
  };

  return (
    <React.Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
      {isModalOpen && <Modal onClose={closeModalHandler} />}
    </React.Fragment>
  );
};

export default Layout;
