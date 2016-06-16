'use strict';

export default function($sce) {
    'ngInject';

    return function (text) {
        return $sce.trustAsHtml(text);
    };
}
