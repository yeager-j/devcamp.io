/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    profileController.$inject = ['$scope', 'fetchUser', '$location', '$routeParams'];
    function profileController($scope, fetchUser, $location, $routeParams) {
        $scope.user = {};

        fetchUser.getUser($routeParams.user, function (response) {
            $scope.user = response;
        })
    }

    angular.module('devcamp')
        .controller('profileCtrl', profileController)
})();