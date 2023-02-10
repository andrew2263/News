import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import Container from '../Layout/Container';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import Context from '../../store/context';
import styles from './Comments.module.css';

const Comments = () => {
  const params = useParams();
  const { newsId } = params;

  const ctx = useContext(Context);

  let errorMessage = ctx.errorMessage['loadComments'];

  const isCommentsLoaded = ctx.comments.length ? true : false;

  const commentIndex = ctx.comments.findIndex(elem => elem.key === newsId);

  let commentsList = [];

  if (isCommentsLoaded && !ctx.comments[commentIndex]) {
    commentsList = undefined;
    errorMessage = 'Комментарии к данной новости не загрузились.';
  }

  if (isCommentsLoaded && ctx.comments[commentIndex] && ctx.comments[commentIndex].comments) {
    commentsList = ctx.comments[commentIndex].comments;
  }

  let lastId;

  let isComments = (commentsList && commentsList.length) ? true : false;

  if (isComments) {
    lastId = commentsList[commentsList.length - 1].id;
  } else {
    lastId = -1;
  }

  return (
    <React.Fragment>
      {
        errorMessage &&
        <section>
          <Container>
            <p className={ styles.error }>
              ERROR: { errorMessage }
            </p>
          </Container>
        </section>
      }
      { !isCommentsLoaded && !errorMessage &&
        <section>
          <Container>
            <p className={ styles.nocomments }>Комментарии загружаются...</p>
          </Container>
        </section>
      }
      { isCommentsLoaded && !errorMessage &&
        <section>
          <Container>
            <article>
              <h3>Комментарии</h3>
              { isComments ? <CommentsList
                commentData={ commentsList }
                /> : ''
              }
              { !isComments && <p>
                Комментариев пока нет.
              </p> }
              <NewComment
                id={ lastId + 1 }
              />
            </article>
          </Container>
        </section>
      }
    </React.Fragment>
  );
};

export default Comments;
