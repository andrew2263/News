import { useCallback } from "react";

import { useDispatch } from "react-redux";

import { authActions } from "../store/auth-slice";

import { calculateRemainingTime } from "../helpers/authHelper";

const useAuth = () => {
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  }, []);

  const loginHandler = (token, expirationTime) => {
    dispatch(authActions.login({ token }));

    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    const logoutTimer = setTimeout(() => (logoutHandler, remainingTime));

    return () => {
      clearTimeout(logoutTimer);
    };
  };

  return {
    logoutHandler,
    loginHandler
  };
}

export default useAuth;
