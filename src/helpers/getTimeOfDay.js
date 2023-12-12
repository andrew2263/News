export const getTimeOfDay = (date) => {
  const hours = date.getHours();

  if (hours >= 0 && hours < 5) {
    return "Доброй ночи";
  }
  if (hours >= 5 && hours < 12) {
    return "Доброе утро";
  }
  if (hours >= 12 && hours < 17) {
    return "Добрый день";
  }
  if (hours >= 17 && hours <= 23) {
    return "Добрый вечер";
  }
  return "Добрый день";
};
