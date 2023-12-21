import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentActions } from "../../store/content-slice";
import { modalActions } from "../../store/modal-slice";

import Container from "../Layout/Container";
import ArticleForm from "./ArticleForm";

import { sendArticle, editArticleHandler } from "../../store/helper";
import { OTHER_RUBRICS } from "../../constants/NewsRubrics.Constant";
import {
  isKey,
  isHeading,
  isBriefText,
  isText,
  isCategory,
  isPriority,
  isDescription,
} from "../../helpers/validationHelper";
import {
  getInitialEditArticleFormState,
  initialFormNewArticleState,
} from "../../helpers/getInitialFormState";

const NewArticle = ({edit = false}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = `${!edit ? "Добавить" : "Редактироать"} новость — Moldova News`;
  }, []);

  const content = useSelector((state) => state.content.content);
  const isAdded = useSelector((state) => state.content.articleAdded);

  const dispatch = useDispatch();
  const history = useHistory();

  const params = useParams();
  const { newsId } = params;

  const articleIndex = content?.findIndex((el) => el.key === newsId);
  const article = content?.[articleIndex];


  const articleRubrics = article?.rubrics ? article.rubrics.map((el) => {
    const rubricElement = OTHER_RUBRICS.find((item) => item.value === el);
    return {
      value: rubricElement.value,
      text: rubricElement.name,
      label: <div>{rubricElement.name}</div>,
    };
  }) : [];

  const articleFields = {
    key: article?.key,
    priority: article?.priority,
    category: article?.category,
    date: article?.date,
    heading: article?.heading,
    briefText: article?.briefText,
    text: article?.text,
    rubrics: articleRubrics,
    images: article?.images,
  };

  const validation = {
    key: isKey,
    heading: isHeading,
    briefText: isBriefText,
    text: isText,
    category: isCategory,
    priority: isPriority,
    description: isDescription,
  };

  const initialFormState = !edit ? initialFormNewArticleState : getInitialEditArticleFormState(articleFields);

  const formIsSubmitted = () => {
    dispatch(contentActions.setArticleIsSent());
    dispatch(modalActions.setCloseModal());
    dispatch(modalActions.setOpenModal({ type: "isSubmitted" }));
    setIsSubmitted(true);
  };

  const errorHandler = (error) => {
    dispatch(modalActions.setCloseModal());
    dispatch(modalActions.setOpenModal({ type: "error", text: error.message }));
  };

  useEffect(() => {
    if (isAdded) {
      sendArticle(content, formIsSubmitted).catch((error) => {
        errorHandler(error);
        dispatch(contentActions.setPrevContent());
      });
    }
  }, [content, dispatch, isAdded]);

  const addArticle = (newArticle) => {
    if (!edit) {
      dispatch(contentActions.addArticle(newArticle));
    } else {
      const description = newArticle.images;

      const images = [ ...article.images ].map((el, index) => {
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
        ...article,
        ...editedFields,
      };

      const onSuccessEditArticle = () => {
        dispatch(contentActions.editArticleHandler({ editedArticle }));
        formIsSubmitted();
        history.goBack();
      };
  
      const onErrorEditArticle = (error) => {
        dispatch(contentActions.setPrevContent());
        dispatch(modalActions.setCloseModal());
        dispatch(modalActions.setOpenModal({ type: "error", text: error.message }));
        //history.goBack();
      };

      editArticleHandler(articleIndex, editedArticle, onSuccessEditArticle, onErrorEditArticle);
    }
  }

  return (
    <React.Fragment>
      <section>
        <Container>
          <article>
            <h2>{`${!edit ? "Добавить" : "Редактироать"} новость`}</h2>
            <ArticleForm
              edit={edit}
              sendArticle={addArticle}
              initialFormState={initialFormState}
              validation={validation}
              articleRubrics={edit && articleRubrics}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
          </article>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default React.memo(NewArticle);
