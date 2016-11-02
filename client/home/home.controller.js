/**
 * Created by Jackson on 10/12/16.
 */
(function () {
    function home($scope, $anchorScroll, $location) {
        $scope.test = 'Hello, world!';

        $scope.down = function () {
            $location.hash('about');
            $anchorScroll();
        }
    }

    angular
        .module('devcamp')
        .controller('homeCtrl', ['$scope', '$anchorScroll', '$location', home])
})();
