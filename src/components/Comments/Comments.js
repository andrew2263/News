import React, { useContext } from 'react';

import styles from './Comments.module.css';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import Context from '../../store/context';

const Comments = props => {
  const ctx = useContext(Context);

  const commentIndex = ctx.comments.findIndex(elem => elem.key === props.commentKey);

  const commentsList = ctx.comments[commentIndex].comments;

  let lastId;

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
          onRemoveComment = { ctx.removeCommentHandler }
        /> : '' }
        { !commentsList.length && <p>
          Комментариев пока нет.
        </p> }
        <NewComment
          id={ lastId + 1 }
          onAddComment={ ctx.addCommentHandler }
        />
      </article>
    </section>
  );
};

export default Comments;