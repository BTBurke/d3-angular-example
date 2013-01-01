(function() {
  'use strict';

  /* Directives
  */

  var createSVG, updateBarAttr, updateGraph, updateTextAttr;

  angular.module('d3testApp.directives', []).directive('scVisualization', [
    function() {
      return {
        restrict: 'E',
        scope: {
          val: '='
        },
        link: function(scope, element, attrs) {
          createSVG(scope, element);
          return scope.$watch('val', updateGraph, true);
        }
      };
    }
  ]);

  createSVG = function(scope, element) {
    scope.w = 400;
    scope.h = 200;
    if (!(scope.svg != null)) {
      return scope.svg = d3.select(element[0]).append("svg").attr("width", scope.w).attr("height", scope.h);
    }
  };

  updateGraph = function(newVal, oldVal, scope) {
    var bar, bars, existingBars, label, newBars, newLabels, textLabels, updateLabels, _i, _j, _len, _len1, _ref, _ref1, _results;
    scope.xScale = d3.scale.ordinal().domain(d3.range(newVal.length)).rangeRoundBands([0, scope.w], 0.05);
    scope.yScale = d3.scale.linear().domain([
      0, d3.max(newVal, function(d) {
        return d.data;
      })
    ]).range([0, scope.h]);
    bars = scope.svg.selectAll("rect").data(newVal, function(d) {
      return d.time;
    });
    existingBars = bars.transition().duration(200).ease("cubic-out");
    newBars = bars.enter().append("rect").transition().delay(100).duration(0).ease("cubic-out").attr("x", (newVal.length + 2) * scope.xScale.rangeBand());
    bars.exit().transition().duration(200).ease("cubic-out").attr("x", -scope.xScale.rangeBand()).remove();
    _ref = [existingBars, newBars];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      bar = _ref[_i];
      updateBarAttr(bar, scope);
    }
    textLabels = scope.svg.selectAll("text").data(newVal, function(d) {
      return d.time;
    });
    updateLabels = textLabels.transition().duration(200).ease("cubic-out");
    newLabels = textLabels.enter().append("text").transition().delay(100).duration(0).ease("cubic-out").attr("x", (newVal.length + 2) * scope.xScale.rangeBand());
    textLabels.exit().transition().attr("x", -scope.xScale.rangeBand()).remove();
    _ref1 = [updateLabels, newLabels];
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      label = _ref1[_j];
      _results.push(updateTextAttr(label, scope));
    }
    return _results;
  };

  updateBarAttr = function(bar, scope) {
    return bar.attr("x", function(d, i) {
      return scope.xScale(i);
    }).attr("y", function(d) {
      return scope.h - scope.yScale(d.data);
    }).attr("width", scope.xScale.rangeBand()).attr("height", function(d) {
      return scope.yScale(d.data);
    }).attr("fill", function(d) {
      return "rgb(0, 0, " + (d.data * 10) + ")";
    });
  };

  updateTextAttr = function(label, scope) {
    return label.text(function(d) {
      return d.data;
    }).attr("x", function(d, i) {
      return scope.xScale(i) + scope.xScale.rangeBand() / 2;
    }).attr("y", function(d) {
      return scope.h - scope.yScale(d.data) + 15;
    }).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "8px").attr("fill", "white");
  };

}).call(this);
