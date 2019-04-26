'use strict';

export default class HeaderController {
    constructor($scope, AlertService, HeaderService, COMMON_CONFIG, RHAUtils, $interval, $sce, securityService, $uibModal) {
        'ngInject';

        /**
         * For some reason the rhaAlert directive's controller is not binding to the view.
         * Hijacking rhaAlert's parent controller (HeaderController) works
         * until a real solution is found.
         */
        $scope.AlertService = AlertService;
        $scope.HeaderService = HeaderService;
        $scope.securityService = securityService;
        $scope.closeable = true;
        $scope.closeAlert = function (index) {
            AlertService.alerts.splice(index, 1);
        };
        $scope.dismissAlerts = function () {
            AlertService.clearAlerts();
        };
        $scope.init = function () {
            HeaderService.pageLoadFailure = false;
            HeaderService.showPartnerEscalationError = false;
            HeaderService.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
            if (COMMON_CONFIG.doSfdcHealthCheck) {
                $scope.healthTimer = $interval(HeaderService.checkSfdcHealth, COMMON_CONFIG.healthCheckInterval);
            }
        };
        $scope.init();
        $scope.parseSfdcOutageHtml = function () {
            var parsedHtml = '';
            if (RHAUtils.isNotEmpty(COMMON_CONFIG.sfdcOutageMessage)) {
                var rawHtml = COMMON_CONFIG.sfdcOutageMessage;
                parsedHtml = $sce.trustAsHtml(rawHtml);
            }
            return parsedHtml;
        };
        $scope.showReLoginModal = () => {
            $uibModal.open({
                template: require('../../security/views/loginModal.jade'),
                controller: 'LoginModal',
                backdrop: 'static',
                keyboard: false
            });
            securityService.clearLoginStatus();
        }
        $scope.showSessionExpiredModal = () => {
            $uibModal.open({
                template: require('../../security/views/sessionExpireModal.jade'),
                controller: 'SessionExpireModal',
                backdrop: 'static',
                keyboard: false
            });
            securityService.clearLoginStatus();
        }
        window.chrometwo_require([
            'session'
        ], (session) => {
            'use strict';
            // We can avoid accessing private state once https://projects.engineering.redhat.com/browse/CPFED-2782 is resolved
            const originalOnAuthLogoutCallback = session._state.keycloak.onAuthLogout;
            session._state.keycloak.onAuthLogout = () => {
                // logged out in one of the portal tabs, needs re-login
                $scope.showReLoginModal();
                if (originalOnAuthLogoutCallback) originalOnAuthLogoutCallback();
            };
            const originalOnAuthRefreshErrorCallback = session._state.keycloak.onAuthRefreshError;
            session._state.keycloak.onAuthRefreshError = () => {
                if (!session.isAuthenticated()) {
                    // Cannot refresh token and is not authed, needs re-login
                    $scope.showSessionExpiredModal();
                    if (originalOnAuthRefreshErrorCallback) originalOnAuthRefreshErrorCallback();
                }
            };
            const originaOnTokenExpiredCallback = session._state.keycloak.onTokenExpired;
            session._state.keycloak.onTokenExpired = () => {
                if (!session.isAuthenticated()) {
                    // Token expired and is not authed, needs re-login
                    $scope.showSessionExpiredModal();
                    if (originaOnTokenExpiredCallback) originaOnTokenExpiredCallback();
                }
            };
        });
        $scope.$on('$destroy', function () {
            $interval.cancel($scope.healthTimer);
        });
        $scope.pageLoadFailureWatcher = $scope.$watch('HeaderService.pageLoadFailure', function () {
            if (HeaderService.pageLoadFailure) {
                $scope.dismissAlerts();
            }
        });

        $scope.onlyQPHasChanged = (oldUrl, newUrl) => {
            const [url1, qp1] = oldUrl.split('?');
            const [url2, qp2] = newUrl.split('?');
            return url1 === url2 && qp1 !== qp2;
        }
        $scope.$on('$locationChangeSuccess', function (event, oldUrl, newUrl) {
            //Don't reset alerts when only QP has changed in the url. 
            if(!$scope.onlyQPHasChanged(oldUrl, newUrl)) {
                $scope.dismissAlerts();
            }
        });
    }
}
