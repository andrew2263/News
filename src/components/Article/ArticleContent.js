import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Context from '../../store/context';
import styles from './ArticleContent.module.css';

const ArticleContent = () => {
  const params = useParams();
  const { newsId } = params;

  const ctx = useContext(Context);

  const item = ctx.content[ctx.content.findIndex(el => {
    return el.key === newsId;
  })];


  const articleText = (text) => text.map(text => {
    return (
      <p key={Math.random()}>{ text }</p>
    );
  });
  
  const newsImg = (images, start, end) => images.slice(start, end).map(image => {
    return (
      <img key={Math.random()} src={ image.href } alt={ image.text }></img>
    );
  });
  
  const newsImgText = (images, start, end) => images.slice(start, end).map(image => {
    return (
      <p key={Math.random()}>{ image.text }</p>
    )
  });

  return (
    <section>
      <article>
        <h2>{ item.heading }</h2>
        <p>{ item.briefText }</p>
        <div className={styles['article__img-wrapper']}>
          { newsImg(item.images, 0, 1) }
          { newsImgText(item.images, 0, 1) }
        </div>
        { articleText(item.text) }
        <div className={styles['article__img-wrapper']}>
          { newsImg(item.images, 1) }
          { newsImgText(item.images, 1) }
        </div>
      </article>
    </section>
  );
};

export default ArticleContent;
