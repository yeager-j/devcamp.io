/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    profileController.$inject = ['$scope', 'fetchUser', 'fetchSchool', 'fetchForum', '$location', '$routeParams', '$mdDialog', '$mdToast'];
    function profileController($scope, fetchUser, fetchSchool, fetchForum, $location, $routeParams, $mdDialog, $mdToast) {
        $scope.user = {};
        $scope.schools = [];
        $scope.threads = [];
        $scope.currentNavItem = 'page1';

        fetchUser.getUser($routeParams.user, function (response) {
            $scope.user = response;
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

            fetchForum.fetchUserThreads($scope.user._id, function (response) {
                if (response.status === 200) {
                    $scope.threads = response.data;
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(response.data.message)
                    )
                }
            })
        });
    }

    angular.module('devcamp')
        .controller('profileCtrl', profileController)
})();