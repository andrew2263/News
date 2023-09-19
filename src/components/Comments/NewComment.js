import React from "react";
//import React, { useState, useRef, useContext, useEffect } from "react";
//import { useParams } from "react-router-dom";

//import { updateCommentsHandler } from "../../store/helper";

//import Context from "../../store/context";
import styles from "./NewComment.module.css";

//const NewComment = (props) => {
const NewComment = () => {
  /*
  const params = useParams();

  const { newsId } = params;

  const ctx = useContext(Context);

  const [errorMessage, setErrorMessage] = useState("");
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
      date: new Date(),
    };

    ctx.addCommentHandler(comment, newsId);

    setIsUpdating(true);
  };

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
  }, [isUpdating, ctx]);

  const onBtnCleanHAndler = (event) => {
    event.preventDefault();
    nameInputRef.current.value = "";
    textInputRef.current.value = "";
  };
*/
  return (
    <>
      {/*errorMessage && <p className={styles.error}>{errorMessage}</p>*/}
      {/*isUpdating && <p>Комментарий добавляется...</p>*/}
      {/*<form onSubmit={submitHandler}>*/}
      <form onSubmit={() => {}}>
        <div className={styles.name}>
          <label htmlFor="name">Введите имя</label>
          <input
          id="name"
          type="text"
          //ref={nameInputRef}
          required
          />
        </div>
        <textarea
          className={styles.text}
          placeholder="Ведите комментарий"
          //ref={textInputRef}
          required
        />
        <div>
          <button
            type="submit"
            className={styles.submit}
            //disabled={errorMessage || isUpdating}
            disabled
          >
            Отправить комментарий
          </button>
          <button
            type="button"
            className={styles.clear}
            //onClick={onBtnCleanHAndler}
            onClick={() => {}}
          >
            Очистить
          </button>
        </div>
      </form>
    </>
  );
};

export default NewComment;
