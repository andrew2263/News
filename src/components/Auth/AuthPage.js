import React, { useState } from "react";
//import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Container from "../Layout/Container";
import Input from "../UI/Input/Input";
import useAuth from "../../hooks/use-auth";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //const token = useSelector((state) => state.auth.token);

  const history = useHistory();

  const { loginHandler } = useAuth();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const changeEmailHandler = ({ target }) => {
    const value = target && target.value;
    setEmail(value);
  };

  const changePasswordHandler = ({ target }) => {
    const value = target && target.value;
    setPassword(value);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUIUrWvj7GqstIk20X5pIjcQ8SZm5IHp4';

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUIUrWvj7GqstIk20X5pIjcQ8SZm5IHp4'
    }
    if (!isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUIUrWvj7GqstIk20X5pIjcQ8SZm5IHp4';
      // firebase auth documentation
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      if (!response.ok) {
        return response.json().then(data => {
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }).then(data => {
      const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)));
      //authCtx.login(data.idToken, expirationTime.toISOString());
      loginHandler(data.idToken, expirationTime.toISOString());
      history.replace('/');
    }).catch(err => {
      alert(err.message);
    });
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <Container>
          <h2>Авторизация</h2>
          <form onSubmit={authSubmitHandler}>
            <Input
              type="email"
              id="email"
              label="E-mail"
              value={email}
              onChange={changeEmailHandler}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={changePasswordHandler}
            />
            {!isLoading && (
              <button type="submit">
                {isLogin ? "Login" : "Create account"}
              </button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button type="button" onClick={switchAuthModeHandler}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </form>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AuthPage;
