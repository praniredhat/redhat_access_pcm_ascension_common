'use strict';

export default class SecurityController {
   constructor($scope, securityService, SECURITY_CONFIG)  {
       'ngInject';

       $scope.securityService = securityService;
       if (SECURITY_CONFIG.autoCheckLogin) {
           securityService.validateLogin(SECURITY_CONFIG.forceLogin);
       }
       $scope.displayLoginStatus = function () {
           return SECURITY_CONFIG.displayLoginStatus;
       };
   }
}
