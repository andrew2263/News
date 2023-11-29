import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { functions, httpsCallable } from "../firebase";

import { authActions } from "../store/auth-slice";

import { calculateRemainingTime } from "../helpers/authHelper";

const useAuth = () => {
  const dispatch = useDispatch();

  const getUserByEmailFunction = httpsCallable(functions, "getUserByEmail");

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  }, []);

  const loginHandler = async (token, expirationTime, email) => {
    const me = await getUserByEmailFunction(email);

    dispatch(authActions.login({ token }));
    dispatch(authActions.setMe(me));

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
