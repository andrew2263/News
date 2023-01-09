import { Link } from 'react-router-dom';

import { newsImg } from './NewsContent';
import styles from './FirstPriorityItem.module.css';

const FirstPriorityItem = props => {
  return (
    <li
      key={ props.id }
    >
      <div className={ styles['news__content-info'] }>
        <div className={ styles['news__img-wrapper'] }>
          { newsImg(props.images)[0] }
        </div>
        <div className={ styles['news__info'] }>
          <h2>{ props.heading }</h2>
          <p className={ styles['news__brief-text'] }>{ props.briefText }</p>
        </div>
      </div>
      <Link to={ `/${ props.cathegory }/${ props.id }` }>
        Read Article
      </Link>
    </li>
  );
};

export default FirstPriorityItem;