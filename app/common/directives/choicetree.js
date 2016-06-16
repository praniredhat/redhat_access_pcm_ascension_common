'use strict';

export default function () {
    return {
        template: '<ul><div rha-choice ng-repeat="choice in tree"></div></ul>',
        replace: true,
        transclude: true,
        restrict: 'A',
        scope: {
            tree: '=ngModel',
            rhaDisabled: '='
        }
    };
}
