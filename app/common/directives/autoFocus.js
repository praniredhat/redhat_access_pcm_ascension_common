'use strict';

export default function ($timeout) {
    'ngInject';
    
    return {
        restrict: 'AC',
        link: function (scope, element) {
            $timeout(() => {
                element[0].focus();
            }, 100);
        }
    };
}
