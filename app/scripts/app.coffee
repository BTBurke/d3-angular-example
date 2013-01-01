'use strict'

d3testApp = angular.module('d3testApp', [
  'd3testApp.controllers'
  'd3testApp.directives'
  ])


d3testApp.config(['$routeProvider', 

($routeProvider) ->
  
  $routeProvider
    
    # Named routes
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
     
    # Catch all redirect to index  
    .otherwise({
        redirectTo: '/'
      })
])
