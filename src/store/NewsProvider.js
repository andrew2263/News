import { useReducer } from 'react';

import { CONTENT, COMMENTS } from './content';
import Context from './context';

const defaultState = {
  content: CONTENT,
  comments: COMMENTS
};

const newsReducer = (state, action) => {
  const commentIndex = state.comments.findIndex(elem => {
    return elem.key === action.key;
  });

  if (action.type === 'ADD_ARTICLE') {
    

    const lastPriorityItem = {
      '1': 0,
      '2': 2,
      '3': 3
    };

    const article = action.article;
    let updatedContent = [...state.content];

    if (article.priority !== 4 && typeof article.priority === 'number') {
      const arrPriority = state.content
        .filter(elem => elem.priority === article.priority);
        //.sort(sortDateDesc);
      const lowerPriorityArticle = arrPriority[lastPriorityItem[article.priority.toString()]];
      const lowerPriorityArticleIndex = state.content.findIndex(elem => {
        return elem.key === lowerPriorityArticle.key;
      });
      const copyContent = [...state.content];
      copyContent[lowerPriorityArticleIndex].priority = 4;
      updatedContent = [...copyContent];
    }

    updatedContent = [...updatedContent, article];
    //.sort(sortDateDesc);

    const newComments = {
      key: action.key,
      comments: []
    };

    const updatedComments = [...state.comments, newComments];

    return {
      content: updatedContent,
      comments: updatedComments
    };
  }

  if (action.type === 'ADD_COMMENT') {
    const thisArticleComments = state.comments[commentIndex].comments;
    const updatedThisArticleComments = [...thisArticleComments, action.comment];
    const updatedComments = [...state.comments];
    updatedComments[commentIndex].comments = updatedThisArticleComments;
    return {
      comments: updatedComments,
      content: state.content
    };
  }
  
  if (action.type === 'REMOVE_COMMENT') {
    const removedCommentIndex = state.comments[commentIndex].comments.findIndex(elem => {
      return elem.id === +action.id;
    });
    const updatedComments = [...state.comments];
    const newCommentsList = [...state.comments[commentIndex].comments];
    newCommentsList.splice(removedCommentIndex, 1);
    updatedComments[commentIndex].comments = newCommentsList;

    return {
      comments: updatedComments,
      content: state.content
    };
  }
};

const NewsProvider = props => {
  const [newsState, dispatchNews] = useReducer(
    newsReducer,
    defaultState
  );

  const addArticleHandler = (article, key) => {
    dispatchNews({ type: 'ADD_ARTICLE', article: article, key: key });
  };
  
  const addCommentHandler = (comment, key) => {
    dispatchNews({ type: 'ADD_COMMENT', comment: comment, key: key });
  };
  
  const removeCommentHandler = (id, key) => {
    dispatchNews({ type: 'REMOVE_COMMENT', id: id, key: key })
  };

  const context = {
    content: newsState.content,
    comments: newsState.comments,
    addArticleHandler,
    addCommentHandler,
    removeCommentHandler
  };

  return (
    <Context.Provider value={ context }>
      {props.children}
    </Context.Provider>
  );
};

export default NewsProvider;
