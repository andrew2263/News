import React from "react";

import { useSelector } from "react-redux";

import styles from "./Reactions.module.scss";

const Reactions = (props) => {
  const { reactions, addReactionHandler } = props;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const reactionTypes = ["likes", "dislikes"];

  const reactionImageSrc = {
    likes: "/images/thumbs-up.svg",
    dislikes: "/images/thumbs-down.svg",
  };

  const onChangeReaction = (event) => {
    if (isLoggedIn) {
      const type = event.currentTarget.value;
      addReactionHandler(type);
    }
    return;
  };

  return (
    <ul className={styles.reactions}>
      {reactionTypes.map((type, i) => (
        <li key={i} className={styles.reactions__item}>
          <button
            type="button"
            className={styles.reactions__button}
            onClick={onChangeReaction}
            value={type}
          >
            <img src={reactionImageSrc[type]} alt={type} />
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
