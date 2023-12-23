import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentActions } from "../../store/content-slice";
import { modalActions } from "../../store/modal-slice";

import Container from "../Layout/Container";
import ArticleForm from "./ArticleForm";

import { sendArticle } from "../../store/helper";
import { articleValidation } from "../../helpers/validationHelper";
import { initialFormNewArticleState } from "../../helpers/getInitialFormState";

const NewArticle = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Добавить новость — Moldova News";
  }, []);

  const content = useSelector((state) => state.content.content);
  const isAdded = useSelector((state) => state.content.articleAdded);

  const dispatch = useDispatch();

  const initialFormState = initialFormNewArticleState;

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

  const onAddArticle = (newArticle) => {
    dispatch(contentActions.addArticle(newArticle));
  };

  return (
    <React.Fragment>
      <section>
        <Container>
          <article>
            <h2>Добавить новость</h2>
            <ArticleForm
              sendArticle={onAddArticle}
              initialFormState={initialFormState}
              validation={articleValidation}
              articleRubrics={[]}
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
