import { Fragment } from 'react';

import styles from './Layout.module.css';
import Header from './Header/Header';

const Layout = props => {
  return (
    <Fragment>
      <div className={ styles.container }>
        <Header />
      </div>
      <div className={ styles.container }>
        <main>
          { props.children }
        </main>
      </div>
    </Fragment>
  )
};

export default Layout;
