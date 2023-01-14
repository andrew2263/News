import React from 'react';
import { useParams } from 'react-router-dom';

import Comments from '../Comments/Comments';
import ArticleContent from './ArticleContent';
import './Article.module.css';

const Article = props => {
  const params = useParams();
  const { newsId } = params;

  const NEWS_CONTENT = props.content;

  const item = NEWS_CONTENT[NEWS_CONTENT.findIndex(el => {
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
