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

            .when('/profile/:user', {
                templateUrl: '/profile/profile.view.html',
                controller: 'profileCtrl'
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

    }

    angular
        .module('devcamp')
        .controller('mainCtrl', mainController)
        .config(['$routeProvider', '$mdThemingProvider', config]);
})();
