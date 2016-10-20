/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    authService.$inject = ['$http', '$window', '$route'];
    function authService($http, $window, $route) {
        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token']
        };

        var logout = function () {
            $window.localStorage.removeItem('mean-token')
        };

        function register(user) {
            return $http.post('/api/register', user).then(function (response) {
                saveToken(response.data.token);
                $route.reload();
            })
        }

        return {
            register: register
        }
    }

    angular.module('devcamp')
        .service('authentication', authService)
})();