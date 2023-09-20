//import React from "react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

import { useDispatch, useSelector } from "react-redux";
import { contentActions } from "../../store/content-slice";

//import { updateCommentsHandler } from "../../store/helper";
import { parseDateMonthString } from "../NewsContent/NewsContent";
import styles from "./CommentsList.module.css";

const CommentsList = (props) => {
  const params = useParams();

  const dispatch = useDispatch();

  const updatedComments = useSelector((state) => state.content.updatedComments);

  const [isUpdating, setIsUpdating] = useState(false);
  //const [errorMessage, setErrorMessage] = useState('');

  const { newsId } = params;

  const updateCommentsPath = `content/${props.index}/comments`;

  const database = getDatabase(app);
  const databaseRef = ref(database, updateCommentsPath);

  const deleteHandler = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    dispatch(
      contentActions.removeCommentHandler({
        commentId: event.target.value,
        newsId,
      })
    );
    set(databaseRef, updatedComments)
      .then(() => {
        setIsUpdating(false);
      })
      .catch((error) => {
        console.error(error);
        dispatch(contentActions.setPrevContent());
        setIsUpdating(false);
      });
  };
/*
  useEffect(() => {
    if (isUpdating) {
      console.log(1);
      //const updatedComments = ctx.updatedComments;
      /*
      const onPutSuccess = () => {
        //ctx.loadCommentsHandler(updatedComments);
      };

      (async () => {
        await updateCommentsHandler(props.index, props.commentsData, onPutSuccess).catch((error) => {
          console.log(error);
          //setErrorMessage(`${ error.message }: Удалить комментарий не удалось. Обновите страницу и повторите попытку.`);
        });

        setIsUpdating(false);
      })();
      */
/*
      set(databaseRef, props.commentData)
        .then(() => {
          setIsUpdating(false);
          console.log(content);
        })
        .catch((error) => {
          console.error(error);
          dispatch(contentActions.setPrevContent());
          setIsUpdating(false);
          console.log(content);
        });
    }
  }, [isUpdating]);
*/
  return (
    <>
      {/* isUpdating && <p>Комментарий удаляется...</p> */}
      {/* errorMessage && <p className={ styles.error }>{ errorMessage }</p> */}
      <ul className={styles["comments-list"]}>
        {props.commentData.map((comment) => {
          return (
            <li key={comment.id} className={styles["comments-list__comment"]}>
              <div className={styles["comments-list__namedate"]}>
                <p className={styles["comments-list__name"]}>{comment.name}</p>
                <div className={styles["comments-list__deldate"]}>
                  <button
                    className={styles["comments-list__delbutton"]}
                    type="button"
                    value={comment.id}
                    onClick={deleteHandler}
                    //disabled={ isUpdating || errorMessage }
                    disabled={isUpdating}
                  />
                  <p className={styles["comments-list__date"]}>
                    {parseDateMonthString(new Date(comment.date))}
                  </p>
                </div>
              </div>
              <p>{comment.text}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CommentsList;
