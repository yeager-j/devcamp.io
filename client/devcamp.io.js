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

    angular
        .module('devcamp')
        .config(['$routeProvider', '$mdThemingProvider', config]);
})();
