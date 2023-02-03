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
}

export const parseDateMonthString = (date) => {
  const monthToString = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  const textDate = `${ date.getDate() } ${ monthToString[date.getMonth()] } ${ date.getFullYear() }`;
  const textTime = `${ getZero(date.getHours()) }:${ getZero(date.getMinutes()) }`;

  return `${ textDate } ${ textTime }`;
};

export const parseDateMonthNumber = (date) => {
  const textDate = `${ getZero(date.getDate()) }.${ getZero(date.getMonth() + 1) }.${ date.getFullYear() }`;
  const textTime = `${ getZero(date.getHours()) }:${ getZero(date.getMinutes()) }`;

  return `${ textDate } ${ textTime }`;
}

const NewsContent = (props) => {  
  const ctx = useContext(Context);

  let newsList;

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
  }

  if (!isAll) {
    newsList = mapItems(ctx.content.filter(item => item.cathegory === props.cathegory), BasicItem);
  }

  if (isAll) {
    newsList = mapItems(ctx.content, BasicItem);
  }

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
                mapItems(ctx.content.filter(item => item.priority === 1), FirstPriorityItem)
              }
            </ul>
            <ul className={ styles.secondPriority }>
              {
                mapItems(ctx.content.filter(item => item.priority === 2), SecondPriorityItem)
              }
            </ul>
            <ul className={ styles.secondPriority }>
              {
                mapItems(ctx.content.filter(item => item.priority === 3), SecondPriorityItem)
              }
            </ul>
          </div>
        }
        <div className={ styles.content }>
          <ul>
            { newsList }
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default NewsContent;
