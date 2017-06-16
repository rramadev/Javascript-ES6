'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var myPromise = new Promise(function (resolve, reject) {
  var itsDone = false;
  itsDone ? resolve('It´s done!') : reject('I´m not ready yet...');
});

exports.default = myPromise;