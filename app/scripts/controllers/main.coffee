'use strict'

angular.module('d3testApp.controllers', [])

.controller('MainCtrl', [
  '$scope'

($scope) ->
  
  # Helper functions for generating new data
  randomData = -> Math.round(Math.random() * 25)
  t = -> new Date().getTime()
  
  # Maximum length of dataset
  $scope.dataLength = 8

  # Populate initial data point
  $scope.data = [{time: t(), data: randomData()}]
  
  # Adds a new random data point up to dataLength
  $scope.updateData = ->
    $scope.data.push({time: t(), data: randomData()})
    if $scope.data.length > $scope.dataLength
      $scope.data.shift()
])
