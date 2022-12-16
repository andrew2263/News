import React from "react";

import Comments from '../Comments/Comments';
import ArticleContent from './ArticleContent';
import { CONTENT } from '../NewsContent/content';
import './Article.module.css';

const Article = props => {
  const item = CONTENT[CONTENT.findIndex(el => {
    return el.key === props.articleKey;
  })];

  return (
    <section>
      <ArticleContent content={ item } />
      <Comments commentKey={ props.articleKey } />
    </section>
  );
}

export default Article;

/*
<ArticleContent content={ item } />*/