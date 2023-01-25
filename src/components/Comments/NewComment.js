import React, { useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Context from '../../store/context';
import styles from './NewComment.module.css';

const NewComment = props => {
  const params = useParams();

  const { newsId } = params;

  const ctx = useContext(Context);

  const nameInputRef = useRef();
  const textInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredText = textInputRef.current.value;
    let comment = {
      id: props.id,
      name: enteredName,
      text: enteredText,
      date: new Date()
    };
    ctx.addCommentHandler(comment, newsId);
    nameInputRef.current.value = '';
    textInputRef.current.value = '';
  };

  const onBtnCleanHAndler = event => {
    event.preventDefault();
    nameInputRef.current.value = '';
    textInputRef.current.value = '';
  }

  return (
    <form onSubmit={ submitHandler }>
      <div className={ styles.name }>
        <label htmlFor="name">Введите имя</label>
        <input id="name" type="text" ref={ nameInputRef } />
      </div>
      <textarea className={ styles.text }
        placeholder="Ведите комментарий"
        ref={ textInputRef }
      />
      <div>
        <button type="submit" className={ styles.submitButton }>
          Отправить комментарий
        </button>
        <button type="button" onClick={ onBtnCleanHAndler }>
          Очистить
        </button>
      </div>
    </form>
  )
}

export default NewComment;