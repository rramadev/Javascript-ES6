'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Operator Map (Returns a new Observable)
 * 
 * @param {object} transformFn 
 * @returns Observable
 */
function map(transformFn) {
  var inputObservable = this;
  var outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function next(x) {
        var y = transformFn(x);
        outputObserver.next(y);
      },
      error: function error(err) {
        return outputObserver.error(err);
      },
      complete: function complete() {
        return outputObserver.complete();
      }
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
  var inputObservable = this;
  var outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: function next(x) {
        if (filterFn(x)) outputObserver.next(x);
      },
      error: function error(err) {
        return outputObserver.error(err);
      },
      complete: function complete() {
        return outputObserver.complete();
      }
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
  };
};

// Test MAP with Observables
// Observer Object
var myObserver = {
  next: function next(data, i, a) {
    return console.log('Received element: ' + data);
  },
  error: function error(err) {
    return console.log(err);
  },
  complete: function complete() {
    return console.log('Done!');
  }
};

// New Observable Object from Array
var arrayObservable = createObservable(function subscribe(observer) {
  console.log("Subscribed to Observable - Initial array [1, 2, 3]");
  [1, 2, 3].forEach(observer.next);
  observer.complete();
});

// Subscribe to Observable
arrayObservable.map(function (x) {
  return x * 2;
}).map(function (x) {
  return x + 10;
}).subscribe(myObserver);

// Test FILTER with Array
var animals = [{ name: 'bobby', species: 'dog' }, { name: 'lisa', species: 'dog' }, { name: 'lucy', species: 'cat' }, { name: 'jack', species: 'parrot' }];

animals.filter(function (animal) {
  return animal.species === 'dog';
}).forEach(function (dog, i) {
  return console.log('Dog ' + i + ': ' + dog.name);
}

// Test FILTER with Observables
// New Observable Object from Array
);var arrayAnimals = createObservable(function subscribe(observer) {
  console.log("Subscribed to Animals Observable");
  animals.forEach(observer.next);
  observer.complete();
});

// Observer Object
var myAnimalsObserver = {
  next: function next(data, i, a) {
    return console.log('Received animal: ' + data.name);
  },
  error: function error(err) {
    return console.log(err);
  },
  complete: function complete() {
    return console.log('Done!');
  }
};

// Subscribe to Observable
arrayAnimals.filter(function (animal) {
  return animal.species === 'dog';
}).filter(function (animal) {
  return animal.name === 'lisa';
}).subscribe(myAnimalsObserver);

// Test REDUCE with data file


// Read the data file and format to JSON
var output = _fs2.default.readFileSync('src/data/animals.txt', 'utf8').trim().split('\r\n').map(function (line) {
  return line.split('\t');
}).reduce(function (animal, line) {
  animal[line[0]] = animal[line[0]] || [];
  animal[line[0]].push({
    species: line[1],
    color: line[2],
    age: line[3]
  });
  return animal;
}, {});

console.log('File output in JSON format:\n', JSON.stringify(output, null, 2));