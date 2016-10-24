/**
 * Created by Jackson on 10/21/16.
 */

(function () {
    graphController.$inject = ['$scope'];
    function graphController($scope) {
        $scope.options = {width: 500, height: 500, 'bar': 'aaa'};
        $scope.data = [1, 2, 3, 4];
        $scope.hovered = function(d){
            $scope.barValue = d;
            $scope.$apply();
        };
        $scope.barValue = 'None';
    }

    angular.module('devcamp')
        .controller('graphsCtrl', graphController);
})();


angular.module('devcamp').directive('barChart', function(){
        var chart = d3.custom.barChart();
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope:{
                height: '=height',
                data: '=data',
                hovered: '&hovered'
            },
            link: function(scope, element, attrs) {
                var chartEl = d3.select(element[0]);
                chart.on('customHover', function(d, i){
                    scope.hovered({args:d});
                });

                scope.$watch('data', function (newVal, oldVal) {
                    chartEl.datum(newVal).call(chart);
                });

                scope.$watch('height', function(d, i){
                    chartEl.call(chart.height(scope.height));
                })
            }
        }
    })
    .directive('chartForm', function(){
        return {
            restrict: 'E',
            replace: true,
            controller: function ($scope) {
                $scope.update = function(d, i){ $scope.data = randomData(); };
                function randomData(){
                    return d3.range(~~(Math.random()*50)+1).map(function(d, i){return ~~(Math.random()*1000);});
                }
            },
            template: '<div class="form">' +
                    'Height: {{options.height}}<br />' +
                    '<input type="range" ng-model="options.height" min="100" max="1000"/>' +
                    '<br /><button ng-click="update()">Update Data</button>' +
                    '<br />Hovered bar data: {{barValue}}</div>'
        }
    });
