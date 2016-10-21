/**
 * Created by Jackson on 10/21/16.
 */

(function () {
    schoolService.$inject = ['$http'];
    function schoolService($http) {
        this.register = function (school, callback) {
            return $http.post('/api/school_register', school).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            })
        }
    }

    angular.module('devcamp')
        .service('devSchool', schoolService)
})();