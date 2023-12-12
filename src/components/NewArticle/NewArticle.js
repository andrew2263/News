import React, { useState, useReducer, useEffect, useCallback } from "react";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { filesReducer } from "./filesReducer";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contentActions } from "../../store/content-slice";
import { modalActions } from "../../store/modal-slice";

import Container from "../Layout/Container";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";

import useForm from "../../hooks/use-form";
import { sendArticle } from "../../store/helper";
import {
  MAIN_RUBRICS,
  OTHER_RUBRICS,
} from "../../constants/NewsRubrics.Constant";
import {
  isKey,
  isHeading,
  isBriefText,
  isText,
  isCategory,
  isPriority,
  isDescription,
} from "../../helpers/validationHelper";

import styles from "./NewArticle.module.scss";

const categoryOptions = MAIN_RUBRICS.map((el) => ({
  value: el.value,
  text: el.name,
  label: <div>{el.name}</div>,
}));

const priorityOptions = [1, 2, 3, 4].map((el) => ({
  value: el,
  text: el.toString(),
  label: <div>{el}</div>,
}));

const rubricOptions = OTHER_RUBRICS.map((el) => ({
  value: el.value,
  text: el.name,
  label: <div>{el.name}</div>,
}));

const NewArticle = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    document.title = "Добавить новость — Moldova News";
  }, []);

  const content = useSelector((state) => state.content.content);
  const isAdded = useSelector((state) => state.content.articleAdded);

  const [rubrics, setRubrics] = useState([]);

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
    category: isCategory,
    priority: isPriority,
    description: isDescription,
  };

  const {
    formState,
    isValid: isFormValid,
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

  const rubricsChange = useCallback(
    (value) => {
      setRubrics(value);
    },
    [rubrics]
  );

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
    setRubrics([]);
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

    const key = `${formState.key.value}-${articleDate.getDate()}${
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
      newArticle.priority = +formState.priority.value;
      newArticle.category = formState.category.value;
      newArticle.date = +articleDate;
      newArticle.heading = formState.heading.value;
      newArticle.briefText = formState.briefText.value;
      newArticle.text = formState.text.value.split("\n");
      newArticle.comments = [];
      newArticle.rubrics = rubrics.map((el) => el.value);

      newArticle.images = urls.map((el, index) => {
        const imageData = {
          href: el,
          text: "",
        };

        if (index === 0) {
          imageData.text = formState.descriprion.value;
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
              <Input
                type="text"
                name="key"
                id="article_key"
                value={formState.key.value}
                onChange={formChange}
                onBlur={formBlur}
                label="Ключ"
                required
                hasError={formState.key.hasError}
                hasErrorMessage='Ключ может содержать только латинские буквы в нижнем
              регистре, цифры, символы "-" и "_" без
              пробелов. Минимальное число символов — 5, максимальное — 50.'
              />
              <Input
                type="text"
                name="heading"
                id="article_heading"
                value={formState.heading.value}
                onChange={formChange}
                onBlur={formBlur}
                label="Заголовок"
                required
                hasError={formState.heading.hasError}
                hasErrorMessage="Заголовок может содержать только буквы, цифры, пробелы и
                символы -.,!?%;:«»„”. Минимальное число символов — 50,
                максимальное — 100."
              />
              <Input
                className={styles.brief}
                name="briefText"
                id="article_brief_text"
                value={formState.briefText.value}
                onChange={formChange}
                onBlur={formBlur}
                label="Краткое описание"
                required
                isTextarea
                hasError={formState.briefText.hasError}
                hasErrorMessage="Краткое описание может содержать только буквы, цифры,
                пробелы и символы -.,!?%;:«»„”. Минимальное число символов —
                120, максимальное — 250."
              />
              <Input
                className={styles["article-text"]}
                name="text"
                id="article_text"
                value={formState.text.value}
                onChange={formChange}
                onBlur={formBlur}
                label="Текст новости"
                required
                isTextarea
                hasError={formState.text.hasError}
                hasErrorMessage="Краткое описание может содержать только буквы, цифры,
              пробелы и символы -.,!?%;:«»„”. Минимальное число символов —
              120, максимальное — 250."
              />
              <Select
                id="category"
                name="category"
                value={formState.category.value}
                onChange={formChange}
                changeBlur={formBlur}
                label="Категория"
                required
                initialOptions={categoryOptions}
                hasError={formState.category.hasError}
                hasErrorMessage="Выберите категорию новости из выпадающего списка."
              />
              <Select
                id="priority"
                name="priority"
                value={formState.priority.value}
                onChange={formChange}
                changeBlur={formBlur}
                label="Приоритет"
                required
                initialOptions={priorityOptions}
                hasError={formState.priority.hasError}
                hasErrorMessage="Выберите приоритет новости из выпадающего списка."
              />
              <Select
                isMulti
                id="rubrics"
                name="rubrics"
                value={rubrics}
                onChange={rubricsChange}
                label="Рубрики"
                initialOptions={rubricOptions}
              />
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
              </div>
              <Input
                className={styles.brief}
                id="files_description"
                name="description"
                value={formState.description.value}
                onChange={formChange}
                onBlur={formBlur}
                label="Описание изображения"
                isTextarea
                required
                hasError={formState.description.hasError}
                hasErrorMessage="Описание изображения может содержать только буквы, цифры,
                пробелы и символы -.,!?%;:«»„”. Минимальное число символов
                — 50, максимальное — 200."
              />
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

export default React.memo(NewArticle);
