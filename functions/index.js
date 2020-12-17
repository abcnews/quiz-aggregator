const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { createDistribution, quizIdMatcher } = require("./utils");
admin.initializeApp();

// Recalculates the total cost of a cart; triggered when there's a change
// to any items in a cart.
exports.aggregate = functions.database
  .ref("/responses/{quizId}/{responseId}")
  .onWrite(({ after }, { params: { quizId } }) => {
    const result = after.val();

    // Only aggregate completed quizzes
    if (!result.completed) return;

    // Only aggregate quizzes using 2.x viewer.
    // This is inferred by being either a custom quiz ID or having an ID that matches the format
    // of a CMID.
    if (!quizId.match(quizIdMatcher)) return;

    return admin
      .database()
      .ref(`/results/${quizId}/aggregate`)
      .transaction((data) => {
        return {
          completions: (data?.completions || 0) + 1,
          totalScore: (data?.totalScore || 0) + result.score,
          availableScore: (data?.availableScore || 0) + result.value,
          distribution: createDistribution(result, data?.distribution || {}),
        };
      });
  });
