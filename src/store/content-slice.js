import { createSlice } from "@reduxjs/toolkit";
//import { sendArticle, updateCommentsHandler } from "./helper";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: [],
    prevContent: [],
    articleAdded: false,
  },
  reducers: {
    addArticle(state, action) {
      //const addAction = action.payload;

      // начало добавления статьи
      const lastPriorityItem = {
        '1': 0,
        '2': 2,
        '3': 3,
      };

      const article = action.payload;
      //const onSuccess = addAction.formIsSubmitted;
      //const onFail = addAction.errorHandler;

      state.prevContent = [...state.content];

      let updatedContent = [...state.content];

      const arrPriority = state.content.filter(
        (elem) => elem.priority === article.priority
      );
      const lowerPriorityArticle =
        arrPriority[lastPriorityItem[article.priority.toString()]];
      const lowerPriorityArticleIndex = state.content.findIndex((elem) => {
        return elem.key === lowerPriorityArticle?.key;
      });

      if (article.priority !== 4 && typeof article.priority === "number") {
        const copyContent = [...state.content];
        copyContent[lowerPriorityArticleIndex] = {
          ...copyContent[lowerPriorityArticleIndex],
          priority: 4,
        };
        updatedContent = [...copyContent];
      }

      updatedContent = [...updatedContent, article];

      state.content = updatedContent;

      state.articleAdded = true;
      
      // конец добавления статьи, получен массив статей с новой статьёй

      // начало добавления объекта с комментариями для новой статьи

      /*
      const newComments = {
        key: key,
        comments: [],
      };

      const updatedComments = [...comments, newComments];
      */
      // получен новый массив со всеми комментариями, в который добавлен объект
      // с комментариями для новой статьи

      // функция для удаления последнего элемента такой же приоритетности из массива статей
/*
      const changeUpdatedContent = () => {
        const addedArticleIndex = updatedContent.findIndex(
          (elem) => elem.key === article.key
        );
        updatedContent[lowerPriorityArticleIndex] = {
          ...updatedContent[lowerPriorityArticleIndex],
          priority: article.priority,
        };
        updatedContent.splice(addedArticleIndex, 1);
      };
*/
      // при успешном отправлении статьи на сервер обновляются комментарии
/*
      const onSuccessSendingArticle = () => {
        console.log('1');
        updateCommentsHandler(updatedComments, () => {
          state.content = updatedContent;
          state.comments = updatedComments;
          onSuccess();
          console.log('2');
        }).catch(
          (error) => {
            console.log('3');
            changeUpdatedContent();
            const newCommentsKey = updatedComments.findIndex(
              (comment) => comment.key === key
            );
            updatedComments.splice(newCommentsKey, 1);
            sendArticle(updatedContent, () => {
              state.content = updatedContent;
              state.comments = updatedComments;
              console.log('4');
            }).catch((error) => {
              onFail(error);
              console.log('5');
            });
            onFail(error);
            console.log('6');
          }
        );
      };
*/
      // отправление статьи на сервер
/*
      sendArticle(updatedContent, onSuccessSendingArticle).catch((error) => {
        //changeUpdatedContent();
        onFail(error);
        console.log('7');
      });
      */
    },
    loadContentHandler(state, action) {
      const data = action.payload;
      state.content = data;
    },
    setArticleIsSent(state) {
      state.articleAdded = false;
    },
    /*
    loadCommentsHandler(state, action) {
      const data = action.payload;
      state.comments = data;
      console.log(state.comments);
    },
    */
  },
});

export const contentActions = contentSlice.actions;

export default contentSlice;
