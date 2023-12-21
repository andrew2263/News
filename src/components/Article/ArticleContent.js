/*eslint-disable */
import React, { useEffect } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Container from "../Layout/Container";
import NewsImage from "../NewsContent/NewsImage";
import Reactions from "../UI/Reactions/Reactions";

import { contentActions } from "../../store/content-slice";
import { editArticleHandler } from "../../store/helper";

import { parseDateMonthString } from "../../helpers/parseDateMonth";
import { getEditedValue } from "../../helpers/reactionHelper";
import { OTHER_RUBRICS } from "../../constants/NewsRubrics.Constant";

import styles from "./ArticleContent.module.scss";
//import NewArticle from "../NewArticle/NewArticle";

const ArticleContent = () => {
  const params = useParams();
  const { newsId } = params;

  //const [isEdit, setIsEdit] = useState(false);
  /*const [article, setArticle] = useState({
    key: '',
    priority: '',
    category: '',
    date: '',
    heading: '',
    briefText: '',
    text: [],
    rubrics: [],
    images: [],
  });
*/
  const content = useSelector((state) => state.content.content);
  const me = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const location = useLocation();

  const isContent = content.length ? true : false;

  const itemIndex = content?.findIndex((el) => el.key === newsId);

  const item = content?.[itemIndex];

  useEffect(() => {
    document.title = isContent
      ? `${item.heading} — Moldova News`
      : "Новости Молдовы — Moldova News";
   /*if (isContent && item) {
      setArticle({
        key: item.key,
        priority: item.priority,
        category: item.category,
        date: item.date,
        heading: item.heading,
        briefText: item.briefText,
        text: item.text,
        rubrics: item?.rubrics?.map((el) => {
          const rubricElement = OTHER_RUBRICS.find((item) => item.value === el);
          return {
            value: rubricElement.value,
            text: rubricElement.name,
            label: <div>{rubricElement.name}</div>,
          };
        }),
        images: item.images,
      });
    }*/
  }, [item, isContent]);

  const articleText = (text) =>
    text.map((text, index) => {
      return (
        <p key={index} className={styles["article__text"]}>
          {text}
        </p>
      );
    });

  const addReactionHandler = (type, myReaction) => {
    const reactions = item?.reactions;
    const editedValue = getEditedValue(reactions, type, me, myReaction);

    const editedArticle = {
      ...item,
      ...editedValue,
    };

    const onSuccessEditArticle = () => {
      dispatch(contentActions.editArticleHandler({ editedArticle }));
    };

    const onErrorEditArticle = () => {
      dispatch(contentActions.setPrevContent());
    };

    editArticleHandler(itemIndex, editedArticle, onSuccessEditArticle, onErrorEditArticle);
  };

  const onDeleteArticle = () => {};

  return (
    <React.Fragment>
      <section>
        <Container>
          {!isContent && (
            <p className={styles.nonews}>Новость загружается...</p>
          )}
          {isContent && (
            <article>
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
                    {/*<button
                      type="button"
                      onClick={onEditArticle}
                      className={styles["article__edit"]}
                >*/}
                    <NavLink to={`/edit/${newsId}`} className={styles["article__edit"]}>
                      <img src="/images/edit_image.svg" alt="Edit" />
                      <span className={styles.hint}>Редактировать новость</span>
                      <span>Редактировать новость</span>
                    {/*</button>*/}
                    </NavLink>
                    <button
                      type="button"
                      onClick={onDeleteArticle}
                      className={styles["article__delete"]}
                    >
                      <img src="/images/delete.svg" alt="Edit" />
                      <span className={styles.hint}>Удалить новость</span>
                      <span>Удалить новость</span>
                    </button>
                  </div>
                )}
              </div>
            </article>
          )}
          {/*isEdit && (
            <NewArticle edit setIsEdit={setIsEdit} article={article} setArticle={setArticle} />
          )*/}
        </Container>
      </section>
    </React.Fragment>
  );
};

export default ArticleContent;
