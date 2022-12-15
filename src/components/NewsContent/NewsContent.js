import React from 'react';

import { CONTENT } from './content';
import styles from './NewsContent.module.css';

const NewsContent = (props) => {
  const newsImg = (images) => images.map(image => {
    return (
      <img src={ image.href } alt={ image.text }></img>
    );
  });
  
  const onNewsReadHandler = event => {
    event.preventDefault();
    props.onShowArticle(event.target.value);
  }
  
  const newsList = CONTENT.map((item) => {
    if (item.cathegory === props.cathegory) {
      return (
        <li
          key={ item.key }
        >
          <h2>{ item.heading }</h2>
          <div className={ styles['news__content-info'] }>
            <div className={ styles['news__img-wrapper'] }>
              { newsImg(item.images)[0] }
            </div>
            <p className={ styles['news__brief-text'] }>{ item.briefText }</p>
          </div>
          <button type='button' onClick={ onNewsReadHandler } value={ item.key }>Read</button>
        </li>
      );
    }
  });

  return (
    <section>
      <h1>
        Политика
      </h1>
      <ul>
        { newsList }
      </ul>
    </section>
  );
};

export default NewsContent;
