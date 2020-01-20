const functions = require("firebase-functions");
const admin = require("firebase-admin");
const utils = require("./utils");

admin.initializeApp(functions.config().firebase);

exports.aggregate = functions.database
  .ref("/responses/{quizId}/{responseId}")
  .onWrite(({ after }, { params: { quizId } }) => {
    const result = after.val();

    // Only aggregate completed quizzes
    if (!result.completed) return;

    // Only aggregate quizzes using 2.x viewer.
    if (!quizId.match(utils.aggregateQuizIdMatcher)) return;

    return admin
      .database()
      .ref(`/results/${quizId}/aggregate`)
      .transaction(data => {
        // First completed quiz.
        if (data === null) {
          return {
            completions: 1,
            totalScore: result.score,
            availableScore: result.value,
            distribution: utils.createDistribution(result)
          };
        }

        return {
          completions: (data.completions || 0) + 1,
          totalScore: (data.totalScore || 0) + result.score,
          availableScore: (data.availableScore || 0) + result.value,
          distribution: utils.createDistribution(result, data.distribution)
        };
      });
  });
