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

export const updateCommentsHandler = async (id, data, onSuccess) => {
    const patchResponse = await fetch(`https://news-acc8f-default-rtdb.firebaseio.com/content.json`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });

    if (!patchResponse.ok) {
      throw new Error('Ошибка загрузки комментариев');
    } else {
      onSuccess();
    }
};
