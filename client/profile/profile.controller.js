/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    profileController.$inject = ['$scope', 'authentication', '$location'];
    function profileController($scope, authentication, $location) {
        if (!authentication.isLoggedIn()) {
            $location.path('/');
        } else {
            $scope.user = {};

            authentication.getUser(authentication.uuid().uuid)
                .then(function (response) {
                    $scope.user = response.data;
                })
        }
    }

    angular.module('devcamp')
        .controller('profileCtrl', profileController)
})();