/**
 * Functional programming in Javascript
 */

/**
 * Operator Map (Returns a new Observable)
 * 
 * @param {object} transformFn 
 * @returns Observable
 */
function map(transformFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function (x) {
        const y = transformFn(x);
        outputObserver.next(y);
      },
      error: (err) => outputObserver.error(err),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
};

/**
 * Operator Filter (Returns a new Observable)
 * 
 * @param {object} transformFn 
 * @returns Observable
 */
function filter(filterFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function (x) {
        if (filterFn(x)) outputObserver.next(x);
      },
      error: (err) => outputObserver.error(err),
      complete: () => outputObserver.complete()
    });
  });
  return outputObservable;
};

/**
 * Create Observable Object
 * 
 * @param {any} subscribeFn 
 * @returns 
 */
function createObservable(subscribeFn) {
  return {
    subscribe: subscribeFn,
    map: map,
    filter: filter
  }
};

// *****
// Test MAP with Observables
// *****

// Observer Object
const myObserver = {
  next: (data, i, a) => console.log(`Received element: ${data}`),
  error: (err) => console.log(err),
  complete: () => console.log('Done!')
};

// New Observable Object from Array
const arrayObservable = createObservable(function subscribe(observer) {
  console.log("Subscribed to Observable - Initial array [1, 2, 3]");
  [1, 2, 3].forEach(observer.next);
  observer.complete();
});

// Subscribe to Observable
arrayObservable
  .map(x => x * 2)
  .map(x => x + 10)
  .subscribe(myObserver);

// *****
// Test FILTER with Array
// *****

let animals = [
  { name: 'bobby', species: 'dog' },
  { name: 'lisa', species: 'dog' },
  { name: 'lucy', species: 'cat' },
  { name: 'jack', species: 'parrot' }
]

animals
  .filter((animal) => animal.species === 'dog')
  .forEach((dog, i) => console.log(`Dog ${i}: ${dog.name}`))

// *****
// Test FILTER with Observables
// *****

// New Observable Object from Array
const arrayAnimals = createObservable(function subscribe(observer) {
  console.log("Subscribed to Animals Observable");
  animals.forEach(observer.next);
  observer.complete();
});

// Observer Object
const myAnimalsObserver = {
  next: (data, i, a) => console.log(`Received animal: ${data.name}`),
  error: (err) => console.log(err),
  complete: () => console.log('Done!')
};

// Subscribe to Observable
arrayAnimals
  .filter((animal) => animal.species === 'dog')
  .filter((animal) => animal.name === 'lisa')
  .subscribe(myAnimalsObserver);

// *****
// Test REDUCE with data file
// *****

import fs from 'fs';

// Read the data file and format to JSON
var output = fs.readFileSync('src/data/animals.txt', 'utf8')
  .trim()
  .split('\r\n')
  .map(line => line.split('\t'))
  .reduce((animal, line) => { 
    animal[line[0]] = animal[line[0]] || [];
    animal[line[0]].push({
      species: line[1],
      color: line[2],
      age: line[3]
    });
    return animal;
  }, {});

console.log('File output in JSON format:\n', JSON.stringify(output, null, 2));