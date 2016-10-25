// /**
//  * Created by Jackson on 10/21/16.
//  */

// (function () {
//     graphController.$inject = ['$scope'];
//     function graphController($scope) {
//         $scope.options = {width: 500, height: 500, 'bar': 'aaa'};
//         $scope.data = [1, 2, 3, 4];
//         $scope.hovered = function(d){
//             $scope.barValue = d;
//             $scope.$apply();
//         };
//         $scope.barValue = 'None';
//     }

//     angular.module('devcamp')
//         .controller('graphsCtrl', graphController);
// })();


// angular.module('devcamp').directive('barChart', function(){
//         var chart = d3.custom.barChart();
//         return {
//             restrict: 'E',
//             replace: true,
//             template: '<div class="chart"></div>',
//             scope:{
//                 height: '=height',
//                 data: '=data',
//                 hovered: '&hovered'
//             },
//             link: function(scope, element, attrs) {
//                 var chartEl = d3.select(element[0]);
//                 chart.on('customHover', function(d, i){
//                     scope.hovered({args:d});
//                 });

//                 scope.$watch('data', function (newVal, oldVal) {
//                     chartEl.datum(newVal).call(chart);
//                 });

//                 scope.$watch('height', function(d, i){
//                     chartEl.call(chart.height(scope.height));
//                 })
//             }
//         }
//     })
//     .directive('chartForm', function(){
//         return {
//             restrict: 'E',
//             replace: true,
//             controller: function ($scope) {
//                 $scope.update = function(d, i){ $scope.data = randomData(); };
//                 function randomData(){
//                     return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
//                 }
//             },
//             template: '<div class="form">' +
//                     'Height: {{options.height}}<br />' +
//                     '<input type="range" ng-model="options.height" min="100" max="1000"/>' +
//                     '<br /><button ng-click="update()">Update Data</button>' +
//                     '<br />Hovered bar data: {{barValue}}</div>'
//         }
//     });


angular.module('devcamp').controller('graphsCtrl', ['d3', '$scope', function (d3, $scope){
    $scope.drawBarChart = function(){ // Function for creating bar chart
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        var x = d3.scaleBand()
            .rangeRound([0, width], .1)
            .paddingInner(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);
        var xAxis = d3.axisBottom()
            .scale(x);
        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(10, "%");
        var svg = d3.select("#bar-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        d3.tsv("assets/mockData/data.tsv", type, function(error, data) {
            if (error) throw error;
            x.domain(data.map(function(d) { return d.letter; }));
            y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Frequency");
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.letter); })
                .attr("width", x.bandwidth())
                .attr("y", function(d) { return y(d.frequency); })
                .attr("height", function(d) { return height - y(d.frequency); });
        });
        function type(d) {
          d.frequency = +d.frequency;
          return d;
        }
    }
    $scope.drawBarChart(); // Call to draw bar chart
}]);
