import { Link } from 'react-router-dom';

import { newsImg } from './NewsContent';
import styles from './BasicItem.module.css';

const BasicItem = props => {
  return (
    <li
      key={ props.id }
    >
      <h2>{ props.heading }</h2>
      <div className={ styles['news__content-info'] }>
        <div className={ styles['news__img-wrapper'] }>
          { newsImg(props.images)[0] }
        </div>
        <p className={ styles['news__brief-text'] }>{ props.briefText }</p>
      </div>
      <Link to={ `/${ props.cathegory }/${ props.id }` }>
        Read Article
      </Link>
    </li>
  );
};

export default BasicItem;