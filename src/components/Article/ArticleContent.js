import React from "react";

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
    <article>
      <h2>{ props.content.heading }</h2>
      <p>{ props.content.briefText }</p>
      <div>
        { newsImg(props.content.images, 0, 1) }
        { newsImgText(props.content.images, 0, 1) }
      </div>
      { articleText(props.content.text) }
        { newsImg(props.content.images, 1) }
        { newsImgText(props.content.images, 1) }
    </article>
  );
};

export default ArticleContent;
