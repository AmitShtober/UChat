var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var localStorageHelpers = require('../utils/localStorageHelpers');

var Home = require('../components/Home');
var Main = require('../components/Main');
var PickName = require('../components/PickName');


var routes = (
    <Router history={hashHistory}>
      <Route path='/' component={Home}>
            <IndexRoute header='Pick you nickname' component={PickName} />
            <Route path='room/:roomName' header='spesific room' component={Main} onEnter={localStorageHelpers.isUserLoggedAndMove} />
        </Route>
    </Router>
);


module.exports = routes;