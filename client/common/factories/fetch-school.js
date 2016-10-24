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

        return {
            fetchSchools: fetchSchools
        }
    }

    angular.module('devcamp')
        .factory('fetchSchool', fetchSchools)
})();