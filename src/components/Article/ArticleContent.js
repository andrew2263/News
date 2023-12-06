import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Container from "../Layout/Container";
import NewsImage from "../NewsContent/NewsImage";
import Reactions from "../UI/Reactions/Reactions";

import { app } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

import { contentActions } from "../../store/content-slice";

import { parseDateMonthString } from "../../helpers/parseDateMonth";
import { getEditedValue } from "../../helpers/reactionHelper";
import { OTHER_RUBRICS } from "../../constants/NewsRubrics.Constant";

import styles from "./ArticleContent.module.scss";

const ArticleContent = () => {
  const params = useParams();
  const { newsId } = params;

  const content = useSelector((state) => state.content.content);
  const me = useSelector((state) => state.auth.me);

  const dispatch = useDispatch();

  const database = getDatabase(app);

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

  const editArticleHandler = (editedValue) => {
    const editArticlePath = `content/${itemIndex}`;
    const databaseRef = ref(database, editArticlePath);

    const editedArticle = {
      ...item,
      ...editedValue,
    };

    dispatch(contentActions.editArticleHandler({ itemIndex, editedArticle }));

    set(databaseRef, editedArticle)
    .then(() => {})
      .catch((error) => {
        console.error(error);
        dispatch(contentActions.setPrevContent());
        // setErrorMessage(
        //   `${error.message}: Отредактировать комментарий не удалось. Обновите страницу и повторите попытку.`
        // );
      });
  }
  
  const addReactionHandler = (type, myReaction) => {
    const reactions = item?.reactions;
    const editedValue = getEditedValue(reactions, type, me, myReaction);

    editArticleHandler(editedValue);
  };

  return (
    <React.Fragment>
      {!isContent && (
        <section>
          <Container>
            <p className={styles.nonews}>Новость загружается...</p>
          </Container>
        </section>
      )}
      {isContent && (
        <section>
          <Container>
            <article>
              <h2>{item.heading}</h2>
              <p className={styles["article__brief-text"]}>{item.briefText}</p>
              <time className={styles["article__date"]}>
                {parseDateMonthString(new Date(item.date))}
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
              <Reactions
                reactions={item?.reactions}
                addReactionHandler={addReactionHandler}
              />
            </article>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
};

export default ArticleContent;
