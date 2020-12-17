const admin = require("firebase-admin");
const functions = require("firebase-functions");
const {createDistribution} = require('./utils')

admin.initializeApp();

exports.aggregate = functions.database
  .ref("/responses/{quizId}/{responseId}")
  .onWrite(({ after }, { params: { quizId } }) => {
    const result = after.val();

    // Only aggregate completed quizzes
    if (!result.completed) return;

    // Only aggregate quizzes using 2.x viewer.
    // This is inferred by being either a custom quiz ID or having an ID that matches the format
    // of a CMID.
    if (!quizId.match(/^(custom-.+|[0-9]+)(-preview)?$/)) return;

    return admin
      .database()
      .ref(`/results/${quizId}/aggregate`)
      .transaction(data => {
        return {
          completions: (data?.completions || 0) + 1,
          totalScore: (data?.totalScore || 0) + result.score,
          availableScore: (data?.availableScore || 0) + result.value,
          distribution: createDistribution(result, data?.distribution || {})
        };      
      });
  });