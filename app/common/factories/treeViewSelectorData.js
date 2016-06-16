'use strict';

export default function ($http, $q, TreeViewSelectorUtils) {
    'ngInject';

    return {
        getTree: function (dataUrl, sessionId) {
            var defer = $q.defer();
            var tmpUrl = dataUrl;
            if (sessionId) {
                tmpUrl = tmpUrl + '?sessionId=' + encodeURIComponent(sessionId);
            }
            $http({
                method: 'GET',
                url: tmpUrl
            }).success(function (data, status, headers, config) {
                var tree = [];
                TreeViewSelectorUtils.parseTreeList(tree, data);
                defer.resolve(tree);
            }).error((data, status, headers, config) => defer.reject({}) );
            return defer.promise;
        }
    };
}
