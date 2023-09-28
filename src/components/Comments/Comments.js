import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "../Layout/Container";
import NewComment from "./NewComment";
import CommentsList from "./CommentsList";

import styles from "./Comments.module.scss";

const Comments = () => {
  const params = useParams();
  const { newsId } = params;

  const [errorMessage, setErrorMessage] = useState("");

  const content = useSelector((state) => state.content.content);

  const isContentLoaded = content.length ? true : false;

  const commentIndex = content.findIndex((elem) => elem.key === newsId);

  let commentsList = [];

  if (isContentLoaded && !content[commentIndex]) {
    commentsList = undefined;
    setErrorMessage("Комментарии к данной новости не загрузились.");
  }

  if (
    isContentLoaded &&
    content[commentIndex] &&
    content[commentIndex].comments
  ) {
    commentsList = content[commentIndex].comments;
  }

  let lastId;

  let isComments = commentsList && commentsList.length ? true : false;

  if (isComments) {
    lastId = commentsList[commentsList.length - 1].id;
  } else {
    lastId = -1;
  }

  return (
    <React.Fragment>
      {errorMessage && (
        <section>
          <Container>
            <p className={styles.error}>ERROR: {errorMessage}</p>
          </Container>
        </section>
      )}
      {!isContentLoaded && !errorMessage && (
        <section>
          <Container>
            <p className={styles.nocomments}>Комментарии загружаются...</p>
          </Container>
        </section>
      )}
      {isContentLoaded && !errorMessage && (
        <section>
          <Container>
            <article>
              <h3>Комментарии</h3>
              {isComments ? (
                <CommentsList index={commentIndex} commentData={commentsList} />
              ) : (
                ""
              )}
              {!isComments && <p>Комментариев пока нет.</p>}
              <NewComment id={lastId + 1} index={commentIndex} />
            </article>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
};

export default Comments;
