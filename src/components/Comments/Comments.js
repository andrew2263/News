import React, { useReducer } from 'react';

import styles from './Comments.module.css';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import { COMMENTS } from '../../content';

const Comments = props => {
  if (!COMMENTS.some(item => item.key === props.commentKey)) {
    COMMENTS.push({
      key: props.commentKey,
      comments: []
    });
  }

  const commentIndex = COMMENTS.findIndex(elem => {
    return elem.key === props.commentKey;
  });

  const commentsReducer = (state, action) => {
    const thisArticleComments = state.comments[commentIndex].comments;
    
    if (action.type === 'ADD_COMMENT') {
      const updatedThisArticleComments = [...thisArticleComments, action.comment];
      const updatedComments = [...state.comments];
      updatedComments[commentIndex].comments = updatedThisArticleComments;
      console.log(updatedComments);
      return {
        comments: updatedComments,
        articleComments: [...state.articleComments, action.comment]
      };
    }
    if (action.type === 'REMOVE_COMMENT') {
      const removedCommentIndex = state.articleComments.findIndex(elem => {
        return elem.id === +action.id;
      });
      const updatedComments = [...state.comments];
      const newCommentsList = [...state.articleComments];
      newCommentsList.splice(removedCommentIndex, 1);
      updatedComments[commentIndex].comments = newCommentsList;

      return {
        comments: updatedComments,
        articleComments: newCommentsList
      };
    }
  };

  const [commentsState, dispatchComments] = useReducer(commentsReducer, {
    commentIndex: commentIndex,
    comments: COMMENTS,
    articleComments: [...COMMENTS[commentIndex].comments]
  });

  const addCommentHandler = (comment) => {
    dispatchComments({ type: 'ADD_COMMENT', comment: comment });
    /*
    COMMENTS[commentIndex].comments.push(comment);
    setCommentsList(prevCommentsList => {
      return [...prevCommentsList, comment];
    });
    */
  };

  const removeCommentHandler = (id) => {
    dispatchComments({ type: 'REMOVE_COMMENT', id: id })
/*
    const removedCommentIndex = commentsList.findIndex(elem => {
      return elem.id === +id;
    });
    COMMENTS[commentIndex].comments.splice(removedCommentIndex, 1);
    setCommentsList(prevCommentsList => {
      const newCommentsList = [...prevCommentsList];
      newCommentsList.splice(removedCommentIndex, 1);
      return newCommentsList;
    });
    */
  };

  let lastId;
  const { articleComments: commentsList } = commentsState;

  if (commentsList.length) {
    lastId = commentsList[commentsList.length - 1].id;
  } else {
    lastId = -1;
  }

  return (
    <section>
      <article>
        <h3>Комментарии</h3>
        { commentsList.length ? <CommentsList
          commentData={ commentsList }
          onRemoveComment = { removeCommentHandler }
        /> : '' }
        { !commentsList.length && <p>
          Комментариев пока нет.
        </p> }
        <NewComment
          id={ lastId + 1 }
          onAddComment={ addCommentHandler }
        />
      </article>
    </section>
  );
};

export default Comments;