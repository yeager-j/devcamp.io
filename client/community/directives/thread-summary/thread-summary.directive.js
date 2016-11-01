(function () {
    function threadSummaryDirective() {
        return {
            restrict: 'E',
            templateUrl: 'community/directives/thread-summary/thread-summary.template.html',
            scope: {
                title: '@',
                author: '@',
                newPosts: '=',
                link: '@'
            }
        }
    }

    angular.module('devcamp')
        .directive('threadSummary', threadSummaryDirective)
})();