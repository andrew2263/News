import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { app } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

import { contentActions } from "../../store/content-slice";

import styles from "./NewComment.module.scss";

const NewComment = (props) => {
  
  const params = useParams();

  const { newsId } = params;

  const dispatch = useDispatch();

  const content = useSelector((state) => state.content.content);

  const updateCommentsPath = `content/${props.index}/comments`;

  const database = getDatabase(app);
  const databaseRef = ref(database, updateCommentsPath);

  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const nameInputRef = useRef();
  const textInputRef = useRef();

  const articleComments = [...content[props.index].comments];

  const cleanFormHandler = () => {
    nameInputRef.current.value = "";
    textInputRef.current.value = "";
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredText = textInputRef.current.value;
    const comment = {
      id: props.id,
      name: enteredName,
      text: enteredText,
      date: Number(new Date()),
    };
    const updatedComments = [
      ...articleComments,
      comment,
    ];
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
        setErrorMessage(`${ error.message }: Добавить комментарий не удалось. Обновите страницу и повторите попытку.`);
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
        <div className={styles.name}>
          <label htmlFor="name">Введите имя</label>
          <input
          id="name"
          type="text"
          ref={nameInputRef}
          required
          />
        </div>
        <textarea
          className={styles.text}
          placeholder="Ведите комментарий"
          ref={textInputRef}
          required
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
