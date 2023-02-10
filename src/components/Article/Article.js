import React from 'react';

import Comments from '../Comments/Comments';
import ArticleContent from './ArticleContent';

const Article = () => {
  return (
    <React.Fragment>
      <ArticleContent />
      <Comments />
    </React.Fragment>
  );
}

export default Article;
