'use strict';

export default function ($window) {
    'ngInject';

    const link = function (scope, element, attrs) {
        scope.onResizeFunction = function () {
            var distanceToTop = element[0].getBoundingClientRect().top;
            var height = $window.innerHeight - distanceToTop;
            element.css('height', height);
        };
        angular.element($window).bind('resize', () => scope.onResizeFunction());
        angular.element($window).bind('click', () => scope.onResizeFunction());
        if (attrs.rhaDomReady !== undefined) {
            scope.$watch('rhaDomReady', (newValue) => {
                if (newValue) {
                    scope.onResizeFunction();
                }
            });
        } else {
            scope.onResizeFunction();
        }
    };
    return {
        restrict: 'A',
        scope: {rhaDomReady: '='},
        link: link
    };
}
