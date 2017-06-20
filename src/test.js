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
 * @param {function} filterFn 
 * @returns {object} outputObservable
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
  }
};

// *****
// Test MAP with Observables
// *****

// Observer myObject
const myObserver = {
  next: (data, i, a) => console.log(`Received element: ${data}`),
  error: (err) => console.log(err),
  complete: () => console.log('Done!')
};

// New Observable myObject from Array
const arrayObservable = createObservable(function subscribe(observer) {
  console.log("Subscribed to Observable - Initial array [1, 2, 3]");
  [1, 2, 3].forEach(observer.next);
  observer.complete();
});

// Subscribe to Observable
arrayObservable
  .map(x => x * 2)
  .map(x => x + 10);
  // .subscribe(myObserver);

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

// New Observable myObject from Array
const arrayAnimals = createObservable(function subscribe(observer) {
  console.log("Subscribed to Animals Observable");
  animals.forEach(observer.next);
  observer.complete();
});

// Observer myObject
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
let output = fs.readFileSync('src/data/animals.txt', 'utf8')
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


// *****
// Test OBJECTS Creation Patterns
// *****

// Factory Pattern
let peopleFactory = (name, age, status) => {
  return {
    name: name,
    age: age,
    status: status,
    print: () => {
      console.log('Person details:', name, age, status);
    }
  };
};

let person1 = peopleFactory('amy', 22, 'single');
person1.print();

// Constructor Pattern
let peopleConstructor = function (name, age, status) {
  this.name = name;
  this.age = age;
  this.status = status;
  this.print = () => {
    console.log('Person details:', this.name, this.age, this.status)
  };  
};

let person2 = new peopleConstructor('john', 23, 'single');
person2.print();

// Prototype Pattern
let peopleProto = () => {
};

peopleProto.prototype.name = 'empty';
peopleProto.prototype.age = 0;
peopleProto.prototype.status = 'empty';
peopleProto.prototype.print = function() {
  console.log('Person details: ' + this.name + ' ' + this.age + ' ' + this.status);
};

let person3 = new peopleProto();
person3.name = 'Sam';
person3.age = 25;
// Property status will be asigned from prototype
// person3.status = 'single';
person3.print();

// Dynamic Prototype Pattern
let peopleDynamicProto = function (name, age, status) {  
  this.name = name;
  this.age = age;
  this.status = status;

  // Add the print method to the prototype just once
  if (typeof this.print !== 'function') {
    peopleDynamicProto.prototype.print = function() {
      console.log('Person details: ' + this.name + ' ' + this.age + ' ' + this.status);
    };
  }
};

let person4 = new peopleDynamicProto('Unicorn', 28, 'single');
person4.print();

// *****
// Test CLOSURES
// *****

// A nested function is defined inside of another function, 
// allowing access to the outer functions letiables
function foo() {
    let localletiable = 'private letiable';
    return function() {
        return localletiable;
    }
}

let getLocalletiable = foo();
getLocalletiable() // "private letiable"

// Closure for the 'Module pattern'
// Using a self-executed function that returns an object.
let Module = (function() {
    let privateProperty = 'foo';

    function privateMethod(args) {
        console.log('This is a private method. Received:', args);
    }

    return {
        publicProperty: '',
        publicMethod: function() {
          console.log('This is a public method. Accesing private property:', privateProperty);
        },
        privilegedMethod: function(args) {
            return privateMethod(args);
        }
    };
})();

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
let myObj = {
    foo: function() {
        return this;   
    }
};

myObj.foo() === myObj; // true

// *****
// Test CURRYING
// *****

let sauce =
  ingredient =>
    salt =>
      time =>
        'This sauce is made of ' + ingredient +
        ' and a ' + salt + ' of salt.' +
        ' It was cooked for ' + time + '.';

let cook = sauce('tomato')('little bit')('30 minutes');
console.log(cook);

// *****
// Test RECURSION
// *****

// Countdown
let count = (num) => {
  if (num < 0) return;
  console.log(num);
  count(num-1);
}

count(10);

// Fibonacci sequence
let sum = 0;

let fib = (num1, num2) => {
  if (num2 > 100) return;
  sum = num1 + num2;
  console.log(num1, num2, sum);
  fib (num2, sum);
}

fib(0, 1);

// Building a Tree structure
import animalsTree from './data/animals';

let makeTree = (animalsTree, parent) => {
  let tree = {};
  animalsTree
    .filter(a => a.parent === parent)
    .forEach(a => tree[a.id] = makeTree(animalsTree, a.id));
  return tree;
};

console.log (JSON.stringify(makeTree(animalsTree, null), null, 2));

// *****
// Test PROMISES
// *****

import myPromise from './lib/promises';

let numToDouble = 5;
myPromise(numToDouble)
.then((result) => console.log('The promise has return after 5s:', result))
.catch((err) => console.log('Promise error:', err));

// *****
// Test STREAMS
// *****

// Stream from object method
let numberStream = {
  each: (callback) => {
    setTimeout(() => callback(1), 1000);
    setTimeout(() => callback(2), 2000);
    setTimeout(() => callback(3), 3000);
  }
};

numberStream.each(console.log);

// Stream from data file
// Highland is a streaming library
import highland from 'highland';

highland(fs.createReadStream('src/data/animals.txt', 'utf8'))
  .split()
  .each(x => console.log('Line: ' + x));

// *****
// Test DESTRUCTURING
// *****

// Array
const [first, ...rest] = ['a', 'b', 'c'];
console.log('The first element of the array:', first);
console.log('The rest of the array:', rest);

// Object, animal is optional
const soundMaker = ({animal = 'unicorn', sound}) => {
  console.log('The ' + animal + ' says ' + sound + '!');
}

soundMaker({
  animal: 'horse',
  sound: 'hhhiiiiyaaa',
  age: 100
});
