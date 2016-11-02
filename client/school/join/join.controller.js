(function () {
    JoinController.$inject = ['$scope', 'devSchool', '$mdToast'];
    function JoinController($scope, devSchool, $mdToast) {
        $scope.secretKey = '';
        $scope.join = function () {
            devSchool.join($scope.secretKey).then(function (response) {
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
        .controller('joinCtrl', JoinController);
})();