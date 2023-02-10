import Layout from './components/Layout/Layout';
import Article from './components/Article/Article';
import NewsContent from './components/NewsContent/NewsContent';
import NewArticle from './components/NewArticle/NewArticle';
import { Redirect, Route, Switch } from 'react-router-dom';

import NewsProvider from './store/NewsProvider';

function App() {
  return (
    <NewsProvider>
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
          <Route path="/war" exact>
            <NewsContent cathegory="war" />
          </Route>
          <Route path="/economics" exact>
            <NewsContent cathegory="economics" />
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
