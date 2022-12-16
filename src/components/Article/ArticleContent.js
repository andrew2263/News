import React from "react";

import styles from './ArticleContent.module.css';

const ArticleContent = props => {
  const articleText = (text) => text.map(text => {
    return (
      <p>{ text }</p>
    );
  });
  
  const newsImg = (images, start, end) => images.slice(start, end).map(image => {
    return (
      <img src={ image.href } alt={ image.text }></img>
    );
  });
  
  const newsImgText = (images, start, end) => images.slice(start, end).map(image => {
    return (
      <p>{ image.text }</p>
    )
  });

  return (
    <React.Fragment>
      <h2>{ props.content.heading }</h2>
      <p>{ props.content.briefText }</p>
      <div className={styles['article__img-wrapper']}>
        { newsImg(props.content.images, 0, 1) }
        { newsImgText(props.content.images, 0, 1) }
      </div>
      { articleText(props.content.text) }
      <div className={styles['article__img-wrapper']}>
        { newsImg(props.content.images, 1) }
        { newsImgText(props.content.images, 1) }
      </div>
    </React.Fragment>
  );
};

export default ArticleContent;
