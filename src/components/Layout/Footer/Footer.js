import React from "react";

import { NavLink } from "react-router-dom";

import NewsRubrics from "../NewsRubrics";
import Contacts from "../Contacts";
import Social from "../Social";
import Container from "../Container";

import { scrollToTop } from "../../../helpers/scrollToTop";

import styles from "./Footer.module.scss";
import logo50 from "../../../logo50.png";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className={styles.footer}>
        <Container>
          <div className={styles["footer-wrap"]}>
            <div>
              <div className={styles["footer-logo"]}>
                <NavLink to="/">
                  <img src={logo50} alt="logo" />
                </NavLink>
              </div>
              <NewsRubrics
                content="rubrics"
                onScroll={scrollToTop}
                element="footer"
              />
              <Social />
              <p className={styles["footer-copyright_desktop"]}>© Moldova News 2021-2023</p>
            </div>
            <div>
              <Contacts />
              <p className={styles["footer-copyright_mobile"]}>© Moldova News 2021-2023</p>
            </div>
          </div>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
