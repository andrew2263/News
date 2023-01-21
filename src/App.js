import Layout from './components/Layout/Layout';
import Article from './components/Article/Article';
import NewsContent from './components/NewsContent/NewsContent';
import NewArticle from './components/NewArticle/NewArticle';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CONTENT } from './content';
import styles from './App.module.css';

function App() {
  const sortDateDesc = (el1, el2) => el2.date - el1.date;

  const NEWS_CONTENT = CONTENT.sort(sortDateDesc);

  const [content, setContent] = useState(NEWS_CONTENT);

  const addArticleHandler = (article) => {
    const lastPriorityItem = {
      '1': 0,
      '2': 2,
      '3': 3
    };

    if (article.priority !== 4 && typeof article.priority === 'number') {
      const arrPriority = content
        .filter(elem => elem.priority === article.priority)
        .sort(sortDateDesc);
      const lowerPriorityArticle = arrPriority[lastPriorityItem[article.priority.toString()]];
      const lowerPriorityArticleIndex = content.findIndex(elem => {
        return elem.key === lowerPriorityArticle.key;
      });
      const copyContent = Object.assign([], content);
      copyContent[lowerPriorityArticleIndex].priority = 4;
      setContent(copyContent);
    }

    setContent(prevContent => {
      return [...prevContent, article].sort(sortDateDesc);
    })
    console.log(content);
  };

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/index" />
        </Route>
        <Route path="/index" exact>
          <NewsContent cathegory="all" content={ content } />
        </Route>
        <Route path="/politics" exact>
          <NewsContent cathegory="politics" content={ content } />
        </Route>
        <Route path="/economics" exact>
          <NewsContent cathegory="economics" content={ content } />
        </Route>
        <Route path="/world" exact>
          <NewsContent cathegory="world" content={ content } />
        </Route>
        <Route path="/sport" exact>
          <NewsContent cathegory="sport" content={ content } />
        </Route>
        <Route path="/politics/:newsId">
          <Article content={ content } />
        </Route>
        <Route path="/economics/:newsId">
          <Article content={ content } />
        </Route>
        <Route path="/world/:newsId">
          <Article content={ content } />
        </Route>
        <Route path="/sport/:newsId">
          <Article content={ content } />
        </Route>
        <Route path="/newArticle">
          <NewArticle addNewArticle={ addArticleHandler } />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
