'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _fetch = require('fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myFetch = function myFetch() {
   var URL = 'https://api.flickr.com/services/rest/?method=flickr.test.echo&name=value';
   var myBody = '';
   _fetch2.default.fetchUrl(URL, function (error, meta, body) {
      this.myBody = body.toString();
   });

   return myBody;
};

exports.default = myFetch;