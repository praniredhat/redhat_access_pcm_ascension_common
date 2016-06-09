'use strict';

export default function () {
    return {
        scope: {},
        template: require('../views/chatButton.jade'),
        restrict: 'A',
        controller: 'ChatButton',
        link: function postLink(scope, element, attrs) {
            scope.$on('$destroy', () => element.remove() );
        }
    };
}
