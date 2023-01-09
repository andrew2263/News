import React from 'react';

import { CONTENT } from './content';
import styles from './NewsContent.module.css';
import BasicItem from './BasicItem';
import FirstPriorityItem from './FirstPriorityItem';
import SecondPriorityItem from './SecondPriorityItem';

export const newsImg = (images) => images.map(image => {
  return (
    <img src={ image.href } alt={ image.text }></img>
  );
});

const NewsContent = (props) => {
  
  let newsList;

  const isAll = props.cathegory === 'all';

  const mapItems = (items, Item) => {
    return items.map(item => {
      return (
        <Item
          key={ Math.random() }
          id={ item.key }
          heading={ item.heading }
          images={ item.images }
          briefText={ item.briefText }
          cathegory={ item.cathegory }
          priority={ item.priority }
        />
      );
    })
  }

  if (!isAll) {
    newsList = mapItems(CONTENT.filter(item => item.cathegory === props.cathegory), BasicItem);
  }

  if (isAll) {
    newsList = mapItems(CONTENT, BasicItem);
  }

  const headings = {
    'politics': 'Политика',
    'economy': 'Экономика',
    'world': 'В мире',
    'sport': 'Спорт'
  };

  return (
    <section>
      <h1>
        { headings[props.cathegory] }
      </h1>
      {
        isAll &&
        <div className={ `${ styles.content } ${ styles.priorityContent }` }>
          <ul className={ styles.firstPriority }>
            {
              mapItems(CONTENT.filter(item => item.priority === 1), FirstPriorityItem)
            }
          </ul>
          <ul className={ styles.secondPriority }>
            {
              mapItems(CONTENT.filter(item => item.priority === 2), SecondPriorityItem)
            }
          </ul>
          <ul className={ styles.secondPriority }>
            {
              mapItems(CONTENT.filter(item => item.priority === 3), SecondPriorityItem)
            }
          </ul>
        </div>
      }
      <div className={ styles.content }>
        <ul>
          { newsList }
        </ul>
      </div>
    </section>
  );
};

export default NewsContent;
