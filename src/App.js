import React, { useCallback, useEffect } from "react";
//import { Provider, useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import { contentActions } from "./store/content-slice";

//import store from "./store/index";

import Layout from "./components/Layout/Layout";
import Article from "./components/Article/Article";
import NewsContent from "./components/NewsContent/NewsContent";
import NewArticle from "./components/NewArticle/NewArticle";
import { Route, Switch } from "react-router-dom";

//import NewsProvider from './store/NewsProvider';

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
        el.date = new Date(el.date);
        return el;
      });

      dispatch(contentActions.loadContentHandler(contentData));
    } catch (error) {
      //catchErrorHandler(error.message, 'loadContent');
      console.log("error");
    }
  }, []);
/*
  const fetchCommentsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://news-acc8f-default-rtdb.firebaseio.com/comments.json"
      );

      const responseData = await response.json();

      const commentsData = responseData.map((el) => {
        if (el.comments) {
          el.comments = el.comments.map((comment) => {
            return { ...comment, date: new Date(comment.date) };
          });
        }
        return el;
      });

      dispatch(contentActions.loadCommentsHandler(commentsData));
    } catch (error) {
      //catchErrorHandler(error.message, 'loadComments');
      console.log("error");
    }
  }, []);
*/
  useEffect(() => {
    fetchContentHandler();
    //fetchCommentsHandler();
  }, [fetchContentHandler]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <NewsContent category="all" />
        </Route>
        <Route path="/politics" exact>
          <NewsContent category="politics" />
        </Route>
        <Route path="/war" exact>
          <NewsContent category="war" />
        </Route>
        <Route path="/economics" exact>
          <NewsContent category="economics" />
        </Route>
        <Route path="/world" exact>
          <NewsContent category="world" />
        </Route>
        <Route path="/sport" exact>
          <NewsContent category="sport" />
        </Route>
        <Route path="/politics/:newsId">
          <Article />
        </Route>
        <Route path="/war/:newsId">
          <Article />
        </Route>
        <Route path="/economics/:newsId">
          <Article />
        </Route>
        <Route path="/world/:newsId">
          <Article />
        </Route>
        <Route path="/sport/:newsId">
          <Article />
        </Route>
        <Route path="/newArticle">
          <NewArticle />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
