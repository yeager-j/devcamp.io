(function () {
    function ThreadDirective() {
        return {
            restrict: 'E',
            templateUrl: 'community/directives/thread/thread.template.html',
            scope: {
                title: '@',
                author: '=',
                posted: '@',
                threadId: '@',
                canReply: '='
            },
            transclude: true
        }
    }

    angular.module('devcamp')
        .directive('thread', ThreadDirective)
})();
