import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

import Input from "../UI/Input/Input";

import useForm from "../../hooks/use-form";
import useAuth from "../../hooks/use-auth";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { isEmail, isNotEmpty } from "../../helpers/validationHelper";

import styles from "./AuthPage.module.scss";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { loginHandler } = useAuth();

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

    signInWithEmailAndPassword(auth, formState.email.value, formState.password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        const expirationTime = new Date(user.stsTokenManager.expirationTime);
        loginHandler(user.accessToken, expirationTime.toISOString(), formState.email.value);
        history.replace("/");
        loginFormReset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`);
      });

    setIsLoading(false);
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
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="Password"
          value={formState.password.value}
          onChange={loginFormChange}
          onBlur={loginFormBlur}
          required
          hasError={formState.password.hasError}
          hasErrorMessage="Введите пароль"
        />
        <button
          type="submit"
          className={styles["login-button"]}
          disabled={!loginFormValid}
        >
          Войти
        </button>
        {isLoading && <p>Sending request...</p>}
        <NavLink to="/auth?mode=signUp">Создать новый аккаунт</NavLink>
      </form>
    </React.Fragment>
  );
};

export default SignInForm;
