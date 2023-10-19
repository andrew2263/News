import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";

import useForm from "../../hooks/use-form";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
} from "firebase/auth";
import {
  isEmail,
  isPassword,
  isName,
  isBirthday,
  isNotEmpty,
} from "../../helpers/validationHelper";
import { ROLES, GENDERS } from "../../constants/SignUpOptions.Constant";

import styles from "./AuthPage.module.scss";

const roleOptions = ROLES.map((el) => ({
  value: el.value,
  text: el.name,
  label: <div>{el.name}</div>,
}));

const genderOptions = GENDERS.map((el) => ({
  value: el.value,
  text: el.name,
  label: <div>{el.name}</div>,
}));

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    nickname: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    firstName: {
      value: "",
      touched: false,
      valid: true,
      hasError: false,
    },
    lastName: {
      value: "",
      touched: false,
      valid: true,
      hasError: false,
    },
    role: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    birthday: {
      value: "",
      touched: false,
      valid: true,
      hasError: false,
    },
    gender: {
      value: "",
      touched: false,
      valid: true,
      hasError: false,
    },
  };

  const validation = {
    email: isEmail,
    password: isPassword,
    nickname: isName,
    firstName: isName,
    lastName: isName,
    role: isNotEmpty,
    birthday: isBirthday,
    gender: isNotEmpty,
  };

  const {
    value: signupFormValue,
    isValid: signupFormValid,
    hasError: signupFormHasError,
    valueChangeHandler: signupFormChange,
    inputBlurHandler: signupFormBlur,
    reset: signupFormReset,
  } = useForm(initialFormState, validation);

  const actionCodeSettings = {
    url: "http://localhost:3000/auth",
    handleCodeInApp: true,
    /* iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
    */
  };

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    const newUser = {
      email: signupFormValue.email,
      nickname: signupFormValue.nickname,
      firstName: signupFormValue?.firstName,
      lastName: signupFormValue?.lastName,
      role: signupFormValue.role,
      birthday: signupFormValue?.birthday,
      gender: signupFormValue?.gender,
    };

    await fetch('https://news-acc8f-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      body: JSON.stringify(newUser)
    });

    createUserWithEmailAndPassword(
      auth,
      signupFormValue?.email,
      signupFormValue?.password
    )
      .then(() => {
        window.localStorage.setItem("emailForSignIn", signupFormValue?.email);
        sendSignInLinkToEmail(
          auth,
          signupFormValue.email,
          actionCodeSettings
        ).then(() => {
          alert("Link sent to email");
          signupFormReset();
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error ${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <React.Fragment>
      <h2>Регистрация</h2>
      <form onSubmit={signupSubmitHandler} className={styles["auth-form"]}>
        <Input
          type="email"
          id="email"
          name="email"
          label="E-mail"
          value={signupFormValue.email}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          required
          hasError={signupFormHasError.email}
          hasErrorMessage="Ведите валидный e-mail"
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="Password"
          value={signupFormValue.password}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          required
          hasError={signupFormHasError.password}
          hasErrorMessage="Пароль должен содержать минимум 8 символов, в том числе буквы, цифры, спецсимволы"
        />
        <Input
          type="text"
          id="nickname"
          name="nickname"
          label="Nickname"
          value={signupFormValue.nickname}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          required
          hasError={signupFormHasError.nickname}
          hasErrorMessage="Nickname должен содержать от 2 до 70 символов"
        />
        <Input
          type="text"
          id="firstName"
          name="firstName"
          label="Имя"
          value={signupFormValue.firstName}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          hasError={signupFormHasError.firstName}
          hasErrorMessage="Имя должно содержать от 2 до 70 символов"
        />
        <Input
          type="text"
          id="lastName"
          name="lastName"
          label="Фамилия"
          value={signupFormValue.lastName}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          hasError={signupFormHasError.lastName}
          hasErrorMessage="Фамилия должна содержать от 2 до 70 символов"
        />
        <Select
          id="role"
          name="role"
          value={signupFormValue.role}
          onChange={signupFormChange}
          changeBlur={signupFormBlur}
          label="Роль"
          initialOptions={roleOptions}
          hasError={signupFormHasError.role}
          hasErrorMessage="Выберите роль"
          required
        />
        <Input
          type="date"
          id="birthday"
          name="birthday"
          label="Дата рождения"
          value={signupFormValue.birthday}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          hasError={signupFormHasError.birthday}
          hasErrorMessage="Дата рождения должна быть между 01.01.1920 и 01.01.2006"
        />
        <Select
          id="gender"
          name="gender"
          value={signupFormValue.gender}
          onChange={signupFormChange}
          changeBlur={signupFormBlur}
          label="Пол"
          initialOptions={genderOptions}
          hasError={signupFormHasError.gender}
          hasErrorMessage="Выберите пол"
        />
        <button
          type="submit"
          className={styles["login-button"]}
          disabled={!signupFormValid}
        >
          Создать аккаунт
        </button>
        {isLoading && <p>Sending request...</p>}
        <NavLink to="/auth?mode=signIn">Войти</NavLink>
      </form>
    </React.Fragment>
  );
};

export default SignUpForm;
