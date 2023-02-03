import { Link } from 'react-router-dom';

import { newsImg } from './NewsContent';
import styles from './FirstPriorityItem.module.css';
import { parseDateMonthString } from './NewsContent';

const FirstPriorityItem = props => {
  return (
    <li
      key={ props.id }
    >
      <div className={ styles['news__content-info'] }>
        <div className={ styles['news__img-wrapper'] }>
          <Link to={ `/${ props.cathegory }/${ props.id }` }>
            { newsImg(props.images)[0] }
          </Link>
        </div>
        <div className={ styles['news__info'] }>
          <h2>
            <Link to={ `/${ props.cathegory }/${ props.id }` }>
              { props.heading }
            </Link>
          </h2>
          <p className={ styles['news__brief-text'] }>{ props.briefText }</p>
          <time className={ styles['news__date'] }>
            { parseDateMonthString(props.date) }
          </time>
        </div>
      </div>
    </li>
  );
};

export default FirstPriorityItem;