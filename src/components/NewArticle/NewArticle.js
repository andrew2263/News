import React, { useState, useRef, useReducer, useEffect, useContext } from 'react';

import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Context from '../../store/context';
import useInput from '../../hooks/use-input';
import styles from './NewArticle.module.css';

const isKey = value => {
  return /^[a-z0-9-_]+$/.test(value) &&
    value.toString().length >= 5 &&
    value.toString().length <= 50
};

const isLineText = (value, minLength, maxLength) => {
  return /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”\n]+$/.test(value) &&
    value.toString().length >= minLength &&
    value.toString().length <= maxLength;
};

const isText = (value, maxLength) => {
  return /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”\n]+$/.test(value) &&
    value.toString().length >= maxLength
};

const isNotEmpty = value => value !== '';

const filesReducer = (state, action) => {
  const fileTypes = ['image/png', 'image/jpeg', 'image/webp'];

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      files: action.files,
      isValid: action.val !== '' && Array.from(action.files).every(file => {
        return fileTypes.some(el => el === file.type);
      }),
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      files: state.files,
      isValid: state.value !== '' && Array.from(state.files).every(file => {
        return fileTypes.some(el => el === file.type);
      }),
      isTouched: true
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      files: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', files: '', isValid: false, isTouched: true };
};

const NewArticle = props => {
  const [formIsValid, setFormIsValid] = useState(false);

  const ctx = useContext(Context);

  const {
    value: enteredKey,
    isValid: keyIsValid,
    hasError: keyHasError,
    valueChangeHandler: keyChangeHandler,
    inputBlurHandler: validateKeyHandler,
    reset: resetKeyHandler
  } = useInput(isKey);

  const {
    value: enteredHeading,
    isValid: headingIsValid,
    hasError: headingHasError,
    valueChangeHandler: headingChangeHandler,
    inputBlurHandler: validateHeadingHandler,
    reset: resetHeadingHandler
  } = useInput(isLineText, 50, 100);

  const {
    value: enteredBriefText,
    isValid: briefTextIsValid,
    hasError: briefTextHasError,
    valueChangeHandler: briefTextChangeHandler,
    inputBlurHandler: validateBriefTextHandler,
    reset: resetBriefTextHandler
  } = useInput(isLineText, 120, 250);

  const {
    value: enteredText,
    isValid: textIsValid,
    hasError: textHasError,
    valueChangeHandler: textChangeHandler,
    inputBlurHandler: validateTextHandler,
    reset: resettextHandler
  } = useInput(isText, 300);

  const {
    value: selectedCathegory,
    isValid: cathegoryIsValid,
    hasError: cathegoryHasError,
    valueChangeHandler: cathegoryChangeHandler,
    inputBlurHandler: validateCathegoryHandler,
    reset: resetCathegoryHandler
  } = useInput(isNotEmpty);

  const {
    value: selectedPriority,
    isValid: priorityIsValid,
    hasError: priorityHasError,
    valueChangeHandler: priorityChangeHandler,
    inputBlurHandler: validatePriorityHandler,
    reset: resetPriorityHandler
  } = useInput(isNotEmpty);

  const {
    value: enteredFileDescription,
    isValid: fileDescriptionIsValid,
    hasError: fileDescriptionHasError,
    valueChangeHandler: fileDescriptionChangeHandler,
    inputBlurHandler: validateFileDescriptionHandler,
    reset: resetFileDescriptionHandler
  } = useInput(isLineText, 50, 200);


  const [filesState, dispatchFiles] = useReducer(filesReducer, {
    value: '',
    files: '',
    isValid: undefined,
    isTouched: false
  });

  const articleKeyRef = useRef();
  const articleHeadingRef = useRef();
  const articleBriefTextRef = useRef();
  const articleTextRef = useRef();
  const articleCathegoryRef = useRef();
  const articlePriorityRef = useRef();
  const filesRef = useRef();
  const filesDescriptionRef = useRef();

  const filesChangeHandler = event => {
    dispatchFiles({ type: 'USER_INPUT', val: event.target.value, files: event.target.files });
  };

  const validateFilesHandler = event => {
    dispatchFiles({ type: 'INPUT_BLUR' });
  };

  const resetFilesHandler = () => {
    dispatchFiles({ type: 'RESET' });
  };

  const { isValid: filesIsValid } = filesState;
  const { isTouched: filesIsTouched } = filesState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        keyIsValid && headingIsValid && briefTextIsValid && textIsValid && fileDescriptionIsValid && cathegoryIsValid && priorityIsValid && filesIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    }
  }, [keyIsValid, headingIsValid, briefTextIsValid, textIsValid, fileDescriptionIsValid, cathegoryIsValid, priorityIsValid, filesIsValid]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = event => {
    event.preventDefault();

    if (formIsValid) {
      setIsSubmitting(true);

      const articleDate = new Date();
      const newArticle = {};

      const key = `${ enteredKey }-${ articleDate.getDate() }${ articleDate.getMonth() + 1 }${ articleDate.getFullYear() }-${ articleDate.getHours() }${ articleDate.getMinutes() }`;

      const imageRefs = [];
      const files = Array.from(filesState.files);

      files.forEach((element, index) => {
        imageRefs[index] = ref(storage, `images/${ key }/${ element.name }`);
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

      (async function () {
        const urls = await uploadFiles();
        
        newArticle.key = key;
        newArticle.priority = +selectedPriority;
        newArticle.cathegory = selectedCathegory;
        newArticle.date = articleDate;
        newArticle.heading = enteredHeading;
        newArticle.briefText = enteredBriefText;
        newArticle.text = enteredText.split('\n');
        newArticle.images = [];
        
        urls.forEach((el, index) => {
          const imageData = {
            href: el,
            text: ''
          };

          if (index === 0) {
            imageData.text = enteredFileDescription;
          }

          newArticle.images.push(imageData);
        });

        ctx.addArticleHandler(newArticle, key);

        resetKeyHandler();
        resetHeadingHandler();
        resetBriefTextHandler();
        resettextHandler();
        resetCathegoryHandler();
        resetPriorityHandler();
        resetFilesHandler();
        resetFileDescriptionHandler();

        alert('Форма отправлена!');
        setIsSubmitting(false);
      })();
    } else if (!keyIsValid) {
      articleKeyRef.current.focus();
    } else if (!headingIsValid) {
      articleHeadingRef.current.focus();
    } else if (!briefTextIsValid) {
      articleBriefTextRef.current.focus();
    } else if (!textIsValid) {
      articleTextRef.current.focus();
    } else if (!cathegoryIsValid) {
      articleCathegoryRef.current.focus();
    } else if (!priorityIsValid) {
      articlePriorityRef.current.focus();
    } else if (!filesIsValid) {
      filesRef.current.focus();
    } else {
      filesDescriptionRef.current.focus();
    }
  };

  return (
    <section>
      <article>
        <h2>Добавить новость</h2>
        <form onSubmit={ submitHandler }>
          <div className={ styles.control }>
            {
              keyHasError &&
              <p className={ styles.invalidInfo }>
                Ключ может содержать только латинские буквы в нижнем регистре, цифры, символы "-" и "_" без пробелов. Минимальное число символов — 5, максимальное — 50.
              </p>
            }
            <label htmlFor="article_key">Ключ</label>
            <input
              type="text"
              id="article_key"
              ref={ articleKeyRef }
              value={enteredKey}
              onChange={keyChangeHandler}
              onBlur={validateKeyHandler}
            />
          </div>
          <div className={ styles.control }>
            {
              headingHasError &&
              <p className={ styles.invalidInfo }>
                Заголовок может содержать только буквы, цифры, пробелы и символы -.,!?%;:«»„”.  Минимальное число символов — 50, максимальное — 100.
              </p>
            }
            <label htmlFor="article_heading">Заголовок</label>
            <input
              type="text"
              id="article_heading"
              ref={ articleHeadingRef }
              value={enteredHeading}
              onChange={headingChangeHandler}
              onBlur={validateHeadingHandler}
            />
          </div>
          <div className={ styles.control }>
            {
              briefTextHasError &&
              <p className={ styles.invalidInfo }>
                Краткое описание может содержать только буквы, цифры, пробелы и символы -.,!?%;:«»„”. Минимальное число символов — 120, максимальное — 250.
              </p>
            }
            <label htmlFor="article_brief_text">Краткое описание</label>
            <textarea
              className={ styles.brief }
              id="article_brief_text"
              ref={ articleBriefTextRef }
              value={enteredBriefText}
              onChange={briefTextChangeHandler}
              onBlur={validateBriefTextHandler}
            />
          </div>
          <div className={ styles.control }>
            {
              textHasError &&
              <p className={ styles.invalidInfo }>
                Текст новости может содержать только буквы, цифры, пробелы и символы -.,!?%;:«»„”. Минимальное число символов — 300.
              </p>
            }
            <label htmlFor="article_text">Текст новости</label>
            <textarea
              className={ styles.articleText }
              id="article_text"
              ref={ articleTextRef }
              value={enteredText}
              onChange={textChangeHandler}
              onBlur={validateTextHandler}
            />
          </div>
          <div className={ styles.select }>
            {
              cathegoryHasError &&
              <p className={ styles.invalidInfo }>
                Выберите категорию новости.
              </p>
            }
            <label htmlFor="cathegory">Категория</label>
            <select
              id="cathegory"
              name="cathegory"
              ref={ articleCathegoryRef }
              value={selectedCathegory}
              onChange={cathegoryChangeHandler}
              onBlur={validateCathegoryHandler}
            >
              <option value="" hidden disabled>Выберите категорию</option>
              <option value="politics">Политика</option>
              <option value="economy">Экономика</option>
              <option value="world">В мире</option>
              <option value="sport">Спорт</option>
            </select>
          </div>
          <div className={ styles.select }>
            {
              priorityHasError &&
              <p className={ styles.invalidInfo }>
                Выберите приоритет новости.
              </p>
            }
            <label htmlFor="priority">Приоритет</label>
            <select
              id="priority"
              name="priority"
              ref={ articlePriorityRef }
              value={selectedPriority}
              onChange={priorityChangeHandler}
              onBlur={validatePriorityHandler}
            >
              <option value="" hidden disabled>Выберите приоритет</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <div className={ styles.fileInput }>
            {
              !filesIsValid && filesIsTouched &&
              <p className={ styles.invalidInfo }>
                Загрузите файлы с расширением .png, .jpg или .webp.
              </p>
            }
            <input
              name="userfiles"
              id="userfiles"
              type="file"
              multiple
              accept="image/png, image/jpeg, .webp"
              ref={ filesRef }
              value={filesState.value}
              onChange={filesChangeHandler}
              onBlur={validateFilesHandler}
            />
            <div className={ styles.control }>
              {
                fileDescriptionHasError &&
                <p className={ styles.invalidInfo }>
                  Описание изображения может содержать только буквы, цифры, пробелы и символы -.,!?%;:«»„”. Минимальное число символов — 50, максимальное — 200.
                </p>
              }
              <label htmlFor="files_description">Описание изображения</label>
              <textarea
                className={ styles.brief }
                id="files_description"
                ref={ filesDescriptionRef }
                required
                value={enteredFileDescription}
                onChange={fileDescriptionChangeHandler}
                onBlur={validateFileDescriptionHandler}
              />
            </div>
          </div>
          <button type="submit" className={ styles.submitButton } disabled={ !formIsValid }>
            Добавить новость
          </button>
        </form>
        { isSubmitting && <p>Форма отправляется...</p> }
      </article>
    </section>
  )
};

export default NewArticle;
