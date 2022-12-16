import React from "react";

import './CommentsList.module.css';

const CommentsList = props => {
  const deleteHandler = event => {
    event.preventDefault();
    props.onRemoveComment(event.target.value);
  }

  return (
    <ul>
      { props.commentData.map(comment => {
        return (
          <li>
            <p>{ comment.name }</p>
            <p>
              `{ comment.date.getDate() }.{ comment.date.getMonth() + 1 }.{ comment.date.getFullYear() } { comment.date.getHours() }:{ comment.date.getMinutes() }`
            </p>
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
