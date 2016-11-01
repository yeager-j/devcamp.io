(function () {
    FetchForum.$inject = ['forums', '$q'];
    function FetchForum(forums, $q) {
        function fetchMain(callback) {
            forums.getCategories().then(function (response) {
                callback(response);
            })
        }

        function fetchForum(id, callback) {
            forums.getForum(id).then(function (response) {
                console.log(response);
                callback(response);
            })
        }


        return {
            fetchMain: fetchMain,
            fetchForum: fetchForum
        }
    }

    angular.module('devcamp')
        .factory('fetchForum', FetchForum);
})();