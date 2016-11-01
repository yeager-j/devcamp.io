(function () {
    SchoolController.$inject = ['$scope', 'fetchSchool', 'fetchUser', '$routeParams', '$mdDialog'];
    function SchoolController($scope, fetchSchool, fetchUser, $routeParams, $mdDialog) {
        $scope.school = {};
        $scope.faculty = [];

        fetchSchool.fetchSchool($routeParams.id, function (response) {
            if (response.status === 200) {
                $scope.school = response.data;

                for (var i = 0; i < $scope.school.faculty.length; i++) {
                    var faculty = $scope.school.faculty[i];

                    fetchUser.getUser(faculty, function (response) {
                        $scope.faculty.push(response);
                        console.log(response);
                    })
                }
            }
        });

        $scope.getKey = function () {
            fetchSchool.getSecretKey($scope.school._id, function (response) {
                if (response.status === 200) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Secret Key')
                            .textContent(response.data)
                            .ok('Thank you')
                    )
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .textContent(response.data.message)
                            .ok('Well shit')
                    )
                }
            })
        };
    }

    angular.module('devcamp')
        .controller('schoolCtrl', SchoolController);
})();