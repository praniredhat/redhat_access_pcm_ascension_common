'use strict';

export default class SecurityService {
    constructor ($rootScope, $uibModal, AUTH_EVENTS, $q, LOGIN_VIEW_CONFIG, SECURITY_CONFIG, strataService, AlertService, RHAUtils) {
        'ngInject';
        
        this.loginStatus = {
            isLoggedIn: false,
            verifying: false,
            userAllowedToManageCases: true,
            authedUser: {}
        };
        this.loggingIn = false;
        this.loginURL = SECURITY_CONFIG.loginURL;
        this.logoutURL = SECURITY_CONFIG.logoutURL;
        this.setLoginStatus = function(isLoggedIn, verifying, authedUser) {
            this.loginStatus.isLoggedIn = isLoggedIn;
            this.loginStatus.verifying = verifying;
            this.loginStatus.authedUser = authedUser;
            this.loginStatus.authedUser.loggedInUser = `${authedUser.first_name} ${authedUser.last_name}`;
            RHAUtils.userTimeZone=authedUser.timezone;
            this.userAllowedToManageCases();
        };
        this.clearLoginStatus = function() {
            this.loginStatus.isLoggedIn = false;
            this.loginStatus.verifying = false;
            this.loginStatus.userAllowedToManageCases = false;
            this.loginStatus.authedUser = {};
            RHAUtils.userTimeZone='';
        };
        this.setAccount = function(accountJSON) {
            this.loginStatus.account = accountJSON;
        };
        this.modalDefaults = {
            backdrop: 'static',
            keyboard: true,
            modalFade: true,
            template: require('../views/login_form.jade'),
            windowClass: 'rha-login-modal'
        };
        this.modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?',
            backdrop: 'static'
        };
        this.userAllowedToManageCases = function() {
            var canManage = false;
            if(this.loginStatus.authedUser.rights !== undefined && (this.loginStatus.authedUser.is_entitled || RHAUtils.isNotEmpty(this.loginStatus.authedUser.account))){
                for(var i = 0; i < this.loginStatus.authedUser.rights.right.length; i++){
                    if(this.loginStatus.authedUser.rights.right[i].name === 'portal_manage_cases' && this.loginStatus.authedUser.rights.right[i].has_access === true){
                        canManage = true;
                        break;
                    }
                }
            }
            this.loginStatus.userAllowedToManageCases = canManage;
        };
        this.userAllowedToManageEmailNotifications = function(user) {
            if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && this.loginStatus.authedUser.org_admin) {
                return true;
            } else {
                return false;
            }
        };
        this.userAllowedToManageGroups = function(user) {
            if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && (!this.loginStatus.authedUser.account.has_group_acls || this.loginStatus.authedUser.account.has_group_acls && this.loginStatus.authedUser.org_admin)) {
                return true;
            } else {
                return false;
            }
        };
        this.userAllowedToManageDefaultGroups = function(user) {
            if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && (this.loginStatus.authedUser.org_admin)) {
                return true;
            } else {
                return false;
            }
        };
        this.getBasicAuthToken = function() {
            var defer = $q.defer();
            var token = localStorage.getItem('rhAuthToken');
            if (token !== undefined && token !== '') {
                defer.resolve(token);
                return defer.promise;
            } else {
                this.login().then(function(authedUser) {
                    defer.resolve(localStorage.getItem('rhAuthToken'));
                }, function(error) {
                    defer.resolve(error);
                });
                return defer.promise;
            }
        };
        this.initLoginStatus = function() {
            this.loggingIn = true;
            var defer = $q.defer();
            var wasLoggedIn = this.loginStatus.isLoggedIn;
            this.loginStatus.verifying = true;
            if(window.sessionjs != null) { // JWT specific auth
                if(window.sessionjs.isAuthenticated()) {
                    const user = window.sessionjs.getUserInfo();
                    //load account
                    strata.addAccountNumber(user.account_number);
                    const accountPromise = strataService.accounts.get(user.account_number).then((account) => {
                        this.loginStatus.account = account;
                    }).catch(() => {
                        this.loginStatus.account = null;
                    });

                    const userPromise = strataService.users.get(user.user_id);

                    Promise.all([accountPromise, userPromise]).then(([account, authedUser]) => {
                        this.setLoginStatus(true, false, authedUser);
                        this.loginStatus.authedUser.account = this.loginStatus.account;
                        this.loggingIn = false;
                        if (wasLoggedIn === false) {
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        }
                        defer.resolve(this.loginStatus.authedUser.loggedInUser);
                    }).catch(() => {
                       this.clearLoginStatus();
                        this.loggingIn = false;
                        defer.reject();
                    });
                } else {
                    this.clearLoginStatus();
                    this.loggingIn = false;
                    defer.reject();
                }
            } else {
                strataService.authentication.checkLogin().then(angular.bind(this, function(authedUser) {
                    this.setAccount(authedUser.account);
                    this.setLoginStatus(true, false, authedUser);
                    this.loggingIn = false;
                    //We don't want to resend the AUTH_EVENTS.loginSuccess if we are already logged in
                    if (wasLoggedIn === false) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    }
                    defer.resolve(authedUser.loggedInUser);
                }), angular.bind(this, function(error) {
                    this.clearLoginStatus();
                    AlertService.addStrataErrorMessage(error);
                    this.loggingIn = false;
                    defer.reject(error);
                }));
            }
            return defer.promise;
        };
        this.validateLogin = function(forceLogin) {
            var defer = $q.defer();
            //var that = this;
            if (!forceLogin) {
                this.initLoginStatus().then(function(username) {
                    defer.resolve(username);
                }, function(error) {
                    defer.reject(error);
                });
                return defer.promise;
            } else {
                this.initLoginStatus().then(function(username) {
                    defer.resolve(username);
                }, function(error) {
                    this.login().then(function(authedUser) {
                        defer.resolve(authedUser.loggedInUser);
                    }, function(error) {
                        defer.reject(error);
                    });
                });
                return defer.promise;
            }
        };
        this.login = function() {
            return this.showLogin(this.modalDefaults, this.modalOptions);
        };
        this.logout = function() {
            strataService.authentication.logout();
            this.clearLoginStatus();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };
        this.showLogin = function(customModalDefaults, customModalOptions) {
            //var that = this;
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};
            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);
            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, this.modalOptions, customModalOptions);
            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = [
                    '$scope',
                    '$uibModalInstance',
                    function($scope, $uibModalInstance) {
                        $scope.user = {
                            user: null,
                            password: null
                        };
                        $scope.status = {
                            authenticating: false
                        };
                        $scope.useVerboseLoginView = LOGIN_VIEW_CONFIG.verbose;
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function(result) {
                            //Hack below is needed to handle autofill issues
                            //@see https://github.com/angular/angular.js/issues/1460
                            //BEGIN HACK
                            $scope.status.authenticating = true;
                            $scope.user.user = $('#rha-login-user-id').val();
                            $scope.user.password = $('#rha-login-password').val();
                            //END HACK
                            var resp = strataService.authentication.setCredentials($scope.user.user, $scope.user.password);
                            if (resp) {
                                this.initLoginStatus().then(
                                    function(authedUser) {
                                        $scope.user.password = '';
                                        $scope.authError = null;
                                        try {
                                            $uibModalInstance.close(authedUser);
                                        } catch (err) {}
                                        $scope.status.authenticating = false;
                                    },
                                    function(error) {
                                        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                                            $scope.$apply(function() {
                                                $scope.authError = 'Login Failed!';
                                            });
                                        } else {
                                            $scope.authError = 'Login Failed!';
                                        }
                                        $scope.status.authenticating = false;
                                    }
                                );
                            }else {
                                $scope.authError = 'Login Failed!';
                                $scope.status.authenticating = false;
                            }
                        };
                        $scope.modalOptions.close = function() {
                            $scope.status.authenticating = false;
                            $uibModalInstance.dismiss('User Canceled Login');
                        };
                    }
                ];
            }
            return $uibModal.open(tempModalDefaults).result;
        };
    }
}
