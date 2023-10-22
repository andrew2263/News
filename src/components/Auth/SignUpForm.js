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
    formState: signupFormState,
    isValid: signupFormValid,
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
/*
  const createUser = async (email, password, controller) => {
    return new Promise((resolve, reject) => {
      try {
        const response = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      resolve(response);
      } catch (error) {
        if (controller.signal.aborted) {
          reject(new Error('Request was aborted!'));
        } else {
          reject (error);
        }
      }
    });
    */
   /*
      createUserWithEmailAndPassword(auth, email, password)
        .ther((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (controller.signal.aborted) {
            reject(new Error("Request was aborted!"));
          } else {
            reject(error);
          }
        });
    });
  };

  const addUserToDatabase = async (user, controller) => {
    const addResponse = await fetch(
      "https://news-acc8f-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(user),
      },
      controller.signal
    );
    if (!addResponse.ok) {
      throw new Error(`Ошибка при создании нового пользователя`);
    }
  };

  const sendVerificationLink = async (email, settings, controller) => {
    return new Promise((resolve, reject) => {
      sendSignInLinkToEmail(auth, email, settings)
        .ther((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (controller.signal.aborted) {
            reject(new Error("Request was aborted!"));
          } else {
            reject(error);
          }
        });
    });
  };
*/
  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    const birthday = Number(new Date(signupFormState.birthday?.value.toString()));

    const newUser = {
      email: signupFormState.email.value,
      nickname: signupFormState.nickname.value,
      firstName: signupFormState.firstName?.value,
      lastName: signupFormState.lastName?.value,
      role: signupFormState.role.value,
      birthday,
      gender: signupFormState.gender?.value,
    };
/*
    const controller = new AbortController();
    
    const createUserPromise = createUser(signupFormValue?.email, signupFormValue?.password, controller);
    const addNewUserToDatabasePromise = addUserToDatabase(newUser, controller);
    const sendVerificationLinkPromise = sendVerificationLink(signupFormValue.email,
      actionCodeSettings, controller);
    
    try {
      await Promise.all([createUserPromise, addNewUserToDatabasePromise, sendVerificationLinkPromise]);
      alert("Link sent to email");
      signupFormReset();
    } catch (error) {
      alert(error);
    } finally {
      controller.abort();
    }
*/

    try {
      const createNewUser = await createUserWithEmailAndPassword(
        auth,
        signupFormState.email.value,
        signupFormState.password.value
      );

      if (!createNewUser.ok) {
        throw new Error(`Ошибка при создании нового пользователя`);
      }

      const addNewUserToDatabase = await fetch(
        "https://news-acc8f-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          body: JSON.stringify(newUser),
        }
      );

      if (!addNewUserToDatabase.ok) {
        throw new Error(`Ошибка при создании нового пользователя`);
      }

      const sendVerificationLink = await sendSignInLinkToEmail(
        auth,
        signupFormState.email.value,
        actionCodeSettings
      );

      if (sendVerificationLink.ok) {
        alert("Link sent to email");
        signupFormReset();
      } else {
        throw new Error(`Ошибка при создании нового пользователя`);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error ${errorCode}: ${errorMessage}`);
    }

    /*
    createUserWithEmailAndPassword(
      auth,
      signupFormValue?.email,
      signupFormValue?.password
    )
      .then(() => {
        //window.localStorage.setItem("emailForSignIn", signupFormValue?.email);
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
*/
    setIsLoading(false);
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
          value={signupFormState.email.value}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          required
          hasError={signupFormState.email.hasError}
          hasErrorMessage="Ведите валидный e-mail"
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="Password"
          value={signupFormState.password.value}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          required
          hasError={signupFormState.password.hasError}
          hasErrorMessage="Пароль должен содержать минимум 8 символов, в том числе буквы, цифры, спецсимволы"
        />
        <Input
          type="text"
          id="nickname"
          name="nickname"
          label="Nickname"
          value={signupFormState.nickname.value}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          required
          hasError={signupFormState.nickname.hasError}
          hasErrorMessage="Nickname должен содержать от 2 до 70 символов"
        />
        <Input
          type="text"
          id="firstName"
          name="firstName"
          label="Имя"
          value={signupFormState.firstName.value}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          hasError={signupFormState.firstName.hasError}
          hasErrorMessage="Имя должно содержать от 2 до 70 символов"
        />
        <Input
          type="text"
          id="lastName"
          name="lastName"
          label="Фамилия"
          value={signupFormState.lastName.value}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          hasError={signupFormState.lastName.hasError}
          hasErrorMessage="Фамилия должна содержать от 2 до 70 символов"
        />
        <Select
          id="role"
          name="role"
          value={signupFormState.role.value}
          onChange={signupFormChange}
          changeBlur={signupFormBlur}
          label="Роль"
          initialOptions={roleOptions}
          hasError={signupFormState.role.hasError}
          hasErrorMessage="Выберите роль"
          required
        />
        <Input
          type="date"
          id="birthday"
          name="birthday"
          label="Дата рождения"
          value={signupFormState.birthday.value}
          onChange={signupFormChange}
          onBlur={signupFormBlur}
          hasError={signupFormState.birthday.hasError}
          hasErrorMessage="Дата рождения должна быть между 01.01.1920 и 01.01.2006"
        />
        <Select
          id="gender"
          name="gender"
          value={signupFormState.gender.value}
          onChange={signupFormChange}
          changeBlur={signupFormBlur}
          label="Пол"
          initialOptions={genderOptions}
          hasError={signupFormState.gender.hasError}
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
