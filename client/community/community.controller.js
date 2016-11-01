(function () {
    communityController.$inject = ['$scope', 'fetchForum', '$mdToast'];
    function communityController($scope, fetchForum, $mdToast) {
        $scope.categories = {};

        fetchForum.fetchMain(function (response) {
            $scope.categories = response.data;
        });
    }

    angular.module('devcamp')
        .controller('communityCtrl', communityController);
})();