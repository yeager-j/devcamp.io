(function () {
    ForumService.$inject = ['$http', 'authentication'];
    function ForumService($http, authentication) {
        this.getCategories = function () {
            return $http.get('/api/forum_main');
        };

        this.getCategory = function (id) {
            return $http.get('/api/category/' + id);
        };

        this.getForum = function (id) {
            return $http.get('/api/forum/' + id);
        };

        this.getThreads = function (id) {
            return $http.get('/api/thread/' + id);
        };

        this.getUserThreads = function (id) {
            return $http.get('/api/user_threads/' + id);
        };

        this.postThread = function (id, thread) {
            return $http({
                method: 'POST',
                url: '/api/thread/' + id,
                data: thread,
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        };

        this.postReply = function (id, reply) {
            return $http({
                method: 'POST',
                url: '/api/thread_reply/' + id,
                data: reply,
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        };
    }

    angular.module('devcamp')
        .service('forums', ForumService)
})();