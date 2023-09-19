export const sendArticle = async (data, onSuccess) => {
  console.log(data);
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

export const updateCommentsHandler = async (data, onSuccess) => {
  console.log(data);
    const putResponse = await fetch('https://news-acc8f-default-rtdb.firebaseio.com/comments.json', {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    if (!putResponse.ok) {
      console.log('error');
      throw new Error('Ошибка загрузки комментариев');
    } else {
      console.log('success');
      onSuccess();
    }
};
