/**
 * Created by Jackson on 10/21/16.
 */

(function () {
    schoolService.$inject = ['$http', 'authentication'];
    function schoolService($http, authentication) {
        this.register = function (school, callback) {
            return $http({
                method: 'POST',
                url: '/api/school_register',
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                },
                data: school
            }).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            })
        };

        this.getSchoolsByUser = function (uid) {
            return $http({
                method: 'GET',
                url: '/api/get_schools/' + uid
            });
        };

        this.getSchool = function (id) {
            return $http.get('/api/get_school/' + id);
        };

        this.getSecretKey = function (school) {
            return $http({
                method: 'GET',
                url: '/api/get_school_key/' + school,
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        };

        this.join = function (secretKey) {
            console.log("Okay posting");

            return $http({
                method: 'POST',
                url: '/api/student_register',
                data: {
                    secretKey: secretKey
                },
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        };
    }

    angular.module('devcamp')
        .service('devSchool', schoolService)
})();