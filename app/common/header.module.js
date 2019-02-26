'use strict';

// Controllers
import FourOhThree from './controllers/403'
import FourOhFour from './controllers/404'
import Alert from './controllers/alert'
import ChatButton from './controllers/chatButton'
import Header from './controllers/header'
import TitleView from './controllers/titleView'

// Directives
import rha403error from './directives/403'
import rha404error from './directives/404'
import rhaAlert from './directives/alert'
import rhaChatbutton from './directives/chatButton'
import rhaHeader from './directives/header'
import rhaOnchange from './directives/onChange'
import rhaTitletemplate from './directives/titleTemplate'
import autoFocus from './directives/autoFocus'

// Services
import AlertService from './services/alertService'
import ConstantsService from './services/constantsService'
import HeaderService from './services/headerService'
import StrataService from './services/strataService'
import UdsService from './services/udsService'
import ConfigService from './services/configService';

const app = angular.module('RedhatAccess.header', []);

// Controllers
app.controller('403', FourOhThree);
app.controller('404', FourOhFour);
app.controller('AlertController', Alert);
app.controller('ChatButton', ChatButton);
app.controller('HeaderController', Header);
app.controller('TitleViewCtrl', TitleView);

// Directives
app.directive('rha403error', rha403error);
app.directive('rha404error', rha404error);
app.directive('rhaAlert', rhaAlert);
app.directive('rhaChatbutton', rhaChatbutton);
app.directive('rhaHeader', rhaHeader);
app.directive('rhaOnchange', rhaOnchange);
app.directive('rhaTitletemplate', rhaTitletemplate);
app.directive('autoFocus', autoFocus);

// Services
app.service('AlertService', AlertService);
app.service('ConstantsService', ConstantsService);
app.service('HeaderService', HeaderService);
app.service('strataService', StrataService);
app.service('udsService', UdsService);
app.service('ConfigService', ConfigService);

export default app.name;