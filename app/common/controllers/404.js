'use strict';

export default class FourOhFour {
    constructor ($scope, securityService, COMMON_CONFIG) {
        'ngInject';
        
        $scope.COMMON_CONFIG = COMMON_CONFIG;
        $scope.securityService = securityService;
    }
}
