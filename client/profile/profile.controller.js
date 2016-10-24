/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    profileController.$inject = ['$scope', 'fetchUser', 'fetchSchool', '$location', '$routeParams', '$mdDialog'];
    function profileController($scope, fetchUser, fetchSchool, $location, $routeParams, $mdDialog) {
        $scope.user = {};
        $scope.schools = [];
        $scope.currentNavItem = 'page1';
        $scope.getKey = function (id) {
            fetchSchool.getSecretKey(id, function (response) {
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

        fetchUser.getUser($routeParams.user, function (response) {
            $scope.user = response;
        });

        fetchUser.getCurrentUser(function (user) {
            $scope.user = user;
            $scope.userNav[0].path = '#/profile/' + $scope.user.username;

            fetchSchool.fetchSchools($scope.user._id, function (response) {
                if (response.data) {
                    for (var i = 0; i < response.data.length; i++) {
                        (function () {
                            var school = response.data[i];

                            fetchUser.getUser(response.data[i].faculty[0], function (response) {
                                school.leadInstructor = response.username;
                                $scope.schools.push(school);
                            })
                        })();
                    }
                }
            });
        })
    }

    angular.module('devcamp')
        .controller('profileCtrl', profileController)
})();