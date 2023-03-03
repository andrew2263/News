import { sendArticle, updateCommentsHandler } from './helper';

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
      const lowerPriorityArticle = arrPriority[lastPriorityItem[article.priority.toString()]];
      const lowerPriorityArticleIndex = state.content.findIndex(elem => {
        return elem.key === lowerPriorityArticle.key;
      });
      const copyContent = [...state.content];
      copyContent[lowerPriorityArticleIndex].priority = 4;
      updatedContent = [...copyContent];
    }

    updatedContent = [...updatedContent, article];

    const newComments = {
      key: action.key,
      comments: []
    };

    const updatedComments = [...state.comments, newComments];

    const onSuccessSendingArticle = () => {
      updateCommentsHandler(updatedComments, action.onSuccess).catch(error => {
        const addedArticleIndex = updatedContent.findIndex(elem => elem.key === article.key);
        updatedContent.splice(addedArticleIndex, 1);
        sendArticle(updatedContent, () => {}).catch((error) => {
          action.onFail(error);
        });
        action.onFail(error);
      });
    };

    sendArticle(updatedContent, onSuccessSendingArticle).catch((error) => {
      action.onFail(error);
    });

    return {
      content: updatedContent,
      comments: updatedComments,
      errorMessage: state.errorMessage
    };
  }

  if (action.type === 'ADD_COMMENT') {
    const thisArticleComments = state.comments[commentIndex].comments ? state.comments[commentIndex].comments : [];
    const updatedThisArticleComments = [...thisArticleComments, action.comment];
    const updatedComments = [...state.comments];
    updatedComments[commentIndex].comments = updatedThisArticleComments;
    updateCommentsHandler(updatedComments);
    return {
      comments: updatedComments,
      content: state.content,
      errorMessage: state.errorMessage
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
    updateCommentsHandler(updatedComments);

    return {
      comments: updatedComments,
      content: state.content,
      errorMessage: state.errorMessage
    };
  }

  if (action.type === 'LOAD_CONTENT') {
    return {
      comments: state.comments,
      content: action.data,
      errorMessage: state.errorMessage
    };
  }

  if (action.type === 'LOAD_COMMENTS') {
    return {
      comments: action.data,
      content: state.content,
      errorMessage: state.errorMessage
    };
  }

  if (action.type === 'CATCH_ERROR') {
    const updatedErrorMessage = {
      ...state.errorMessage,
    };
    updatedErrorMessage[`${action.event}`] = action.error;
    return {
      comments: state.comments,
      content: state.content,
      errorMessage: updatedErrorMessage
    };
  }
};

export default newsReducer;