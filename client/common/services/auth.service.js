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

        var isLoggedIn = function () {
            var token = getToken();
            var payload;

            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        function register(user) {
            console.log(user);

            return $http.post('/api/register', user).then(function (response) {
                saveToken(response.data.token);
                $route.reload();
            })
        }

        function login(user) {
            return $http.post('/api/login', user).then(function (response) {
                console.log(response);
                saveToken(response.data.token);
                $route.reload();
            })
        }

        function getUser(uid) {
            return $http.get('/api/get_user/' + uid).then(function (response) {
                console.log(response.data.user);
            })
        }

        return {
            register: register,
            login: login,
            getUser: getUser
        }
    }

    angular.module('devcamp')
        .service('authentication', authService)
})();