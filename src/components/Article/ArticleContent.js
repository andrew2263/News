import styles from './ArticleContent.module.css';

const ArticleContent = props => {
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
      </article>
    </section>
  );
};

export default ArticleContent;
