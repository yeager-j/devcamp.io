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

            .otherwise({
                redirectTo: '/'
            });

        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('cyan')
            .warnPalette('red')
            .backgroundPalette('grey');
    }

    angular
        .module('devcamp')
        .config(['$routeProvider', '$mdThemingProvider', config]);
})();
