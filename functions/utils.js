module.exports = function createDistribution(result, dist = {}) {
  const newDistribution = {};
  for (let x1 = Math.ceil(result.value + 1); --x1; ) {
    let x0 = x1 - 1;
    let key = `${x0}-${x1}`;
    newDistribution[key] = dist[key] || 0;
    if (
      result.score >= x0 &&
      (result.score < x1 ||
        (result.score === result.value && result.score === x1))
    ) {
      newDistribution[key] += 1;
    }
  }

  return newDistribution;
};
