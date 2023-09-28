import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { app } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

import { contentActions } from "../../store/content-slice";

import { parseDateMonthString } from "../../helpers/parseDateMonth";

import styles from "./CommentsList.module.scss";

const CommentsList = (props) => {
  const params = useParams();

  const dispatch = useDispatch();

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { newsId } = params;

  const updateCommentsPath = `content/${props.index}/comments`;

  const database = getDatabase(app);
  const databaseRef = ref(database, updateCommentsPath);

  const deleteHandler = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    const updatedComments = props.commentData.filter((comment) => {
      return Number(comment.id) !== Number(event.target.value);
    });
    dispatch(
      contentActions.changeCommentHandler({
        updatedComments,
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
        setErrorMessage(
          `${error.message}: Удалить комментарий не удалось. Обновите страницу и повторите попытку.`
        );
        setIsUpdating(false);
      });
  };

  return (
    <>
      {isUpdating && <p>Комментарий удаляется...</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
                    disabled={isUpdating || errorMessage}
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
