/*eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Container from "../Layout/Container";
import NewsImage from "../NewsContent/NewsImage";
import Reactions from "../UI/Reactions/Reactions";
import ArticleForm from "../NewArticle/ArticleForm";

import { contentActions } from "../../store/content-slice";
import { modalActions } from "../../store/modal-slice";
import { editArticleHandler } from "../../store/helper";

import { parseDateMonthString } from "../../helpers/parseDateMonth";
import { getEditedValue } from "../../helpers/reactionHelper";
import { OTHER_RUBRICS } from "../../constants/NewsRubrics.Constant";
import { articleValidation } from "../../helpers/validationHelper";
import { getInitialEditArticleFormState } from "../../helpers/getInitialFormState";
import { sendArticle } from "../../store/helper";

import styles from "./ArticleContent.module.scss";

const ArticleContent = () => {
  const params = useParams();
  const { newsId } = params;

  const history = useHistory();

  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = useSelector((state) => state.content.content);
  const me = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const isContent = content.length ? true : false;

  const itemIndex = content?.findIndex((el) => el.key === newsId);

  const item = content?.[itemIndex];

  useEffect(() => {
    document.title = isContent
      ? `${item.heading} — Moldova News`
      : "Новости Молдовы — Moldova News";
  }, [item, isContent]);

  const articleText = (text) =>
    text.map((text, index) => {
      return (
        <p key={index} className={styles["article__text"]}>
          {text}
        </p>
      );
    });

  const articleRubrics = item?.rubrics ? item.rubrics.map((el) => {
    const rubricElement = OTHER_RUBRICS.find((item) => item.value === el);
    return {
      value: rubricElement.value,
      text: rubricElement.name,
      label: <div>{rubricElement.name}</div>,
    };
  }) : [];

  const articleFields = {
    key: item?.key,
    priority: item?.priority,
    category: item?.category,
    date: item?.date,
    heading: item?.heading,
    briefText: item?.briefText,
    text: item?.text,
    rubrics: articleRubrics,
    images: item?.images,
  };

  const initialFormState = item && getInitialEditArticleFormState(articleFields);

  const formIsSubmitted = () => {
    dispatch(contentActions.setArticleIsSent());
    dispatch(modalActions.setCloseModal());
    dispatch(modalActions.setOpenModal({ type: "isSubmitted" }));
    setIsSubmitted(true);
    setIsEdit(false);
  };

  const onSuccessEditArticle = (editedArticle) => {
    dispatch(contentActions.editArticleHandler({ editedArticle }));
    if (isEdit) {
      formIsSubmitted();
    }
  };

  const onErrorEditArticle = (error) => {
    dispatch(contentActions.setPrevContent());
    if (isEdit) {
      dispatch(modalActions.setCloseModal());
      dispatch(modalActions.setOpenModal({ type: "error", text: error.message }));
    }
  };

  const addReactionHandler = (type, myReaction) => {
    const reactions = item?.reactions;
    const editedValue = getEditedValue(reactions, type, me, myReaction);

    const editedArticle = {
      ...item,
      ...editedValue,
    };

    editArticleHandler(itemIndex, editedArticle, onSuccessEditArticle, onErrorEditArticle);
  };

  const openEditFormHandler = () => {
    setIsEdit(true);
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
  }

  const onEditArticle = (newArticle) => {
    const description = newArticle.images;

    const images = [ ...item.images ].map((el, index) => {
      const imageData = {
        ...el,
      };
      if (index === 0) {
        imageData.text = description;
      }
      return imageData;
    })

    const editedFields = {
      ...newArticle,
      images
    };

    const editedArticle = {
      ...item,
      ...editedFields,
    };

    editArticleHandler(itemIndex, editedArticle, onSuccessEditArticle, onErrorEditArticle);
  }

  const onDeleteArticle = async () => {
    history.goBack();
    dispatch(modalActions.setOpenModal({ type: "deleting" }));
    const updatedContent = [...content];
    updatedContent.splice(itemIndex, 1);
    await sendArticle(updatedContent, () => {
      dispatch(contentActions.deleteArticleHandler({ deletedArticle: item }));
      dispatch(modalActions.setCloseModal());
      dispatch(modalActions.setOpenModal({ type: "isDeleted" }));
    }).catch((error) => {
      dispatch(modalActions.setCloseModal());
      dispatch(modalActions.setOpenModal({ type: "error", text: error.message }));
      //dispatch(contentActions.setPrevContent());
    });
  };

  return (
    <React.Fragment>
      <section>
        <Container>
          {!isContent && (
            <p className={styles.nonews}>Новость загружается...</p>
          )}
          <article>
            {isContent && !isEdit && (
              <React.Fragment>
                <h2>{item.heading}</h2>
                <p className={styles["article__brief-text"]}>{item.briefText}</p>
                <time className={styles["article__date"]}>
                  {parseDateMonthString(new Date(item.date))}
                  {item.editedDate && (
                    <span>
                      {" "}
                      (отредактирован)
                      <span className={styles.hint}>
                        Отредактирован{" "}
                        {parseDateMonthString(new Date(item.editedDate))}
                      </span>
                    </span>
                  )}
                </time>
                <div className={styles["article__img-wrapper"]}>
                  <NewsImage
                    src={item.images[0].href}
                    alt={item.images[0].text}
                  />
                  <p className={styles["article__img-text"]}>
                    {item.images[0].text}
                  </p>
                </div>
                {articleText(item.text)}
                <div className={styles["article__img-wrapper"]}>
                  {item.images.slice(1).map((image, index) => (
                    <React.Fragment key={index}>
                      <NewsImage src={image.href} alt={image.text} />
                      {image?.text && (
                        <p className={styles["article__img-text"]}>
                          {image.text}
                        </p>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {item?.rubrics && (
                  <ul className={styles["article__rubrics-list"]}>
                    {item.rubrics.map((rubric) => (
                      <li
                        className={styles["article__rubrics-item"]}
                        key={rubric}
                      >
                        <NavLink
                          to={`/rubrics${
                            OTHER_RUBRICS.find((el) => el.value === rubric)?.link
                          }`}
                        >
                          {OTHER_RUBRICS.find((el) => el.value === rubric)?.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
                <div className={styles["article__bottom"]}>
                  <Reactions
                    reactions={item?.reactions}
                    addReactionHandler={addReactionHandler}
                  />
                  {isLoggedIn && me.role === "Администратор" && (
                    <div className={styles["article__fix"]}>
                      <button
                        type="button"
                        onClick={openEditFormHandler}
                        className={styles["article__edit"]}
                      >
                        <img src="/images/edit_image.svg" alt="Edit" />
                        <span className={styles.hint}>Редактировать новость</span>
                      </button>
                      <button
                        type="button"
                        onClick={onDeleteArticle}
                        className={styles["article__delete"]}
                      >
                        <img src="/images/delete.svg" alt="Edit" />
                        <span className={styles.hint}>Удалить новость</span>
                      </button>
                    </div>
                  )}
                </div>
              </React.Fragment>
            )}
            {isEdit && (
              <ArticleForm
                edit
                sendArticle={onEditArticle}
                initialFormState={initialFormState}
                validation={articleValidation}
                articleRubrics={articleRubrics}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                cancelHandler={cancelEditHandler}
              />
            )}
          </article>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ArticleContent;
