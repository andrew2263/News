import React from "react";
import { useLocation, Redirect } from "react-router-dom";

import Container from "../Layout/Container";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import styles from "./AuthPage.module.scss";

const AuthPage = () => {

  //const token = useSelector((state) => state.auth.token);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");

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
