(function () {
    ThreadsController.$inject = ['$scope', 'fetchForum', 'fetchUser', '$mdToast', '$routeParams', 'authentication'];
    function ThreadsController($scope, fetchForum, fetchUser, $mdToast, $routeParams, authentication) {
        $scope.thread = {};
        $scope.replies = {};
        $scope.author = {};
        $scope.isLoggedIn = authentication.isLoggedIn();

        fetchForum.fetchThread($routeParams.id, function (response) {
            console.log(response.data);
            $scope.thread = response.data;
            $scope.replies = response.data.replies;

            $scope.thread.replies.forEach(function (reply, index) {
                fetchUser.getUser(reply.author_id, function (replyResponse) {
                    var user = replyResponse;
                    user.rankName = parseRank(user.rank);

                    $scope.replies[index].author = user;
                });
            });

            fetchUser.getUser(response.data.author_id, function (response) {
                $scope.author = response;

                $scope.author.rankName = parseRank($scope.author.rank);
            })
        });

        function parseRank(rankId) {
            switch (rankId) {
                case 1:
                    return 'Member';
                case 2:
                    return 'Moderator';
                case 3:
                    return 'Administrator';
                default:
                    return 'Member'
            }
        }
    }

    angular.module('devcamp')
        .controller('threadsCtrl', ThreadsController)
})();
