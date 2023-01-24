import React from 'react';

const Context = React.createContext({
  content: [],
  comments: [],
  addArticleHandler: (article, key) => {},
  addCommentHandler: (comment, key) => {},
  removeCommentHandler: (id, key) => {}
});

export default Context;

