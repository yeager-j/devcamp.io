/**
 * Created by Jackson on 10/12/16.
 */
(function () {
    function home($scope) {
        $scope.test = 'Hello, world!';
    }

    angular
        .module('devcamp')
        .controller('homeCtrl', ['$scope', home])
})();
