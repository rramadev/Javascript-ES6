// *****
// A Unit Test Template
// *****
import test from 'tape';

// For each unit test you write,
// answer these questions:
test('What component aspect are you testing?', t => {
  const actual = 'What is the actual output?';
  const expected = 'What is the expected output?';

  t.equal(actual, expected,
    'What should the feature do?');

  t.end();
});

// *****
// A Unit Test Example
// *****

test('A passing test', (t) => {

  t.pass('This test will pass.');
  
  t.end();
});

test('tions with tape.', (t) => {
  const expected = 'something to test';
  const actual = 'something to test';

  t.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

  t.end();
});

