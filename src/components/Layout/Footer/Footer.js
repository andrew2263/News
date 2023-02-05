import React from 'react';

import { NavLink } from 'react-router-dom';
import NewsRubrics from '../NewsRubrics';
import Contacts from '../Contacts';
import Social from '../Social';
import Container from '../Container';
import styles from './Footer.module.css';
import logo50 from '../../../logo50.png';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className={ styles.footer }>
        <Container>
          <div className={ styles.footerWrap }>
            <div className={ styles.footerLeft }>
              <div className={ styles.footerLogo }>
                <NavLink to='/index'>
                  <img src={ logo50 } alt='logo' />
                </NavLink>
              </div>
              <NewsRubrics content='rubrics' />
              <Social />
              <p className={ styles.footerCopyright }>
                © Moldova News 2021-2023
              </p>
            </div>
            <div className={ styles.footerRight }>
              <Contacts />
            </div>
          </div>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
