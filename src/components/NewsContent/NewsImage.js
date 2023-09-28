import React from "react"

const NewsImage = (props) => (
  <React.Fragment>
    <img src={props.src} alt={props.alt} />
  </React.Fragment>
);

export default NewsImage;
