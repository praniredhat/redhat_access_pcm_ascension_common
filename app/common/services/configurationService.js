'use strict';

export default function($q) {
    'ngInject';

    const defer = $q.defer();
    return {
        setConfig: function (config) {
            defer.resolve(config);
        },
        getConfig: function () {
            return defer.promise;
        }
    };
}