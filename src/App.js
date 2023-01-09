import Layout from './components/Layout/Layout';
import Article from './components/Article/Article';
import NewsContent from './components/NewsContent/NewsContent';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import styles from './App.module.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/index" />
        </Route>
        <Route path="/index" exact>
          <NewsContent cathegory="all" />
        </Route>
        <Route path="/politics" exact>
          <NewsContent cathegory="politics" />
        </Route>
        <Route path="/economy" exact>
          <NewsContent cathegory="economy" />
        </Route>
        <Route path="/world" exact>
          <NewsContent cathegory="world" />
        </Route>
        <Route path="/sport" exact>
          <NewsContent cathegory="sport" />
        </Route>
        <Route path="/politics/:newsId">
          <Article />
        </Route>
        <Route path="/economy/:newsId">
          <Article />
        </Route>
        <Route path="/world/:newsId">
          <Article />
        </Route>
        <Route path="/sport/:newsId">
          <Article />
        </Route>
      </Switch>
    </Layout>
    /*
    <React.Fragment>
      <div className={ styles.container }>
        <Header onChange={ changeCathegoryHandler } />
        <main>
          { !isArticle && <NewsContent cathegory={ cathegory } onShowArticle={ showArticleHandler } /> }
          { isArticle && <Article articleKey={ articleKey } /> }
        </main>
      </div>
    </React.Fragment>
    */
  );
}

export default App;
