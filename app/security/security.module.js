'use strict';

// Controllers
import SecurityController from './controllers/securityController'
import LoginModal from './controllers/loginModal'

// Directives
import rhaLoginstatus from './directives/loginStatus'

// Services
import SecurityService from './services/securityService'

// Constants
import AuthEventConstants from './constants/authEvents'
import LoginViewConfig from './constants/loginViewConfig'
import SecurityConfig from './constants/securityConfig'

const app = angular.module('RedhatAccess.security', [
    'ui.bootstrap',
    'ui.router',
    'RedhatAccess.header'
]).constant('AUTH_EVENTS', AuthEventConstants).value('LOGIN_VIEW_CONFIG', LoginViewConfig).value('SECURITY_CONFIG', SecurityConfig);

// Controllers
app.controller('SecurityController', SecurityController);
app.controller('LoginModal', LoginModal);

// Directives
app.directive('rhaLoginstatus', rhaLoginstatus);

// Services
app.service('securityService', SecurityService);

export default app.name;