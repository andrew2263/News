import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import Context from "../../store/context";
import { parseDateMonthString } from "../NewsContent/NewsContent";
import styles from './CommentsList.module.css';
import del from '../../img/delete.svg';

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
              <p className={ styles.name }>{ comment.name }</p>
              <div className={ styles.dateDelete }>
                <button
                  className={ styles.delButton }
                  type="button"
                  value={ comment.id }
                  onClick={ deleteHandler }
                />
                <p className={ styles.date }>
                  { parseDateMonthString(comment.date) }
                </p>
              </div>
            </div>
            <p>{ comment.text }</p>
          </li>
        );
      }) }
    </ul>
  )
};

export default CommentsList;
