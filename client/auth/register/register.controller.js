/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    registerController.$inject = ['$scope', '$location', 'authentication', '$mdToast'];
    function registerController($scope, $location, authentication, $mdToast) {
        $scope.user = {};

        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state) {
            return {abbrev: state};
        });

        $scope.register = function () {
            $scope.user.userType = JSON.parse($scope.user.type).text;

            authentication.register($scope.user)
                .then(function () {
                    $location.path('/');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('You have successfully registered!')
                            .hideDelay(3000)
                    )
                })
        };

        $scope.types = [
            {
                text: "Prospective Student",
                description: "You are someone who is looking into the possibility of coding bootcamps."
            },
            {
                text: "Student",
                description: "You are currently enrolled in a coding bootcamp."
            },
            {
                text: "Alumni",
                description: "You have graduated from a coding bootcamp"
            },
            {
                text: "Instructor",
                description: "You are an instructor or part of a coding bootcamp's faculty"
            },
            {
                text: "Employer",
                description: "You work at a company that is hiring"
            },
            {
                text: "Recruiter",
                description: "You are looking for potential employees"
            },
            {
                text: "Other",
                description: "None of these fit who you are"
            }
        ];

        $scope.$watch('user.type', function (newVal, oldVal) {
            if (newVal) {
                $scope.user.userDesc = JSON.parse(newVal).description;
            }
        });
    }

    angular.module('devcamp')
        .controller('registerCtrl', registerController)
})();