(function () {
    membersController.$inject = ['$scope', 'fetchUser'];
    function membersController($scope, fetchUser) {
        $scope.users = [];

        fetchUser.getAllUsers(function (users) {
            $scope.users = users;
        });
    }

    angular.module('devcamp')
        .controller('membersCtrl', membersController);
})();