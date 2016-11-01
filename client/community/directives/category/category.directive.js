(function () {
    function categoricalDirective() {
        return {
            restrict: 'E',
            templateUrl: '/community/directives/category/category.template.html',
            scope: {
                title: '@',
                theme: '@'
            },
            transclude: true
        }
    }

    angular.module('devcamp')
        .directive('category', categoricalDirective)
})();