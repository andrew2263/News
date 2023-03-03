import React, { useContext, useEffect } from 'react';

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

export const scrollToTop = () => {
  window.scrollTo({
    top: 170,
    behavior: 'smooth'
  });
};

const headings = {
  'politics': 'Политика',
  'economics': 'Экономика',
  'war': 'Война Россия — Украина',
  'world': 'В мире',
  'sport': 'Спорт'
};

const NewsContent = (props) => {
  useEffect(() => {
    document.title = 'Новости Молдовы — Moldova News';
  }, []);

  const ctx = useContext(Context);

  const content = ctx.content.sort(sortDateDesc);

  const errorMessage = ctx.errorMessage['loadContent'];

  const isContent = content.length ? true : false;

  let earliestDate = '';

  const dates = content.reduce((acc, curValue) => {
    let res = [...acc];
    if (+dateWithoutTime(curValue.date) !== +earliestDate) {
      earliestDate = dateWithoutTime(curValue.date);
      res = [...res, earliestDate];
    }
    return res;
  }, []);

  const isAll = props.category === 'all';

  const newsContent = isAll ? content : content.filter(item => item.category === props.category);

  const newsList = dates.map((date) => {
    const contentForDate = newsContent.filter(item => +dateWithoutTime(item.date) === +date);
    return contentForDate.length ? (
      <div key={ +date }>
        <h3 className={ styles.date }>
          { parseDateMonthString(date, false) }
        </h3>
        <ul>
          {
            contentForDate.map(item => {
              return (
                <BasicItem
                  key={ Math.random() }
                  id={ item.key }
                  heading={ item.heading }
                  date={ item.date }
                  images={ item.images }
                  briefText={ item.briefText }
                  category={ item.category }
                  priority={ item.priority }
                  scroll={ scrollToTop }
                />
              );
            })
          }
        </ul>
      </div>
    ) : null;
  }).filter((item) => item !== null);

  return (
    <React.Fragment>
      {
        !isContent && errorMessage &&
        <section>
          <Container>
            <p className={ styles.error }>
              ERROR: { errorMessage }
            </p>
          </Container>
        </section>
      }
      { !isContent && !errorMessage &&
        <section>
          <Container>
            <p className={ styles.nonews }>Новости загружаются...</p>
          </Container>
        </section>
      }
      { isContent &&
        <section>
          <Container>
            <h1 className={ props.category === 'all' ? 'visually-hidden' : '' }>
              { headings[props.category] }
            </h1>
            {
              isAll &&
              <div className={ `${ styles.content } ${ styles.priorityContent }` }>
                <ul className={ styles.firstPriority }>
                  {
                    content.filter(item => item.priority === 1).map(item => {
                      return (
                        <FirstPriorityItem
                          key={ Math.random() }
                          id={ item.key }
                          heading={ item.heading }
                          date={ item.date }
                          images={ item.images }
                          briefText={ item.briefText }
                          category={ item.category }
                          priority={ item.priority }
                          scroll={ scrollToTop }
                        />
                      );
                    })
                  }
                </ul>
                <ul className={ styles.secondPriority }>
                  {
                    content.filter(item => item.priority === 2).map(item => {
                      return (
                        <SecondPriorityItem
                          key={ Math.random() }
                          id={ item.key }
                          heading={ item.heading }
                          date={ item.date }
                          images={ item.images }
                          briefText={ item.briefText }
                          category={ item.category }
                          priority={ item.priority }
                          scroll={ scrollToTop }
                        />
                      );
                    })
                  }
                </ul>
                <ul className={ styles.secondPriority }>
                  {
                    content.filter(item => item.priority === 3).map(item => {
                      return (
                        <SecondPriorityItem
                          key={ Math.random() }
                          id={ item.key }
                          heading={ item.heading }
                          date={ item.date }
                          images={ item.images }
                          briefText={ item.briefText }
                          category={ item.category }
                          priority={ item.priority }
                          scroll={ scrollToTop }
                        />
                      );
                    })
                  }
                </ul>
              </div>
            }
            <div className={ styles.content }>
              { newsList }
            </div>
          </Container>
        </section>
      }
    </React.Fragment>
  );
};

export default NewsContent;
