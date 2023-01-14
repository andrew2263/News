import React, { useRef } from 'react';

import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styles from './NewArticle.module.css';
import { upload } from '@testing-library/user-event/dist/upload';

const NewArticle = props => {
  const articleKeyRef = useRef();
  const articleHeadingRef = useRef();
  const articleBriefTextRef = useRef();
  const articleTextRef = useRef();
  const articleCathegoryRef = useRef();
  const articlePriorityRef = useRef();
  const filesRef = useRef();
  const filesDescriptionRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
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
    })();
  };

  return (
    <section>
      <article>
        <h2>Добавить новость</h2>
        <form onSubmit={ submitHandler }>
          <div className={ styles.control }>
            <label htmlFor="article_key">Ключ</label>
            <input type="text" id="article_key" ref={ articleKeyRef } required />
          </div>
          <div className={ styles.control }>
            <label htmlFor="article_heading">Заголовок</label>
            <input type="text" id="article_heading" ref={ articleHeadingRef } required />
          </div>
          <div className={ styles.control }>
            <label htmlFor="article_brief_text">Краткое описание</label>
            <textarea className={ styles.brief } id="article_brief_text" ref={ articleBriefTextRef } required />
          </div>
          <div className={ styles.control }>
            <label htmlFor="article_text">Текст новости</label>
            <textarea className={ styles.articleText } id="article_text" ref={ articleTextRef } required />
          </div>
          <div className={ styles.select }>
            <label htmlFor="cathegory">Категория</label>
            <select id="cathegory" name="cathegory" ref={ articleCathegoryRef } defaultValue="" required>
              <option disabled hidden value="">Выберите категорию</option>
              <option value="politics">Политика</option>
              <option value="economy">Экономика</option>
              <option value="world">В мире</option>
              <option value="sport">Спорт</option>
            </select>
          </div>
          <div className={ styles.select }>
            <label htmlFor="priority">Приоритет</label>
            <select id="priority" name="priority" ref={ articlePriorityRef } defaultValue="" required>
              <option disabled hidden value="">Выберите приоритет</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <div className={ styles.fileInput }>
            <input name="userfiles" id="userfiles" type="file" multiple accept="image/png, image/jpeg, .webp" ref={ filesRef } />
            <div className={ styles.control }>
              <label htmlFor="files_description">Описание изображения</label>
              <textarea className={ styles.brief } id="files_description" ref={ filesDescriptionRef } required />
            </div>
          </div>
          <button className={ styles.submitButton } type="submit">
            Добавить новость
          </button>
        </form>
      </article>
    </section>
  )
};

export default NewArticle;
