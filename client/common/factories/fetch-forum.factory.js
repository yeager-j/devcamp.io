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
                callback(response);
            })
        }

        function fetchThread(id, callback) {
            forums.getThreads(id).then(function (response) {
                callback(response);
            })
        }

        function fetchUserThreads(id, callback) {
            forums.getUserThreads(id).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            })
        }

        return {
            fetchMain: fetchMain,
            fetchForum: fetchForum,
            fetchThread: fetchThread,
            fetchUserThreads: fetchUserThreads
        }
    }

    angular.module('devcamp')
        .factory('fetchForum', FetchForum);
})();
