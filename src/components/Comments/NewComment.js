import React from "react";

import './NewComment.module.css';

const NewComment = () => {
  return (
    <div>
      <label for="name">Введите имя</label>
      <input id="name" type="text"></input>
      <textarea cols="200" rows="5" placeholder="Ведите комментарий"></textarea>
      <button type="submit">Отправить комментарий</button>
      <button type="button">Очистить</button>
    </div>
  )
}

export default NewComment;