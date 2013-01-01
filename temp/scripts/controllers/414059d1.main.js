(function() {
  'use strict';

  angular.module('d3testApp.controllers', []).controller('MainCtrl', [
    '$scope', function($scope) {
      var randomData, t;
      randomData = function() {
        return Math.round(Math.random() * 25);
      };
      t = function() {
        return new Date().getTime();
      };
      $scope.dataLength = 8;
      $scope.data = [
        {
          time: t(),
          data: randomData()
        }
      ];
      return $scope.updateData = function() {
        $scope.data.push({
          time: t(),
          data: randomData()
        });
        if ($scope.data.length > $scope.dataLength) {
          return $scope.data.shift();
        }
      };
    }
  ]);

}).call(this);
