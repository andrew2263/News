export const getUpdatedContent = (article, content) => {
  const lastPriorityItem = {
    1: 0,
    2: 2,
    3: 3,
  };

  let updatedContent = [...content];

  const arrPriority = content.filter(
    (elem) => elem.priority === article.priority
  );
  const lowerPriorityArticle =
    arrPriority[lastPriorityItem[article.priority.toString()]];
  const lowerPriorityArticleIndex = content.findIndex((elem) => {
    return elem.key === lowerPriorityArticle.key;
  });

  if (article.priority !== 4 && typeof article.priority === "number") {
    const copyContent = [...content];
    copyContent[lowerPriorityArticleIndex] = {
      ...copyContent[lowerPriorityArticleIndex],
      priority: 4,
    };
    updatedContent = [...copyContent];
  }

  updatedContent = [...updatedContent, article];

  return updatedContent;
}
