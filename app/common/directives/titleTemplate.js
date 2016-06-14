'use strict';

export default function () {
    return {
        restrict: 'AE',
        scope: {page: '@'},
        template: require('../views/title.jade'),
        controller: 'TitleViewCtrl'
    };
}
