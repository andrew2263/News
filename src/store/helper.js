import { app } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";

export const sendArticle = async (data, onSuccess) => {
  const putResponse = await fetch('https://news-acc8f-default-rtdb.firebaseio.com/content.json', {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  if (!putResponse.ok) {
    throw new Error('Не удалось отправить форму.');
  } else {
    onSuccess();
  }
};

export const editArticleHandler = (index, editedArticle, onSuccess, onError) => {
  const database = getDatabase(app);

  const editArticlePath = `content/${index}`;
  const databaseRef = ref(database, editArticlePath);

  set(databaseRef, editedArticle)
    .then(() => {
      onSuccess(editedArticle);
    })
    .catch((error) => {
      console.error(error);
      onError(error);
    });
};
