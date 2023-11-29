import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../UI/Input/Input";

import { app } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

import { contentActions } from "../../store/content-slice";

import styles from "./NewComment.module.scss";

const NewComment = (props) => {
  const params = useParams();

  const { newsId } = params;

  const dispatch = useDispatch();

  const content = useSelector((state) => state.content.content);
  const me = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const updateCommentsPath = `content/${props.index}/comments`;

  const database = getDatabase(app);
  const databaseRef = ref(database, updateCommentsPath);

  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  const articleComments = [...content[props.index].comments];

  const cleanFormHandler = () => {
    setUserName("");
    setCommentText("");
  };

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const textChangeHandler = (e) => {
    setCommentText(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const comment = {
      id: props.id,
      name: isLoggedIn ? me.nickname : userName,
      text: commentText,
      date: Number(new Date()),
      user: isLoggedIn ? me : null,
    };
    const updatedComments = [...articleComments, comment];
    setIsUpdating(true);
    dispatch(contentActions.changeCommentHandler({ newsId, updatedComments }));

    set(databaseRef, updatedComments)
      .then(() => {
        cleanFormHandler();
        setIsUpdating(false);
      })
      .catch((error) => {
        console.error(error);
        dispatch(contentActions.setPrevContent());
        setErrorMessage(
          `${error.message}: Добавить комментарий не удалось. Обновите страницу и повторите попытку.`
        );
        setIsUpdating(false);
      });
  };

  const onBtnCleanHAndler = (event) => {
    event.preventDefault();
    cleanFormHandler();
  };

  return (
    <>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {isUpdating && <p>Комментарий добавляется...</p>}
      <form onSubmit={submitHandler}>
        {!isLoggedIn ? (
          <Input
            type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={nameChangeHandler}
            required
            placeholder="Ведите имя"
          />
        ) : (
          <div className={styles['loggedIn-userName']}>
            <p>Ваш никнейм:</p>
            <p>{me.nickname}</p>
          </div>
        )}
        <Input
            type="text"
            name="commentText"
            id="commentText"
            value={commentText}
            onChange={textChangeHandler}
            isTextarea
            required
            className={styles.text}
            placeholder="Ведите комментарий"
          />
        <div>
          <button
            type="submit"
            className={styles.submit}
            disabled={errorMessage || isUpdating}
          >
            Отправить комментарий
          </button>
          <button
            type="button"
            className={styles.clear}
            onClick={onBtnCleanHAndler}
          >
            Очистить
          </button>
        </div>
      </form>
    </>
  );
};

export default NewComment;
