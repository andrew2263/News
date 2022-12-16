import React, { useRef } from "react";

import './NewComment.module.css';

const NewComment = props => {
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
    props.onAddComment(comment);
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
      <label htmlFor="name">Введите имя</label>
      <input id="name" type="text" ref={ nameInputRef } />
      <textarea cols="100" rows="5" 
        placeholder="Ведите комментарий"
        ref={ textInputRef }
      />
      <button type="submit">Отправить комментарий</button>
      <button type="button" onClick={ onBtnCleanHAndler }>Очистить</button>
    </form>
  )
}

export default NewComment;