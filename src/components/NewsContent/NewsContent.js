import React, { useContext } from 'react';

import Context from '../../store/context';
import styles from './NewsContent.module.css';
import Container from '../Layout/Container';
import BasicItem from './BasicItem';
import FirstPriorityItem from './FirstPriorityItem';
import SecondPriorityItem from './SecondPriorityItem';

export const newsImg = (images) => images.map(image => {
  return (
    <img src={ image.href } alt={ image.text }></img>
  );
});

const getZero = time => {
  return time < 10 ? `0${ time }` : time;
};

const dateWithoutTime = (date) => {
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
  const monthToString = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  let textDate;

  if (isToday(date)) {
    textDate = 'Сегодня';
  }
  if (isTomorrow(date)) {
    textDate = 'Вчера';
  }
  if (!isToday(date) && !isTomorrow(date)) {
    textDate = `${ date.getDate() } ${ monthToString[date.getMonth()] } ${ date.getFullYear() }`;  
  }

  const textTime = `${ getZero(date.getHours()) }:${ getZero(date.getMinutes()) }`;

  if (!isTime) {
    return `${ textDate }`;
  }

  return `${ textDate } ${ textTime }`;
};

export const parseDateMonthNumber = (date) => {
  let textDate;

  if (isToday(date)) {
    textDate = 'Сегодня';
  }
  if (isTomorrow(date)) {
    textDate = 'Вчера';
  }
  if (!isToday(date) && !isTomorrow(date)) {
    textDate = `${ getZero(date.getDate()) }.${ getZero(date.getMonth() + 1) }.${ date.getFullYear() }`;
  }

  const textTime = `${ getZero(date.getHours()) }:${ getZero(date.getMinutes()) }`;

  return `${ textDate } ${ textTime }`;
};

const sortDateDesc = (el1, el2) => el2.date - el1.date;

const NewsContent = (props) => {  
  const ctx = useContext(Context);

  const content = ctx.content.sort(sortDateDesc);

  const dates = [];
  let earliestDate = dateWithoutTime(content[0].date);
  dates.push(earliestDate);
  content.forEach(item => {
    if (+dateWithoutTime(item.date) !== +earliestDate) {
      earliestDate = dateWithoutTime(item.date);
      dates.push(earliestDate);
    }
  });

  const isAll = props.cathegory === 'all';

  const mapItems = (items, Item) => {
    return items.map(item => {
      return (
        <Item
          key={ Math.random() }
          id={ item.key }
          heading={ item.heading }
          date={ item.date }
          images={ item.images }
          briefText={ item.briefText }
          cathegory={ item.cathegory }
          priority={ item.priority }
        />
      );
    })
  };

  const newsContent = isAll ? content : content.filter(item => item.cathegory === props.cathegory);

  let newsList = [];

  dates.forEach(date => {
    const contentForDate = newsContent.filter(item => +dateWithoutTime(item.date) === +date);
    if (contentForDate.length) {
      const newsForDate = (
        <div key={ +date }>
          <h3 className={ styles.date }>
            { parseDateMonthString(date, false) }
          </h3>
          <ul>
            { mapItems(contentForDate, BasicItem) }
          </ul>
        </div>
      );
      newsList = [...newsList, newsForDate];
    }
  });

  const headings = {
    'politics': 'Политика',
    'economics': 'Экономика',
    'world': 'В мире',
    'sport': 'Спорт'
  };

  return (
    <section>
      <Container>
        <h1 className={ props.cathegory === 'all' ? 'visually-hidden' : '' }>
          { headings[props.cathegory] }
        </h1>
        {
          isAll &&
          <div className={ `${ styles.content } ${ styles.priorityContent }` }>
            <ul className={ styles.firstPriority }>
              {
                mapItems(content.filter(item => item.priority === 1), FirstPriorityItem)
              }
            </ul>
            <ul className={ styles.secondPriority }>
              {
                mapItems(content.filter(item => item.priority === 2), SecondPriorityItem)
              }
            </ul>
            <ul className={ styles.secondPriority }>
              {
                mapItems(content.filter(item => item.priority === 3), SecondPriorityItem)
              }
            </ul>
          </div>
        }
        <div className={ styles.content }>
          { newsList }
        </div>
      </Container>
    </section>
  );
};

export default NewsContent;
