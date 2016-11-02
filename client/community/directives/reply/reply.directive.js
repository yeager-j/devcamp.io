(function () {
    function ReplyDirective() {
        return {
            restrict: 'E',
            templateUrl: '/community/directives/reply/reply.template.html',
            transclude: true,
            scope: {
                author: '=',
                posted: '@'
            }
        }
    }

    angular.module('devcamp')
        .directive('reply', ReplyDirective);
})();