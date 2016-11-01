(function () {
    ForumService.$inject = ['$http'];
    function ForumService($http) {
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
        }
    }

    angular.module('devcamp')
        .service('forums', ForumService)
})();