import React, { useState, useRef, useReducer, useEffect } from 'react';

import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styles from './NewArticle.module.css';

const keyReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: /^[a-z0-9-_]+$/.test(action.val)
        && action.val.toString().length >= 5
        && action.val.toString().length <= 50,
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: /^[a-z0-9-_]+$/.test(state.value)
        && state.value.toString().length >= 5
        && state.value.toString().length <= 50,
      isTouched: true
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', isValid: false, isTouched: true };
};

const headingReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”]+$/.test(action.val)
        && action.val.toString().length >= 50
        && action.val.toString().length <= 100,
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”]+$/.test(state.value)
        && state.value.toString().length >= 50
        && state.value.toString().length <= 100,
      isTouched: true
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', isValid: false, isTouched: true };
};

const briefTextReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”]+$/.test(action.val)
        && action.val.toString().length >= 120
        && action.val.toString().length <= 250,
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”]+$/.test(state.value)
        && state.value.toString().length >= 120
        && state.value.toString().length <= 250,
      isTouched: true
    }
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', isValid: false, isTouched: true };
};

const textReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”\n]+$/.test(action.val)
        && action.val.toString().length >= 300,
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”\n]+$/.test(state.value)
        && state.value.toString().length >= 300,
      isTouched: true
    }
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', isValid: false, isTouched: true };
};

const fileDescriptionReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”\n]+$/.test(action.val)
        && action.val.toString().length >= 50
        && action.val.toString().length <= 200,
      isTouched: state.isTouched
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: /^[а-яА-ЯёЁa-zA-Z0-9- .,!?%;:«»„”\n]+$/.test(state.value)
        && state.value.toString().length >= 50
        && state.value.toString().length <= 200,
      isTouched: true
    }
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', isValid: false, isTouched: true };
};

const cathegoryReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val !== '',
      isTouched: state.isTouched
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value !== '',
      isTouched: true
    }
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', isValid: false, isTouched: true };
};

const priorityReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val !== '',
      isTouched: state.isTouched
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value !== '',
      isTouched: true
    }
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
      isValid: undefined
    }
  }
  return { value: '', isValid: false, isTouched: true };
};

const filesReducer = (state, action) => {
  const fileTypes = ['image/png', 'image/jpeg', 'image/webp'];

  if (action.type === 'USER_INPUT') {
    console.log(action.val);
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
    console.log(state.value);
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
}


const NewArticle = props => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [keyState, dispatchKey] = useReducer(keyReducer, {
    value: '',
    isValid: undefined,
    isTouched: false
  });

  const [headingState, dispatchHeading] = useReducer(headingReducer, {
    value: '',
    isValid: undefined,
    isTouched: false
  });

  const [briefTextState, dispatchBriefText] = useReducer(briefTextReducer, {
    value: '',
    isValid: undefined,
    isTouched: false
  });

  const [textState, dispatchText] = useReducer(textReducer, {
    value: '',
    isValid: undefined,
    isTouched: false
  });

  const [fileDescriptionState, dispatchFileDescription] = useReducer(fileDescriptionReducer, {
    value: '',
    isValid: undefined,
    isTouched: false
  });

  const [cathegoryState, dispatchCathegory] = useReducer(cathegoryReducer, {
    value: '',
    isValid: undefined,
    isTouched: false
  });

  const [priorityState, dispatchPriority] = useReducer(priorityReducer, {
    value: '',
    isValid: undefined,
    isTouched: false
  });

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

  const keyChangeHandler = event => {
    dispatchKey({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateKeyHandler = () => {
    dispatchKey({ type: 'INPUT_BLUR' });
  };

  const resetKeyHandler = () => {
    dispatchKey({ type: 'RESET' });
  };

  const headingChangeHandler = event => {
    dispatchHeading({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateHeadingHandler = event => {
    dispatchHeading({ type: 'INPUT_BLUR' });
  };

  const resetHeadingHandler = () => {
    dispatchHeading({ type: 'RESET' });
  };

  const briefTextChangeHandler = event => {
    dispatchBriefText({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateBriefTextHandler = event => {
    dispatchBriefText({ type: 'INPUT_BLUR' });
  };

  const resetBriefTextHandler = () => {
    dispatchBriefText({ type: 'RESET' });
  };

  const textChangeHandler = event => {
    dispatchText({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateTextHandler = event => {
    dispatchText({ type: 'INPUT_BLUR' });
  };

  const resettextHandler = () => {
    dispatchText({ type: 'RESET' });
  };

  const fileDescriptionChangeHandler = event => {
    dispatchFileDescription({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateFileDescriptionHandler = event => {
    dispatchFileDescription({ type: 'INPUT_BLUR' });
  };

  const resetFileDescriptionHandler = () => {
    dispatchFileDescription({ type: 'RESET' });
  };

  const cathegoryChangeHandler = event => {
    dispatchCathegory({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateCathegoryHandler = event => {
    dispatchCathegory({ type: 'INPUT_BLUR' });
  };

  const resetCathegoryHandler = () => {
    dispatchCathegory({ type: 'RESET' });
  };

  const priorityChangeHandler = event => {
    dispatchPriority({ type: 'USER_INPUT', val: event.target.value });
  };

  const validatePriorityHandler = event => {
    dispatchPriority({ type: 'INPUT_BLUR' });
  };

  const resetPriorityHandler = () => {
    dispatchPriority({ type: 'RESET' });
  };

  const filesChangeHandler = event => {
    dispatchFiles({ type: 'USER_INPUT', val: event.target.value, files: event.target.files });
  };

  const validateFilesHandler = event => {
    dispatchFiles({ type: 'INPUT_BLUR' });
  };

  const resetFilesHandler = () => {
    dispatchFiles({ type: 'RESET' });
  };

  const { isValid: keyIsValid } = keyState;
  const { isValid: headingIsValid } = headingState;
  const { isValid: briefTextIsValid } = briefTextState;
  const { isValid: textIsValid } = textState;
  const { isValid: fileDescriptionIsValid } = fileDescriptionState;
  const { isValid: cathegoryIsValid } = cathegoryState;
  const { isValid: priorityIsValid } = priorityState;
  const { isValid: filesIsValid } = filesState;

  const { isTouched: keyIsTouched } = keyState;
  const { isTouched: headingIsTouched } = headingState;
  const { isTouched: briefTextIsTouched } = briefTextState;
  const { isTouched: textIsTouched } = textState;
  const { isTouched: fileDescriptionIsTouched } = fileDescriptionState;
  const { isTouched: cathegoryIsTouched } = cathegoryState;
  const { isTouched: priorityIsTouched } = priorityState;
  const { isTouched: filesIsTouched } = filesState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity');
      setFormIsValid(
        keyIsValid && headingIsValid && briefTextIsValid && textIsValid && fileDescriptionIsValid && cathegoryIsValid && priorityIsValid && filesIsValid
      );
    }, 500);

    return () => {
      console.log('cleanup');
      clearTimeout(identifier);
    }
  }, [keyIsValid, headingIsValid, briefTextIsValid, textIsValid, fileDescriptionIsValid, cathegoryIsValid, priorityIsValid, filesIsValid]);

  const [isSubmitting, setIsSubmitting] = useState(false);
/*
  const cleanForm = () => {
    articleKeyRef.current.value = '';
    articleHeadingRef.current.value = '';
    articleBriefTextRef.current.ref = '';
    articleTextRef.current.value = '';
    articleCathegoryRef.current.value = '';
    articlePriorityRef.current.value = '';
    filesRef.current.value = '';
    filesDescriptionRef.current.value = '';
  };
*/
  const submitHandler = event => {
    event.preventDefault();

    if (formIsValid) {
      setIsSubmitting(true);

      const articleDate = new Date();
      const newArticle = {};

      const key = `${ articleKeyRef.current.value }-${ articleDate.getDate() }${ articleDate.getMonth() + 1 }${ articleDate.getFullYear() }-${ articleDate.getHours() }${ articleDate.getMinutes() }`;

      const imageRefs = [];
      const files = Array.from(filesRef.current.files);

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
        newArticle.priority = +articlePriorityRef.current.value;
        newArticle.cathegory = articleCathegoryRef.current.value;
        newArticle.date = articleDate;
        newArticle.heading = articleHeadingRef.current.value;
        newArticle.briefText = articleBriefTextRef.current.value;
        newArticle.text = articleTextRef.current.value.split('\n');
        newArticle.images = [];
        
        urls.forEach((el, index) => {
          const imageData = {
            href: el,
            text: ''
          };

          if (index === 0) {
            imageData.text = filesDescriptionRef.current.value;
          }

          newArticle.images.push(imageData);
        });

        props.addNewArticle(newArticle);
        //cleanForm();

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
              !keyIsValid && keyIsTouched &&
              <p className={ styles.invalidInfo }>
                Ключ может содержать только латинские буквы в нижнем регистре, цифры, символы "-" и "_" без пробелов. Минимальное число символов — 5, максимальное — 50.
              </p>
            }
            <label htmlFor="article_key">Ключ</label>
            <input
              type="text"
              id="article_key"
              ref={ articleKeyRef }
              value={keyState.value}
              onChange={keyChangeHandler}
              onBlur={validateKeyHandler}
            />
          </div>
          <div className={ styles.control }>
            {
              !headingIsValid && headingIsTouched &&
              <p className={ styles.invalidInfo }>
                Заголовок может содержать только буквы, цифры, пробелы и символы -.,!?%;:«»„”.  Минимальное число символов — 50, максимальное — 100.
              </p>
            }
            <label htmlFor="article_heading">Заголовок</label>
            <input
              type="text"
              id="article_heading"
              ref={ articleHeadingRef }
              value={headingState.value}
              onChange={headingChangeHandler}
              onBlur={validateHeadingHandler}
            />
          </div>
          <div className={ styles.control }>
            {
              !briefTextIsValid && briefTextIsTouched &&
              <p className={ styles.invalidInfo }>
                Краткое описание может содержать только буквы, цифры, пробелы и символы -.,!?%;:«»„”. Минимальное число символов — 120, максимальное — 250.
              </p>
            }
            <label htmlFor="article_brief_text">Краткое описание</label>
            <textarea
              className={ styles.brief }
              id="article_brief_text"
              ref={ articleBriefTextRef }
              value={briefTextState.value}
              onChange={briefTextChangeHandler}
              onBlur={validateBriefTextHandler}
            />
          </div>
          <div className={ styles.control }>
            {
              !textIsValid && textIsTouched &&
              <p className={ styles.invalidInfo }>
                Текст новости может содержать только буквы, цифры, пробелы и символы -.,!?%;:«»„”. Минимальное число символов — 300.
              </p>
            }
            <label htmlFor="article_text">Текст новости</label>
            <textarea
              className={ styles.articleText }
              id="article_text"
              ref={ articleTextRef }
              value={textState.value}
              onChange={textChangeHandler}
              onBlur={validateTextHandler}
            />
          </div>
          <div className={ styles.select }>
            {
              !cathegoryIsValid && cathegoryIsTouched &&
              <p className={ styles.invalidInfo }>
                Выберите категорию новости.
              </p>
            }
            <label htmlFor="cathegory">Категория</label>
            <select
              id="cathegory"
              name="cathegory"
              ref={ articleCathegoryRef }
              value={cathegoryState.value}
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
              !priorityIsValid && priorityIsTouched &&
              <p className={ styles.invalidInfo }>
                Выберите приоритет новости.
              </p>
            }
            <label htmlFor="priority">Приоритет</label>
            <select
              id="priority"
              name="priority"
              ref={ articlePriorityRef }
              value={priorityState.value}
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
                !fileDescriptionIsValid && fileDescriptionIsTouched &&
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
                value={fileDescriptionState.value}
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
