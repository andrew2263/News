import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, functions, httpsCallable } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import { contentActions } from "./store/content-slice";
import { modalActions } from "./store/modal-slice";
import { authActions } from "./store/auth-slice";

import Layout from "./components/Layout/Layout";
import Article from "./components/Article/Article";
import NewsContent from "./components/NewsContent/NewsContent";
import NewArticle from "./components/NewArticle/NewArticle";
import AuthPage from "./components/Auth/AuthPage";

import { MAIN_RUBRICS } from "./constants/NewsRubrics.Constant";
import { calculateRemainingTime } from "./helpers/authHelper";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const getUserByEmailFunction = httpsCallable(functions, "getUserByEmail");

  const fetchContentHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://news-acc8f-default-rtdb.firebaseio.com/content.json"
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки новостей.");
      }

      const responseData = await response.json();

      const contentData = responseData
        .map((el) => {
          return {
            ...el,
            date: Number(new Date(el.date)),
            comments: el.comments?.length
              ? el.comments.map((comment) => ({
                  ...comment,
                  date: Number(new Date(comment.date)),
                }))
              : [],
          };
        });
        //.sort(sortDateDesc);

      dispatch(contentActions.loadContentHandler(contentData));
    } catch (error) {
      dispatch(
        modalActions.setOpenModal({ type: "error", text: error.message })
      );
      console.log("error");
    }
  }, []);

  const getCurrentUser = useCallback(async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // Отменяем подписку после первого вызова
        resolve(user);
      });
    });
  }, []);

  const getMe = async () => {
    const user = await getCurrentUser();
    const me = await getUserByEmailFunction(user.email);
    dispatch(authActions.setMe(me));
  };

  useEffect(() => {
    fetchContentHandler();
  }, [fetchContentHandler]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");

    if (storedToken && storedExpirationTime) {
      const remainingTime = calculateRemainingTime(storedExpirationTime);

      if (remainingTime > 0) {
        getMe();
        dispatch(authActions.login({ token: storedToken }));
        const logoutTimer = setTimeout(
          () => dispatch(authActions.logout()),
          remainingTime
        );

        return () => {
          clearTimeout(logoutTimer);
        };
      } else {
        dispatch(authActions.logout());
      }
    }
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <NewsContent category="all" />
        </Route>
        {MAIN_RUBRICS.map((el) => (
          <Route path={el.link} key={el.value} exact>
            <NewsContent category={el.value} />
          </Route>
        ))}
        <Route path="/rubrics/:rubric">
          <NewsContent isRubric />
        </Route>
        <Route path="/:category/:newsId">
          <Article />
        </Route>
        <Route path="/newArticle">
          <NewArticle />
        </Route>
        <Route path="/auth">
          {!isLoggedIn ? <AuthPage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
