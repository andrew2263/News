import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Context from "../../store/context";
import { updateCommentsHandler } from "../../store/helper";
import { parseDateMonthString } from "../NewsContent/NewsContent";
import styles from './CommentsList.module.css';

const CommentsList = props => {
  const params = useParams();

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { newsId } = params;

  const ctx = useContext(Context);

  const deleteHandler = event => {
    event.preventDefault();
    ctx.removeCommentHandler(event.target.value, newsId);
    setIsUpdating(true);
  };

  useEffect(() => {
    if (isUpdating) {
      const updatedComments = ctx.updatedComments;

      const onPutSuccess = () => {
        ctx.loadCommentsHandler(updatedComments);
      };

      (async () => {
        await updateCommentsHandler(updatedComments, onPutSuccess).catch((error) => {
          setErrorMessage(`${ error.message }: Удалить комментарий не удалось. Обновите страницу и повторите попытку.`);
        });
  
        setIsUpdating(false);
      })();
    }
  }, [isUpdating, ctx]);

  return (
    <>
      { isUpdating && <p>Комментарий удаляется...</p> }
      { errorMessage && <p className={ styles.error }>{ errorMessage }</p> }
      <ul className={ styles['comments-list'] }>
        { props.commentData.map(comment => {
          return (
            <li key={ comment.id } className={styles['comments-list__comment']}>
              <div className={styles['comments-list__namedate']}>
                <p className={ styles['comments-list__name'] }>{ comment.name }</p>
                <div className={ styles['comments-list__deldate'] }>
                  <button
                    className={ styles['comments-list__delbutton'] }
                    type="button"
                    value={ comment.id }
                    onClick={ deleteHandler }
                    disabled={ isUpdating || errorMessage }
                  />
                  <p className={ styles['comments-list__date'] }>
                    { parseDateMonthString(comment.date) }
                  </p>
                </div>
              </div>
              <p>{ comment.text }</p>
            </li>
          );
        }) }
      </ul>
    </>
  )
};

export default CommentsList;
