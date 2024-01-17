import { createSlice } from "@reduxjs/toolkit";

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
      const article = action.payload;
      state.prevContent = [...state.content];
      const updatedContent = [...state.content, article];
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
