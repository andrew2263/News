import React from "react";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

import useAuth from "../../hooks/use-auth";

import styles from "./AuthChecker.module.scss";

const AuthChecker = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const me = useSelector((state) => state.auth.me);

  const { logoutHandler } = useAuth();

  return (
    <div className={styles["auth-checker"]}>
      {isLoggedIn ? (
        <>
          {me.role === "Администратор" && (
            <NavLink to="/newArticle">Добавить новость</NavLink>
          )}
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

export default AuthChecker;
