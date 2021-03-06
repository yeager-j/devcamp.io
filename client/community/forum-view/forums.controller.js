(function () {
    ForumsController.$inject = ['$scope', 'fetchForum', 'fetchUser', '$mdToast', '$routeParams', 'authentication'];
    function ForumsController($scope, fetchForum, fetchUser, $mdToast, $routeParams, authentication) {
        $scope.forum = {};
        $scope.threads = {};
        $scope.isLoggedIn = authentication.isLoggedIn();

        fetchForum.fetchForum($routeParams.id, function (response) {
            $scope.forum = response.data;
            $scope.threads = response.data.threads;

            $scope.threads.forEach(function (thread, index) {
                fetchUser.getUser(thread.author_id, function (replyResponse) {
                    $scope.threads[index].author = replyResponse;
                });
            });
        })
    }

    angular.module('devcamp')
        .controller('forumsCtrl', ForumsController)
})();