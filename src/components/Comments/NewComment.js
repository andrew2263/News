//import React from "react";
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { app } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";
//import { updateCommentsHandler } from "../../store/helper";

import { useDispatch, useSelector } from "react-redux";
import { contentActions } from "../../store/content-slice";
import styles from "./NewComment.module.css";

const NewComment = (props) => {
  
  const params = useParams();

  const { newsId } = params;

  const dispatch = useDispatch();

  const updatedComments = useSelector((state) => state.content.updatedComments);
  const content = useSelector((state) => state.content.content);

  const updateCommentsPath = `content/${props.index}/comments`;

  const database = getDatabase(app);
  const databaseRef = ref(database, updateCommentsPath);

  //const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const nameInputRef = useRef();
  const textInputRef = useRef();

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
    setIsUpdating(true);
    dispatch(contentActions.addCommentHandler({ newsId, comment }));
    console.log(updatedComments);
    console.log(content);
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

      const updatedComments = ctx.updatedComments;

      const onPutSuccess = () => {
        ctx.loadCommentsHandler(updatedComments);
      };

      (async () => {
        await updateCommentsHandler(updatedComments, onPutSuccess).catch(
          (error) => {
            setErrorMessage(
              `${error.message}: Добавить комментарий не удалось. Обновите страницу и повторите попытку.`
            );
          }
        );

        nameInputRef.current.value = "";
        textInputRef.current.value = "";

        setIsUpdating(false);
      })();
      
    }
  }, [isUpdating]);
*/
  const onBtnCleanHAndler = (event) => {
    event.preventDefault();
    nameInputRef.current.value = "";
    textInputRef.current.value = "";
  };

  return (
    <>
      {/*errorMessage && <p className={styles.error}>{errorMessage}</p>*/}
      {/*isUpdating && <p>Комментарий добавляется...</p>*/}
      {/*<form onSubmit={submitHandler}>*/}
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
            //disabled={errorMessage || isUpdating}
            disabled={isUpdating}
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
