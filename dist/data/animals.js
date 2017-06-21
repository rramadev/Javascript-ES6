(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.animals = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var animalsTree = [{ id: 'animals', parent: null }, { id: 'mammals', parent: 'animals' }, { id: 'dogs', parent: 'mammals' }, { id: 'cats', parent: 'mammals' }, { id: 'birds', parent: 'animals' }, { id: 'parrot', parent: 'birds' }, { id: 'pigeon', parent: 'birds' }];

  // Export ES2015 Module
  exports.default = animalsTree;
});