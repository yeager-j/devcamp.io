/**
 * Created by Jackson on 9/30/16.
 */

(function () {
    function navController($location, $scope, $mdToast, $mdSidenav) {
        $scope.toggleSidenav = function () {
            $mdSidenav('navigation').toggle();
        };

        $scope.toggleUsernav = function () {
            $mdSidenav('userNav').toggle();
        };

        $scope.nav = [
            {
                icon: 'home',
                location: 'Home',
                path: '#/'
            },
            {
                icon: 'forums',
                location: 'Community',
                path: '#/forums'
            },
            {
                icon: 'comment',
                location: 'Blogs',
                path: '#/blogs'
            },
            {
                icon: 'group',
                location: 'Members',
                path: '#/members'
            }
        ];

        $scope.userNav = [
            {
                icon: 'exit_to_app',
                location: 'Login',
                path: '#/login'
            },
            {
                icon: 'person_add',
                location: 'Register',
                path: '#/register'
            },
            {
                icon: 'person',
                location: 'Your Profile',
                path: '#/'
            },
            {
                icon: 'settings',
                location: 'Settings',
                path: '#/forums'
            },
            {
                icon: 'dashboard',
                location: 'Admin Panel',
                path: '#/blogs'
            },
            {
                icon: 'power_settings_new',
                location: 'Log Out',
                path: '#/members'
            }
        ]
    }

    angular.module('devcamp')
        .controller('navCtrl', ['$location', '$scope', '$mdToast', '$mdSidenav', navController])
})();