import React from "react";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

import useAuth from "../../hooks/use-auth";

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { logoutHandler } = useAuth();

  return (
    <div>
      {/*<NavLink to="/auth" activeClassName={styles.active}>*/}
      {isLoggedIn ? (
        <>
          <NavLink to="/newArticle">Добавить новость</NavLink>
          <button type="button" onClick={logoutHandler}>
            Выход
          </button>
        </>
      ) : (
        <NavLink to="/auth?mode=signIn">Авторизация</NavLink>
      )}
    </div>
  );
};

export default Auth;
