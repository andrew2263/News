import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Context from "../../store/context";
import styles from './CommentsList.module.css';

const CommentsList = props => {
  const params = useParams();

  const { newsId } = params;

  const ctx = useContext(Context);

  const deleteHandler = event => {
    event.preventDefault();
    ctx.removeCommentHandler(event.target.value, newsId);
  }

  return (
    <ul>
      { props.commentData.map(comment => {
        return (
          <li key={ comment.id } className={styles.comment}>
            <div className={styles.nameDate}>
              <p>{ comment.name }</p>
              <p className={ styles.date }>
                { comment.date.getDate() }.{ comment.date.getMonth() + 1 }.{ comment.date.getFullYear() } { comment.date.getHours() }:{ comment.date.getMinutes() }
              </p>
            </div>
            <p>{ comment.text }</p>
            <button type="button" value={ comment.id } onClick={ deleteHandler }>
              Удалить комментарий
            </button>
          </li>
        );
      }) }
    </ul>
  )
};

export default CommentsList;
