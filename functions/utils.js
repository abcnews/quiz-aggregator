// Regex for matching a quiz id which the aggregate function should respond to
module.exports.aggregateQuizIdMatcher = /^(custom-.+|[0-9]+)(-preview)?$/;

module.exports.createDistribution = function createDistribution(result, dist) {
  dist = dist || {};

  for (let x1 = Math.ceil(result.value + 1); --x1; ) {
    let x0 = x1 - 1;
    let key = `${x0}-${x1}`;
    dist[key] = dist[key] || 0;
    if (
      result.score >= x0 &&
      (result.score < x1 ||
        (result.score === result.value && result.score === x1))
    ) {
      dist[key] += 1;
    }
  }

  return dist;
};
