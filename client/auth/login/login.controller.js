/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    loginController.$inject = ['$scope', '$location', 'authentication', '$mdToast', 'fetchUser'];
    function loginController($scope, $location, authentication, $mdToast, fetchUser) {
        $scope.user = {};

        $scope.login = function () {
            authentication.login($scope.user, function (response) {
                if (response.status === 200) {
                    $location.path('/');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('You have successfully logged in! Welcome!')
                            .hideDelay(3000)
                    )
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Incorrect email or password. Please try again.')
                            .hideDelay(3000)
                    )
                }
            })
        };
    }

    angular.module('devcamp')
        .controller('loginCtrl', loginController)
})();