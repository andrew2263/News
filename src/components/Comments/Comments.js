import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Comments.module.css';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import Context from '../../store/context';

const Comments = () => {
  const params = useParams();
  const { newsId } = params;

  const ctx = useContext(Context);

  const commentIndex = ctx.comments.findIndex(elem => elem.key === newsId);

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
        /> : '' }
        { !commentsList.length && <p>
          Комментариев пока нет.
        </p> }
        <NewComment
          id={ lastId + 1 }
        />
      </article>
    </section>
  );
};

export default Comments;