import { createSlice } from "@reduxjs/toolkit";
//import { sendArticle, updateCommentsHandler } from "./helper";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: [],
    prevContent: [],
    articleAdded: false,
    updatedComments: [],
  },
  reducers: {
    addArticle(state, action) {
      const lastPriorityItem = {
        '1': 0,
        '2': 2,
        '3': 3,
      };

      const article = action.payload;

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
  
    },
    loadContentHandler(state, action) {
      const data = action.payload;
      state.content = data;
    },
    setArticleIsSent(state) {
      state.articleAdded = false;
    },
    setPrevContent(state) {
      state.content = state.prevContent;
    },
    removeCommentHandler(state, action) {
      state.prevContent = [...state.content];

      const commentIndex = state.content.findIndex((elem) => elem.key === action.payload.newsId);

      const newCommentsList = state.content[commentIndex].comments;

      const removedCommentIndex = newCommentsList.findIndex(elem => {
        return elem.id === +action.payload.commentId;
      });
      newCommentsList.splice(removedCommentIndex, 1);

      console.log(newCommentsList);
      state.updatedComments = newCommentsList;
    },
    addCommentHandler(state, action) {
      state.prevContent = [...state.content];
      const commentIndex = state.content.findIndex((elem) => elem.key === action.payload.newsId);
      const newCommentsList = state.content[commentIndex].comments;
      //const updatedCommentsList = [...newCommentsList, action.payload.comment];
      newCommentsList.push(action.payload.comment);

      state.updatedComments = newCommentsList;
    }
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
