import React, { useState, useReducer, useEffect } from "react";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { filesReducer } from "./filesReducer";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentActions } from "../../store/content-slice";
import { modalActions } from "../../store/modal-slice";

import Container from "../Layout/Container";

import useForm from "../../hooks/use-form";
import { sendArticle } from "../../store/helper";

import styles from "./NewArticle.module.scss";

const isKey = (value) => {
  return (
    /^[a-z0-9-_]+$/.test(value) &&
    value.toString().length >= 5 &&
    value.toString().length <= 50
  );
};

const isHeading = (value) => {
  return (
    /[\w\s\p{P}]/gu.test(value) &&
    value.toString().length >= 50 &&
    value.toString().length <= 100
  );
};

const isBriefText = (value) => {
  return (
    /[\w\s\p{P}]/gu.test(value) &&
    value.toString().length >= 70 &&
    value.toString().length <= 250
  );
};

const isText = (value) => {
  return /[\w\s\p{P}]/gu.test(value) && value.toString().length >= 300;
};

const isNotEmpty = (value) => (!!value);

const isDescription = (value) => {
  return (
    /[\w\s\p{P}]/gu.test(value) &&
    value.toString().length >= 50 &&
    value.toString().length <= 200
  );
};

const NewArticle = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    document.title = "Добавить новость — Moldova News";
  }, []);

  const content = useSelector((state) => state.content.content);
  const isAdded = useSelector((state) => state.content.articleAdded);

  const dispatch = useDispatch();

  const initialFormState = {
    key: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    heading: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    briefText: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    text: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    category: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    priority: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
    description: {
      value: "",
      touched: false,
      valid: false,
      hasError: false,
    },
  };

  const validation = {
    key: isKey,
    heading: isHeading,
    briefText: isBriefText,
    text: isText,
    category: isNotEmpty,
    priority: isNotEmpty,
    description: isDescription,
  };

  const {
    value: formValue,
    isValid: isFormValid,
    hasError: formHasError,
    valueChangeHandler: formChange,
    inputBlurHandler: formBlur,
    reset: formReset,
  } = useForm(initialFormState, validation);

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
      setFormIsValid(isFormValid && filesIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [isFormValid, filesIsValid]);

  const formIsSubmitted = () => {
    dispatch(contentActions.setArticleIsSent());
    dispatch(modalActions.setCloseModal());
    dispatch(modalActions.setOpenModal({ type: "isSubmitted" }));
    formReset();
    resetFilesHandler();
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
  }, [content, dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(modalActions.setOpenModal({ type: "submitting" }));

    const articleDate = new Date();
    const newArticle = {};

    const key = `${formValue.key}-${articleDate.getDate()}${
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
      newArticle.priority = +formValue.priority;
      newArticle.category = formValue.category;
      newArticle.date = +articleDate;
      newArticle.heading = formValue.heading;
      newArticle.briefText = formValue.briefText;
      newArticle.text = formValue.text.split("\n");
      newArticle.comments = [];

      newArticle.images = urls.map((el, index) => {
        const imageData = {
          href: el,
          text: "",
        };

        if (index === 0) {
          imageData.text = formValue.descriprion;
        }
        return imageData;
      });

      dispatch(contentActions.addArticle(newArticle));
    };

    addArticle();
  };

  return (
    <React.Fragment>
      <section>
        <Container>
          <article>
            <h2>Добавить новость</h2>
            <form onSubmit={submitHandler}>
              <div className={styles.control}>
                {formHasError.key && (
                  <p className={styles["invalid-info"]}>
                    Ключ может содержать только латинские буквы в нижнем
                    регистре, цифры, символы &quot;-&quot; и &quot;_&quot; без
                    пробелов. Минимальное число символов — 5, максимальное — 50.
                  </p>
                )}
                <label htmlFor="article_key">Ключ</label>
                <input
                  type="text"
                  name="key"
                  id="article_key"
                  value={formValue.key}
                  onChange={formChange}
                  onBlur={formBlur}
                />
              </div>
              <div className={styles.control}>
                {formHasError.heading && (
                  <p className={styles["invalid-info"]}>
                    Заголовок может содержать только буквы, цифры, пробелы и
                    символы -.,!?%;:«»„”. Минимальное число символов — 50,
                    максимальное — 100.
                  </p>
                )}
                <label htmlFor="article_heading">Заголовок</label>
                <input
                  type="text"
                  name="heading"
                  id="article_heading"
                  value={formValue.heading}
                  onChange={formChange}
                  onBlur={formBlur}
                />
              </div>
              <div className={styles.control}>
                {formHasError.briefText && (
                  <p className={styles["invalid-info"]}>
                    Краткое описание может содержать только буквы, цифры,
                    пробелы и символы -.,!?%;:«»„”. Минимальное число символов —
                    120, максимальное — 250.
                  </p>
                )}
                <label htmlFor="article_brief_text">Краткое описание</label>
                <textarea
                  className={styles.brief}
                  name="briefText"
                  id="article_brief_text"
                  value={formValue.briefText}
                  onChange={formChange}
                  onBlur={formBlur}
                />
              </div>
              <div className={styles.control}>
                {formHasError.text && (
                  <p className={styles["invalid-info"]}>
                    Текст новости может содержать только буквы, цифры, пробелы и
                    символы -.,!?%;:«»„”. Минимальное число символов — 300.
                  </p>
                )}
                <label htmlFor="article_text">Текст новости</label>
                <textarea
                  className={styles["article-text"]}
                  name="text"
                  id="article_text"
                  value={formValue.text}
                  onChange={formChange}
                  onBlur={formBlur}
                />
              </div>
              <div className={styles.select}>
                {formHasError.category && (
                  <p className={styles["invalid-info"]}>
                    Выберите категорию новости.
                  </p>
                )}
                <label htmlFor="category">Категория</label>
                <select
                  id="category"
                  name="category"
                  value={formValue.category}
                  onChange={formChange}
                  onBlur={formBlur}
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
                {formHasError.priority && (
                  <p className={styles["invalid-info"]}>
                    Выберите приоритет новости.
                  </p>
                )}
                <label htmlFor="priority">Приоритет</label>
                <select
                  id="priority"
                  name="priority"
                  value={formValue.priority}
                  onChange={formChange}
                  onBlur={formBlur}
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
                  {formHasError.descriprion && (
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
                    name="description"
                    required
                    value={formValue.description}
                    onChange={formChange}
                    onBlur={formBlur}
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
