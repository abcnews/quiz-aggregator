const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.aggregate = functions.database
  .ref('/responses/{quizId}/{responseId}')
  .onWrite(event => {
    const result = event.data.val();

    // Only aggregate completed quizzes
    if (!result.completed) return;

    admin
      .database()
      .ref(`/results/${event.params.quizId}/aggregate`)
      .transaction(data => {
        // First completed quiz.
        if (data === null) {
          return { count: 1, average: result.score };
        }

        return {
          count: data.count + 1,
          average: (data.average * data.count + result.score) / (data.count + 1)
        };
      });
  });
