import Layout from './components/Layout/Layout';
import Article from './components/Article/Article';
import NewsContent from './components/NewsContent/NewsContent';
import NewArticle from './components/NewArticle/NewArticle';
import React, { useState, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CONTENT } from './content';
import styles from './App.module.css';

function App() {
  const sortDateDesc = (el1, el2) => el2.date - el1.date;

  const NEWS_CONTENT = CONTENT.sort(sortDateDesc);

  const addArticleHandler = (article) => {
    if (article.priority === 2 || article.priority === 3) {
      const arrPriority = NEWS_CONTENT
        .filter(elem => elem.priority === article.priority)
        .sort(sortDateDesc);
      const lowerPriorityArticle = arrPriority[article.priority];
      const lowerPriorityArticleIndex = NEWS_CONTENT.findIndex(elem => {
        return elem.key === lowerPriorityArticle.key;
      });
      NEWS_CONTENT[lowerPriorityArticleIndex].priority = 4;
    }

    if (article.priority === 1) {
      const lowerPriorityArticle = NEWS_CONTENT.filter(elem => elem.priority === 1)[0];
      const lowerPriorityArticleIndex = NEWS_CONTENT.findIndex(elem => {
        return elem.key === lowerPriorityArticle.key;
      });
      NEWS_CONTENT[lowerPriorityArticleIndex].priority = 4;
    }

    NEWS_CONTENT.push(article);
    NEWS_CONTENT.sort(sortDateDesc);
    console.log(NEWS_CONTENT);
  };

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/index" />
        </Route>
        <Route path="/index" exact>
          <NewsContent cathegory="all" content={ NEWS_CONTENT } />
        </Route>
        <Route path="/politics" exact>
          <NewsContent cathegory="politics" content={ NEWS_CONTENT } />
        </Route>
        <Route path="/economics" exact>
          <NewsContent cathegory="economics" content={ NEWS_CONTENT } />
        </Route>
        <Route path="/world" exact>
          <NewsContent cathegory="world" content={ NEWS_CONTENT } />
        </Route>
        <Route path="/sport" exact>
          <NewsContent cathegory="sport" content={ NEWS_CONTENT } />
        </Route>
        <Route path="/politics/:newsId">
          <Article content={ NEWS_CONTENT } />
        </Route>
        <Route path="/economics/:newsId">
          <Article content={ NEWS_CONTENT } />
        </Route>
        <Route path="/world/:newsId">
          <Article content={ NEWS_CONTENT } />
        </Route>
        <Route path="/sport/:newsId">
          <Article content={ NEWS_CONTENT } />
        </Route>
        <Route path="/newArticle">
          <NewArticle addNewArticle={ addArticleHandler } />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
