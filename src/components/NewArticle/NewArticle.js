import React, { useState, useReducer, useEffect } from "react";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { filesReducer } from "./filesReducer";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentActions } from "../../store/content-slice";

import { NavLink } from "react-router-dom";
import Container from "../Layout/Container";
import Modal from "../UI/Modal";
import useInput from "../../hooks/use-input";
import styles from "./NewArticle.module.css";

import { sendArticle } from "../../store/helper";

const isKey = (value) => {
  return (
    /^[a-z0-9-_]+$/.test(value) &&
    value.toString().length >= 5 &&
    value.toString().length <= 50
  );
};

const isLineText = (value, minLength, maxLength) => {
  return (
    /^[а-яА-ЯёЁa-zăîâĂÎșțȘȚA-Z0-9- .,!?%;:«»„”"()—\n]+$/.test(value) &&
    value.toString().length >= minLength &&
    value.toString().length <= maxLength
  );
};

const isText = (value, maxLength) => {
  return (
    /^[а-яА-ЯёЁa-zăîâĂÎșțȘȚA-Z0-9- .,!?%;:«»„”"()—\n]+$/.test(value) &&
    value.toString().length >= maxLength
  );
};

const isNotEmpty = (value) => value !== "";

const NewArticle = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    document.title = "Добавить новость — Moldova News";
  }, []);

  const content = useSelector((state) => state.content.content);
  const isAdded = useSelector((state) => state.content.articleAdded);

  const dispatch = useDispatch();

  const {
    value: enteredKey,
    isValid: keyIsValid,
    hasError: keyHasError,
    valueChangeHandler: keyChangeHandler,
    inputBlurHandler: validateKeyHandler,
    reset: resetKeyHandler,
  } = useInput(isKey);

  const {
    value: enteredHeading,
    isValid: headingIsValid,
    hasError: headingHasError,
    valueChangeHandler: headingChangeHandler,
    inputBlurHandler: validateHeadingHandler,
    reset: resetHeadingHandler,
  } = useInput(isLineText, 50, 100);

  const {
    value: enteredBriefText,
    isValid: briefTextIsValid,
    hasError: briefTextHasError,
    valueChangeHandler: briefTextChangeHandler,
    inputBlurHandler: validateBriefTextHandler,
    reset: resetBriefTextHandler,
  } = useInput(isLineText, 120, 250);

  const {
    value: enteredText,
    isValid: textIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: validateTextHandler,
    reset: resettextHandler,
  } = useInput(isText, 300);

  const {
    value: selectedCategory,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: validateCategoryHandler,
    reset: resetCategoryHandler,
  } = useInput(isNotEmpty);

  const {
    value: selectedPriority,
    isValid: priorityIsValid,
    hasError: priorityHasError,
    valueChangeHandler: priorityChangeHandler,
    inputBlurHandler: validatePriorityHandler,
    reset: resetPriorityHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredFileDescription,
    isValid: fileDescriptionIsValid,
    hasError: fileDescriptionHasError,
    valueChangeHandler: fileDescriptionChangeHandler,
    inputBlurHandler: validateFileDescriptionHandler,
    reset: resetFileDescriptionHandler,
  } = useInput(isLineText, 50, 200);

  const [filesState, dispatchFiles] = useReducer(filesReducer, {
    value: "",
    files: "",
    isValid: undefined,
    isTouched: false,
  });

  const filesChangeHandler = (event) => {
    dispatchFiles({
      type: "USER_INPUT",
      val: event.target.value,
      files: event.target.files,
    });
  };

  const validateFilesHandler = () => {
    dispatchFiles({ type: "INPUT_BLUR" });
  };

  const resetFilesHandler = () => {
    dispatchFiles({ type: "RESET" });
  };

  const { isValid: filesIsValid } = filesState;
  const { isTouched: filesIsTouched } = filesState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        keyIsValid &&
          headingIsValid &&
          briefTextIsValid &&
          textIsValid &&
          fileDescriptionIsValid &&
          categoryIsValid &&
          priorityIsValid &&
          filesIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    keyIsValid,
    headingIsValid,
    briefTextIsValid,
    textIsValid,
    fileDescriptionIsValid,
    categoryIsValid,
    priorityIsValid,
    filesIsValid,
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const formIsSubmitted = () => {
    dispatch(contentActions.setArticleIsSent());
    setIsSubmitting(false);
    setDidSubmit(true);
    resetKeyHandler();
    resetHeadingHandler();
    resetBriefTextHandler();
    resettextHandler();
    resetCategoryHandler();
    resetPriorityHandler();
    resetFilesHandler();
    resetFileDescriptionHandler();
  };
  
  const errorHandler = (error) => {
    setIsSubmitting(false);
    setErrorMessage(error.message);
  };

  useEffect(() => {
    if (isAdded) {
      sendArticle(content, formIsSubmitted).catch((error) => {
        errorHandler(error);
        dispatch(contentActions.setPrevContent());
      });
    }
  }, [content, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const articleDate = new Date();
    const newArticle = {};

    const key = `${enteredKey}-${articleDate.getDate()}${
      articleDate.getMonth() + 1
    }${articleDate.getFullYear()}-${articleDate.getHours()}${articleDate.getMinutes()}`;

    const imageRefs = [];
    const files = Array.from(filesState.files);

    files.forEach((element, index) => {
      imageRefs[index] = ref(storage, `images/${key}/${element.name}`);
    });

    const uploadFiles = async () => {
      const urls = [];

      for await (const [index, element] of files.entries()) {
        await uploadBytes(imageRefs[index], element);
        const url = await getDownloadURL(imageRefs[index]);
        urls.push(url);
      }

      return urls;
    };

    const addArticle = async () => {
      const urls = await uploadFiles();

      newArticle.key = key;
      newArticle.priority = +selectedPriority;
      newArticle.category = selectedCategory;
      newArticle.date = +articleDate;
      newArticle.heading = enteredHeading;
      newArticle.briefText = enteredBriefText;
      newArticle.text = enteredText.split("\n");
      newArticle.comments = [];

      newArticle.images = urls.map((el, index) => {
        const imageData = {
          href: el,
          text: "",
        };

        if (index === 0) {
          imageData.text = enteredFileDescription;
        }
        return imageData;
      });

      dispatch(contentActions.addArticle(newArticle));
    };

    addArticle();
  };

  const modalCloseHandler = () => {
    setDidSubmit(false);
  };

  return (
    <React.Fragment>
      {isSubmitting && (
        <Modal type="status">
          <p className={styles["submit-msg"]}>Форма отправляется...</p>
        </Modal>
      )}
      {errorMessage && (
        <Modal type="status">
          <p className={styles.error}>ERROR: {errorMessage}</p>
        </Modal>
      )}
      {didSubmit && (
        <Modal type="status" onClose={modalCloseHandler}>
          <p className={styles["submit-msg"]}>Форма отправлена</p>
          <div className={styles["modal-buttons"]}>
            <button
              className={styles["modal-button"]}
              onClick={modalCloseHandler}
            >
              OK
            </button>
            <NavLink className={styles["modal-button"]} to="/">
              Перейти к новостям
            </NavLink>
          </div>
        </Modal>
      )}
      <section>
        <Container>
          <article>
            <h2>Добавить новость</h2>
            <form onSubmit={submitHandler}>
              <div className={styles.control}>
                {keyHasError && (
                  <p className={styles["invalid-info"]}>
                    Ключ может содержать только латинские буквы в нижнем
                    регистре, цифры, символы &quot;-&quot; и &quot;_&quot; без
                    пробелов. Минимальное число символов — 5, максимальное — 50.
                  </p>
                )}
                <label htmlFor="article_key">Ключ</label>
                <input
                  type="text"
                  id="article_key"
                  value={enteredKey}
                  onChange={keyChangeHandler}
                  onBlur={validateKeyHandler}
                />
              </div>
              <div className={styles.control}>
                {headingHasError && (
                  <p className={styles["invalid-info"]}>
                    Заголовок может содержать только буквы, цифры, пробелы и
                    символы -.,!?%;:«»„”. Минимальное число символов — 50,
                    максимальное — 100.
                  </p>
                )}
                <label htmlFor="article_heading">Заголовок</label>
                <input
                  type="text"
                  id="article_heading"
                  value={enteredHeading}
                  onChange={headingChangeHandler}
                  onBlur={validateHeadingHandler}
                />
              </div>
              <div className={styles.control}>
                {briefTextHasError && (
                  <p className={styles["invalid-info"]}>
                    Краткое описание может содержать только буквы, цифры,
                    пробелы и символы -.,!?%;:«»„”. Минимальное число символов —
                    120, максимальное — 250.
                  </p>
                )}
                <label htmlFor="article_brief_text">Краткое описание</label>
                <textarea
                  className={styles.brief}
                  id="article_brief_text"
                  value={enteredBriefText}
                  onChange={briefTextChangeHandler}
                  onBlur={validateBriefTextHandler}
                />
              </div>
              <div className={styles.control}>
                {textHasError && (
                  <p className={styles["invalid-info"]}>
                    Текст новости может содержать только буквы, цифры, пробелы и
                    символы -.,!?%;:«»„”. Минимальное число символов — 300.
                  </p>
                )}
                <label htmlFor="article_text">Текст новости</label>
                <textarea
                  className={styles["article-text"]}
                  id="article_text"
                  value={enteredText}
                  onChange={textChangeHandler}
                  onBlur={validateTextHandler}
                />
              </div>
              <div className={styles.select}>
                {categoryHasError && (
                  <p className={styles["invalid-info"]}>
                    Выберите категорию новости.
                  </p>
                )}
                <label htmlFor="category">Категория</label>
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={categoryChangeHandler}
                  onBlur={validateCategoryHandler}
                >
                  <option value="" hidden disabled>
                    Выберите категорию
                  </option>
                  <option value="politics">Политика</option>
                  <option value="war">Война Россия — Украина</option>
                  <option value="economics">Экономика</option>
                  <option value="world">В мире</option>
                  <option value="sport">Спорт</option>
                </select>
              </div>
              <div className={styles.select}>
                {priorityHasError && (
                  <p className={styles["invalid-info"]}>
                    Выберите приоритет новости.
                  </p>
                )}
                <label htmlFor="priority">Приоритет</label>
                <select
                  id="priority"
                  name="priority"
                  value={selectedPriority}
                  onChange={priorityChangeHandler}
                  onBlur={validatePriorityHandler}
                >
                  <option value="" hidden disabled>
                    Выберите приоритет
                  </option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className={styles.fileInput}>
                {!filesIsValid && filesIsTouched && (
                  <p className={styles["invalid-info"]}>
                    Загрузите файлы с расширением .png, .jpg или .webp.
                  </p>
                )}
                <input
                  name="userfiles"
                  id="userfiles"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, .webp"
                  value={filesState.value}
                  onChange={filesChangeHandler}
                  onBlur={validateFilesHandler}
                />
                <div className={styles.control}>
                  {fileDescriptionHasError && (
                    <p className={styles["invalid-info"]}>
                      Описание изображения может содержать только буквы, цифры,
                      пробелы и символы -.,!?%;:«»„”. Минимальное число символов
                      — 50, максимальное — 200.
                    </p>
                  )}
                  <label htmlFor="files_description">
                    Описание изображения
                  </label>
                  <textarea
                    className={styles.brief}
                    id="files_description"
                    required
                    value={enteredFileDescription}
                    onChange={fileDescriptionChangeHandler}
                    onBlur={validateFileDescriptionHandler}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={styles.submit}
                disabled={!formIsValid}
              >
                Добавить новость
              </button>
            </form>
          </article>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default NewArticle;
