import React, { useReducer } from 'react';

import styles from './Comments.module.css';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import { COMMENTS } from '../../content';

const Comments = props => {
  if (!COMMENTS.some(item => item.key === props.commentKey)) {
    const newComments = {
      key: props.commentKey,
      comments: []
    };
    COMMENTS.push(newComments);
  }

  const commentsReducer = (state, action) => {
    const commentIndex = state.comments.findIndex(elem => {
      return elem.key === props.commentKey;
    });
    const thisArticleComments = state.comments[commentIndex].comments;

    if (action.type === 'INIT') {
      const newComments = {
        key: props.commentKey,
        comments: []
      };
      let updatedComments = [...state.comments];
      let updatedArticleComments = [...state.articleComments];

      if (!state.comments.some(item => item.key === props.commentKey)) {
        updatedComments = [...updatedComments, newComments];
        updatedArticleComments = [...updatedArticleComments, newComments];
      }
      return {
        comments: updatedComments,
        articleComments: updatedArticleComments
      }
    }
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
    comments: COMMENTS,
    articleComments: [
      ...COMMENTS[
      COMMENTS.findIndex(elem => elem.key === props.commentKey)]
      .comments
    ]
  });

  const initCommentsHandler = () => {
    dispatchComments({ type: 'INIT' });
  };

  const addCommentHandler = (comment) => {
    dispatchComments({ type: 'ADD_COMMENT', comment: comment });
  };

  const removeCommentHandler = (id) => {
    dispatchComments({ type: 'REMOVE_COMMENT', id: id })
  };

  //initCommentsHandler();

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