import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Context from '../../store/context';
import Comments from '../Comments/Comments';
import ArticleContent from './ArticleContent';
import './Article.module.css';

const Article = props => {
  const params = useParams();
  const { newsId } = params;

  const ctx = useContext(Context);

  const item = ctx.content[ctx.content.findIndex(el => {
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
