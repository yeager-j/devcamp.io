(function () {
    NewReplyController.$inject = ['$scope', 'forums', '$routeParams', '$location', '$mdToast'];
    function NewReplyController($scope, forums, $routeParams, $location, $mdToast) {
        $scope.reply = {};

        $scope.$watch($scope.reply, function (newVal, oldVal) {
            console.log(newVal);
        });

        $scope.post = function () {
            console.log($scope.reply.post_content);

            forums.postReply($routeParams.id, $scope.reply).then(function (response) {
                $location.path('thread/' + $routeParams.id);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                )
            }, function (response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                )
            })
        }
    }

    angular.module('devcamp')
        .controller('newReplyCtrl', NewReplyController);
})();