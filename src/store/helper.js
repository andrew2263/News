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
