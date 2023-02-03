import { Fragment } from 'react';

import styles from './Layout.module.css';
import Header from './Header/Header';

const Layout = props => {
  return (
    <Fragment>
      <Header />
      <main>
        { props.children }
      </main>
    </Fragment>
  )
};

export default Layout;
