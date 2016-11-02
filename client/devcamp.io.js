/**
 * Created by Jackson on 10/12/16.
 */
(function () {
    angular.module('devcamp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'd3Module']);

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

            .when('/school/register', {
                templateUrl: '/school/register/school-register.view.html',
                controller: 'schoolRegCtrl'
            })

            .when('/school/join', {
                templateUrl: '/school/join/join.view.html',
                controller: 'joinCtrl'
            })

            .when('/school/:id', {
                templateUrl: '/school/school.view.html',
                controller: 'schoolCtrl'
            })

            .when('/profile/:user', {
                templateUrl: '/profile/profile.view.html',
                controller: 'profileCtrl'
            })

            .when('/members', {
                templateUrl: '/members/members.view.html',
                controller: 'membersCtrl'
            })

            .when('/graphs', {
                templateUrl: '/graphs/graphs.view.html',
                controller: 'graphsCtrl'
            })

            .when('/forums', {
                templateUrl: '/community/community.view.html',
                controller: 'communityCtrl'
            })

            .when('/forums/:id', {
                templateUrl: '/community/forum-view/forums.view.html',
                controller: 'forumsCtrl'
            })

            .when('/forums/:id/create', {
                templateUrl: '/community/new-thread/new-thread.view.html',
                controller: 'newThreadCtrl'
            })

            .when('/thread/:id', {
                templateUrl: '/community/thread-view/thread.view.html',
                controller: 'threadsCtrl'
            })

            .when('/thread/:id/create', {
                templateUrl: '/community/new-reply/new-reply.view.html',
                controller: 'newReplyCtrl'
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
