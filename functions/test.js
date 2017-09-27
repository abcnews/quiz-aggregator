import test from 'ava';
import utils from './utils';

test('utils.aggregateQuizIdMatcher', t => {
  t.falsy(
    '1239235956-3235'.match(utils.aggregateQuizIdMatcher),
    'Old style quiz ID matched incorrectly'
  );

  t.truthy(
    '87568875'.match(utils.aggregateQuizIdMatcher),
    'New style quiz ID not matched'
  );

  t.truthy(
    '87568875-preview'.match(utils.aggregateQuizIdMatcher),
    'New style quiz ID (preview) not matched'
  );

  t.truthy(
    'custom-123'.match(utils.aggregateQuizIdMatcher),
    'Custom quiz ID not matched'
  );

  t.truthy(
    'custom-123-preview'.match(utils.aggregateQuizIdMatcher),
    'Custom quiz ID (preview) not matched'
  );
});

test('utils.createDistribution (new)', t => {
  t.deepEqual(
    utils.createDistribution({
      score: 2.916666666666667,
      value: 6
    }),
    {
      '0-1': 0,
      '1-2': 0,
      '2-3': 1,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0
    },
    'Failed non-integer score distribution'
  );

  t.deepEqual(
    utils.createDistribution({
      score: 2,
      value: 6
    }),
    {
      '0-1': 0,
      '1-2': 0,
      '2-3': 1,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0
    },
    'Failed integer score distribution'
  );

  t.deepEqual(
    utils.createDistribution({
      score: 2,
      value: 6.5
    }),
    {
      '0-1': 0,
      '1-2': 0,
      '2-3': 1,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0
    },
    'Failed non-integer value distribution'
  );

  t.deepEqual(
    utils.createDistribution({
      score: 2,
      value: 2
    }),
    {
      '0-1': 0,
      '1-2': 1
    },
    'Failed top of distribution score'
  );

  t.deepEqual(
    utils.createDistribution({
      score: 1.3,
      value: 1.3
    }),
    {
      '0-1': 0,
      '1-2': 1
    },
    'Failed top of distribution score (non-integer)'
  );

  t.deepEqual(
    utils.createDistribution({
      score: 0,
      value: 2
    }),
    {
      '0-1': 1,
      '1-2': 0
    },
    'Failed bottom of distribution score'
  );
});

test('utils.createDistribution (existing)', t => {
  t.deepEqual(
    utils.createDistribution(
      {
        score: 2.916666666666667,
        value: 6
      },
      {
        '0-1': 0,
        '1-2': 0,
        '2-3': 1,
        '3-4': 0,
        '4-5': 0,
        '5-6': 0
      }
    ),
    {
      '0-1': 0,
      '1-2': 0,
      '2-3': 2,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0
    },
    'Failed non-integer score distribution'
  );

  t.deepEqual(
    utils.createDistribution(
      {
        score: 2,
        value: 6
      },
      {
        '0-1': 0,
        '1-2': 0,
        '2-3': 1,
        '3-4': 0,
        '4-5': 0,
        '5-6': 0
      }
    ),
    {
      '0-1': 0,
      '1-2': 0,
      '2-3': 2,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0
    },
    'Failed integer score distribution'
  );

  t.deepEqual(
    utils.createDistribution(
      {
        score: 2,
        value: 6.5
      },
      {
        '0-1': 0,
        '1-2': 0,
        '2-3': 1,
        '3-4': 0,
        '4-5': 0,
        '5-6': 0,
        '6-7': 0
      }
    ),
    {
      '0-1': 0,
      '1-2': 0,
      '2-3': 2,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0
    },
    'Failed non-integer value distribution'
  );

  t.deepEqual(
    utils.createDistribution(
      {
        score: 2,
        value: 2
      },
      {
        '0-1': 0,
        '1-2': 1
      }
    ),
    {
      '0-1': 0,
      '1-2': 2
    },
    'Failed top of distribution score'
  );

  t.deepEqual(
    utils.createDistribution(
      {
        score: 1.3,
        value: 1.3
      },
      {
        '0-1': 0,
        '1-2': 1
      }
    ),
    {
      '0-1': 0,
      '1-2': 2
    },
    'Failed top of distribution score (non-integer)'
  );

  t.deepEqual(
    utils.createDistribution(
      {
        score: 0,
        value: 2
      },
      {
        '0-1': 1,
        '1-2': 0
      }
    ),
    {
      '0-1': 2,
      '1-2': 0
    },
    'Failed bottom of distribution score'
  );
});
