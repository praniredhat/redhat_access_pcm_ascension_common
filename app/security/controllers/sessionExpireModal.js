'use strict';

export default class SessionExpireModal {
    constructor($scope, $rootScope, $uibModalInstance, AUTH_EVENTS) {
        'ngInject';
        $scope.login = function () {
            window.portal.session.login();
        }
        // Auto close modal on login success - shoud happen once CPFED-2824 is fixed
        // https://projects.engineering.redhat.com/browse/CPFED-2824
        $rootScope.$on(AUTH_EVENTS.loginSuccess, () => {
            $uibModalInstance.close();
        });
    }
}
