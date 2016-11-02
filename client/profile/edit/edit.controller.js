(function () {
    angular.module('devcamp')
        .controller('EditController', EditController);

    EditController.$inject = ['$scope', '$mdDialog', 'authentication', 'fetchUser', '$location', '$mdToast'];
    function EditController($scope, $mdDialog, authentication, fetchUser, $location, $mdToast) {
        $scope.user = {};
        $scope.edit = edit;

        function edit() {
            authentication.edit({
                username: $scope.user.username,
                fullname: $scope.user.fullname,
                email: $scope.user.email
            }).then(function (response) {
                $location.path('/profile/' + $scope.user.username);
                authentication.saveToken(response.data.token);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                );
                $mdDialog.cancel();
            }, function (response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                )
            })
        }

        fetchUser.getCurrentUser(function (response) {
            $scope.user = response;
        });
    }
})();