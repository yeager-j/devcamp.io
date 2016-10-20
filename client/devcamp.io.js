/**
 * Created by Jackson on 10/12/16.
 */
(function () {
    angular.module('devcamp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate']);

    function config($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl'
            })

            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl'
            })

            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'loginCtrl'
            })

            .otherwise({
                redirectTo: '/'
            });

        $mdThemingProvider
            .theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink')
            .warnPalette('red')
            .backgroundPalette('grey');
    }

    mainController.$indect = ['$scope', 'authentication'];
    function mainController($scope, authentication) {
        $scope.user = {};
        authentication.getUser('5809305c0c44ee79f71b2e7a');
    }

    angular
        .module('devcamp')
        .config(['$routeProvider', '$mdThemingProvider', config]);
})();
