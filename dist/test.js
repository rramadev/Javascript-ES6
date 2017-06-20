'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _animals = require('./data/animals');

var _animals2 = _interopRequireDefault(_animals);

var _promises = require('./lib/promises');

var _promises2 = _interopRequireDefault(_promises);

var _highland = require('highland');

var _highland2 = _interopRequireDefault(_highland);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Test FUNCTIONAL PROGRAMMING in Javascript
 */

/**
 * Operator Map (Returns a new Observable)
 * 
 * @param {function} transformFn 
 * @returns {object} outputObservable
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
 * @param {function} filterFn 
 * @returns {object} outputObservable
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
 * Create Observable myObj ect
 * 
 * @param {function} subscribeFn 
 * @returns {object}
 */
function createObservable(subscribeFn) {
  return {
    subscribe: subscribeFn,
    map: map,
    filter: filter
  };
};

// *****
// Test MAP with Observables
// *****

// Observer myObject
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

// New Observable myObject from Array
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
});
// .subscribe(myObserver);

// *****
// Test FILTER with Array
// *****

var animals = [{ name: 'bobby', species: 'dog' }, { name: 'lisa', species: 'dog' }, { name: 'lucy', species: 'cat' }, { name: 'jack', species: 'parrot' }];

animals.filter(function (animal) {
  return animal.species === 'dog';
}).forEach(function (dog, i) {
  return console.log('Dog ' + i + ': ' + dog.name);
}

// *****
// Test FILTER with Observables
// *****

// New Observable myObject from Array
);var arrayAnimals = createObservable(function subscribe(observer) {
  console.log("Subscribed to Animals Observable");
  animals.forEach(observer.next);
  observer.complete();
});

// Observer myObject
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

// *****
// Test REDUCE with data file
// *****

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

// *****
// Test OBJECTS Creation Patterns
// *****

// Factory Pattern
var peopleFactory = function peopleFactory(name, age, status) {
  return {
    name: name,
    age: age,
    status: status,
    print: function print() {
      console.log('Person details:', name, age, status);
    }
  };
};

var person1 = peopleFactory('amy', 22, 'single');
person1.print();

// Constructor Pattern
var peopleConstructor = function peopleConstructor(name, age, status) {
  var _this = this;

  this.name = name;
  this.age = age;
  this.status = status;
  this.print = function () {
    console.log('Person details:', _this.name, _this.age, _this.status);
  };
};

var person2 = new peopleConstructor('john', 23, 'single');
person2.print();

// Prototype Pattern
var peopleProto = function peopleProto() {};

peopleProto.prototype.name = 'empty';
peopleProto.prototype.age = 0;
peopleProto.prototype.status = 'empty';
peopleProto.prototype.print = function () {
  console.log('Person details: ' + this.name + ' ' + this.age + ' ' + this.status);
};

var person3 = new peopleProto();
person3.name = 'Sam';
person3.age = 25;
// Property status will be asigned from prototype
// person3.status = 'single';
person3.print();

// Dynamic Prototype Pattern
var peopleDynamicProto = function peopleDynamicProto(name, age, status) {
  this.name = name;
  this.age = age;
  this.status = status;

  // Add the print method to the prototype just once
  if (typeof this.print !== 'function') {
    peopleDynamicProto.prototype.print = function () {
      console.log('Person details: ' + this.name + ' ' + this.age + ' ' + this.status);
    };
  }
};

var person4 = new peopleDynamicProto('Unicorn', 28, 'single');
person4.print();

// *****
// Test CLOSURES
// *****

// A nested function is defined inside of another function, 
// allowing access to the outer functions letiables
function foo() {
  var localletiable = 'private letiable';
  return function () {
    return localletiable;
  };
}

var getLocalletiable = foo();
getLocalletiable // "private letiable"

// Closure for the 'Module pattern'
// Using a self-executed function that returns an object.
();var Module = function () {
  var privateProperty = 'foo';

  function privateMethod(args) {
    console.log('This is a private method. Received:', args);
  }

  return {
    publicProperty: '',
    publicMethod: function publicMethod() {
      console.log('This is a public method. Accesing private property:', privateProperty);
    },
    privilegedMethod: function privilegedMethod(args) {
      return privateMethod(args);
    }
  };
}();

Module.publicMethod();
Module.privilegedMethod('some argument.');

// Make Ajax Request and on success, access the outer letiable requestID
function sendRequest() {
  // let requestID = 'xxx123xxx';

  // let xhttp = new XMLHttpRequest();
  // xhttp.onreadystatuschange = function() {
  //   if (this.readystatus == 4 && this.status == 200) {
  //     console.log('Request ' + requestID + ' success:', this.responseText);
  //   }
  // };
  // xhttp.open("GET", "https://httpbin.org/get", true);
  // xhttp.send();

  // The same example using Jquery
  // $.ajax('https://httpbin.org/get')
  //   .done(function(response) {
  //     console.log('Request ' + requestID + ' success:', response);
  //   })
  //   .fail(function() {
  //     console.log('Request ' + requestID + ' error');
  //   });
}

sendRequest();

// *****
// Test SCOPE/CONTEXT
// *****

// Context on function call
var myObj = {
  foo: function foo() {
    return this;
  }
};

myObj.foo() === myObj; // true

// *****
// Test CURRYING
// *****

var sauce = function sauce(ingredient) {
  return function (salt) {
    return function (time) {
      return 'This sauce is made of ' + ingredient + ' and a ' + salt + ' of salt.' + ' It was cooked for ' + time + '.';
    };
  };
};

var cook = sauce('tomato')('little bit')('30 minutes');
console.log(cook);

// *****
// Test RECURSION
// *****

// Countdown
var count = function count(num) {
  if (num < 0) return;
  console.log(num);
  count(num - 1);
};

count(10);

// Fibonacci sequence
var sum = 0;

var fib = function fib(num1, num2) {
  if (num2 > 100) return;
  sum = num1 + num2;
  console.log(num1, num2, sum);
  fib(num2, sum);
};

fib(0, 1);

// Building a Tree structure


var makeTree = function makeTree(animalsTree, parent) {
  var tree = {};
  animalsTree.filter(function (a) {
    return a.parent === parent;
  }).forEach(function (a) {
    return tree[a.id] = makeTree(animalsTree, a.id);
  });
  return tree;
};

console.log(JSON.stringify(makeTree(_animals2.default, null), null, 2));

// *****
// Test PROMISES
// *****

var numToDouble = 5;
(0, _promises2.default)(numToDouble).then(function (result) {
  return console.log('The promise has return after 5s:', result);
}).catch(function (err) {
  return console.log('Promise error:', err);
});

// *****
// Test STREAMS
// *****

// Stream from object method
var numberStream = {
  each: function each(callback) {
    setTimeout(function () {
      return callback(1);
    }, 1000);
    setTimeout(function () {
      return callback(2);
    }, 2000);
    setTimeout(function () {
      return callback(3);
    }, 3000);
  }
};

numberStream.each(console.log);

// Stream from data file
// Highland is a streaming library


(0, _highland2.default)(_fs2.default.createReadStream('src/data/animals.txt', 'utf8')).split().each(function (x) {
  return console.log('Line: ' + x);
});

// *****
// Test DESTRUCTURING
// *****

// Array
var first = 'a',
    rest = ['b', 'c'];

console.log('The first element of the array:', first);
console.log('The rest of the array:', rest);

// Object, animal is optional
var soundMaker = function soundMaker(_ref) {
  var _ref$animal = _ref.animal,
      animal = _ref$animal === undefined ? 'unicorn' : _ref$animal,
      sound = _ref.sound;

  console.log('The ' + animal + ' says ' + sound + '!');
};

soundMaker({
  animal: 'horse',
  sound: 'hhhiiiiyaaa',
  age: 100
});