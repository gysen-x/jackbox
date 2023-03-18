exports.makePairs = (usersInRoom) => {
  function random(length) {
    return Math.floor(Math.random() * (length - 1 + 1));
  }
  const pairs = [];
  while (usersInRoom.length > 0) {
    const onePair = [];
    onePair.push(usersInRoom.splice(random(usersInRoom.length), 1));
    onePair.push(usersInRoom.splice(random(usersInRoom.length), 1));
    pairs.push(onePair);
  }
  return pairs;
};
