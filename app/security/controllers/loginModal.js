'use strict';

export default class CepModal {
    constructor($scope) {
        'ngInject';
        $scope.login = function () {
            window.portal.session.login();
        }
    }
}
