(function () {
    FetchBlog.$inject = ['blogs', '$q'];
    function FetchBlog(blogs, $q) {
        function fetchMain(callback) {
            blogs.getBlogs().then(function (response) {
                callback(response);
            })
        }

        function fetchBlog(id, callback) {
            blogs.getBlog(id).then(function (response) {
                callback(response);
            })
        }

        function fetchUserBlogs(id, callback) {
            blogs.getUserBlogs(id).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
            })
        }

        return {
            fetchMain: fetchMain,
            fetchBlog: fetchBlog,
            fetchUserBlogs: fetchUserBlogs
        }
    }

    angular.module('devcamp')
        .factory('fetchBlog', FetchBlog);
})();
