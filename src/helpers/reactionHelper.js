export const checkifReacted = (keys, values, me) => {
  if (values.length) {
    for (let i = 0; i < values.length; i++) {
      const isReacted = values[i].users?.some((user) => user.id === me.id);
      if (isReacted) {
        return {
          index: i,
          type: keys[i],
        };
      }
    }
  }
  return null;
};

export const getReaction = (reactions, type, me, isOld, isSameType = false) => {
  const reactionsCount = reactions?.[type]?.count
      ? reactions?.[type]?.count
      : 0;
  const reactionUsers = reactions?.[type]?.users
    ? reactions?.[type]?.users
    : [];

  const reaction = {};

  reaction[type] = {
    count: !isSameType && !isOld ? reactionsCount + 1 : reactionsCount - 1,
    users: !isSameType && !isOld
      ? [...reactionUsers, me]
      : reactionUsers.filter((user) => user.id !== me.id),
  };

  return reaction;
}
