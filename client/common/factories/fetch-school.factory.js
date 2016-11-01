(function () {
    fetchSchools.$inject = ['devSchool'];
    function fetchSchools(devSchool) {
        function fetchSchools(uid, callback) {
            devSchool.getSchoolsByUser(uid).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            })
        }

        function fetchSchool(id, callback) {
            devSchool.getSchool(id).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            })
        }

        function getSecretKey(school, callback) {
            devSchool.getSecretKey(school).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            })
        }

        return {
            fetchSchools: fetchSchools,
            getSecretKey: getSecretKey,
            fetchSchool: fetchSchool
        }
    }

    angular.module('devcamp')
        .factory('fetchSchool', fetchSchools)
})();