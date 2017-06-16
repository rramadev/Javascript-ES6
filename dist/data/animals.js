'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var animalsTree = [{ id: 'animals', parent: null }, { id: 'mammals', parent: 'animals' }, { id: 'dogs', parent: 'mammals' }, { id: 'cats', parent: 'mammals' }, { id: 'birds', parent: 'animals' }, { id: 'parrot', parent: 'birds' }, { id: 'pigeon', parent: 'birds' }];

exports.default = animalsTree;