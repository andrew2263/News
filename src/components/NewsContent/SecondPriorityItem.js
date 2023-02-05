import { Link } from 'react-router-dom';

import { newsImg } from './NewsContent';
import styles from './SecondPriorityItem.module.css';
import { parseDateMonthNumber } from './NewsContent';

const SecondPriorityItem = props => {
  return (
    <li
      className={ styles['news__content-item'] }
      key={ props.id }
    >
      <div className={ props.priority === 2 ?
        styles['news__content-info'] :
        `${ styles['news__content-info'] } ${ styles['news__content-info_small'] }` }>
        <div className={ props.priority === 2 ?
          styles['news__img-wrapper'] :
          `${ styles['news__img-wrapper'] } ${ styles['news__img-wrapper_small'] }` }
        >
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
          <time className={ styles['news__date'] }>
            { parseDateMonthNumber(props.date) }
          </time>
        </div>
      </div>
    </li>
  );
};

export default SecondPriorityItem;
