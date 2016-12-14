var React = require('react');
var ReactDom = require('react-dom');
var routes = require('./config/routes')

// patch in order to make the site little bit work in IE.
require('es6-promise').polyfill(); 


ReactDom.render(routes, document.getElementById('app'));