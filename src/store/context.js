import React from 'react';

const Context = React.createContext({
  content: [],
  comments: [],
  errorMessage: {},
  addArticleHandler: (article, key) => {},
  addCommentHandler: (comment, key) => {},
  removeCommentHandler: (id, key) => {},
  sendArticle: async(data) => {}
});

export default Context;

