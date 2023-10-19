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
/*
  const authSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    /*
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUIUrWvj7GqstIk20X5pIjcQ8SZm5IHp4";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUIUrWvj7GqstIk20X5pIjcQ8SZm5IHp4";
    }
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUIUrWvj7GqstIk20X5pIjcQ8SZm5IHp4";
      // firebase auth documentation
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (!response.ok) {
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        //authCtx.login(data.idToken, expirationTime.toISOString());
        loginHandler(data.idToken, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
      */
    /*
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Send email confirmation
        userCredential.user.sendEmailVerification();
      })
      .catch((error) => {
        // Handle sign-up or email sending errors
      });
      
    if (!isLogin) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", email);
          sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
            alert("Link sent to email");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("2");
          alert(`Error ${errorCode}: ${errorMessage}`);
        });
    }
    
    setIsLoading(false);
  };
*/
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
