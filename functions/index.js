const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.aggregate = functions.database
  .ref('/responses/{quizId}/{responseId}')
  .onWrite(event => {
    const result = event.data.val();

    // Only aggregate completed quizzes
    if (!result.completed) return;

    // Only aggregate quizzes using 2.x viewer.
    if (!event.params.quizId.match(/^(custom-*+|[0-9]+)(-preview)?$/)) return;

    admin
      .database()
      .ref(`/results/${event.params.quizId}/aggregate`)
      .transaction(data => {
        // First completed quiz.
        if (data === null) {
          return {
            completions: 1,
            totalScore: result.score,
            availableScore: result.value,
            distribution: {
              [result.score]: 1
            }
          };
        }

        let distribution = data.distribution || {};

        return {
          completions: (data.completions || 0) + 1,
          totalScore: (data.totalScore || 0) + result.score,
          availableScore: (data.availableScore || 0) + result.value,
          distribution: Object.assign({}, distribution, {
            [result.score]: (distribution[result.score] || 0) + 1
          })
        };
      });
  });
