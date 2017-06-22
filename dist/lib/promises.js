'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var myPromise = function myPromise(numToDouble) {
  return new Promise(function (resolve, reject) {
    // Fake waiting time, 3s...
    setTimeout(function () {
      var double = numToDouble * 2;
      // Number successfully doubled, well done! now lets resolve the Promise...
      var itsDone = true;
      itsDone ? resolve('It´s done!: ' + double) : reject('I´m not ready yet...');
    }, 3000);
  });
};

exports.default = myPromise;