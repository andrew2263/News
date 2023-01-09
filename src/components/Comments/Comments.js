import React, { useState } from 'react';

import styles from './Comments.module.css';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import { COMMENTS } from '../NewsContent/content';

const Comments = props => {
  const commentIndex = COMMENTS.findIndex(elem => {
    return elem.key === props.commentKey;
  });

  const items = [...COMMENTS[commentIndex].comments];

  const [commentsList, setCommentsList] = useState(items);

  let lastId;

  if (commentsList.length) {
    lastId = commentsList[commentsList.length - 1].id;
  } else {
    lastId = -1;
  }

  const addCommentHandler = comment => {
    COMMENTS[commentIndex].comments.push(comment);
    setCommentsList(prevCommentsList => {
      return [...prevCommentsList, comment];
    });
  };

  const removeCommentHandler = (id) => {
    const removedCommentIndex = commentsList.findIndex(elem => {
      return elem.id === +id;
    });
    COMMENTS[commentIndex].comments.splice(removedCommentIndex, 1);
    setCommentsList(prevCommentsList => {
      const newCommentsList = [...prevCommentsList];
      newCommentsList.splice(removedCommentIndex, 1);
      return newCommentsList;
    });
  };

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