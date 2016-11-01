(function () {
    ForumsController.$inject = ['$scope', 'fetchForum', '$mdToast', '$routeParams'];
    function ForumsController($scope, fetchForum, $mdToast, $routeParams) {
        $scope.forum = {};

        fetchForum.fetchForum($routeParams.id, function (response) {
            $scope.forum = response.data;
        })
    }

    angular.module('devcamp')
        .controller('forumsCtrl', ForumsController)
})();