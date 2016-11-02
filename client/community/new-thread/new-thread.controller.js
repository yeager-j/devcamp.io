(function () {
    NewThreadController.$inject = ['$scope', 'forums', '$routeParams', '$location', '$mdToast'];
    function NewThreadController($scope, forums, $routeParams, $location, $mdToast) {
        $scope.thread = {};

        $scope.post = function () {
            forums.postThread($routeParams.id, $scope.thread).then(function (response) {
                $location.path('forums/' + $routeParams.id);
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
        .controller('newThreadCtrl', NewThreadController);
})();