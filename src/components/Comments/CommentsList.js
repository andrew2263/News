import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Input from "../UI/Input/Input";
import Reactions from "../UI/Reactions/Reactions";

import { app } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

import { contentActions } from "../../store/content-slice";

import { parseDateMonthString } from "../../helpers/parseDateMonth";
import { getEditedValue } from "../../helpers/reactionHelper";

import styles from "./CommentsList.module.scss";

const CommentsList = (props) => {
  const params = useParams();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const me = useSelector((state) => state.auth.me);

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { newsId } = params;

  const database = getDatabase(app);

  const deleteHandler = async (event) => {
    event.preventDefault();

    const updateCommentsPath = `content/${props.index}/comments`;
    const databaseRef = ref(database, updateCommentsPath);

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

  const editCommentHandler = async (comment, editedValue, commentIndex) => {
    const editCommentPath = `content/${props.index}/comments/${commentIndex}`;
    const databaseRef = ref(database, editCommentPath);

    const editedComment = {
      ...comment,
      ...editedValue,
    };

    dispatch(
      contentActions.editCommentHandler({ commentIndex, newsId, editedComment })
    );

    set(databaseRef, editedComment)
      .then(() => {})
      .catch((error) => {
        console.error(error);
        dispatch(contentActions.setPrevContent());
        setErrorMessage(
          `${error.message}: Отредактировать комментарий не удалось. Обновите страницу и повторите попытку.`
        );
      });
  };

  return (
    <>
      {isUpdating && <p>Комментарий удаляется...</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <ul className={styles["comments-list"]}>
        {props.commentData.map((comment, index) => {
          return (
            <li key={comment.id} className={styles["comments-list__comment"]}>
              <Comment
                comment={comment}
                me={me}
                isLoggedIn={isLoggedIn}
                deleteHandler={deleteHandler}
                isUpdating={isUpdating}
                errorMessage={errorMessage}
                index={index}
                editCommentHandler={editCommentHandler}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Comment = (props) => {
  const {
    comment,
    me,
    isLoggedIn,
    deleteHandler,
    isUpdating,
    errorMessage,
    index,
    editCommentHandler,
  } = props;

  const [openEdit, setOpenEdit] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);

  const openEditHandler = () => {
    setOpenEdit(true);
  };

  const editTextHandler = (event) => {
    setCommentText(event.target.value);
  };

  const cancelEditHandler = () => {
    setCommentText(comment.text);
    setOpenEdit(false);
  };

  const saveEditHandler = () => {
    setOpenEdit(false);
    const editedValue = {
      text: commentText,
      isEdited: true,
      editDate: Number(new Date()),
    };
    editCommentHandler(comment, editedValue, index);
  };

  const addReactionHandler = (type, myReaction) => {
    const reactions = comment?.reactions;
    const editedValue = getEditedValue(reactions, type, me, myReaction);

    editCommentHandler(comment, editedValue, index);
  };

  const isMyComment = isLoggedIn && me.id === comment?.user?.id;

  return (
    <>
      <div className={styles["comments-list__namedate"]}>
        <p className={styles["comments-list__name"]}>{comment.name}</p>
        <div className={styles["comments-list__deldate"]}>
          {!openEdit && isMyComment && (
            <button
              type="button"
              className={styles["comments-list__editbutton"]}
              onClick={openEditHandler}
            >
              <img src="/images/edit_image.svg" alt="Edit" />
              <span className={styles.hint}>Редактировать комментарий</span>
            </button>
          )}
          {!openEdit && (me.role === "Администратор" || isMyComment) && (
            <button
              className={styles["comments-list__delbutton"]}
              type="button"
              value={comment.id}
              onClick={deleteHandler}
              disabled={isUpdating || errorMessage}
              data-hint="Удалить комментарий"
            >
              <img src="/images/delete.svg" alt="Edit" />
              <span className={styles.hint}>Удалить комментарий</span>
            </button>
          )}
          <p className={styles["comments-list__date"]}>
            {parseDateMonthString(new Date(comment.date))}
            {comment.isEdited && (
              <span>
                {" "}
                (отредактирован)
                <span className={styles.hint}>
                  Отредактирован{" "}
                  {parseDateMonthString(new Date(comment.editDate))}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
      {!openEdit ? (
        <>
          <p>{commentText}</p>
          <Reactions
            reactions={comment?.reactions}
            addReactionHandler={addReactionHandler}
          />
        </>
      ) : (
        <>
          <Input
            type="text"
            name="editCommentText"
            id="editCommentText"
            value={commentText}
            onChange={editTextHandler}
            isTextarea
            required
            placeholder="Введите комментарий"
          />
          <div className={styles["comments-list__edit-buttons"]}>
            <button
              type="button"
              onClick={saveEditHandler}
              disabled={!commentText.length}
              className={styles["comments-list__save-edit"]}
            >
              Сохранить комментарий
            </button>
            <button
              type="button"
              onClick={cancelEditHandler}
              className={styles["comments-list__cancel-edit"]}
            >
              Отменить изменения
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CommentsList;
