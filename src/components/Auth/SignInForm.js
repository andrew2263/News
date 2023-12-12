import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "../UI/Input/Input";
import { modalActions } from "../../store/modal-slice";

import useForm from "../../hooks/use-form";
import useAuth from "../../hooks/use-auth";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { isEmail, isNotEmpty } from "../../helpers/validationHelper";

import styles from "./AuthPage.module.scss";

const SignInForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { loginHandler } = useAuth();

  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(modalActions.setCloseModal());
  };

  const initialFormState = {
    email: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    password: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
  };

  const validation = {
    email: isEmail,
    password: isNotEmpty,
  };

  const {
    isValid: loginFormValid,
    formState,
    valueChangeHandler: loginFormChange,
    inputBlurHandler: loginFormBlur,
    reset: loginFormReset,
  } = useForm(initialFormState, validation);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(
      auth,
      formState.email.value,
      formState.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        const expirationTime = new Date(user.stsTokenManager.expirationTime);
        loginHandler(
          user.accessToken,
          expirationTime.toISOString(),
          formState.email.value
        );
        history.replace("/");
        loginFormReset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`);
      });

    if (props.isModal) {
      closeModalHandler();
    }

    setIsLoading(false);
  };

  const clickHandler = () => {
    if (props.isModal) {
      closeModalHandler();
    }
  };

  return (
    <React.Fragment>
      <h2>Авторизация</h2>
      <form onSubmit={loginSubmitHandler} className={styles["auth-form"]}>
        <Input
          type="email"
          id="email"
          name="email"
          label="E-mail"
          value={formState.email.value}
          onChange={loginFormChange}
          onBlur={loginFormBlur}
          required
          hasError={formState.email.hasError}
          hasErrorMessage="Ведите валидный e-mail"
          isSighIn
        />
        <Input
          id="password"
          name="password"
          label="Password"
          value={formState.password.value}
          onChange={loginFormChange}
          onBlur={loginFormBlur}
          required
          isPassword
          hasError={formState.password.hasError}
          hasErrorMessage="Введите пароль"
          isSighIn
        />
        <button
          type="submit"
          className={styles["login-button"]}
          disabled={!loginFormValid}
        >
          Войти
        </button>
        {isLoading && <p>Sending request...</p>}
        <NavLink to="/auth?mode=signUp" onClick={clickHandler}>
          Создать новый аккаунт
        </NavLink>
      </form>
    </React.Fragment>
  );
};

export default SignInForm;
