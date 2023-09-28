import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "../Layout/Container";
import BasicItem from "./BasicItem";
import FirstPriorityItem from "./FirstPriorityItem";
import SecondPriorityItem from "./SecondPriorityItem";

import { MAIN_RUBRICS } from "../../constants/NewsRubrics.Constant";
import { parseDateMonthString, dateWithoutTime } from "../../helpers/parseDateMonth";
import { scrollToTop } from "../../helpers/scrollToTop";

import styles from "./NewsContent.module.scss";

const sortDateDesc = (el1, el2) => el2.date - el1.date;

const NewsContent = (props) => {
  useEffect(() => {
    document.title = "Новости Молдовы — Moldova News";
  }, []);

  const sContent = useSelector((state) => state.content.content);

  const stContent = [...sContent];

  const content = stContent.sort(sortDateDesc);

  const isContent = content.length ? true : false;

  let earliestDate = "";

  const dates = content.reduce((acc, curValue) => {
    let res = [...acc];
    const currentDate = new Date(curValue.date);
    if (+dateWithoutTime(currentDate) !== +earliestDate) {
      earliestDate = dateWithoutTime(currentDate);
      res = [...res, earliestDate];
    }
    return res;
  }, []);

  const isAll = props.category === "all";

  const newsContent = isAll
    ? content
    : content.filter((item) => item.category === props.category);

  const newsList = dates
    .map((date) => {
      const contentForDate = newsContent.filter(
        (item) => +dateWithoutTime(new Date(item.date)) === +date
      );
      return contentForDate.length ? (
        <div key={+date}>
          <h3 className={styles.date}>
            {parseDateMonthString(new Date(date), false)}
          </h3>
          <ul>
            {contentForDate.map((item) => {
              return (
                <BasicItem
                  key={Math.random()}
                  id={item.key}
                  heading={item.heading}
                  date={new Date(item.date)}
                  images={item.images}
                  briefText={item.briefText}
                  category={item.category}
                  priority={item.priority}
                  scroll={scrollToTop}
                />
              );
            })}
          </ul>
        </div>
      ) : null;
    })
    .filter((item) => item !== null);

  return (
    <React.Fragment>
      {!isContent && (
        <section>
          <Container>
            <p className={styles.nonews}>Новости загружаются...</p>
          </Container>
        </section>
      )}
      {isContent && (
        <section>
          <Container>
            <h1 className={props.category === "all" ? "visually-hidden" : ""}>
              {MAIN_RUBRICS.find((el) => el.category === props.category)?.name}
            </h1>
            {isAll && (
              <div
                className={`${styles.content} ${styles["priority-content"]}`}
              >
                <ul className={styles["first-priority"]}>
                  {content
                    .filter((item) => item.priority === 1)
                    .map((item) => {
                      return (
                        <FirstPriorityItem
                          key={Math.random()}
                          id={item.key}
                          heading={item.heading}
                          date={new Date(item.date)}
                          images={item.images}
                          briefText={item.briefText}
                          category={item.category}
                          priority={item.priority}
                          scroll={scrollToTop}
                        />
                      );
                    })}
                </ul>
                <ul className={styles["second-priority"]}>
                  {content
                    .filter((item) => item.priority === 2)
                    .map((item) => {
                      return (
                        <SecondPriorityItem
                          key={Math.random()}
                          id={item.key}
                          heading={item.heading}
                          date={new Date(item.date)}
                          images={item.images}
                          briefText={item.briefText}
                          category={item.category}
                          priority={item.priority}
                          scroll={scrollToTop}
                        />
                      );
                    })}
                </ul>
                <ul className={styles["second-priority"]}>
                  {content
                    .filter((item) => item.priority === 3)
                    .map((item) => {
                      return (
                        <SecondPriorityItem
                          key={Math.random()}
                          id={item.key}
                          heading={item.heading}
                          date={new Date(item.date)}
                          images={item.images}
                          briefText={item.briefText}
                          category={item.category}
                          priority={item.priority}
                          scroll={scrollToTop}
                        />
                      );
                    })}
                </ul>
              </div>
            )}
            <div className={styles.content}>{newsList}</div>
          </Container>
        </section>
      )}
    </React.Fragment>
  );
};

export default NewsContent;
