import React from "react";

import './Comments.module.css';
import NewComment from './NewComment';
import CommentsList from './CommentsList';

const Comments = props => {
  return (
    <section>
      <h3>Комментарии</h3>
      <CommentsList />
      <NewComment />
    </section>
  )
}

export default Comments;