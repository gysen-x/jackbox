exports.makePairsWithPunches = (usersInRoom, allPunches) => {
  function random(length) {
    return Math.floor(Math.random() * (length - 1 + 1));
  }

  const pairs = [];
  while (usersInRoom.length > 0) {
    const onePair = [];
    onePair.push(Number(usersInRoom.splice(random(usersInRoom.length), 1).join()));
    onePair.push(Number(usersInRoom.splice(random(usersInRoom.length), 1).join()));
    pairs.push(onePair);
  }

  const punchesForPairs = [];

  while (punchesForPairs.length < pairs.length) {
    punchesForPairs.push(allPunches.splice(random(allPunches.length), 1).join());
  }

  const result = [];

  for (let i = 0; i < pairs.length; i += 1) {
    result.push({
      pairs: pairs[i],
      punch: punchesForPairs[i],
    });
  }

  return result;
};
