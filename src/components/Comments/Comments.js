import React, { useState } from 'react';

import './Comments.module.css';
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
  
  console.log(COMMENTS[commentIndex].comments);

  const addCommentHandler = comment => {
    COMMENTS[commentIndex].comments.push(comment);
    setCommentsList(prevCommentsList => {
      return [...prevCommentsList, comment];
    });
  };

  const removeCommentHandler = (id) => {
    const removedCommentIndex = commentsList.findIndex(elem => {
      console.log(elem.id);
      console.log(id);
      return elem.id === +id;
    });
    console.log(removedCommentIndex);
    COMMENTS[commentIndex].comments.splice(removedCommentIndex, 1);
    setCommentsList(prevCommentsList => {
      const newCommentsList = [...prevCommentsList];
      newCommentsList.splice(removedCommentIndex, 1);
      return newCommentsList;
    });
  };

  return (
    <section>
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
    </section>
  );
};

export default Comments;