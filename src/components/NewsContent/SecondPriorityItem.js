import { Link } from 'react-router-dom';

import { newsImg } from './NewsContent';
import styles from './SecondPriorityItem.module.css';

const SecondPriorityItem = props => {
  return (
    <li
      key={ props.id }
    >
      <div className={ props.priority === 2 ?
        styles['news__content-info'] :
        `${ styles['news__content-info'] } ${ styles['news__content-info_small'] }` }>
        <div className={ props.priority === 2 ?
          styles['news__img-wrapper'] :
          `${ styles['news__img-wrapper'] } ${ styles['news__img-wrapper_small'] }` }>
          { newsImg(props.images)[0] }
        </div>
        <div className={ styles['news__info'] }>
          <h2>{ props.heading }</h2>
        </div>
      </div>
      <Link to={ `/${ props.cathegory }/${ props.id }` }>
        Read Article
      </Link>
    </li>
  );
};

export default SecondPriorityItem;
