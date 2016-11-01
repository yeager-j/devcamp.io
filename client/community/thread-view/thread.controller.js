(function () {
    ThreadsController.$inject = ['$scope', 'fetchForum', '$mdToast', '$routeParams'];
    function ThreadsController($scope, fetchForum, $mdToast, $routeParams) {
        $scope.thread = {};

        fetchForum.fetchThread($routeParams.id, function (response) {
            console.log(response.data);
            $scope.thread = response.data;
        })
    }

    angular.module('devcamp')
        .controller('threadsCtrl', ThreadsController)
})();
