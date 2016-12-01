(function () {
    BlogService.$inject = ['$http', 'authentication'];
    function BlogService($http, authentication) {
        this.getBlogs = function () {
            return $http.get('/api/blog_main');
        };

        this.getBlogCategory = function (id) {
            return $http.get('/api/blog_category/' + id);
        };

        this.getBlog = function (id) {
            return $http.get('/api/blog/' + id);
        };

        this.postBlog = function (id, blog) {
            return $http({
                method: 'POST',
                url: '/api/blog/' + id,
                data: blog,
                headers: {
                    authorization: 'Bearer ' + authentication.getToken()
                }
            })
        };
    }

    angular.module('devcamp')
        .service('blogs', BlogService)
})();
