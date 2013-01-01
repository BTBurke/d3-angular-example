(function() {
  'use strict';

  var d3testApp;

  d3testApp = angular.module('d3testApp', ['d3testApp.controllers', 'd3testApp.directives']);

  d3testApp.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);
