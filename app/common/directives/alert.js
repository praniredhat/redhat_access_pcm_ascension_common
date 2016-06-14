'use strict';

export default function () {
    return {
        template: require('../views/alert.jade'),
        restrict: 'A',
        controller: 'AlertController'
    };
}
