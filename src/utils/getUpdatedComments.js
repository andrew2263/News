export const getUpdatedComments = (key, comments) => {
  const newComments = {
    key,
    comments: [],
  };

  const updatedComments = [...comments, newComments];

  return updatedComments;
}
