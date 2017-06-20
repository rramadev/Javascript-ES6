'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var myPromise = function myPromise(numToDouble) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var itsDone = true;
      var double = numToDouble * 2;
      itsDone ? resolve('It´s done!: ' + double) : reject('I´m not ready yet...');
    }, 5000);
  });
};

exports.default = myPromise;