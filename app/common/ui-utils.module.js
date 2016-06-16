'use strict';

// Services
import RHAUtils from './services/rhaUtils'
import translate from './services/translate'

// Filters
import trust from './filters/trust'

// Directives
import rhaEnter from './directives/enter'
import rhaResizable from './directives/resizable'
import rhaChoice from './directives/choice'
import optionsDisabled from './directives/optionsDisabled'
import choicetree from './directives/choicetree'

// Factories
import TreeViewSelectorData from './factories/treeViewSelectorData'
import TreeViewSelectorUtils from './factories/treeViewSelectorUtils'

// Define the ui-utils module
const app = angular.module('RedhatAccess.ui-utils', ['gettext']);

// Services
app.service('RHAUtils', RHAUtils);
app.service('translate', translate);

// Filters
app.filter('trust_html', trust);

// Directives
app.directive('rhaChoicetree', choicetree);
app.directive('optionsDisabled', optionsDisabled);
app.directive('rhaChoice', rhaChoice);
app.directive('rhaResizable', rhaResizable);
app.directive('rhaEnter', rhaEnter);

// Factories
app.factory('TreeViewSelectorData', TreeViewSelectorData);
app.factory('TreeViewSelectorUtils',  TreeViewSelectorUtils);

export default app.name;
