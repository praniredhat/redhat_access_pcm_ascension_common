'use strict';

export default function ($compile) {
    'ngInject';

    return {
        restrict: 'A',
        template: require('../views/treenode.html'),
        link: function (scope, elm) {
            scope.choiceClicked = function (choice) {
                choice.checked = !choice.checked;
                function checkChildren(c) {
                    angular.forEach(c.children, (c) => {
                        c.checked = choice.checked;
                        checkChildren(c);
                    });
                }

                checkChildren(choice);
            };
            if (scope.choice.children.length > 0) {
                var childChoice = $compile('<div rha-choicetree ng-show="!choice.collapsed" ng-model="choice.children"></div>')(scope);
                elm.append(childChoice);
            }
        }
    };
}
