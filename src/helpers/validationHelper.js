import { MAIN_RUBRICS } from "../constants/NewsRubrics.Constant";
import { ROLES } from "../constants/SignUpOptions.Constant";
import { GENDERS } from "../constants/SignUpOptions.Constant";

const isSomeOption = (value, options) => {
  return options.some((option) => option.name.toString() === value.toString());
};

export const isCategory = (value) => {
  return isSomeOption(value, MAIN_RUBRICS);
};

export const isPriority = (value) => {
  return [1,2,3,4].some((el) => el.toString() === value.toString());
};

export const isRole = (value) => {
  return isSomeOption(value, ROLES);
};

export const isGender = (value) => {
  return isSomeOption(value, GENDERS);
};

export const isKey = (value) => {
  return (
    /^[a-z0-9-_]+$/.test(value) &&
    value.toString().length >= 5 &&
    value.toString().length <= 50
  );
};

export const isHeading = (value) => {
  return (
    /[\w\s\p{P}\p{L}]/gu.test(value) &&
    value.toString().length >= 50 &&
    value.toString().length <= 100
  );
};

export const isBriefText = (value) => {
  return (
    /[\w\s\p{P}\p{L}]/gu.test(value) &&
    value.toString().length >= 70 &&
    value.toString().length <= 250
  );
};

export const isText = (value) => {
  return /[\w\s\p{P}\p{L}]/gu.test(value) && value.toString().length >= 300;
};

export const isNotEmpty = (value) => !!value;

export const isDescription = (value) => {
  return (
    /[\w\s\p{P}\p{L}]/gu.test(value) &&
    value.toString().length >= 50 &&
    value.toString().length <= 200
  );
};

export const isEmail = (value) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};

export const isPassword = (value) => {
  const isLength = !!(value?.length >= 8);
  const isNumbers = /\d+/g.test(value);
  const isLittleLtters = /[a-z\p{Ll}]/gu.test(value);
  const isBigLetters = /[A-Z\p{Lu}]/gu.test(value);
  const isSpecSymbols = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/g.test(value);
  return (
    isLength && isNumbers && isLittleLtters && isBigLetters && isSpecSymbols
  );
};

export const isSameValue = (value, field) => {
  return value === field?.value;
};

export const isName = (value) => {
  return (
    /[\w\s\p{L}]/gu.test(value) &&
    value.toString().length >= 2 &&
    value.toString().length <= 70
  );
};

export const isBirthday = (value) => {
  const date = Number(new Date(value.toString()));

  return date > -1577923200000 && date < 1136073600000;
};

export const articleValidation = {
  key: isKey,
  heading: isHeading,
  briefText: isBriefText,
  text: isText,
  category: isCategory,
  priority: isPriority,
  description: isDescription,
};
