'use strict';

export default function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind("keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(() => scope.$eval(attrs.rhaEnter, {'event': event}) );
                    event.preventDefault();
                }
            });
        }
    };
}
