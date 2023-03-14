import React from 'react';

import Layout from './components/Layout/Layout';
import Article from './components/Article/Article';
import NewsContent from './components/NewsContent/NewsContent';
import NewArticle from './components/NewArticle/NewArticle';
import { Route, Switch } from 'react-router-dom';

import NewsProvider from './store/NewsProvider';

function App() {
  return (
    <NewsProvider>
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
            <NewArticle/>
          </Route>
        </Switch>
      </Layout>
    </NewsProvider>
  );
}

export default App;
