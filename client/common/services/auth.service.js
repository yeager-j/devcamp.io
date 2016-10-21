/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    authService.$inject = ['$http', '$window', '$route'];
    function authService($http, $window, $route) {
        function saveToken(token) {
            $window.localStorage['mean-token'] = token;
        }

        function getToken() {
            return $window.localStorage['mean-token']
        }

        function logout() {
            console.log("loggin out");
            $window.localStorage.removeItem('mean-token')
        }

        function isLoggedIn() {
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
        }

        function uuid() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    uuid: payload._id
                };
            }
        }

        function register(user) {
            console.log(user);

            return $http.post('/api/register', user).then(function (response) {
                saveToken(response.data.token);
                $route.reload();
            })
        }

        function login(user) {
            return $http.post('/api/login', user).then(function (response) {
                saveToken(response.data.token);
                $route.reload();
            })
        }

        function getUser(uid) {
            return $http.get('/api/get_user/' + uid);
        }

        return {
            register: register,
            login: login,
            getUser: getUser,
            uuid: uuid,
            isLoggedIn: isLoggedIn,
            logout: logout,
            getToken: getToken
        }
    }

    angular.module('devcamp')
        .service('authentication', authService)
})();