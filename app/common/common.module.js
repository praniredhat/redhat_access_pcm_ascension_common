'use strict';

import ResourceTypes from './constants/resourceTypes'
import CommonConfig from './constants/commonConfig'

const app = angular.module('RedhatAccess.common', []);

app.constant('RESOURCE_TYPES', ResourceTypes);
	
app.value('COMMON_CONFIG', CommonConfig);
	
export default app.name;
