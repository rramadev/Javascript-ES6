// *****
// A Unit Test Template
// *****
import test from 'tape';

// For each unit test you write,
// answer these questions:
test('What component aspect are you testing?', assert => {
  const actual = 'What is the actual output?';
  const expected = 'What is the expected output?';

  assert.equal(actual, expected,
    'What should the feature do?');

  assert.end();
});

// *****
// A Unit Test Example
// *****

test('A passing test', (assert) => {

  assert.pass('This test will pass.');

  assert.end();
});

test('Assertions with tape.', (assert) => {
  const expected = 'something to test';
  const actual = 'something to test';

  assert.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

  assert.end();
});

