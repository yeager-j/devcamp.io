/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    loginController.$inject = ['$scope', '$location', 'authentication', '$mdToast'];
    function loginController($scope, $location, authentication, $mdToast) {
        $scope.user = {};

        $scope.login = function () {
            authentication.login($scope.user)
                .then(function () {
                    $location.path('/');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('You have successfully logged in!')
                            .hideDelay(3000)
                    )
                })
        };
    }

    angular.module('devcamp')
        .controller('loginCtrl', loginController)
})();