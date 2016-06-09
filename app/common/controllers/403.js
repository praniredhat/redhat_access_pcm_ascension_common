'use strict';

export default class FourOhThree {
    function ($scope, securityService, HeaderService, COMMON_CONFIG) {
        'ngInject';
        
        $scope.COMMON_CONFIG = COMMON_CONFIG;
        $scope.securityService = securityService;
        $scope.HeaderService = HeaderService;
    }
}
