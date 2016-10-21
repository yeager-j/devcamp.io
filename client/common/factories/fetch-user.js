/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    fetchUser.$inject = ['$http', 'authentication'];
    function fetchUser($http, authentication) {
        function getUserById(uuid, callback) {
            authentication.getUser(uuid).then(function (response) {
                callback(response.data);
            })
        }

        function getCurrentUser(callback) {
            if (authentication.isLoggedIn()) {
                authentication.getUser(authentication.uuid().uuid).then(function (response) {
                    callback(response.data);
                })
            } else {
                return null;
            }
        }

        return {
            getUserById: getUserById,
            getCurrentUser: getCurrentUser
        }
    }

    angular.module('devcamp')
        .factory('fetchUser', fetchUser)
})();