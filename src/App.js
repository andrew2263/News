import Header from './components/Header/Header';
import Article from './components/Article/Article';
import NewsContent from './components/NewsContent/NewsContent';
import React, { useState } from 'react';

import styles from './App.module.css';

function App() {
  const [cathegory, setCathegory] = useState('po');
  const [isArticle, setIsArticle] = useState(false);
  const [articleKey, setArticleKey] = useState('');

  const changeCathegoryHandler = (cathegory) => {
    setCathegory(cathegory);
    setIsArticle(false);
  };

  const showArticleHandler = (key) => {
    setArticleKey(key);
    setIsArticle(true);
  }

  return (
    <React.Fragment>
      <div className={ styles.container }>
        <Header onChange={ changeCathegoryHandler } />
        <main>
          { !isArticle && <NewsContent cathegory={ cathegory } onShowArticle={ showArticleHandler } /> }
          { isArticle && <Article articleKey={ articleKey } /> }
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
