import React from 'react';
import { useParams } from 'react-router-dom';

import Comments from '../Comments/Comments';
import ArticleContent from './ArticleContent';
import { CONTENT } from '../NewsContent/content';
import './Article.module.css';

const Article = props => {
  const params = useParams();
  const { newsId } = params;

  const item = CONTENT[CONTENT.findIndex(el => {
    return el.key === newsId;
  })];

  return (
    <React.Fragment>
      <ArticleContent content={ item } />
      <Comments commentKey={ newsId } />
    </React.Fragment>
  );
}

export default Article;
