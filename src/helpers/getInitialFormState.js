import { MAIN_RUBRICS } from "../constants/NewsRubrics.Constant";

export const initialFormNewArticleState = {
  key: {
    value: "",
    touched: false,
    valid: false,
    hasError: false,
  },
  heading: {
    value: "",
    touched: false,
    valid: false,
    hasError: false,
  },
  briefText: {
    value: "",
    touched: false,
    valid: false,
    hasError: false,
  },
  text: {
    value: "",
    touched: false,
    valid: false,
    hasError: false,
  },
  category: {
    value: "",
    touched: false,
    valid: false,
    hasError: false,
  },
  priority: {
    value: "",
    touched: false,
    valid: false,
    hasError: false,
  },
  description: {
    value: "",
    touched: false,
    valid: false,
    hasError: false,
  },
};

export const getInitialEditArticleFormState = (article) => {
  const {
    key, heading, briefText, text, category, priority, images
  } = article;


  return {
    key: {
      value: key,
      touched: false,
      valid: true,
      hasError: false,
    },
    heading: {
      value: heading,
      touched: false,
      valid: true,
      hasError: false,
    },
    briefText: {
      value: briefText,
      touched: false,
      valid: true,
      hasError: false,
    },
    text: {
      value: text.join("\n"),
      touched: false,
      valid: true,
      hasError: false,
    },
    category: {
      value: MAIN_RUBRICS.find((el) => el.value === category)?.name,
      touched: false,
      valid: true,
      hasError: false,
    },
    priority: {
      value: priority,
      touched: false,
      valid: true,
      hasError: false,
    },
    description: {
      value: images?.[0]?.text,
      touched: false,
      valid: true,
      hasError: false,
    },
  };
};
