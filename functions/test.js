const REAL_FIREBASE_PROJECT_ID = "example";

const firebase = require("@firebase/rules-unit-testing");

const resultComplete = require('./result-complete.json')

describe("adding an item to the cart recalculates the cart total. ", () => {
  it("should sum the cost of their items", async () => {
    const db = firebase
      .initializeAdminApp({ databaseName: REAL_FIREBASE_PROJECT_ID, projectId: REAL_FIREBASE_PROJECT_ID })
      .database();

    const responseRef = db.ref("/responses/testQuiz/completeResponse");
    
    responseRef.set(resultComplete);
  });
});


// const resultComplete = require('./result-complete.json')
// const resultIncomplete = require('./result-incomplete.json')

// describe("adding an item to the cart recalculates the cart total. ", () => {
//   it("should sum the cost of their items", async () => {
//     const db = firebase
//         .initializeAdminApp({ databaseName: REAL_FIREBASE_PROJECT_ID, projectId: REAL_FIREBASE_PROJECT_ID })
//         .database();

  //       it("should sum the cost of their items", async () => {
  //   const db = firebase
  //       .initializeAdminApp({ databaseName: REAL_FIREBASE_PROJECT_ID, projectId: REAL_FIREBASE_PROJECT_ID })
  //       .database();

  //   db.ref("/responses/testQuiz/completeResponse").set(resultComplete);
  //   db.ref("/responses/testQuiz/incompleteResponse").set(resultIncomplete);
    
  //   // Listen for every update to the cart. Every time an item is added to
  //   // the cart's subcollection of items, the function updates `totalPrice`
  //   // and `itemCount` attributes on the cart.
  //   // Returns a function that can be called to unsubscribe the listener.
  //   const aggregateRef = db.ref('/results/testQuiz/aggregate');
  //   await new Promise((resolve) => {
  //     aggregateRef.on('value', snap => {
        
  //       // If the function worked, these will be cart's final attributes.
  //       const availableScore = 10;
  //       const completions = 1;
  //       const totalScore = 6
  //       const dist67 = 1;
  //       const dist56 = 0;
  //       const dist78 = 0;
  
  //       // When the `itemCount`and `totalPrice` match the expectations for the
  //       // two items added, the promise resolves, and the test passes.
  //       if (snap.exists && snap.val().availableScore === availableScore && snap.val().completions === 1 && snap.val().totalScore === 6 && snap.val().distribution['5-6'] === 0 && snap.val().distribution['6-7'] === 1 && snap.val().distribution['7-8'] === 0) {
  //         // Call the function returned by `onSnapshot` to unsubscribe from updates
  //         aggregateRef.off();
  //         resolve();
  //       }
  //     });
  //   });
  // });

    // Setup: Initialize cart
    // const aliceCartRef = db.ref("carts/alice")
    
    // aliceCartRef.set({ ownerUID: "alice", totalPrice: 0 });

    //  Trigger `calculateCart` by adding items to the cart
    
    // db.ref("carts/alice/items/doc1").set({name: "nectarine", price: 2.99});
    // db.ref("carts/alice/items/doc2").set({ name: "grapefruit", price: 6.99 });

    // Listen for every update to the cart. Every time an item is added to
    // the cart's subcollection of items, the function updates `totalPrice`
    // and `itemCount` attributes on the cart.
    // Returns a function that can be called to unsubscribe the listener.
    // await new Promise((resolve) => {
    //   aliceCartRef.on('value', snap => {
    //     // If the function worked, these will be cart's final attributes.
    //     const expectedCount = 2;
    //     const expectedTotal = 9.98;
  
    //     // When the `itemCount`and `totalPrice` match the expectations for the
    //     // two items added, the promise resolves, and the test passes.
    //     if (snap.exists && Object.keys(snap.val().items).length === expectedCount && snap.val().totalPrice === expectedTotal) {
    //       // Call the function returned by `onSnapshot` to unsubscribe from updates
    //       aliceCartRef.off();
    //       resolve();
    //     }
    //   });
    // });
//   });
// });

// describe('utils', () => {

// });

// test("utils.aggregateQuizIdMatcher", (t) => {
//   t.falsy(
//     "1239235956-3235".match(utils.aggregateQuizIdMatcher),
//     "Old style quiz ID matched incorrectly"
//   );

//   t.truthy(
//     "87568875".match(utils.aggregateQuizIdMatcher),
//     "New style quiz ID not matched"
//   );

//   t.truthy(
//     "87568875-preview".match(utils.aggregateQuizIdMatcher),
//     "New style quiz ID (preview) not matched"
//   );

//   t.truthy(
//     "custom-123".match(utils.aggregateQuizIdMatcher),
//     "Custom quiz ID not matched"
//   );

//   t.truthy(
//     "custom-123-preview".match(utils.aggregateQuizIdMatcher),
//     "Custom quiz ID (preview) not matched"
//   );
// });

// test("utils.createDistribution (new)", (t) => {
//   t.deepEqual(
//     utils.createDistribution({
//       score: 2.916666666666667,
//       value: 6,
//     }),
//     {
//       "0-1": 0,
//       "1-2": 0,
//       "2-3": 1,
//       "3-4": 0,
//       "4-5": 0,
//       "5-6": 0,
//     },
//     "Failed non-integer score distribution"
//   );

//   t.deepEqual(
//     utils.createDistribution({
//       score: 2,
//       value: 6,
//     }),
//     {
//       "0-1": 0,
//       "1-2": 0,
//       "2-3": 1,
//       "3-4": 0,
//       "4-5": 0,
//       "5-6": 0,
//     },
//     "Failed integer score distribution"
//   );

//   t.deepEqual(
//     utils.createDistribution({
//       score: 2,
//       value: 6.5,
//     }),
//     {
//       "0-1": 0,
//       "1-2": 0,
//       "2-3": 1,
//       "3-4": 0,
//       "4-5": 0,
//       "5-6": 0,
//       "6-7": 0,
//     },
//     "Failed non-integer value distribution"
//   );

//   t.deepEqual(
//     utils.createDistribution({
//       score: 2,
//       value: 2,
//     }),
//     {
//       "0-1": 0,
//       "1-2": 1,
//     },
//     "Failed top of distribution score"
//   );

//   t.deepEqual(
//     utils.createDistribution({
//       score: 1.3,
//       value: 1.3,
//     }),
//     {
//       "0-1": 0,
//       "1-2": 1,
//     },
//     "Failed top of distribution score (non-integer)"
//   );

//   t.deepEqual(
//     utils.createDistribution({
//       score: 0,
//       value: 2,
//     }),
//     {
//       "0-1": 1,
//       "1-2": 0,
//     },
//     "Failed bottom of distribution score"
//   );
// });

// test("utils.createDistribution (existing)", (t) => {
//   t.deepEqual(
//     utils.createDistribution(
//       {
//         score: 2.916666666666667,
//         value: 6,
//       },
//       {
//         "0-1": 0,
//         "1-2": 0,
//         "2-3": 1,
//         "3-4": 0,
//         "4-5": 0,
//         "5-6": 0,
//       }
//     ),
//     {
//       "0-1": 0,
//       "1-2": 0,
//       "2-3": 2,
//       "3-4": 0,
//       "4-5": 0,
//       "5-6": 0,
//     },
//     "Failed non-integer score distribution"
//   );

//   t.deepEqual(
//     utils.createDistribution(
//       {
//         score: 2,
//         value: 6,
//       },
//       {
//         "0-1": 0,
//         "1-2": 0,
//         "2-3": 1,
//         "3-4": 0,
//         "4-5": 0,
//         "5-6": 0,
//       }
//     ),
//     {
//       "0-1": 0,
//       "1-2": 0,
//       "2-3": 2,
//       "3-4": 0,
//       "4-5": 0,
//       "5-6": 0,
//     },
//     "Failed integer score distribution"
//   );

//   t.deepEqual(
//     utils.createDistribution(
//       {
//         score: 2,
//         value: 6.5,
//       },
//       {
//         "0-1": 0,
//         "1-2": 0,
//         "2-3": 1,
//         "3-4": 0,
//         "4-5": 0,
//         "5-6": 0,
//         "6-7": 0,
//       }
//     ),
//     {
//       "0-1": 0,
//       "1-2": 0,
//       "2-3": 2,
//       "3-4": 0,
//       "4-5": 0,
//       "5-6": 0,
//       "6-7": 0,
//     },
//     "Failed non-integer value distribution"
//   );

//   t.deepEqual(
//     utils.createDistribution(
//       {
//         score: 2,
//         value: 2,
//       },
//       {
//         "0-1": 0,
//         "1-2": 1,
//       }
//     ),
//     {
//       "0-1": 0,
//       "1-2": 2,
//     },
//     "Failed top of distribution score"
//   );

//   t.deepEqual(
//     utils.createDistribution(
//       {
//         score: 1.3,
//         value: 1.3,
//       },
//       {
//         "0-1": 0,
//         "1-2": 1,
//       }
//     ),
//     {
//       "0-1": 0,
//       "1-2": 2,
//     },
//     "Failed top of distribution score (non-integer)"
//   );

//   t.deepEqual(
//     utils.createDistribution(
//       {
//         score: 0,
//         value: 2,
//       },
//       {
//         "0-1": 1,
//         "1-2": 0,
//       }
//     ),
//     {
//       "0-1": 2,
//       "1-2": 0,
//     },
//     "Failed bottom of distribution score"
//   );
// });

