'use strict';

export default class HeaderService {
    constructor(COMMON_CONFIG, strataService, securityService, AlertService, $q) {
        'ngInject';

        this.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
        this.pageLoading = false;
        this.pageLoadFailure = false;
        this.showSurvey = true;
        this.showPartnerEscalationError = false;
        this.checkSfdcHealth = function () {
            if (securityService.loginStatus.isLoggedIn) {
                const deferred = $q.defer();
                strataService.health.sfdc().then(angular.bind(this, function (response) {
                    if (response.name === 'SFDC' && response.status === true) {
                        service.sfdcIsHealthy = true;
                    }
                    deferred.resolve(response);
                }), angular.bind(this, function (error) {
                    if (error.xhr.status === 502) {
                        service.sfdcIsHealthy = false;
                    }
                    AlertService.addStrataErrorMessage(error);
                    deferred.reject();
                }));
                return deferred.promise;
            }
        };
    };
}
