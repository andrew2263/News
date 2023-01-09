import React from "react";

import styles from './CommentsList.module.css';

const CommentsList = props => {
  const deleteHandler = event => {
    event.preventDefault();
    props.onRemoveComment(event.target.value);
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
