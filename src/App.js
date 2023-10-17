import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { contentActions } from "./store/content-slice";
import { modalActions } from "./store/modal-slice";
import { authActions } from "./store/auth-slice";

import Layout from "./components/Layout/Layout";
import Article from "./components/Article/Article";
import NewsContent from "./components/NewsContent/NewsContent";
import NewArticle from "./components/NewArticle/NewArticle";
import AuthPage from "./components/Auth/AuthPage";

import { MAIN_RUBRICS } from "./constants/NewsRubrics.Constant";
import { sortDateDesc } from "./helpers/sortDateDesc";
import { calculateRemainingTime } from "./helpers/authHelper";

function App() {
  const dispatch = useDispatch();

  const fetchContentHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://news-acc8f-default-rtdb.firebaseio.com/content.json"
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки новостей.");
      }

      const responseData = await response.json();

      const contentData = responseData.map((el) => {
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
      }).sort(sortDateDesc);

      dispatch(contentActions.loadContentHandler(contentData));
    } catch (error) {
      dispatch(
        modalActions.setOpenModal({ type: "error", text: error.message })
      );
      console.log("error");
    }
  }, []);

  useEffect(() => {
    fetchContentHandler();
  }, [fetchContentHandler]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");

    if (storedToken && storedExpirationTime) {
      const remainingTime = calculateRemainingTime(storedExpirationTime);

      if (remainingTime > 0) {
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
          <Route path={el.link} key={el.category} exact>
            <NewsContent category={el.category} />
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
          <AuthPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
