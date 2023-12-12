import React, { useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";

import Container from "../Layout/Container";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");

  useEffect(() => {
    document.title =
      mode === "signUp"
        ? "Регистрация — Moldova News"
        : "Авторизация — Moldova News";
  }, [mode]);

  return (
    <React.Fragment>
      <section>
        <Container>
          <div className={styles["auth-container"]}>
            {mode === "signIn" ? (
              <SignInForm />
            ) : mode === "signUp" ? (
              <SignUpForm />
            ) : (
              <Redirect to="/auth?mode=signIn" />
            )}
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AuthPage;
