const getZero = (time) => {
  return time < 10 ? `0${time}` : time;
};

export const dateWithoutTime = (date) => {
  const newDate = new Date();
  newDate.setDate(date.getDate());
  newDate.setMonth(date.getMonth());
  newDate.setFullYear(date.getFullYear());
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const isToday = (date) => {
  const today = new Date();
  if (+dateWithoutTime(date) === +dateWithoutTime(today)) {
    return true;
  }

  return false;
};

const isTomorrow = (date) => {
  const tomorrow = +dateWithoutTime(new Date()) - 86400000;

  if (+dateWithoutTime(date) === tomorrow) {
    return true;
  }

  return false;
};

export const parseDateMonthString = (date, isTime = true) => {
  const monthToString = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  let textDate;

  if (isToday(date)) {
    textDate = "Сегодня";
  }
  if (isTomorrow(date)) {
    textDate = "Вчера";
  }
  if (!isToday(date) && !isTomorrow(date)) {
    textDate = `${date.getDate()} ${
      monthToString[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  const textTime = `${getZero(date.getHours())}:${getZero(date.getMinutes())}`;

  if (!isTime) {
    return `${textDate}`;
  }

  return `${textDate} ${textTime}`;
};

export const parseDateMonthNumber = (date) => {
  let textDate;

  if (isToday(date)) {
    textDate = "Сегодня";
  }
  if (isTomorrow(date)) {
    textDate = "Вчера";
  }
  if (!isToday(date) && !isTomorrow(date)) {
    textDate = `${getZero(date.getDate())}.${getZero(
      date.getMonth() + 1
    )}.${date.getFullYear()}`;
  }

  const textTime = `${getZero(date.getHours())}:${getZero(date.getMinutes())}`;

  return `${textDate} ${textTime}`;
};
