'use strict';

export default function () {
    return {
        template: require('../views/404.jade'),
        restrict: 'A',
        controller: '404'
    };
}
