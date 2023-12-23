import { createSlice } from "@reduxjs/toolkit";
//import { sortDateDesc } from "../helpers/sortDateDesc";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: [],
    prevContent: [],
    articleAdded: false,
    errorMessage: "",
  },
  reducers: {
    addArticle(state, action) {
      const lastPriorityItem = {
        1: 0,
        2: 2,
        3: 3,
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
    editArticleHandler(state, action) {
      const { editedArticle } = action.payload;

      const itemIndex = state.content.findIndex(
        (el) => el.key === editedArticle.key
      );

      state.content[itemIndex] = editedArticle;
    },
    deleteArticleHandler(state, action) {
      const { deletedArticle } = action.payload;

      const itemIndex = state.content.findIndex(
        (el) => el.key === deletedArticle.key
      );

      state.content.splice(itemIndex, 1);
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
    changeCommentHandler(state, action) {
      state.prevContent = [...state.content];

      const articleIndex = state.content.findIndex(
        (elem) => elem.key === action.payload.newsId
      );

      state.content[articleIndex].comments = action.payload.updatedComments;
    },
    editCommentHandler(state, action) {
      const { commentIndex, newsId, editedComment } = action.payload;

      const articleIndex = state.content.findIndex(
        (elem) => elem.key === newsId
      );

      state.content[articleIndex].comments[commentIndex] = editedComment;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const contentActions = contentSlice.actions;

export default contentSlice;
