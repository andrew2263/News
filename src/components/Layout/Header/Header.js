import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../../logo.png";
import Container from "../Container";
import HeaderMenu from "../../UI/HeaderMenu";
import Info from "../Info";
import AuthChecker from "../../Auth/AuthChecker";

import { MAIN_RUBRICS } from "../../../constants/NewsRubrics.Constant";

import styles from "./Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openInfoHandler = () => {
    setIsOpen(true);
  };

  const closeInfoHandler = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      {isOpen && (
        <HeaderMenu onClose={closeInfoHandler}>
          <Container>
            <Info onClose={closeInfoHandler} />
          </Container>
        </HeaderMenu>
      )}
      <header className={styles.header}>
        <Container>
          <div className={styles["header__auth"]}>
            <AuthChecker />
          </div>
          <div className={styles["header__top"]}>
            <button
              className={styles["header__info"]}
              onClick={openInfoHandler}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className={styles["header__logo"]}>
              <NavLink to="/">
                <img src={logo} alt="Moldova News" />
              </NavLink>
            </div>
          </div>
          <nav className={styles["header__nav"]}>
            <ul className={styles["header__list"]}>
              {MAIN_RUBRICS.map((el) => (
                <li className={styles["header__item"]} key={el.value}>
                <NavLink to={el.link} activeClassName={styles.active}>
                  {el.name}
                </NavLink>
              </li>
              ))}
            </ul>
            {/*<div className={styles["header__add"]}>
              <AuthChecker />
              </div>*/}
          </nav>
          <div className={styles['header__weather']}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://nochi.com/weather/chisinau-17412"
              >
                <img
                  src="https://w.bookcdn.com/weather/picture/28_17412_1_20_3498db_250_2980b9_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=32665&domid=589&anc_id=29365"
                  alt="booked.net"
                />
              </a>
        </div>
        </Container>
      </header>
    </React.Fragment>
  );
};

export default Header;
