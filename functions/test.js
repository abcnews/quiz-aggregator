const expect = require("expect");
const REAL_FIREBASE_PROJECT_ID = "test";
const responseComplete = require("./result-complete.json");
const responseIncomplete = require("./result-incomplete.json");
const firebase = require("@firebase/rules-unit-testing");
const { quizIdMatcher, createDistribution } = require("./utils");

describe("adding a completed quiz result should trigger the aggregation function ", () => {
  it("should calculate and store the correct aggregated results", async () => {
    const db = firebase
      .initializeAdminApp({
        databaseName: REAL_FIREBASE_PROJECT_ID,
        projectId: REAL_FIREBASE_PROJECT_ID,
      })
      .database();

    const responseCompleteRef = db.ref(
      "responses/custom-testQuiz/testResponseComplete"
    );
    const responseIncompleteRef = db.ref(
      "responses/custom-testQuiz/testResponseIncomplete"
    );

    await responseIncompleteRef.set(responseIncomplete);
    await responseCompleteRef.set(responseComplete);

    // Listen for updates to the aggregated results for this quiz ID. Every time a
    // response is updated check if the aggregated data matches expectations.
    const aggregateRef = db.ref("results/custom-testQuiz/aggregate");
    await new Promise((resolve) => {
      aggregateRef.on("value", (snap) => {
        const availableScore = 10;
        const completions = 1;
        const totalScore = 6;
        const dist67 = 1;
        const dist56 = 0;
        const dist78 = 0;

        if (
          snap.exists() &&
          snap.val().availableScore === availableScore &&
          snap.val().completions === completions &&
          snap.val().totalScore === totalScore &&
          snap.val().distribution["5-6"] === dist56 &&
          snap.val().distribution["6-7"] === dist67 &&
          snap.val().distribution["7-8"] === dist78
        ) {
          aggregateRef.off();
          resolve();
        }
      });
    });
  });
});

describe("utils", () => {
  describe("quizIdMatcher", () => {
    it("should match the right quiz IDs", () => {
      expect("1239235956-3235".match(quizIdMatcher)).toBeFalsy();
      expect("87568875".match(quizIdMatcher)).toBeTruthy();
      expect("87568875-preview".match(quizIdMatcher)).toBeTruthy();
      expect("custom-123".match(quizIdMatcher)).toBeTruthy();
      expect("custom-123-preview".match(quizIdMatcher)).toBeTruthy();
    });
  });
  describe("createDistribution", () => {
    it("should create new distributions accurately", () => {
      expect(
        createDistribution({
          score: 2.916666666666667,
          value: 6,
        })
      ).toEqual({ "0-1": 0, "1-2": 0, "2-3": 1, "3-4": 0, "4-5": 0, "5-6": 0 });

      expect(
        createDistribution({
          score: 2,
          value: 6,
        })
      ).toEqual({ "0-1": 0, "1-2": 0, "2-3": 1, "3-4": 0, "4-5": 0, "5-6": 0 });

      expect(
        createDistribution({
          score: 2,
          value: 6.5,
        })
      ).toEqual({
        "0-1": 0,
        "1-2": 0,
        "2-3": 1,
        "3-4": 0,
        "4-5": 0,
        "5-6": 0,
        "6-7": 0,
      });

      expect(createDistribution({ score: 2, value: 2 })).toEqual({
        "0-1": 0,
        "1-2": 1,
      });

      expect(createDistribution({ score: 1.3, value: 1.3 })).toEqual({
        "0-1": 0,
        "1-2": 1,
      });

      expect(createDistribution({ score: 0, value: 2 })).toEqual({
        "0-1": 1,
        "1-2": 0,
      });
    });
    it("should update existing distributions accurately", () => {
      expect(
        createDistribution(
          { score: 2.916666666666667, value: 6 },
          { "0-1": 0, "1-2": 0, "2-3": 1, "3-4": 0, "4-5": 0, "5-6": 0 }
        )
      ).toEqual({ "0-1": 0, "1-2": 0, "2-3": 2, "3-4": 0, "4-5": 0, "5-6": 0 });

      expect(
        createDistribution(
          { score: 2, value: 6 },
          { "0-1": 0, "1-2": 0, "2-3": 1, "3-4": 0, "4-5": 0, "5-6": 0 }
        )
      ).toEqual({ "0-1": 0, "1-2": 0, "2-3": 2, "3-4": 0, "4-5": 0, "5-6": 0 });

      expect(
        createDistribution(
          { score: 2, value: 6.5 },
          {
            "0-1": 0,
            "1-2": 0,
            "2-3": 1,
            "3-4": 0,
            "4-5": 0,
            "5-6": 0,
            "6-7": 0,
          }
        )
      ).toEqual({
        "0-1": 0,
        "1-2": 0,
        "2-3": 2,
        "3-4": 0,
        "4-5": 0,
        "5-6": 0,
        "6-7": 0,
      });

      expect(
        createDistribution({ score: 2, value: 2 }, { "0-1": 0, "1-2": 1 })
      ).toEqual({ "0-1": 0, "1-2": 2 });

      expect(
        createDistribution({ score: 1.3, value: 1.3 }, { "0-1": 0, "1-2": 1 })
      ).toEqual({ "0-1": 0, "1-2": 2 });

      expect(
        createDistribution({ score: 0, value: 2 }, { "0-1": 1, "1-2": 0 })
      ).toEqual({ "0-1": 2, "1-2": 0 });
    });
  });
});
