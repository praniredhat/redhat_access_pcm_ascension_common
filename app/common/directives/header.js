'use strict';

export default function () {
    return {
        template: require('../views/header.jade'),
        restrict: 'A',
        scope: {page: '@'},
        controller: 'HeaderController'
    };
}
