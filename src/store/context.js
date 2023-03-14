import React from 'react';

const Context = React.createContext({
  content: [],
  comments: [],
  updatedComments: [],
  errorMessage: {},
  addArticleHandler: () => {},
  addCommentHandler: () => {},
  removeCommentHandler: () => {},
  loadCommentsHandler: () => {}
});

export default Context;

