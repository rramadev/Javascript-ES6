// *****
// A Unit Test Template
// *****
import test from 'tape';

// Boilerplate
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

test('Component functionality test with tape.', (t) => {
  const expected = 'something to test';
  const actual = 'something to test2';

  t.equal(actual, expected,
    'Given two mismatched values, .equal() should produce a nice bug report');

  t.end();
});

