import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { checkifReacted } from "../../../helpers/reactionHelper";

import styles from "./Reactions.module.scss";

const Reactions = (props) => {
  const { reactions, addReactionHandler } = props;

  const reactionTypes = ["likes", "dislikes"];

  const initialIsChanged = reactionTypes.reduce((acc, type) => {
    acc[type] = false;
    return acc;
  }, {});

  const [isChanged, setIsChanged] = useState(initialIsChanged);
  const [timeoutId, setTimeoutId] = useState()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const me = useSelector((state) => state.auth.me);

  useEffect(() => {
    if (timeoutId) {
      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [timeoutId])

  let myReaction = null;

  if (reactions) {
    const reactionValues = Object.values(reactions);
    const reactionKeys = Object.keys(reactions);

    myReaction = checkifReacted(reactionKeys, reactionValues, me);
  }

  const reactionImageSrc = {
    likes:
      myReaction?.type === "likes"
        ? "/images/thumbs-up-solid.svg"
        : "/images/thumbs-up.svg",
    dislikes:
      myReaction?.type === "dislikes"
        ? "/images/thumbs-down-solid.svg"
        : "/images/thumbs-down.svg",
  };

  const onChangeReaction = (event) => {
    if (isLoggedIn) {
      const type = event.currentTarget.value;
      addReactionHandler(type, myReaction);
      const changedType = {};
      changedType[type] = true;
      const prevChangedType = Object.keys(isChanged).find((el) => isChanged[el]);
      isChanged[prevChangedType] = false;

      setIsChanged((prevIsChanged) => {
        return { ...prevIsChanged, ...changedType };
      });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const timeout = setTimeout(() => {
        setIsChanged(initialIsChanged);
      }, 1000);

      setTimeoutId(timeout);
    }
    return;
  };

  return (
    <ul className={styles.reactions}>
      {reactionTypes.map((type, i) => (
        <li key={i} className={styles.reactions__item}>
          <button
            type="button"
            className={`${styles.reactions__button} ${isChanged[type] ? styles.reactions__changed : ""}`}
            onClick={onChangeReaction}
            value={type}
          >
            <img
              src={reactionImageSrc[type]}
              // className={isChanged[type] ? styles.reactions__changed : ""}
              alt={type}
            />
          </button>
          <div className={styles.reactions__counter}>
            {reactions?.[type]?.count ? reactions[type].count : 0}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Reactions;
