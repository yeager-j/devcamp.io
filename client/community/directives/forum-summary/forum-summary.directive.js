(function () {
    function forumSummaryDirective() {
        return {
            restrict: 'E',
            templateUrl: '/community/directives/forum-summary/forum-summary.template.html',
            scope: {
                title: '@',
                description: '@',
                newThreads: '=',
                link: '@'
            }
        }
    }

    angular.module('devcamp')
        .directive('forumSummary', forumSummaryDirective);
})();