import React, { useReducer, useEffect, useCallback } from 'react';

import Context from './context';
import newsReducer from './newsReducer';

const defaultState = {
  content: [],
  comments: [],
  updatedComments: [],
  errorMessage: {}
};

const NewsProvider = props => {
  const [newsState, dispatchNews] = useReducer(
    newsReducer,
    defaultState
  );

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

  const fetchContentHandler = useCallback(async () => {
    try {
      const response = await fetch(
        'https://news-acc8f-default-rtdb.firebaseio.com/content.json'
      );

      if (!response.ok) {
        throw new Error('Ошибка загрузки новостей.');
      }
    
      const responseData = await response.json();

      const contentData = responseData.map(el => {
        el.date = new Date(el.date);
        return el;
      });

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

      const commentsData = responseData.map(el => {
        if (el.comments) {
          el.comments = el.comments.map((comment) => {
            return { ...comment, date: new Date(comment.date) };
          });
        }
        return el;
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

  useEffect(() => {}, []);

  const context = {
    content: newsState.content,
    comments: newsState.comments,
    updatedComments: newsState.updatedComments,
    errorMessage: newsState.errorMessage,
    addArticleHandler,
    addCommentHandler,
    removeCommentHandler,
    loadCommentsHandler
  };

  return (
    <Context.Provider value={ context }>
      {props.children}
    </Context.Provider>
  );
};

export default NewsProvider;
