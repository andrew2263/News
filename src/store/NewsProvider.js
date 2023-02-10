import { useReducer, useEffect, useCallback } from 'react';

import Context from './context';

const defaultState = {
  content: [],
  comments: [],
  errorMessage: {}
};

const NewsProvider = props => {

  const sendArticle = async (data, onSuccess) => {
    const deleteResponse = await fetch('https://news-acc8f-default-rtdb.firebaseio.com/content.json', {
      method: 'DELETE'
    });

    const putResponse = await fetch('https://news-acc8f-default-rtdb.firebaseio.com/content.json', {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    if (deleteResponse.ok && putResponse.ok) {
      onSuccess();
    } else {
      throw new Error('Не удалось отправить форму.');
    }
  };

  const updateCommentsHandler = async (data, onSuccess) => {
    const deleteResponse = await fetch('https://news-acc8f-default-rtdb.firebaseio.com/comments.json', {
      method: 'DELETE'
    });

    const putResponse = await fetch('https://news-acc8f-default-rtdb.firebaseio.com/comments.json', {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    if (deleteResponse.ok && putResponse.ok) {
      onSuccess();
    } else {
      throw new Error('Не удалось отправить форму.');
    }
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

  const [newsState, dispatchNews] = useReducer(
    newsReducer,
    defaultState
  );

  const fetchContentHandler = useCallback(async () => {
    try {
      const response = await fetch(
        'https://news-acc8f-default-rtdb.firebaseio.com/content.json'
      );

      if (!response.ok) {
        throw new Error('Ошибка загрузки новостей.');
      }
    
      const responseData = await response.json();

      let contentData = [];

      for (const el in responseData) {
        responseData[el].date = new Date(responseData[el].date);
        contentData = [...contentData, responseData[el]];
      }

      loadContentHandler(contentData);
    } catch (error) {
      catchErrorHandler(error.message, 'loadContent');
    }
  }, []);

  const fetchCommentsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        'https://news-acc8f-default-rtdb.firebaseio.com/comments.json'
      );

      const responseData = await response.json();

      let commentsData = [];

      responseData.forEach(el => {
        if (el.comments) {
          for (let i in el.comments) {
            el.comments[i].date = new Date(el.comments[i].date);
          }
        }
        commentsData = [...commentsData, el];
      });

      loadCommentsHandler(commentsData);
    } catch(error) {
      catchErrorHandler(error.message, 'loadComments');
    }
  }, []);

  useEffect(() => {
    fetchContentHandler();
    fetchCommentsHandler();
  }, [fetchContentHandler, fetchCommentsHandler]);

  const addArticleHandler = (article, key, onSuccess, onFail) => {
    dispatchNews({ type: 'ADD_ARTICLE', article, key, onSuccess, onFail });
  };
  
  const addCommentHandler = (comment, key) => {
    dispatchNews({ type: 'ADD_COMMENT', comment: comment, key: key });
  };
  
  const removeCommentHandler = (id, key) => {
    dispatchNews({ type: 'REMOVE_COMMENT', id: id, key: key });
  };

  const loadContentHandler = (data) => {
    dispatchNews({ type: 'LOAD_CONTENT', data: data });
  };

  const loadCommentsHandler = (data) => {
    dispatchNews({ type: 'LOAD_COMMENTS', data: data });
  };

  const catchErrorHandler = (error, event) => {
    dispatchNews({ type: 'CATCH_ERROR', error: error, event: event });
  };

  const context = {
    content: newsState.content,
    comments: newsState.comments,
    errorMessage: newsState.errorMessage,
    addArticleHandler,
    addCommentHandler,
    removeCommentHandler,
    sendArticle
  };

  return (
    <Context.Provider value={ context }>
      {props.children}
    </Context.Provider>
  );
};

export default NewsProvider;
