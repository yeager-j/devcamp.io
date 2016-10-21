(function () {
    schoolRegisterController.$inject = ['$scope', '$mdToast', '$location', 'devSchool'];
    function schoolRegisterController($scope, $mdToast, $location, devSchool) {
        $scope.school = {};

        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state) {
            return {abbrev: state};
        });

        $scope.register = function () {
            devSchool.register($scope.school, function (response) {
                if (response.status == 200) {
                    $location.path('/');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('You have successfully registered a new code school!')
                            .hideDelay(3000)
                    )
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(response.data.message)
                            .hideDelay(3000)
                    )
                }
            })
        }
    }

    angular.module('devcamp')
        .controller('schoolRegCtrl', schoolRegisterController);
})();