import React from "react";

import Comments from '../Comments/Comments';
import ArticleContent from './ArticleContent';
import { CONTENT } from '../NewsContent/content';
import './Article.module.css';

const Article = props => {
  const getItem = () => {
    for (var i = 0; i < CONTENT.length; i++) {
      if (CONTENT[i].key === props.articleKey) {
        return CONTENT[i];
      }
    }
    return CONTENT[0];
  }

  return (
    <section>
      <ArticleContent content={ getItem() } />
      <Comments />
    </section>
  );
}

export default Article;

/*
<ArticleContent content={ item } />*/