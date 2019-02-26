'use strict';

import ResourceTypes from './constants/resourceTypes'
import CommonConfig from './constants/commonConfig'
import ConfigurationService from './services/configurationService'

require('./ui-utils.module');
require('./header.module');

const app = angular.module('RedhatAccess.common', [
    'RedhatAccess.ui-utils',
    'angular-cache'
])
    .config(function(CacheFactoryProvider) {})
    .constant('RESOURCE_TYPES', ResourceTypes)
    .value('COMMON_CONFIG', CommonConfig)
    .factory('configurationService', ConfigurationService);

require('../security/security.module');

export default app.name;
