'use strict'

### Directives ###

angular.module('d3testApp.directives', [])

.directive('scVisualization', [ -> 
    return {
      restrict: 'E',
      scope: { val: '=' },
      link: (scope, element, attrs) ->
        createSVG(scope, element)
        scope.$watch('val', updateGraph, true)
    }
])

createSVG = (scope, element) ->
    scope.w = 400
    scope.h = 200

    if not scope.svg?
        scope.svg = d3.select(element[0])
        .append("svg")
        .attr("width", scope.w)
        .attr("height", scope.h)

updateGraph = (newVal, oldVal, scope) ->

    scope.xScale = d3.scale.ordinal()
    .domain(d3.range(newVal.length))
    .rangeRoundBands([0, scope.w], 0.05)

    scope.yScale = d3.scale.linear()
    .domain([0, d3.max(newVal, (d) -> d.data)])
    .range([0, scope.h])

    # Bind data to bars in chart
    bars = scope.svg.selectAll("rect")
    .data(newVal, (d) -> d.time )
    
    # Update existing bars
    existingBars = bars
    .transition()
    .duration(200)
    .ease("cubic-out")

    # Create new rects for those entering
    newBars = bars.enter()
    .append("rect")
    .transition()
    .delay(100)
    .duration(0)
    .ease("cubic-out")
    .attr("x", (newVal.length + 2) * scope.xScale.rangeBand())

    # Remove bars exiting to left
    bars.exit()
    .transition()
    .duration(200)
    .ease("cubic-out")
    .attr("x", -scope.xScale.rangeBand())
    .remove()
    
    # Apply attributes
    for bar in [existingBars, newBars]    
        updateBarAttr(bar, scope)

    # Select and bind data labels centered at top of bar
    textLabels = scope.svg.selectAll("text")
    .data(newVal, (d) -> d.time)
        
    # Update existing labels
    updateLabels = textLabels
    .transition()
    .duration(200)
    .ease("cubic-out")


    # Create new text labels for those entering
    newLabels = textLabels
    .enter()
    .append("text")
    .transition()
    .delay(100)
    .duration(0)
    .ease("cubic-out")
    .attr("x", (newVal.length + 2) * scope.xScale.rangeBand())

    # Remove labels exiting to left
    textLabels.exit()
    .transition()
    .attr("x", -scope.xScale.rangeBand())
    .remove()
    
    # Apply attributes
    for label in [updateLabels, newLabels]
        updateTextAttr(label, scope)
    

updateBarAttr = (bar, scope) ->
    bar.attr("x", (d, i) -> scope.xScale(i))
        .attr("y", (d) -> scope.h - scope.yScale(d.data))
        .attr("width", scope.xScale.rangeBand())
        .attr("height", (d) -> scope.yScale(d.data))
        .attr("fill", (d) -> "rgb(0, 0, " + (d.data*10) + ")")

updateTextAttr = (label, scope) ->
    label.text((d) -> d.data)
        .attr("x", (d, i) -> scope.xScale(i) + scope.xScale.rangeBand() / 2)
        .attr("y", (d) -> scope.h - scope.yScale(d.data) + 15)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("fill", "white")

