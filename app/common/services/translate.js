'use strict';

export default function (gettextCatalog) {
    'ngInject';

    return function (str) {
        return gettextCatalog.getString(str);
    };
}
