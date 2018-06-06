/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resourceTypes = __webpack_require__(11);

	var _resourceTypes2 = _interopRequireDefault(_resourceTypes);

	var _commonConfig = __webpack_require__(10);

	var _commonConfig2 = _interopRequireDefault(_commonConfig);

	var _configurationService = __webpack_require__(36);

	var _configurationService2 = _interopRequireDefault(_configurationService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(43);
	__webpack_require__(34);

	var app = angular.module('RedhatAccess.common', ['RedhatAccess.ui-utils', 'angular-cache']).config(["CacheFactoryProvider", function (CacheFactoryProvider) {}]).constant('RESOURCE_TYPES', _resourceTypes2.default).value('COMMON_CONFIG', _commonConfig2.default).factory('configurationService', _configurationService2.default);

	__webpack_require__(49);

	exports.default = app.name;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};


	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(53).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div id=\"outageHead\" ng-show=\"(!securityService.loginStatus.userAllowedToManageCases || HeaderService.showPartnerEscalationError) &amp;&amp; !COMMON_CONFIG.isGS4\"><div id=\"errornoDirectSupport403\"><h1 translate=\"\">Support Subscription Required</h1><p translate=\"\">The credentials you provided are valid, but you do not have&nbsp;<b>direct support from Red Hat.</b></p><p translate=\"\">If you believe you should have permission to view this resource, please&nbsp;<a href=\"/support/contact/customerService.html\">contact Customer Service&nbsp;</a>for assistance. Your Red Hat login might not be associated with the right account for your organization,\nor there might be an issue with your subscription. Either way, Customer Service should be able to help\nyou resolve the problem.</p></div></div>");;return buf.join("");
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-show=\"HeaderService.pageLoadFailure &amp;&amp; securityService.loginStatus.userAllowedToManageCases &amp;&amp; !COMMON_CONFIG.isGS4\"><pre class=\"console\"> \n    d8888   .d8888b.      d8888  \n   d8P888  d88P  Y88b    d8P888  \n  d8P 888  888    888   d8P 888  \n d8P  888  888    888  d8P  888  \nd88   888  888    888 d88   888  \n8888888888 888    888 8888888888 \n      888  Y88b  d88P       888  \n      888   \"Y8888P\"        888  \n<br />\n<br /><span translate=\"\" class=\"console-error\">Not Found</span><p translate=\"\">The page you are looking for is not here. It might have been moved, removed, or had its name and address changed. It might otherwise be temporarily unavailable for technical reasons.</p></pre></div>");;return buf.join("");
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-hide=\"HeaderService.pageLoadFailure || !securityService.loginStatus.userAllowedToManageCases\"><a style=\"float: right\" ng-show=\"AlertService.alerts.length &gt; 1\" ng-href=\"\" ng-click=\"dismissAlerts()\">{{'Close messages'|translate}}</a><uib-alert ng-repeat=\"alert in AlertService.alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\"><span ng-show=\"alert.type==='info' || alert.isHtml\" ng-bind-html=\"alert.message\" class=\"icon-innov-prev alert-icon\"></span><span ng-hide=\"alert.type==='info' || alert.isHtml\">{{alert.message}}</span></uib-alert></div>");;return buf.join("");
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-show=\"showChat\" class=\"chat\"><iframe style=\"display: none;\" ng-src=\"{{chatHackUrl}}\"></iframe><a ng-show=\"chatAvailable\" ng-click=\"openChatWindow()\" style=\"cursor: pointer\" class=\"link\">{{'Chat with Support'|translate}}&nbsp;<!--i.fa.fa-comments--></a><span ng-show=\"!chatAvailable\" disabled>{{'Chat Offline'|translate}}&nbsp;<!--i.fa.fa-comments--></span></div>");;return buf.join("");
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div rha-403error=\"\"></div><div rha-404error=\"\"></div><div ng-show=\"HeaderService.sfdcIsHealthy\"></div><div rha-alert=\"\"></div><div ng-hide=\"failedToLoadCase || !securityService.loginStatus.userAllowedToManageCases\"><div ng-show=\"pageLoading\" class=\"spinner spinner-inline\"></div></div><div ng-hide=\"HeaderService.pageLoadFailure || !securityService.loginStatus.userAllowedToManageCases\" class=\"page-header\"><div ng-hide=\"page ===&quot;&quot;\" rha-titletemplate=\"\" page=\"{{page}}\"></div><div ng-show=\"page === &quot;caseView&quot;\">Filed on&nbsp;</div><div ng-show=\"securityService.loginStatus.isLoggedIn &amp;&amp; securityService.loginStatus.authedUser.has_chat &amp;&amp; HeaderService.sfdcIsHealthy\" rha-chatbutton=\"\"></div></div><div rha-loginstatus=\"\"></div><div ng-show=\"!HeaderService.sfdcIsHealthy\" ng-bind-html=\"parseSfdcOutageHtml()\"></div>");;return buf.join("");
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<h1 ng-show=\"COMMON_CONFIG.showTitle\" class=\"page-title\">{{getPageTitle()}}</h1>");;return buf.join("");
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div id=\"rha-login-modal-header\" class=\"modal-header\"><h3 translate=\"\">Sign into the Red Hat Customer Portal</h3></div><div class=\"container-fluid\"><div id=\"rha-login-modal-body\" class=\"modal-body form-horizontal\"><!-- form ng-submit=\"modalOptions.ok()\"  method=\"post\"--><div ng-show=\"useVerboseLoginView\" class=\"form-group\">{{'Red Hat Access makes it easy for you to self-solve issues, diagnose problems, and engage with us via the Red Hat Customer Portal. To access Red Hat Customer Portal resources, you must enter valid portal credentials.'|translate}}</div><div ng-show=\"authError\" class=\"alert alert-danger\">{{authError}}</div><div id=\"rha-login-modal-user-id\" class=\"form-group\"><label for=\"rha-login-user-id\" translate=\"\" class=\"control-label\">Red Hat Login</label><div><input id=\"rha-login-user-id\" type=\"text\" placeholder=\"{{'Red Hat Login'|translate}}\" ng-model=\"user.user\" required=\"\" autofocus=\"\" class=\"form-control\"></div></div><div id=\"rha-login-modal-user-pass\" class=\"form-group\"><label for=\"rha-login-password\" translate=\"\" class=\"control-label\">Password</label><div><input id=\"rha-login-password\" type=\"password\" placeholder=\"{{'Password'|translate}}\" ng-model=\"user.password\" required=\"\" class=\"form-control\"></div></div><div style=\"font-size:smaller\" ng-show=\"useVerboseLoginView\" class=\"form-group\"><strong>{{'Note:'|translate}}</strong>{{'Red Hat Customer Portal credentials differ from the credentials used to log into this product.'|translate}}</div><!-- /form--></div><div class=\"modal-footer\"><div id=\"rha-login-modal-buttons\" class=\"form-group\"><span class=\"pull-right\"><button ng-click=\"modalOptions.close()\" type=\"submit\" translate=\"\" class=\"btn btn-md cancel\">Cancel</button><button ng-click=\"modalOptions.ok()\" type=\"submit\" translate=\"\" ng-disabled=\"status.authenticating\" class=\"btn btn-primary btn-md login\">Sign in</button></span></div></div></div>");;return buf.join("");
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(1);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-controller=\"SecurityController\" ng-show=\"displayLoginStatus()\"><div class=\"row\"><div class=\"col-sm-12\"><span ng-show=\"securityService.loginStatus.isLoggedIn\" class=\"pull-right rha-logged-in\">{{'Logged into the Red Hat Customer Portal as'|translate}} {{securityService.loginStatus.authedUser.loggedInUser}}  <span ng-if=\"securityService.logoutURL.length === 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"\" ng-click=\"securityService.logout()\"> {{'Log Out'|translate}}</a></span><span ng-if=\"securityService.logoutURL.length &gt; 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"{{securityService.logoutURL}}\"> {{'Log Out'|translate}}</a></span><span ng-show=\"securityService.loginStatus.verifying\">{{'Log Out'|translate}}</span></span><span ng-show=\"!securityService.loginStatus.isLoggedIn\" class=\"pull-right rha-logged-out\">{{'Not Logged into the Red Hat Customer Portal'|translate}} <span ng-if=\"securityService.loginURL.length === 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"\" ng-click=\"securityService.login()\"> {{'Log In'|translate}}</a></span><span ng-if=\"securityService.loginURL.length &gt; 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"{{securityService.loginURL}}\"> {{'Log In'|translate}}</a></span><span ng-show=\"securityService.loginStatus.verifying\">{{'Log In'|translate}}</span></span></div></div></div>");;return buf.join("");
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		'sfdcOutageMessage': '<ul class="message"><li class="alertSystem">Creating and updating support cases online is currently disabled. Please <a target="_blank" href="https://access.redhat.com/support/contact/technicalSupport/">contact Red Hat support</a> if you need immediate assistance.</li></ul>',
		'doSfdcHealthCheck': false,
		'sfdcIsHealthy': true, // This property should be made false only when 'doSfdcHealthCheck' is set to false
		'healthCheckInterval': 60000,
		'showTitle': true,
		'titlePrefix': 'Red Hat Access: ',
		'isGS4': false
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		article: 'Article',
		solution: 'Solution'
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FourOhThree = function () {
	    function FourOhThree() {
	        _classCallCheck(this, FourOhThree);
	    }

	    _createClass(FourOhThree, [{
	        key: 'function',
	        value: ["$scope", "securityService", "HeaderService", "COMMON_CONFIG", function _function($scope, securityService, HeaderService, COMMON_CONFIG) {
	            'ngInject';

	            $scope.COMMON_CONFIG = COMMON_CONFIG;
	            $scope.securityService = securityService;
	            $scope.HeaderService = HeaderService;
	        }]
	    }]);

	    return FourOhThree;
	}();

	exports.default = FourOhThree;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FourOhFour = function FourOhFour($scope, securityService, COMMON_CONFIG) {
	    'ngInject';

	    _classCallCheck(this, FourOhFour);

	    $scope.COMMON_CONFIG = COMMON_CONFIG;
	    $scope.securityService = securityService;
	};
	FourOhFour.$inject = ["$scope", "securityService", "COMMON_CONFIG"];

	exports.default = FourOhFour;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AlertController = function AlertController($scope, AlertService, HeaderService, securityService) {
	    'ngInject';

	    _classCallCheck(this, AlertController);

	    $scope.AlertService = AlertService;
	    $scope.HeaderService = HeaderService;
	    $scope.securityService = securityService;
	    $scope.closeable = true;
	    $scope.closeAlert = function (index) {
	        AlertService.alerts.splice(index, 1);
	    };
	    $scope.dismissAlerts = function () {
	        AlertService.clearAlerts();
	    };
	};
	AlertController.$inject = ["$scope", "AlertService", "HeaderService", "securityService"];

	exports.default = AlertController;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	/*jshint camelcase: false, expr: true*/
	//Saleforce hack---
	//we have to monitor stuff on the window object
	//because the liveagent code generated by Salesforce is not
	//designed for angularjs.
	//We create fake buttons that we give to the salesforce api so we can track
	//chat availability without having to write a complete rest client.

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.fakeOnlineButton = { style: { display: 'none' } };
	window.fakeOfflineButton = { style: { display: 'none' } };

	var ChatButton = function ChatButton($scope, securityService, strataService, AlertService, CHAT_SUPPORT, AUTH_EVENTS, $sce, $interval, RHAUtils) {
	    'ngInject';

	    _classCallCheck(this, ChatButton);

	    $scope.securityService = securityService;
	    if (window.chatInitialized === undefined) {
	        window.chatInitialized = false;
	    }
	    $scope.checkChatButtonStates = function () {
	        $scope.chatAvailable = window.fakeOnlineButton.style.display !== 'none';
	    };
	    $scope.timer = null;
	    $scope.chatHackUrl = $sce.trustAsResourceUrl(CHAT_SUPPORT.chatIframeHackUrlPrefix);
	    $scope.setChatIframeHackUrl = function () {
	        strataService.users.chatSession.post().then(angular.bind(this, function (sessionId) {
	            var url = CHAT_SUPPORT.chatIframeHackUrlPrefix + '?sessionId=' + sessionId + '&ssoName=' + securityService.loginStatus.authedUser.sso_username;
	            $scope.chatHackUrl = $sce.trustAsResourceUrl(url);
	        }), function (error) {
	            AlertService.addStrataErrorMessage(error);
	        });
	    };
	    $scope.enableChat = function () {
	        $scope.showChat = securityService.loginStatus.isLoggedIn && securityService.loginStatus.authedUser.has_chat && CHAT_SUPPORT.enableChat;
	        return $scope.showChat;
	    };
	    $scope.showChat = false;
	    // determines whether we should show buttons at all
	    $scope.chatAvailable = false;
	    //Availability of chat as determined by live agent, toggles chat buttons
	    $scope.initializeChat = function () {
	        if (!$scope.enableChat() || window.chatInitialized === true) {
	            //function should only be called when chat is enabled, and only once per page load
	            return;
	        }
	        if (!window._laq) {
	            window._laq = [];
	        }
	        window._laq.push(function () {
	            liveagent.showWhenOnline(CHAT_SUPPORT.chatButtonToken, window.fakeOnlineButton);
	            liveagent.showWhenOffline(CHAT_SUPPORT.chatButtonToken, window.fakeOfflineButton);
	        });
	        //var chatToken = securityService.loginStatus.sessionId;
	        var ssoName = securityService.loginStatus.authedUser.sso_username;
	        var name = securityService.loginStatus.authedUser.loggedInUser;
	        //var currentCaseNumber;
	        var accountNumber = securityService.loginStatus.authedUser.account_number;
	        // if (currentCaseNumber) {
	        //   liveagent
	        //     .addCustomDetail('Case Number', currentCaseNumber)
	        //     .map('Case', 'CaseNumber', false, false, false)
	        //     .saveToTranscript('CaseNumber__c');
	        // }
	        // if (chatToken) {
	        //   liveagent
	        //     .addCustomDetail('Session ID', chatToken)
	        //     .map('Contact', 'SessionId__c', false, false, false);
	        // }
	        liveagent.addCustomDetail('Contact Login', ssoName).map('Contact', 'SSO_Username__c', true, true, true).saveToTranscript('SSO_Username__c');
	        //liveagent
	        //  .addCustomDetail('Contact E-mail', email)
	        //  .map('Contact', 'Email', false, false, false);
	        if (RHAUtils.isNotEmpty(accountNumber)) {
	            liveagent.addCustomDetail('Account Number', accountNumber).map('Account', 'AccountNumber', true, true, true);
	        }
	        if (RHAUtils.isNotEmpty(name)) {
	            liveagent.setName(name);
	        }
	        liveagent.addCustomDetail('Name', name);
	        liveagent.setChatWindowHeight('552');
	        //liveagent.enableLogging();
	        liveagent.init(CHAT_SUPPORT.chatLiveAgentUrlPrefix, CHAT_SUPPORT.chatInitHashOne, CHAT_SUPPORT.chatInitHashTwo);
	        window.chatInitialized = true;
	    };
	    $scope.openChatWindow = function () {
	        liveagent.startChat(CHAT_SUPPORT.chatButtonToken);
	    };
	    $scope.init = function () {
	        if ($scope.enableChat() && window.liveagent !== undefined) {
	            $scope.setChatIframeHackUrl();
	            $scope.timer = $interval($scope.checkChatButtonStates, 5000);
	            $scope.initializeChat();
	        }
	    };
	    $scope.$on('$destroy', function () {
	        //we cancel timer each time scope is destroyed
	        //it will be restarted via init on state change to a page that has a chat buttom
	        $interval.cancel($scope.timer);
	    });
	    if (securityService.loginStatus.isLoggedIn) {
	        $scope.init();
	    } else {
	        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
	            $scope.init();
	        });
	    }

	    $scope.$on('$destroy', function () {
	        window._laq = null;
	    });
	};
	ChatButton.$inject = ["$scope", "securityService", "strataService", "AlertService", "CHAT_SUPPORT", "AUTH_EVENTS", "$sce", "$interval", "RHAUtils"];

	exports.default = ChatButton;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HeaderController = function HeaderController($scope, AlertService, HeaderService, COMMON_CONFIG, RHAUtils, $interval, $sce) {
	    'ngInject';

	    /**
	     * For some reason the rhaAlert directive's controller is not binding to the view.
	     * Hijacking rhaAlert's parent controller (HeaderController) works
	     * until a real solution is found.
	     */

	    _classCallCheck(this, HeaderController);

	    $scope.AlertService = AlertService;
	    $scope.HeaderService = HeaderService;
	    $scope.closeable = true;
	    $scope.closeAlert = function (index) {
	        AlertService.alerts.splice(index, 1);
	    };
	    $scope.dismissAlerts = function () {
	        AlertService.clearAlerts();
	    };
	    $scope.init = function () {
	        HeaderService.pageLoadFailure = false;
	        HeaderService.showPartnerEscalationError = false;
	        HeaderService.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
	        if (COMMON_CONFIG.doSfdcHealthCheck) {
	            $scope.healthTimer = $interval(HeaderService.checkSfdcHealth, COMMON_CONFIG.healthCheckInterval);
	        }
	    };
	    $scope.init();
	    $scope.parseSfdcOutageHtml = function () {
	        var parsedHtml = '';
	        if (RHAUtils.isNotEmpty(COMMON_CONFIG.sfdcOutageMessage)) {
	            var rawHtml = COMMON_CONFIG.sfdcOutageMessage;
	            parsedHtml = $sce.trustAsHtml(rawHtml);
	        }
	        return parsedHtml;
	    };
	    $scope.$on('$destroy', function () {
	        $interval.cancel($scope.healthTimer);
	    });
	    $scope.pageLoadFailureWatcher = $scope.$watch('HeaderService.pageLoadFailure', function () {
	        if (HeaderService.pageLoadFailure) {
	            $scope.dismissAlerts();
	        }
	    });
	    $scope.$on('$locationChangeSuccess', function (event) {
	        $scope.dismissAlerts();
	    });
	};
	HeaderController.$inject = ["$scope", "AlertService", "HeaderService", "COMMON_CONFIG", "RHAUtils", "$interval", "$sce"];

	exports.default = HeaderController;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TitleViewCtrl = function TitleViewCtrl(COMMON_CONFIG, $scope, gettextCatalog, CaseService) {
	    'ngInject';

	    _classCallCheck(this, TitleViewCtrl);

	    $scope.COMMON_CONFIG = COMMON_CONFIG;
	    $scope.showTitle = COMMON_CONFIG.show;
	    $scope.titlePrefix = COMMON_CONFIG.titlePrefix;
	    $scope.CaseService = CaseService;
	    $scope.getPageTitle = function () {
	        switch ($scope.page) {
	            case 'search':
	                return gettextCatalog.getString('Search');
	            case 'caseList':
	                return gettextCatalog.getString('SUPPORT CASES');
	            case 'caseView':
	                return gettextCatalog.getString('CASE {{caseNumber}}', { caseNumber: CaseService.kase.case_number });
	            case 'newCase':
	                return gettextCatalog.getString('Open a Support Case');
	            case 'logViewer':
	                return gettextCatalog.getString('Logs');
	            case 'searchCase':
	                return gettextCatalog.getString('Search Support Case');
	            case 'manageGroups':
	                return gettextCatalog.getString('Manage Case Groups');
	            case 'editGroup':
	                return gettextCatalog.getString('Manage Default Case Groups');
	            default:
	                return '';
	        }
	    };
	};
	TitleViewCtrl.$inject = ["COMMON_CONFIG", "$scope", "gettextCatalog", "CaseService"];

	exports.default = TitleViewCtrl;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(2),
	        restrict: 'A',
	        controller: '403'
	    };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(3),
	        restrict: 'A',
	        controller: '404'
	    };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(4),
	        restrict: 'A',
	        controller: 'AlertController'
	    };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$timeout", function ($timeout) {
	    'ngInject';

	    return {
	        restrict: 'AC',
	        link: function link(scope, element) {
	            $timeout(function () {
	                element[0].focus();
	            }, 100);
	        }
	    };
	}];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        scope: {},
	        template: __webpack_require__(5),
	        restrict: 'A',
	        controller: 'ChatButton',
	        link: function postLink(scope, element, attrs) {
	            scope.$on('$destroy', function () {
	                return element.remove();
	            });
	        }
	    };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$compile", function ($compile) {
	    'ngInject';

	    return {
	        restrict: 'A',
	        template: __webpack_require__(51),
	        link: function link(scope, elm) {
	            scope.choiceClicked = function (choice) {
	                choice.checked = !choice.checked;
	                function checkChildren(c) {
	                    angular.forEach(c.children, function (c) {
	                        c.checked = choice.checked;
	                        checkChildren(c);
	                    });
	                }

	                checkChildren(choice);
	            };
	            if (scope.choice.children.length > 0) {
	                var childChoice = $compile('<div rha-choicetree ng-show="!choice.collapsed" ng-model="choice.children"></div>')(scope);
	                elm.append(childChoice);
	            }
	        }
	    };
	}];

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: '<ul><div rha-choice ng-repeat="choice in tree"></div></ul>',
	        replace: true,
	        transclude: true,
	        restrict: 'A',
	        scope: {
	            tree: '=ngModel',
	            rhaDisabled: '='
	        }
	    };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            element.bind("keypress", function (event) {
	                if (event.which === 13) {
	                    scope.$apply(function () {
	                        return scope.$eval(attrs.rhaEnter, { 'event': event });
	                    });
	                    event.preventDefault();
	                }
	            });
	        }
	    };
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(6),
	        restrict: 'A',
	        scope: { page: '@' },
	        controller: 'HeaderController'
	    };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            element.bind('change', element.scope()[attrs.rhaOnchange]);
	        }
	    };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$parse", function ($parse) {
	    'ngInject';

	    var disableOptions = function disableOptions(scope, attr, element, data, fnDisableIfTrue) {
	        // refresh the disabled options in the select element.
	        $('option[value!="?"]', element).each(function (i, e) {
	            var locals = {};
	            locals[attr] = data[i];
	            $(this).attr('disabled', fnDisableIfTrue(scope, locals));
	        });
	    };
	    return {
	        priority: 0,
	        link: function link(scope, element, attrs, ctrl) {
	            // parse expression and build array of disabled options
	            var expElements = attrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
	            var fnDisableIfTrue = $parse(expElements[1]);
	            var options = expElements[3];
	            scope.$watch(options, function (newValue, oldValue) {
	                if (newValue) {
	                    disableOptions(scope, expElements[2], element, newValue, fnDisableIfTrue);
	                }
	            }, true);
	        }
	    };
	}];

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$window", function ($window) {
	    'ngInject';

	    var link = function link(scope, element, attrs) {
	        scope.onResizeFunction = function () {
	            var distanceToTop = element[0].getBoundingClientRect().top;
	            var height = $window.innerHeight - distanceToTop;
	            element.css('height', height);
	        };
	        angular.element($window).bind('resize', function () {
	            return scope.onResizeFunction();
	        });
	        angular.element($window).bind('click', function () {
	            return scope.onResizeFunction();
	        });
	        if (attrs.rhaDomReady !== undefined) {
	            scope.$watch('rhaDomReady', function (newValue) {
	                if (newValue) {
	                    scope.onResizeFunction();
	                }
	            });
	        } else {
	            scope.onResizeFunction();
	        }
	    };
	    return {
	        restrict: 'A',
	        scope: { rhaDomReady: '=' },
	        link: link
	    };
	}];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'AE',
	        scope: { page: '@' },
	        template: __webpack_require__(7),
	        controller: 'TitleViewCtrl'
	    };
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$http", "$q", "TreeViewSelectorUtils", function ($http, $q, TreeViewSelectorUtils) {
	    'ngInject';

	    return {
	        getTree: function getTree(dataUrl, sessionId) {
	            var defer = $q.defer();
	            var tmpUrl = dataUrl;
	            if (sessionId) {
	                tmpUrl = tmpUrl + '?sessionId=' + encodeURIComponent(sessionId);
	            }
	            $http({
	                method: 'GET',
	                url: tmpUrl
	            }).success(function (data, status, headers, config) {
	                var tree = [];
	                TreeViewSelectorUtils.parseTreeList(tree, data);
	                defer.resolve(tree);
	            }).error(function (data, status, headers, config) {
	                return defer.reject({});
	            });
	            return defer.promise;
	        }
	    };
	}];

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var removeParams = function removeParams(path) {
	        if (path) {
	            var split = path.split('?');
	            return split[0];
	        }
	        return path;
	    };
	    var isLeafChecked = function isLeafChecked(path) {
	        if (path) {
	            var split = path.split('?');
	            if (split[1]) {
	                var params = split[1].split('&');
	                for (var i = 0; i < params.length; i++) {
	                    if (params[i].indexOf('checked=true') !== -1) {
	                        return true;
	                    }
	                }
	            }
	        }
	        return false;
	    };
	    var parseTreeNode = function parseTreeNode(splitPath, tree, fullFilePath) {
	        if (splitPath[0] !== undefined) {
	            if (splitPath[0] !== '') {
	                var node = splitPath[0];
	                var match = false;
	                var index = 0;
	                for (var i = 0; i < tree.length; i++) {
	                    if (tree[i].name === node) {
	                        match = true;
	                        index = i;
	                        break;
	                    }
	                }
	                if (!match) {
	                    var nodeObj = {};
	                    nodeObj.checked = isLeafChecked(node);
	                    nodeObj.name = removeParams(node);
	                    if (splitPath.length === 1) {
	                        nodeObj.fullPath = removeParams(fullFilePath);
	                    }
	                    nodeObj.children = [];
	                    tree.push(nodeObj);
	                    index = tree.length - 1;
	                }
	                splitPath.shift();
	                parseTreeNode(splitPath, tree[index].children, fullFilePath);
	            } else {
	                splitPath.shift();
	                parseTreeNode(splitPath, tree, fullFilePath);
	            }
	        }
	    };
	    var hasSelectedLeaves = function hasSelectedLeaves(tree) {
	        for (var i = 0; i < tree.length; i++) {
	            if (tree[i] !== undefined) {
	                if (tree[i].children.length === 0) {
	                    //we only check leaf nodes
	                    if (tree[i].checked === true) {
	                        return true;
	                    }
	                } else {
	                    if (hasSelectedLeaves(tree[i].children)) {
	                        return true;
	                    }
	                }
	            }
	        }
	        return false;
	    };
	    var getSelectedNames = function getSelectedNames(tree, container) {
	        for (var i = 0; i < tree.length; i++) {
	            if (tree[i] !== undefined) {
	                if (tree[i].children.length === 0) {
	                    if (tree[i].checked === true) {
	                        container.push(tree[i].fullPath);
	                    }
	                } else {
	                    getSelectedNames(tree[i].children, container);
	                }
	            }
	        }
	    };
	    return {
	        parseTreeList: function parseTreeList(tree, data) {
	            var files = data.split('\n');
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];
	                var splitPath = file.split('/');
	                parseTreeNode(splitPath, tree, file);
	            }
	        },
	        hasSelections: function hasSelections(tree) {
	            return hasSelectedLeaves(tree);
	        },
	        getSelectedLeaves: function getSelectedLeaves(tree) {
	            if (tree === undefined) {
	                return [];
	            }
	            var container = [];
	            getSelectedNames(tree, container);
	            return container;
	        }
	    };
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$sce", function ($sce) {
	    'ngInject';

	    return function (text) {
	        return $sce.trustAsHtml(text);
	    };
	}];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Controllers

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ = __webpack_require__(12);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(13);

	var _4 = _interopRequireDefault(_3);

	var _alert = __webpack_require__(14);

	var _alert2 = _interopRequireDefault(_alert);

	var _chatButton = __webpack_require__(15);

	var _chatButton2 = _interopRequireDefault(_chatButton);

	var _header = __webpack_require__(16);

	var _header2 = _interopRequireDefault(_header);

	var _titleView = __webpack_require__(17);

	var _titleView2 = _interopRequireDefault(_titleView);

	var _5 = __webpack_require__(18);

	var _6 = _interopRequireDefault(_5);

	var _7 = __webpack_require__(19);

	var _8 = _interopRequireDefault(_7);

	var _alert3 = __webpack_require__(20);

	var _alert4 = _interopRequireDefault(_alert3);

	var _chatButton3 = __webpack_require__(22);

	var _chatButton4 = _interopRequireDefault(_chatButton3);

	var _header3 = __webpack_require__(26);

	var _header4 = _interopRequireDefault(_header3);

	var _onChange = __webpack_require__(27);

	var _onChange2 = _interopRequireDefault(_onChange);

	var _titleTemplate = __webpack_require__(30);

	var _titleTemplate2 = _interopRequireDefault(_titleTemplate);

	var _autoFocus = __webpack_require__(21);

	var _autoFocus2 = _interopRequireDefault(_autoFocus);

	var _alertService = __webpack_require__(35);

	var _alertService2 = _interopRequireDefault(_alertService);

	var _constantsService = __webpack_require__(37);

	var _constantsService2 = _interopRequireDefault(_constantsService);

	var _headerService = __webpack_require__(38);

	var _headerService2 = _interopRequireDefault(_headerService);

	var _strataService = __webpack_require__(40);

	var _strataService2 = _interopRequireDefault(_strataService);

	var _udsService = __webpack_require__(42);

	var _udsService2 = _interopRequireDefault(_udsService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = angular.module('RedhatAccess.header', []);

	// Controllers


	// Services


	// Directives
	app.controller('403', _2.default);
	app.controller('404', _4.default);
	app.controller('AlertController', _alert2.default);
	app.controller('ChatButton', _chatButton2.default);
	app.controller('HeaderController', _header2.default);
	app.controller('TitleViewCtrl', _titleView2.default);

	// Directives
	app.directive('rha403error', _6.default);
	app.directive('rha404error', _8.default);
	app.directive('rhaAlert', _alert4.default);
	app.directive('rhaChatbutton', _chatButton4.default);
	app.directive('rhaHeader', _header4.default);
	app.directive('rhaOnchange', _onChange2.default);
	app.directive('rhaTitletemplate', _titleTemplate2.default);
	app.directive('autoFocus', _autoFocus2.default);

	// Services
	app.service('AlertService', _alertService2.default);
	app.service('ConstantsService', _constantsService2.default);
	app.service('HeaderService', _headerService2.default);
	app.service('strataService', _strataService2.default);
	app.service('udsService', _udsService2.default);

	exports.default = app.name;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AlertService = function AlertService($filter, AUTH_EVENTS, $rootScope, RHAUtils, gettextCatalog) {
	    'ngInject';

	    _classCallCheck(this, AlertService);

	    var ALERT_TYPES = {
	        DANGER: 'danger',
	        SUCCESS: 'success',
	        WARNING: 'warning',
	        INFO: 'info'
	    };
	    this.alerts = [];
	    //array of {message: 'some alert', type: '<type>'} objects
	    this.clearAlerts = function () {
	        this.alerts = [];
	    };
	    this.addAlert = function (alert) {
	        this.alerts.push(alert);
	    };
	    this.removeAlert = function (alert) {
	        this.alerts.splice(this.alerts.indexOf(alert), 1);
	    };
	    this.addDangerMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.DANGER, isHtml);
	    };
	    this.addSuccessMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.SUCCESS, isHtml);
	    };
	    this.addWarningMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.WARNING, isHtml);
	    };
	    this.addInfoMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.INFO, isHtml);
	    };
	    this.addMessage = function (message, type, isHtml) {
	        var alert = {
	            message: message,
	            type: type === null ? 'warning' : type,
	            isHtml: isHtml
	        };
	        this.addAlert(alert);
	        $('body,html').animate({ scrollTop: $('body').offset().top }, 100);
	        //Angular adds a unique hash to each alert during data binding,
	        //so the returned alert will be unique even if the
	        //message and type are identical.
	        return alert;
	    };
	    this.getErrors = function () {
	        var errors = $filter('filter')(this.alerts, { type: ALERT_TYPES.DANGER });
	        if (errors === null) {
	            errors = [];
	        }
	        return errors;
	    };
	    this.addStrataErrorMessage = function (error) {
	        if (RHAUtils.isNotEmpty(error)) {
	            var errorText = error.message;
	            if (error.xhr && error.xhr.responseText) {
	                errorText = errorText.concat(' Message: ' + error.xhr.responseText);
	            }
	            var existingMessage = $filter('filter')(this.alerts, {
	                type: ALERT_TYPES.DANGER,
	                message: errorText
	            });
	            if (existingMessage.length < 1) {
	                this.addDangerMessage(errorText);
	            }
	        }
	    };
	    this.addUDSErrorMessage = function (error) {
	        if (RHAUtils.isNotEmpty(error) && RHAUtils.isNotEmpty(error.responseText)) {
	            this.addDangerMessage(error.responseText);
	        }
	    };
	    $rootScope.$on(AUTH_EVENTS.logoutSuccess, angular.bind(this, function () {
	        this.clearAlerts();
	        this.addMessage(gettextCatalog.getString('You have successfully logged out of the Red Hat Customer Portal.'));
	    }));
	    $rootScope.$on(AUTH_EVENTS.loginSuccess, angular.bind(this, function () {
	        this.clearAlerts();
	    }));
	};
	AlertService.$inject = ["$filter", "AUTH_EVENTS", "$rootScope", "RHAUtils", "gettextCatalog"];

	exports.default = AlertService;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$q", function ($q) {
	    'ngInject';

	    var defer = $q.defer();
	    return {
	        setConfig: function setConfig(config) {
	            defer.resolve(config);
	        },
	        getConfig: function getConfig() {
	            return defer.promise;
	        }
	    };
	}];

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ConstantsService = function ConstantsService(gettextCatalog, STATUS) {
	    'ngInject';

	    _classCallCheck(this, ConstantsService);

	    this.sortByParams = [{
	        ///this refers  in context of "sorting on Newest Date Modified"
	        name: gettextCatalog.getString('Newest Date Modified'),
	        sortField: 'lastModifiedDate',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Oldest Date Modified"
	        name: gettextCatalog.getString('Oldest Date Modified'),
	        sortField: 'lastModifiedDate',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Highest Severity"
	        name: gettextCatalog.getString('Highest Severity'),
	        sortField: 'severity',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Lowest Severity"
	        name: gettextCatalog.getString('Lowest Severity'),
	        sortField: 'severity',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Newest Date Created"
	        name: gettextCatalog.getString('Newest Date Created'),
	        sortField: 'createdDate',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Oldest Date Created"
	        name: gettextCatalog.getString('Oldest Date Created'),
	        sortField: 'createdDate',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Case Owner (A-Z)"
	        name: gettextCatalog.getString('Case Owner (A-Z)'),
	        sortField: 'owner',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Case Owner (Z-A)"
	        name: gettextCatalog.getString('Case Owner (Z-A)'),
	        sortField: 'owner',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Case Status (A-Z)"
	        name: gettextCatalog.getString('Case Status (A-Z)'),
	        sortField: 'status',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Case Status (Z-A)"
	        name: gettextCatalog.getString('Case Status (Z-A)'),
	        sortField: 'status',
	        sortOrder: 'DESC'
	    }];
	    this.statuses = [{
	        // Open and Waiting on Customer
	        name: gettextCatalog.getString('Waiting on Customer'),
	        value: STATUS.wocust
	    }, {
	        // Open and Waiting on RedHat
	        name: gettextCatalog.getString('Waiting on Red Hat'),
	        value: STATUS.worh
	    }, {
	        // Open refers to Open support cases
	        name: gettextCatalog.getString('All Open Cases'),
	        value: STATUS.open
	    }, {
	        // Closed refers to Closed support cases
	        name: gettextCatalog.getString('All Closed Cases'),
	        value: STATUS.closed
	    }, {
	        // Open and closed refers to Open and Closed support cases
	        name: gettextCatalog.getString('All Cases'),
	        value: STATUS.both
	    }];
	    this.advancedCaseListColumns = [{
	        id: 'severity',
	        name: gettextCatalog.getString('Severity'),
	        description: gettextCatalog.getString('Severity of the case.'),
	        default: true
	    }, {
	        id: 'number-status',
	        name: gettextCatalog.getString('Number & Status'),
	        description: gettextCatalog.getString('Number and Status of the case.'),
	        required: true,
	        default: true
	    }, {
	        id: 'summary',
	        name: gettextCatalog.getString('Summary'),
	        description: gettextCatalog.getString('Summary of the case.'),
	        default: true
	    }, {
	        id: 'product',
	        name: gettextCatalog.getString('Product Name and Version'),
	        description: gettextCatalog.getString('Product and Version assigned to the case.'),
	        default: true
	    }, {
	        id: 'created',
	        name: gettextCatalog.getString('Created User and Date'),
	        description: gettextCatalog.getString('Name of the person who created the case and date it was created.'),
	        default: true
	    }, {
	        id: 'modified',
	        name: gettextCatalog.getString('Last Modified User and Date'),
	        description: gettextCatalog.getString('Name of the person who modified the case last and the date the action was performed.')
	    }, {
	        id: 'contact',
	        name: gettextCatalog.getString('Contact Name'),
	        description: gettextCatalog.getString('Name of the customer contact.')
	    }, {
	        id: 'account',
	        name: gettextCatalog.getString('Account Number'),
	        description: gettextCatalog.getString('Number of the account the case was created under.')
	    }, {
	        id: 'owner',
	        name: gettextCatalog.getString('Owner Name'),
	        description: gettextCatalog.getString('Name of the Red Hat Associate\'s who owns the case.')
	    }];

	    this.wappsUrl = new Uri('https://ams-dev2.devlab.redhat.com/wapps');
	    if (window.location.hostname === 'access.redhat.com' || window.location.hostname === 'prod.foo.redhat.com' || window.location.hostname === 'fooprod.redhat.com') {
	        this.wappsUrl = new Uri('https://www.redhat.com/wapps');
	    } else {
	        if (window.location.hostname === 'access.qa.redhat.com' || window.location.hostname === 'qa.foo.redhat.com' || window.location.hostname === 'fooqa.redhat.com') {
	            this.wappsUrl = new Uri('https://www.qa.redhat.com/wapps');
	        } else {
	            if (window.location.hostname === 'access.devgssci.devlab.phx1.redhat.com' || window.location.hostname === 'ci.foo.redhat.com' || window.location.hostname === 'fooci.redhat.com') {
	                this.wappsUrl = new Uri('https://ams-dev2.devlab.redhat.com/wapps');
	            }
	        }
	    }
	};
	ConstantsService.$inject = ["gettextCatalog", "STATUS"];

	exports.default = ConstantsService;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HeaderService = function HeaderService(COMMON_CONFIG, strataService, securityService, AlertService, $q) {
	    'ngInject';

	    _classCallCheck(this, HeaderService);

	    this.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
	    this.pageLoading = false;
	    this.pageLoadFailure = false;
	    this.showSurvey = true;
	    this.showPartnerEscalationError = false;
	    this.checkSfdcHealth = function () {
	        if (securityService.loginStatus.isLoggedIn) {
	            var deferred = $q.defer();
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
	HeaderService.$inject = ["COMMON_CONFIG", "strataService", "securityService", "AlertService", "$q"];

	exports.default = HeaderService;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RHAUtils = function RHAUtils() {
	    _classCallCheck(this, RHAUtils);

	    this.isEmpty = function (object) {
	        if (object === undefined || object === null || object === '' || object.length === 0 || object === {}) {
	            return true;
	        }
	        return false;
	    };
	    this.isNotEmpty = function (object) {
	        return !this.isEmpty(object);
	    };
	    this.isObjectEmpty = function (obj) {
	        for (var prop in obj) {
	            if (obj.hasOwnProperty(prop)) return false;
	        }
	        return true;
	    };
	    this.isEmailValid = function (object) {
	        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	        if (object.match(mailformat)) {
	            return true;
	        } else {
	            return false;
	        }
	    };

	    this.convertToTimezone = function (date) {
	        var timezoneDate = window.moment(date).tz(this.userTimeZone);
	        return timezoneDate;
	    };

	    this.convertToMoment = function (date) {
	        var momentDate = window.moment(date);
	        return momentDate;
	    };

	    this.formatDate = function (date, formatter) {
	        return date.format(formatter);
	    };
	    this.isWeeekend = function (userTimeZone) {
	        if (this.isEmpty(userTimeZone)) userTimeZone = null;
	        var currentDate = window.moment(); //get current date
	        var timezoneDate = window.moment(currentDate).tz(userTimeZone); //change as per logged in user's timezone
	        //Sunday as 0 and Saturday as 6.
	        if (timezoneDate.day() == 0 || timezoneDate.day() == 6) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	};

	exports.default = RHAUtils;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StrataService = function StrataService($q, gettextCatalog, RHAUtils, CacheFactory, RESOURCE_TYPES) {
	    'ngInject';

	    _classCallCheck(this, StrataService);

	    CacheFactory('strataCache', {
	        capacity: 1000,
	        maxAge: 900000,
	        deleteOnExpire: 'aggressive',
	        recycleFreq: 60000,
	        cacheFlushInterval: 3600000,
	        storageMode: 'sessionStorage'
	    });
	    var strataCache = CacheFactory.get('strataCache');
	    $(window).unload(function () {
	        strataCache.destroy();
	    });
	    var errorHandler = function errorHandler(message, xhr, response, status) {
	        var translatedMsg = message;
	        switch (status) {
	            case 'Unauthorized':
	                translatedMsg = gettextCatalog.getString('Unauthorized.');
	                break; // case n:
	            //   code block
	            //   break;
	        }
	        this.reject({
	            message: translatedMsg,
	            xhr: xhr,
	            response: response,
	            status: status
	        });
	    };
	    function clearCache(key) {
	        strataCache.remove(key);
	    }
	    function clearAllCaseSearch() {
	        var allKeys = strataCache.keys();
	        if (allKeys) {
	            allKeys.forEach(function (key) {
	                if (key.startsWith('filter') || key.startsWith('search') || key.startsWith('advancedSearch')) {
	                    clearCache(key);
	                }
	            });
	        }
	    }
	    var service = {
	        authentication: {
	            checkLogin: function checkLogin() {
	                var deferred = $q.defer();
	                if (strataCache.get('auth')) {
	                    strata.addAccountNumber(strataCache.get('auth').account_number);
	                    deferred.resolve(strataCache.get('auth'));
	                } else {
	                    strata.checkLogin(function (result, authedUser) {
	                        if (result) {
	                            service.accounts.list().then(function (accountNumber) {
	                                service.accounts.get(accountNumber).then(function (account) {
	                                    authedUser.account = account;
	                                    strata.addAccountNumber(account.number);
	                                    strataCache.put('auth', authedUser);
	                                    deferred.resolve(authedUser);
	                                });
	                            }, function (error) {
	                                //TODO revisit this behavior
	                                authedUser.account = undefined;
	                                deferred.resolve(authedUser);
	                            });
	                        } else {
	                            var error = { message: 'Unauthorized.' };
	                            deferred.reject(error);
	                        }
	                    });
	                }
	                return deferred.promise;
	            },
	            setCredentials: function setCredentials(username, password) {
	                return strata.setCredentials(username, password);
	            },
	            logout: function logout() {
	                strataCache.removeAll();
	                strata.clearCredentials();
	            }
	        },
	        cache: {
	            clr: function clr(key) {
	                clearCache(key);
	            }
	        },
	        entitlements: {
	            get: function get(showAll, ssoUserName) {
	                var deferred = $q.defer();
	                strata.entitlements.get(showAll, function (entitlements) {
	                    deferred.resolve(entitlements);
	                }, angular.bind(deferred, errorHandler), ssoUserName);
	                return deferred.promise;
	            }
	        },
	        problems: function problems(data, max) {
	            var deferred = $q.defer();
	            strata.problems(data, function (solutions) {
	                deferred.resolve(solutions);
	            }, angular.bind(deferred, errorHandler), max);
	            return deferred.promise;
	        },
	        recommendations: function recommendations(data, max, highlight, highlightTags) {
	            var deferred = $q.defer();
	            strata.recommendations(data, function (recommendations) {
	                deferred.resolve(recommendations);
	            }, angular.bind(deferred, errorHandler), max, highlight, highlightTags);
	            return deferred.promise;
	        },
	        recommendationsXmlHack: function recommendationsXmlHack(data, max, highlight, highlightTags) {
	            var deferred = $q.defer();
	            strata.recommendationsXmlHack(data, function (recommendations) {
	                deferred.resolve(recommendations);
	            }, angular.bind(deferred, errorHandler), max, highlight, highlightTags);
	            return deferred.promise;
	        },
	        recommendationsForCase: function recommendationsForCase(data, limit, start, highlight, highlightTagPre, highlightTagPost) {
	            var deferred = $q.defer();
	            strata.recommendationsForCase(data, function (response) {
	                deferred.resolve(response);
	            }, angular.bind(deferred, errorHandler), limit, start, highlight, highlightTagPre, highlightTagPost);

	            return deferred.promise;
	        },
	        solutionEngine: {
	            sendCaseNumber: function sendCaseNumber(caseNumObj, guid) {
	                var deferred = $q.defer();
	                strata.solutionEngine.sendCaseNumber(caseNumObj, guid, function () {
	                    deferred.resolve();
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        solutions: {
	            get: function get(uri) {
	                var deferred = $q.defer();
	                var splitUri = uri.split('/');
	                uri = splitUri[splitUri.length - 1];
	                if (strataCache.get('solution' + uri)) {
	                    deferred.resolve(strataCache.get('solution' + uri));
	                } else {
	                    strata.solutions.get(uri, function (solution) {
	                        solution.resource_type = RESOURCE_TYPES.solution; //Needed upstream
	                        strataCache.put('solution' + uri, solution);
	                        deferred.resolve(solution);
	                    }, function () {
	                        //workaround for 502 from strata
	                        //If the deferred is rejected then the parent $q.all()
	                        //based deferred will fail. Since we don't need every
	                        //recommendation just send back undefined
	                        //and the caller can ignore the missing solution details.
	                        deferred.resolve();
	                    });
	                }
	                return deferred.promise;
	            },
	            search: function search(searchString, max) {
	                var deferred = $q.defer();
	                strata.search(searchString, function (entries) {
	                    if (entries !== undefined) {
	                        deferred.resolve(entries);
	                    }
	                }, angular.bind(deferred, errorHandler), max, false);
	                return deferred.promise;
	            },
	            post: function post(solution) {
	                var deferred = $q.defer();
	                strata.solutions.post(solution, function (solution) {
	                    deferred.resolve(solution);
	                }, angular.bind(deferred, errorHandler));

	                return deferred.promise;
	            }
	        },
	        articles: {
	            get: function get(id) {
	                var deferred = $q.defer();
	                strata.articles.get(id, function (article) {
	                    article.resource_type = RESOURCE_TYPES.article; //Needed upstream
	                    strataCache.put('article' + id, article);
	                    deferred.resolve(article);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        search: function search(searchString, max) {
	            var resultsDeferred = $q.defer();
	            var deferreds = [];
	            strata.search(searchString, function (entries) {
	                //retrieve details for each solution
	                if (entries !== undefined) {
	                    entries.forEach(function (entry) {
	                        var deferred = $q.defer();
	                        deferreds.push(deferred.promise);
	                        var resourceType = entry.resource_type || entry.documentKind;
	                        switch (resourceType) {
	                            case RESOURCE_TYPES.solution:
	                                if (!strataCache.get('solution' + entry.uri)) {
	                                    strataCache.put('solution' + entry.uri, entry);
	                                }
	                                deferred.resolve(strataCache.get('solution' + entry.uri));
	                                break;
	                            case RESOURCE_TYPES.article:
	                                if (!strataCache.get('article' + entry.uri)) {
	                                    strataCache.put('article' + entry.uri, entry);
	                                }
	                                deferred.resolve(strataCache.get('article' + entry.uri));
	                                break;
	                            default:
	                                console.warn("Could not determine resource type from strata search, resourceType: " + resourceType + ", q: " + searchString);
	                                return deferred.resolve();
	                        }
	                    });
	                }
	                $q.all(deferreds).then(function (results) {
	                    resultsDeferred.resolve(results);
	                }, angular.bind(resultsDeferred, errorHandler));
	            }, angular.bind(resultsDeferred, errorHandler), max, false);
	            return resultsDeferred.promise;
	        },
	        products: {
	            list: function list(ssoUserName) {
	                var deferred = $q.defer();
	                if (strataCache.get('products' + ssoUserName)) {
	                    deferred.resolve(strataCache.get('products' + ssoUserName));
	                } else {
	                    strata.products.list(function (response) {
	                        strataCache.put('products' + ssoUserName, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), ssoUserName);
	                }
	                return deferred.promise;
	            },
	            versions: function versions(productCode) {
	                var deferred = $q.defer();
	                if (strataCache.get('versions-' + productCode)) {
	                    var responseCopy = [];
	                    angular.copy(strataCache.get('versions-' + productCode), responseCopy);
	                    deferred.resolve(responseCopy);
	                } else {
	                    strata.products.versions(productCode, function (response) {
	                        strataCache.put('versions-' + productCode, response);
	                        var responseCopy = [];
	                        angular.copy(response, responseCopy);
	                        deferred.resolve(responseCopy);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            get: function get(productCode) {
	                var deferred = $q.defer();
	                if (strataCache.get('product' + productCode)) {
	                    deferred.resolve(strataCache.get('product' + productCode));
	                } else {
	                    strata.products.get(productCode, function (response) {
	                        strataCache.put('product' + productCode, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            }
	        },
	        groups: {
	            get: function get(groupNum, ssoUserName) {
	                var deferred = $q.defer();
	                if (strataCache.get('groups' + groupNum + ssoUserName)) {
	                    deferred.resolve(strataCache.get('groups' + groupNum + ssoUserName));
	                } else {
	                    strata.groups.get(groupNum, function (response) {
	                        strataCache.put('groups' + groupNum + ssoUserName, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), ssoUserName);
	                }
	                return deferred.promise;
	            },
	            list: function list(ssoUserName, flushCashe) {
	                var deferred = $q.defer();
	                if (flushCashe) {
	                    strataCache.remove('groups' + ssoUserName);
	                }
	                if (strataCache.get('groups' + ssoUserName)) {
	                    deferred.resolve(strataCache.get('groups' + ssoUserName));
	                } else {
	                    strata.groups.list(function (response) {
	                        strataCache.put('groups' + ssoUserName, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), ssoUserName);
	                }
	                return deferred.promise;
	            },
	            remove: function remove(groupNum, ssoUserName) {
	                var deferred = $q.defer();
	                strata.groups.remove(groupNum, function (response) {
	                    deferred.resolve(response);
	                    clearCache('groups' + ssoUserName);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            create: function create(groupName, ssoUserName) {
	                var deferred = $q.defer();
	                strata.groups.create(groupName, function (response) {
	                    deferred.resolve(response);
	                    clearCache('groups' + ssoUserName);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            update: function update(group, ssoUserName) {
	                var deferred = $q.defer();
	                strata.groups.update(group, function (response) {
	                    deferred.resolve(response);
	                    clearCache('groups' + ssoUserName);
	                    clearCache('groups' + group.number + ssoUserName);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            createDefault: function createDefault(group) {
	                var deferred = $q.defer();
	                strata.groups.createDefault(group, function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        groupUsers: {
	            update: function update(users, accountId, groupnum) {
	                var deferred = $q.defer();
	                strata.groupUsers.update(users, accountId, groupnum, function (response) {
	                    deferred.resolve(response);
	                    if (strataCache.get('users' + accountId + groupnum)) {
	                        clearCache('users' + accountId + groupnum);
	                    }
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        accounts: {
	            get: function get(accountNumber) {
	                var deferred = $q.defer();
	                if (strataCache.get('account' + accountNumber)) {
	                    deferred.resolve(strataCache.get('account' + accountNumber));
	                } else {
	                    strata.accounts.get(accountNumber, function (response) {
	                        strataCache.put('account' + accountNumber, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            users: function users(accountNumber, group) {
	                var deferred = $q.defer();
	                if (strataCache.get('users' + accountNumber + group)) {
	                    deferred.resolve(strataCache.get('users' + accountNumber + group));
	                } else {
	                    strata.accounts.users(accountNumber, function (response) {
	                        strataCache.put('users' + accountNumber + group, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), group);
	                }
	                return deferred.promise;
	            },
	            list: function list() {
	                var deferred = $q.defer();
	                if (strataCache.get('account')) {
	                    deferred.resolve(strataCache.get('account'));
	                } else {
	                    strata.accounts.list(function (response) {
	                        strataCache.put('account', response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            addBookmark: function addBookmark(accountNumber, ssoName) {
	                var deferred = $q.defer();
	                strata.accounts.addBookmark(accountNumber, ssoName, function () {
	                    deferred.resolve();
	                }, angular.bind(deferred, errorHandler));

	                return deferred.promise;
	            },
	            removeBookmark: function removeBookmark(accountNumber, ssoName) {
	                var deferred = $q.defer();
	                strata.accounts.removeBookmark(accountNumber, ssoName, function () {
	                    deferred.resolve();
	                }, angular.bind(deferred, errorHandler));

	                return deferred.promise;
	            },
	            managedAccounts: {
	                get: function get(accountNumber) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('managedAccounts' + accountNumber)) {
	                        deferred.resolve(strataCache.get('managedAccounts' + accountNumber));
	                    } else {
	                        strata.accounts.getManagedAccounts(accountNumber, function (response) {
	                            strataCache.put('managedAccounts' + accountNumber, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            },
	            accountManagers: {
	                get: function get(accountNumber) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('accountManagers' + accountNumber)) {
	                        deferred.resolve(strataCache.get('accountManagers' + accountNumber));
	                    } else {
	                        strata.accounts.getManagersForAccount(accountNumber, function (response) {
	                            strataCache.put('accountManagers' + accountNumber, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            }
	        },
	        cases: {
	            csv: function csv() {
	                var deferred = $q.defer();
	                strata.cases.csv(function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            attachments: {
	                list: function list(id) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('attachments' + id)) {
	                        //Changing cache response. Making sortModifiedDate as Date before sending
	                        var attachmentResponse = strataCache.get('attachments' + id);
	                        angular.forEach(attachmentResponse, angular.bind(this, function (attachment) {
	                            attachment.sortModifiedDate = new Date(attachment.sortModifiedDate);
	                        }));

	                        deferred.resolve(attachmentResponse);
	                    } else {
	                        strata.cases.attachments.list(id, function (response) {
	                            angular.forEach(response, angular.bind(this, function (element) {
	                                var sortPublishedDate = element.last_modified_date;
	                                element.sortModifiedDate = sortPublishedDate;
	                                var lastModifiedDate = RHAUtils.convertToTimezone(element.last_modified_date);
	                                element.last_modified_date = RHAUtils.formatDate(lastModifiedDate, 'MMM DD YYYY');
	                                element.last_modified_time = RHAUtils.formatDate(lastModifiedDate, 'hh:mm A Z');
	                                var createdDate = RHAUtils.convertToTimezone(element.created_date);
	                                element.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                                element.created_time = RHAUtils.formatDate(createdDate, 'hh:mm A Z');
	                                //for attachments the published date is the last modified date
	                                element.published_date = element.last_modified_date;
	                                element.published_time = element.last_modified_time;
	                            }));
	                            strataCache.put('attachments' + id, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                post: function post(attachment, caseNumber, onProgress, isPrivate) {
	                    var deferred = $q.defer();
	                    strata.cases.attachments.post(attachment, caseNumber, function (response, code, xhr) {
	                        strataCache.remove('attachments' + caseNumber);
	                        deferred.resolve(xhr.getResponseHeader('Location'));
	                    }, angular.bind(deferred, errorHandler), onProgress, isPrivate);
	                    return deferred.promise;
	                },
	                remove: function remove(id, caseNumber) {
	                    var deferred = $q.defer();
	                    strata.cases.attachments.remove(id, caseNumber, function (response) {
	                        strataCache.remove('attachments' + caseNumber);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            externalUpdates: {
	                list: function list(id) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('externalUpdates' + id)) {
	                        //Changing cache response. Making sortModifiedDate as Date before sending
	                        var externalUpdates = strataCache.get('externalUpdates' + id);
	                        angular.forEach(externalUpdates, angular.bind(this, function (externalUpdates) {
	                            externalUpdates.sortModifiedDate = new Date(externalUpdates.sortModifiedDate);
	                        }));

	                        deferred.resolve(externalUpdates);
	                    } else {
	                        strata.cases.externalUpdates.list(id, function (response) {
	                            angular.forEach(response, angular.bind(this, function (externalUpdate) {
	                                var sortPublishedDate = externalUpdate.created_date;
	                                externalUpdate.sortModifiedDate = sortPublishedDate;

	                                var createdDate = RHAUtils.convertToTimezone(externalUpdate.created_date);
	                                externalUpdate.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                                externalUpdate.created_time = RHAUtils.formatDate(createdDate, 'hh:mm A Z');
	                            }));
	                            strataCache.put('externalUpdates' + id, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            },
	            comments: {
	                get: function get(id) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('comments' + id)) {
	                        //Changing cache response. Making sortModifiedDate as Date before sending
	                        var commentResponse = strataCache.get('comments' + id);
	                        angular.forEach(commentResponse, angular.bind(this, function (comment) {
	                            comment.sortModifiedDate = new Date(comment.sortModifiedDate);
	                        }));

	                        deferred.resolve(commentResponse);
	                    } else {
	                        strata.cases.comments.get(id, function (response) {
	                            angular.forEach(response, angular.bind(this, function (comment) {
	                                var sortPublishedDate = comment.published_date;
	                                comment.sortModifiedDate = sortPublishedDate;

	                                var lastModifiedDate = RHAUtils.convertToTimezone(comment.last_modified_date);
	                                comment.last_modified_date = RHAUtils.formatDate(lastModifiedDate, 'MMM DD YYYY');
	                                comment.last_modified_time = RHAUtils.formatDate(lastModifiedDate, 'hh:mm A Z');

	                                var createdDate = RHAUtils.convertToTimezone(comment.created_date);
	                                comment.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                                comment.created_time = RHAUtils.formatDate(createdDate, 'hh:mm A Z');
	                                //for comments use published date
	                                var publishedDate = RHAUtils.convertToTimezone(comment.published_date);
	                                comment.published_date = RHAUtils.formatDate(publishedDate, 'MMM DD YYYY');
	                                comment.published_time = RHAUtils.formatDate(publishedDate, 'hh:mm A Z');
	                            }));
	                            strataCache.put('comments' + id, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                post: function post(caseNumber, text, isPublic, isDraft) {
	                    var deferred = $q.defer();
	                    strata.cases.comments.post(caseNumber, {
	                        'text': text,
	                        'draft': isDraft === true ? 'true' : 'false',
	                        'public': isPublic === true ? 'true' : 'false'
	                    }, function (response) {
	                        strataCache.remove('comments' + caseNumber);
	                        clearAllCaseSearch();
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                put: function put(caseNumber, text, isDraft, isPublic, comment_id) {
	                    var deferred = $q.defer();
	                    strata.cases.comments.update(caseNumber, {
	                        'text': text,
	                        'draft': isDraft === true ? 'true' : 'false',
	                        'public': isPublic === true ? 'true' : 'false',
	                        'caseNumber': caseNumber,
	                        'id': comment_id
	                    }, comment_id, function (response) {
	                        strataCache.remove('comments' + caseNumber);
	                        clearAllCaseSearch();
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            symptoms: {
	                get: function get(id) {
	                    var deferred = $q.defer();
	                    strata.cases.symptoms.get(id, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                solutions: {
	                    post: function post(limit, isOnlySymptoms, data) {
	                        var deferred = $q.defer();
	                        strata.cases.symptoms.solutions.post(limit, isOnlySymptoms, data, function (response) {
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                        return deferred.promise;
	                    }
	                }
	            },
	            notified_users: {
	                add: function add(caseNumber, ssoUserName) {
	                    var deferred = $q.defer();
	                    strata.cases.notified_users.add(caseNumber, ssoUserName, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                remove: function remove(caseNumber, ssoUserName) {
	                    var deferred = $q.defer();
	                    strata.cases.notified_users.remove(caseNumber, ssoUserName, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            sbrs: {
	                add: function add(caseNumber, sbrGroups) {
	                    var deferred = $q.defer();
	                    strata.cases.sbrs.add(caseNumber, sbrGroups, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                remove: function remove(caseNumber, sbrGroups) {
	                    var deferred = $q.defer();
	                    strata.cases.sbrs.remove(caseNumber, sbrGroups, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            get: function get(id) {
	                var deferred = $q.defer();
	                if (strataCache.get('case' + id)) {
	                    //Changing cache response. Making sortModifiedDate as Date before sending
	                    var caseChatsResponse = strataCache.get('case' + id);
	                    angular.forEach(caseChatsResponse.chats.chat, angular.bind(this, function (chat) {
	                        chat.sortModifiedDate = new Date(chat.sortModifiedDate);
	                    }));

	                    deferred.resolve([caseChatsResponse, true]);
	                } else {
	                    strata.cases.get(id, function (response) {
	                        var kase = response;
	                        var tzDate = RHAUtils.convertToTimezone(response.created_date);
	                        response.created_date = RHAUtils.formatDate(tzDate, 'MMM DD YYYY hh:mm:ss A Z');
	                        angular.forEach(response.chats.chat, angular.bind(this, function (chat) {
	                            chat.sortModifiedDate = chat.start_time;
	                            var lastModifiedDate = RHAUtils.convertToTimezone(chat.start_time);
	                            chat.start_date = RHAUtils.formatDate(lastModifiedDate, 'MMM DD YYYY');
	                            chat.start_time = RHAUtils.formatDate(lastModifiedDate, 'hh:mm:ss A Z');
	                        }));
	                        strataCache.put('case' + id, response);
	                        deferred.resolve([response, false]);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            search: function search(caseStatus, caseOwner, caseGroup, accountNumber, searchString, sortField, sortOrder, offset, limit, queryParams, start, partnerSearch) {
	                var deferred = $q.defer(),
	                    key = 'search' + Array.prototype.join.call(arguments, '-');

	                if (strataCache.get(key)) {
	                    deferred.resolve(strataCache.get(key));
	                } else {
	                    strata.cases.search(function (response) {
	                        angular.forEach(response['case'], function (kase) {
	                            var createdDate = RHAUtils.convertToTimezone(kase.created_date);
	                            kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                            var modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
	                            kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
	                        });
	                        strataCache.put(key, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), caseStatus, caseOwner, caseGroup, accountNumber, searchString, sortField, sortOrder, offset, limit, queryParams, start, partnerSearch);
	                }
	                return deferred.promise;
	            },
	            advancedSearch: function advancedSearch(query, order, offset, limit, format) {
	                var deferred = $q.defer(),
	                    key = 'advancedSearch-' + Array.prototype.join.call(arguments, '-');

	                if (strataCache.get(key)) {
	                    deferred.resolve(strataCache.get(key));
	                } else {
	                    strata.cases.advancedSearch(function (response) {
	                        angular.forEach(response['case'], function (kase) {
	                            var createdDate = RHAUtils.convertToTimezone(kase.created_date);
	                            kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                            var modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
	                            kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
	                        });
	                        strataCache.put(key, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), query, order, offset, limit, format);
	                }

	                return deferred.promise;
	            },
	            filter: function filter(params, partnerSearch) {
	                var deferred = $q.defer(),
	                    key = 'filter' + JSON.stringify(params);

	                if (RHAUtils.isEmpty(params)) {
	                    params = {};
	                }
	                if (RHAUtils.isEmpty(params.count)) {
	                    params.count = 50;
	                }
	                if (strataCache.get(key)) {
	                    deferred.resolve(strataCache.get(key));
	                } else {
	                    strata.cases.filter(params, partnerSearch, function (response) {
	                        angular.forEach(response['case'], function (kase) {
	                            var createdDate = RHAUtils.convertToTimezone(kase.created_date);
	                            kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                            var modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
	                            kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
	                        });
	                        strataCache.put(key, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            post: function post(caseJSON) {
	                var deferred = $q.defer();
	                strata.cases.post(caseJSON, function (caseNumber) {
	                    //Remove any case filters that are cached
	                    clearAllCaseSearch();
	                    deferred.resolve(caseNumber);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            put: function put(caseNumber, caseJSON) {
	                var deferred = $q.defer();
	                strata.cases.put(caseNumber, caseJSON, function (response) {
	                    // Remove all case caches that could have been affected
	                    strataCache.remove('case' + caseNumber);
	                    clearAllCaseSearch();
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            owner: {
	                update: function update(caseNumber, ssoUserName) {
	                    var deferred = $q.defer();
	                    strata.cases.owner.update(caseNumber, ssoUserName, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            }
	        },
	        values: {
	            cases: {
	                severity: function severity() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('severities')) {
	                        deferred.resolve(strataCache.get('severities'));
	                    } else {
	                        strata.values.cases.severity(function (response) {
	                            strataCache.put('severities', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                status: function status() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('statuses')) {
	                        deferred.resolve(strataCache.get('statuses'));
	                    } else {
	                        strata.values.cases.status(function (response) {
	                            strataCache.put('statuses', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                types: function types() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('types')) {
	                        deferred.resolve(strataCache.get('types'));
	                    } else {
	                        strata.values.cases.types(function (response) {
	                            strataCache.put('types', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                attachment: {
	                    size: function size() {
	                        var deferred = $q.defer();
	                        if (strataCache.get('attachmentMaxSize')) {
	                            deferred.resolve(strataCache.get('attachmentMaxSize'));
	                        } else {
	                            strata.values.cases.attachment.size(function (response) {
	                                strataCache.put('attachmentMaxSize', response);
	                                deferred.resolve(response);
	                            }, angular.bind(deferred, errorHandler));
	                        }
	                        return deferred.promise;
	                    }
	                }
	            },
	            businesshours: function businesshours(timezone) {
	                var deferred = $q.defer();
	                if (strataCache.get('businesshours')) {
	                    deferred.resolve(strataCache.get('businesshours'));
	                } else {
	                    strata.values.businesshours(timezone, function (response) {
	                        strataCache.put('businesshours', response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            }
	        },
	        users: {
	            get: function get(userId) {
	                var deferred = $q.defer();
	                if (strataCache.get('userId' + userId)) {
	                    deferred.resolve(strataCache.get('userId' + userId));
	                } else {
	                    strata.users.get(function (response) {
	                        strataCache.put('userId' + userId, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), userId);
	                }
	                return deferred.promise;
	            },
	            getBySSO: function getBySSO(userSSO) {
	                var deferred = $q.defer();
	                if (strataCache.get('userSSO' + userSSO)) {
	                    deferred.resolve(strataCache.get('userSSO' + userSSO));
	                } else {
	                    strata.users.getBySSO(function (response) {
	                        strataCache.put('userSSO' + userSSO, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), userSSO);
	                }
	                return deferred.promise;
	            },
	            chatSession: {
	                post: function post() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('chatSession')) {
	                        deferred.resolve(strataCache.get('chatSession'));
	                    } else {
	                        strata.users.chatSession.get(function (response) {
	                            strataCache.put('chatSession', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            }
	        },
	        health: {
	            sfdc: function sfdc() {
	                var deferred = $q.defer();
	                strata.health.sfdc(function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        escalationRequest: {
	            create: function create(escalationJSON) {
	                var deferred = $q.defer();
	                strata.escalation.create(escalationJSON, function (escalationNum) {
	                    deferred.resolve(escalationNum);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        reviews: {
	            getCaseNumber: function getCaseNumber(query) {
	                var deferred = $q.defer();
	                strata.reviews.getCaseNumber(query, function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            getSolutionNumber: function getSolutionNumber(query) {
	                var deferred = $q.defer();
	                strata.reviews.getSolutionNumber(query, function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        }
	    };
	    return service;
	};
	StrataService.$inject = ["$q", "gettextCatalog", "RHAUtils", "CacheFactory", "RESOURCE_TYPES"];

	exports.default = StrataService;

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["gettextCatalog", function (gettextCatalog) {
	    'ngInject';

	    return function (str) {
	        return gettextCatalog.getString(str);
	    };
	}];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var uds = __webpack_require__(52);

	var UdsService = function UdsService() {
	    'ngInject';

	    _classCallCheck(this, UdsService);

	    this.cases = {
	        list: function list(uql, resourceProjection, limit, sortOption, onlyStatus, nepUql) {
	            return uds.fetchCases(uql, resourceProjection, limit, sortOption, onlyStatus, nepUql);
	        },
	        sbrs: function sbrs() {
	            return uds.fetchCaseSbrs();
	        },
	        listTopCases: function listTopCases(queryString) {
	            return uds.fetchTopCasesFromSolr(queryString);
	        },
	        listLanguages: function listLanguages() {
	            return uds.fetchCaseLanguages();
	        }
	    };
	    this.brms = {
	        getResponse: function getResponse(jsonObject) {
	            return uds.getBrmsResponse(jsonObject);
	        }
	    };
	    this.bomgar = {
	        getSessionKey: function getSessionKey(caseId) {
	            return uds.generateBomgarSessionKey(caseId);
	        }
	    };
	    this.kase = {
	        handlingSystem: {
	            set: function set(caseNumber, handlingSystemArray) {
	                return uds.setHandlingSystem(caseNumber, handlingSystemArray);
	            }
	        },
	        details: {
	            get: function get(caseNumber) {
	                return uds.fetchCaseDetails(caseNumber);
	            },
	            put: function put(caseNumber, caseDetails) {
	                return uds.updateCaseDetails(caseNumber, caseDetails);
	            }
	        },
	        nep: {
	            create: function create(caseNumber, nep) {
	                return uds.createCaseNep(caseNumber, nep);
	            },
	            update: function update(caseNumber, nep) {
	                return uds.updateCaseNep(caseNumber, nep);
	            },
	            remove: function remove(caseNumber) {
	                return uds.removeCaseNep(caseNumber);
	            }
	        },
	        associates: {
	            get: function get(uqlContributors) {
	                return uds.fetchCaseAssociateDetails(uqlContributors);
	            },
	            post: function post(caseNumber, sso, roleName) {
	                var jsonAssociates = {
	                    "resource": {
	                        "sso": sso,
	                        "role": roleName
	                    }

	                };
	                return uds.addAssociates(caseNumber, jsonAssociates);
	            },
	            remove: function remove(caseNumber, sso, roleName) {
	                var jsonAssociates = {
	                    "resource": {
	                        "sso": sso,
	                        "role": roleName
	                    }

	                };
	                return uds.deleteAssociates(caseNumber, jsonAssociates);
	            }
	        },
	        comments: {
	            get: function get(caseNumber) {
	                return uds.fetchCaseComments(caseNumber);
	            },
	            post: {
	                private: function _private(caseNumber, commentText, hoursWorked) {
	                    return uds.postPrivateComments(caseNumber, commentText, hoursWorked);
	                },
	                public: function _public(caseNumber, commentText, doNotChangeSbt, hoursWorked) {
	                    return uds.postPublicComments(caseNumber, commentText, doNotChangeSbt, hoursWorked);
	                }
	            },
	            put: {
	                private: function _private(caseNumber, commentText, caseCommentId, draft) {
	                    return uds.postEditPrivateComments(caseNumber, commentText, caseCommentId, draft);
	                },
	                public: function _public(caseNumber, commentText, caseCommentId, draft) {
	                    return uds.postPvtToPubComments(caseNumber, commentText, caseCommentId, draft);
	                }
	            }
	        },
	        history: {
	            get: function get(caseNumber) {
	                return uds.fetchCaseHistory(caseNumber);
	            }
	        },
	        resourceLinks: {
	            get: function get(solutionIdQuery) {
	                return uds.fetchSolutionDetails(solutionIdQuery);
	            },
	            update: function update(caseNumber, resourceLink) {
	                return uds.updateResourceLink(caseNumber, resourceLink);
	            }
	        },
	        lock: {
	            get: function get(caseNumber) {
	                return uds.getlock(caseNumber);
	            },
	            remove: function remove(caseNumber) {
	                return uds.releaselock(caseNumber);
	            }
	        },
	        calls: {
	            get: function get(caseNumber) {
	                return uds.getCallLogsForCase(caseNumber);
	            }
	        },
	        sbt: {
	            get: function get(uql) {
	                return uds.fetchCases(uql, null, null, null, true);
	            }
	        },
	        sbrs: {
	            add: function add(caseNumber, sbrArray) {
	                return uds.addCaseSbrs(caseNumber, sbrArray);
	            },
	            remove: function remove(caseNumber, sbrArray) {
	                return uds.removeCaseSbrs(caseNumber, sbrArray);
	            }
	        },
	        tags: {
	            get: function get() {
	                return uds.getCaseTagsList();
	            },
	            add: function add(caseNumber, tagsArray) {
	                return uds.addCaseTags(caseNumber, tagsArray);
	            },
	            remove: function remove(caseNumber, tagsArray) {
	                return uds.removeCaseTags(caseNumber, tagsArray);
	            }
	        },
	        additionalContacts: {
	            get: function get(caseNumber) {
	                return uds.getAdditionalContacts(caseNumber);
	            },
	            remove: function remove(caseNumber, contacts) {
	                return uds.removeAdditionalContacts(caseNumber, contacts);
	            },
	            put: function put(caseNumber, contacts) {
	                return uds.addAdditionalContacts(caseNumber, contacts);
	            }
	        },
	        owner: {
	            update: function update(caseNumber, ownerSSO) {
	                return uds.updateCaseOwner(caseNumber, ownerSSO);
	            }
	        },
	        attachments: {
	            update: function update(caseNumber, attachmentId, attachmentDetails) {
	                return uds.updateCaseAttachment(caseNumber, attachmentId, attachmentDetails);
	            }
	        }
	    };
	    // This is not to be confused with kase.comments.  This top level comments object allows you to query
	    // /case/comments with custom UQL
	    this.comments = {
	        get: function get(uql) {
	            return uds.fetchComments(uql);
	        }
	    };
	    this.account = {
	        get: function get(accountNumber) {
	            return uds.fetchAccountDetails(accountNumber);
	        },
	        notes: function notes(accountNumber) {
	            return uds.fetchAccountNotes(accountNumber);
	        },
	        openCases: function openCases(uql) {
	            return uds.getOpenCasesForAccount(uql);
	        },
	        avgCSAT: {
	            get: function get(uql) {
	                return uds.getAvgCSATForAccount(uql);
	            }
	        },
	        getCaseContacts: function getCaseContacts(accountNumber) {
	            return uds.getCaseContactsForAccount(accountNumber);
	        },
	        getCaseGroups: function getCaseGroups(contactSSO) {
	            return uds.getCaseGroupsForContact(contactSSO);
	        },
	        rmeCount: {
	            get: function get(uql) {
	                return uds.getRMECountForAccount(uql);
	            }
	        }
	    };
	    this.user = {
	        get: function get(uql, resourceProjection) {
	            return uds.fetchUser(uql, resourceProjection);
	        },
	        details: function details(ssoUsername) {
	            return uds.fetchUserDetails(ssoUsername);
	        },
	        languages: {
	            add: function add(userId, language, type) {
	                return uds.addLanguageToUser(userId, language, type);
	            },
	            remove: function remove(userId, query) {
	                return uds.removeLanguagesFromUser(userId, query);
	            }
	        },
	        tags: {
	            add: function add(userId, tagName) {
	                return uds.addTagToUser(userId, tagName);
	            },
	            remove: function remove(userId, query) {
	                return uds.removeTagsFromUser(userId, query);
	            }
	        },
	        queueBuddies: {
	            setAsQB: function setAsQB(qbUserId, userId) {
	                return uds.addUserAsQB(qbUserId, userId);
	            },
	            remove: function remove(qbUserId, query) {
	                return uds.removeUserQBs(qbUserId, query);
	            }
	        },
	        nnoRegions: {
	            add: function add(userId, nnoRegion) {
	                return uds.addNNOToUser(userId, nnoRegion);
	            },
	            remove: function remove(userId, query) {
	                return uds.removeNNOsFromUser(userId, query);
	            }
	        },
	        virtualOffice: {
	            setGbdSuperRegion: function setGbdSuperRegion(userId, value) {
	                return uds.setGbdSuperRegion(userId, value);
	            }
	        },
	        outOfOffice: {
	            set: function set(userId, value) {
	                return uds.setOutOfOfficeflag(userId, value);
	            }
	        }
	    };
	    this.cqi = {
	        // Run UQL against the CQI endpoint
	        get: function get(uql) {
	            return uds.getCQIs(uql);
	        },
	        questions: {
	            get: function get(caseNumber) {
	                return uds.getCQIQuestions(caseNumber);
	            }
	        },
	        score: {
	            put: function put(caseNumber, reviewData) {
	                return uds.postCQIScore(caseNumber, reviewData);
	            }
	        }
	    };
	    this.reviews = {
	        dependencies: {
	            get: function get() {
	                return uds.getQuestionDependencies();
	            }
	        }
	    };
	    this.solution = {
	        details: {
	            get: function get(solutionNumber, resourceProjection) {
	                return uds.getSolutionDetails(solutionNumber, resourceProjection);
	            }
	        },
	        sqi: {
	            questions: {
	                get: function get(solutionNumber) {
	                    return uds.getSQIQuestions(solutionNumber);
	                }
	            },
	            score: {
	                put: function put(solutionNumber, reviewData) {
	                    return uds.postSQIScore(solutionNumber, reviewData);
	                }
	            },
	            // Run UQL against the SQI endpoint
	            get: function get(uql) {
	                return uds.getSQIs(uql);
	            }
	        },
	        pinSolution: function pinSolution(caseNumber, solutionJson) {
	            return uds.pinSolutionToCase(caseNumber, solutionJson);
	        }
	    };
	    this.sbr = {
	        list: function list(resourceProjection, query) {
	            return uds.getSbrList(resourceProjection, query);
	        },
	        removeUserSbr: function removeUserSbr(userId, query) {
	            return uds.removeUserSbr(userId, query);
	        },
	        user: {
	            put: function put(userId, uql, data) {
	                return uds.postAddUsersToSBR(userId, uql, data);
	            }
	        }
	    };
	    this.roles = {
	        list: function list(query) {
	            return uds.getRoleList(query);
	        },
	        roleDetails: function roleDetails(roleId) {
	            return uds.getRoleDetails(roleId);
	        },
	        listAllRoles: function listAllRoles(query) {
	            return uds.getAllRolesList(query);
	        },
	        createRole: function createRole(roleDetails) {
	            return uds.createRole(roleDetails);
	        },
	        updateRole: function updateRole(roleId, rolePayload) {
	            return uds.updateRole(roleId, rolePayload);
	        },
	        deleteRole: function deleteRole(roleId) {
	            return uds.deleteRole(roleId);
	        },
	        removeUserRole: function removeUserRole(userId, query) {
	            return uds.removeUserRole(userId, query);
	        },
	        postRoleLevel: function postRoleLevel(userId, roleName, roleLevel) {
	            return uds.postRoleLevel(userId, roleName, roleLevel);
	        },
	        user: {
	            put: function put(userId, uql, data) {
	                return uds.postAddUsersToRole(userId, uql, data);
	            },
	            update: function update(userId, role) {
	                return uds.updateUserRole(userId, role);
	            }
	        },
	        templates: {
	            list: function list(query) {
	                return uds.fetchPriorityTemplates(query);
	            }
	        }
	    };
	    this.solr = {
	        access: {
	            get: function get(query) {
	                return uds.fetchSolr(query).then(function (response) {
	                    if (typeof response === 'string') return JSON.parse(response);

	                    return response;
	                });
	            }
	        },
	        cases: {
	            get: function get(query) {
	                return uds.fetchCaseSolr(query).then(function (response) {
	                    if (typeof response === 'string') return JSON.parse(response);

	                    return response;
	                });
	            }
	        }

	    };
	    this.sfdc = {
	        user: {
	            get: function get(userID) {
	                return uds.getUserDetailsFromSFDC(userID);
	            },
	            put: function put(ssoUsername, data) {
	                return uds.updateUserDetailsInSFDC(ssoUsername, data);
	            }
	        },
	        callCenter: {
	            get: function get(callCenterId) {
	                return uds.getCallCenterFromSFDC(callCenterId);
	            }
	        }
	    };
	};

	exports.default = UdsService;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Services

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rhaUtils = __webpack_require__(39);

	var _rhaUtils2 = _interopRequireDefault(_rhaUtils);

	var _translate = __webpack_require__(41);

	var _translate2 = _interopRequireDefault(_translate);

	var _trust = __webpack_require__(33);

	var _trust2 = _interopRequireDefault(_trust);

	var _enter = __webpack_require__(25);

	var _enter2 = _interopRequireDefault(_enter);

	var _resizable = __webpack_require__(29);

	var _resizable2 = _interopRequireDefault(_resizable);

	var _choice = __webpack_require__(23);

	var _choice2 = _interopRequireDefault(_choice);

	var _optionsDisabled = __webpack_require__(28);

	var _optionsDisabled2 = _interopRequireDefault(_optionsDisabled);

	var _choicetree = __webpack_require__(24);

	var _choicetree2 = _interopRequireDefault(_choicetree);

	var _treeViewSelectorData = __webpack_require__(31);

	var _treeViewSelectorData2 = _interopRequireDefault(_treeViewSelectorData);

	var _treeViewSelectorUtils = __webpack_require__(32);

	var _treeViewSelectorUtils2 = _interopRequireDefault(_treeViewSelectorUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Define the ui-utils module


	// Factories


	// Filters
	var app = angular.module('RedhatAccess.ui-utils', ['gettext']);

	// Services


	// Directives
	app.service('RHAUtils', _rhaUtils2.default);
	app.service('translate', _translate2.default);

	// Filters
	app.filter('trust_html', _trust2.default);

	// Directives
	app.directive('rhaChoicetree', _choicetree2.default);
	app.directive('optionsDisabled', _optionsDisabled2.default);
	app.directive('rhaChoice', _choice2.default);
	app.directive('rhaResizable', _resizable2.default);
	app.directive('rhaEnter', _enter2.default);

	// Factories
	app.factory('TreeViewSelectorData', _treeViewSelectorData2.default);
	app.factory('TreeViewSelectorUtils', _treeViewSelectorUtils2.default);

	exports.default = app.name;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    loginSuccess: 'auth-login-success',
	    loginFailed: 'auth-login-failed',
	    logoutSuccess: 'auth-logout-success',
	    sessionTimeout: 'auth-session-timeout',
	    notAuthenticated: 'auth-not-authenticated',
	    notAuthorized: 'auth-not-authorized',
	    sessionIdChanged: 'sid-changed'
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = { verbose: true };

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    displayLoginStatus: true,
	    autoCheckLogin: true,
	    loginURL: '',
	    logoutURL: '',
	    forceLogin: false
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SecurityController = function SecurityController($scope, securityService, SECURITY_CONFIG) {
	    'ngInject';

	    _classCallCheck(this, SecurityController);

	    $scope.securityService = securityService;
	    if (SECURITY_CONFIG.autoCheckLogin) {
	        securityService.validateLogin(SECURITY_CONFIG.forceLogin);
	    }
	    $scope.displayLoginStatus = function () {
	        return SECURITY_CONFIG.displayLoginStatus;
	    };
	};
	SecurityController.$inject = ["$scope", "securityService", "SECURITY_CONFIG"];

	exports.default = SecurityController;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'AE',
	        scope: false,
	        template: __webpack_require__(9)
	    };
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Controllers

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _securityController = __webpack_require__(47);

	var _securityController2 = _interopRequireDefault(_securityController);

	var _loginStatus = __webpack_require__(48);

	var _loginStatus2 = _interopRequireDefault(_loginStatus);

	var _securityService = __webpack_require__(50);

	var _securityService2 = _interopRequireDefault(_securityService);

	var _authEvents = __webpack_require__(44);

	var _authEvents2 = _interopRequireDefault(_authEvents);

	var _loginViewConfig = __webpack_require__(45);

	var _loginViewConfig2 = _interopRequireDefault(_loginViewConfig);

	var _securityConfig = __webpack_require__(46);

	var _securityConfig2 = _interopRequireDefault(_securityConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Services
	var app = angular.module('RedhatAccess.security', ['ui.bootstrap', 'ui.router', 'RedhatAccess.header']).constant('AUTH_EVENTS', _authEvents2.default).value('LOGIN_VIEW_CONFIG', _loginViewConfig2.default).value('SECURITY_CONFIG', _securityConfig2.default);

	// Controllers


	// Constants


	// Directives
	app.controller('SecurityController', _securityController2.default);

	// Directives
	app.directive('rhaLoginstatus', _loginStatus2.default);

	// Services
	app.service('securityService', _securityService2.default);

	exports.default = app.name;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SecurityService = function SecurityService($rootScope, $uibModal, AUTH_EVENTS, $q, LOGIN_VIEW_CONFIG, SECURITY_CONFIG, strataService, AlertService, RHAUtils) {
	    'ngInject';

	    _classCallCheck(this, SecurityService);

	    this.loginStatus = {
	        isLoggedIn: false,
	        verifying: false,
	        userAllowedToManageCases: true,
	        authedUser: {}
	    };
	    this.loggingIn = false;
	    this.loginFailure = false;
	    this.loginURL = SECURITY_CONFIG.loginURL;
	    this.logoutURL = SECURITY_CONFIG.logoutURL;
	    this.setLoginStatus = function (isLoggedIn, verifying, authedUser) {
	        this.loginStatus.isLoggedIn = isLoggedIn;
	        this.loginStatus.verifying = verifying;
	        this.loginStatus.authedUser = authedUser;
	        this.loginStatus.authedUser.loggedInUser = authedUser.first_name + ' ' + authedUser.last_name;
	        RHAUtils.userTimeZone = authedUser.timezone;
	    };
	    this.clearLoginStatus = function () {
	        this.loginStatus.isLoggedIn = false;
	        this.loginStatus.verifying = false;
	        this.loginStatus.userAllowedToManageCases = false;
	        this.loginStatus.authedUser = {};
	        RHAUtils.userTimeZone = '';
	    };
	    this.setAccount = function (accountJSON) {
	        this.loginStatus.account = accountJSON;
	    };
	    this.modalDefaults = {
	        backdrop: 'static',
	        keyboard: true,
	        modalFade: true,
	        template: __webpack_require__(8),
	        windowClass: 'rha-login-modal'
	    };
	    this.modalOptions = {
	        closeButtonText: 'Close',
	        actionButtonText: 'OK',
	        headerText: 'Proceed?',
	        bodyText: 'Perform this action?',
	        backdrop: 'static'
	    };
	    this.userAllowedToManageCases = function () {
	        var canManage = false;
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.rights) && (this.loginStatus.authedUser.is_entitled || RHAUtils.isNotEmpty(this.loginStatus.authedUser.account))) {
	            for (var i = 0; i < this.loginStatus.authedUser.rights.right.length; i++) {
	                if (this.loginStatus.authedUser.rights.right[i].name === 'portal_manage_cases' && this.loginStatus.authedUser.rights.right[i].has_access === true) {
	                    canManage = true;
	                    break;
	                }
	            }
	        }
	        this.loginStatus.userAllowedToManageCases = canManage;
	    };
	    this.userAllowedToManageEmailNotifications = function (user) {
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && this.loginStatus.authedUser.org_admin) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    this.userAllowedToManageGroups = function (user) {
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && (!this.loginStatus.authedUser.account.has_group_acls || this.loginStatus.authedUser.account.has_group_acls && this.loginStatus.authedUser.org_admin)) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    this.userAllowedToManageDefaultGroups = function (user) {
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && this.loginStatus.authedUser.org_admin) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    this.fetchUserAccountContacts = function (user) {
	        var _this = this;

	        return strataService.accounts.users(user.account_number).then(function (accountContacts) {
	            _this.loginStatus.authedUser.accountContacts = accountContacts;
	        });
	    };
	    this.getBasicAuthToken = function () {
	        var defer = $q.defer();
	        var token = localStorage.getItem('rhAuthToken');
	        if (token !== undefined && token !== '') {
	            defer.resolve(token);
	            return defer.promise;
	        } else {
	            this.login().then(function (authedUser) {
	                defer.resolve(localStorage.getItem('rhAuthToken'));
	            }, function (error) {
	                defer.resolve(error);
	            });
	            return defer.promise;
	        }
	    };
	    this.initLoginStatus = function () {
	        var _this2 = this;

	        this.loggingIn = true;
	        this.loginFailure = false;
	        var defer = $q.defer();
	        // var wasLoggedIn = this.loginStatus.isLoggedIn;
	        this.loginStatus.verifying = true;
	        if (window.sessionjs != null && window.sessionjs.isAuthenticated() && RHAUtils.isNotEmpty(window.sessionjs.getUserInfo().account_number)) {
	            // JWT specific auth
	            var user = window.sessionjs.getUserInfo();
	            //load account
	            strata.addAccountNumber(user.account_number);
	            var accountPromise = strataService.accounts.get(user.account_number).then(function (account) {
	                _this2.loginStatus.account = account;
	            }).catch(function () {
	                _this2.loginStatus.account = null;
	            });

	            var userPromise = strataService.users.get(user.user_id);

	            var managedAccountsPromise = strataService.accounts.managedAccounts.get(user.account_number);
	            var managersForAccountPromise = strataService.accounts.accountManagers.get(user.account_number);

	            Promise.all([accountPromise, userPromise, managedAccountsPromise, managersForAccountPromise]).then(function (_ref) {
	                var _ref2 = _slicedToArray(_ref, 4),
	                    account = _ref2[0],
	                    authedUser = _ref2[1],
	                    managedAccounts = _ref2[2],
	                    accountManagers = _ref2[3];

	                // PCM-6964 hardcoded s_entitled = true when subscrition service is down
	                authedUser.is_entitled = true;
	                _this2.setLoginStatus(true, false, authedUser);
	                _this2.loginStatus.authedUser.account = _this2.loginStatus.account;
	                _this2.loginStatus.authedUser.managedAccounts = managedAccounts;
	                _this2.loginStatus.authedUser.accountManagers = accountManagers;
	                if (authedUser.is_internal || authedUser.org_admin) {
	                    _this2.fetchUserAccountContacts(authedUser);
	                }
	                _this2.userAllowedToManageCases();
	                _this2.loggingIn = false;
	                // if (wasLoggedIn === false) {
	                //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                // }
	                defer.resolve(_this2.loginStatus.authedUser.loggedInUser);
	            }).catch(function () {
	                _this2.clearLoginStatus();
	                _this2.loggingIn = false;
	                _this2.loginFailure = true;
	                defer.reject();
	            });
	        } else {
	            strataService.authentication.checkLogin().then(angular.bind(this, function (authedUser) {
	                var _this3 = this;

	                if (authedUser.account) {
	                    this.setAccount(authedUser.account);
	                    this.setLoginStatus(true, false, authedUser);
	                    this.userAllowedToManageCases();
	                    var promisesArray = [];
	                    var _managedAccountsPromise = strataService.accounts.managedAccounts.get(authedUser.account.number);
	                    var _managersForAccountPromise = strataService.accounts.accountManagers.get(authedUser.account.number);
	                    promisesArray.push(_managedAccountsPromise, _managersForAccountPromise);

	                    if (authedUser.is_internal || authedUser.org_admin) {
	                        var accountContactsPromise = strataService.accounts.users(authedUser.account.number);
	                        promisesArray.push(accountContactsPromise);
	                    }
	                    Promise.all(promisesArray).then(function (response) {
	                        _this3.loginStatus.authedUser.managedAccounts = response[0];
	                        _this3.loginStatus.authedUser.accountManagers = response[1];
	                        if (authedUser.is_internal || authedUser.org_admin) {
	                            _this3.loginStatus.authedUser.accountContacts = response[2];
	                        }
	                        _this3.loggingIn = false;
	                        //We don't want to resend the AUTH_EVENTS.loginSuccess if we are already logged in
	                        // if (wasLoggedIn === false) {
	                        //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                        // }
	                        defer.resolve(authedUser.loggedInUser);
	                    }).catch(function () {
	                        _this3.clearLoginStatus();
	                        AlertService.addStrataErrorMessage(error);
	                        _this3.loggingIn = false;
	                        defer.reject(error);
	                    });
	                } else {
	                    this.loginFailure = true;
	                    this.clearLoginStatus();
	                    this.loggingIn = false;
	                    defer.reject();
	                }
	            }), angular.bind(this, function (error) {
	                this.loginFailure = true;
	                this.clearLoginStatus();
	                AlertService.addStrataErrorMessage(error);
	                this.loggingIn = false;

	                defer.reject(error);
	            }));
	        }
	        return defer.promise;
	    };
	    this.validateLogin = function (forceLogin) {
	        var defer = $q.defer();
	        //var that = this;
	        if (!forceLogin) {
	            this.initLoginStatus().then(function (username) {
	                defer.resolve(username);
	            }, function (error) {
	                defer.reject(error);
	            });
	            return defer.promise;
	        } else {
	            this.initLoginStatus().then(function (username) {
	                defer.resolve(username);
	            }, function (error) {
	                this.login().then(function (authedUser) {
	                    defer.resolve(authedUser.loggedInUser);
	                }, function (error) {
	                    defer.reject(error);
	                });
	            });
	            return defer.promise;
	        }
	    };
	    this.login = function () {
	        return this.showLogin(this.modalDefaults, this.modalOptions);
	    };
	    this.logout = function () {
	        strataService.authentication.logout();
	        this.clearLoginStatus();
	        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	    };
	    this.showLogin = function (customModalDefaults, customModalOptions) {
	        //var that = this;
	        //Create temp objects to work with since we're in a singleton service
	        var tempModalDefaults = {};
	        var tempModalOptions = {};
	        //Map angular-ui modal custom defaults to modal defaults defined in service
	        angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);
	        //Map modal.html $scope custom properties to defaults defined in service
	        angular.extend(tempModalOptions, this.modalOptions, customModalOptions);
	        if (!tempModalDefaults.controller) {
	            tempModalDefaults.controller = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
	                $scope.user = {
	                    user: null,
	                    password: null
	                };
	                $scope.status = {
	                    authenticating: false
	                };
	                $scope.useVerboseLoginView = LOGIN_VIEW_CONFIG.verbose;
	                $scope.modalOptions = tempModalOptions;
	                $scope.modalOptions.ok = function (result) {
	                    //Hack below is needed to handle autofill issues
	                    //@see https://github.com/angular/angular.js/issues/1460
	                    //BEGIN HACK
	                    $scope.status.authenticating = true;
	                    $scope.user.user = $('#rha-login-user-id').val();
	                    $scope.user.password = $('#rha-login-password').val();
	                    //END HACK
	                    var resp = strataService.authentication.setCredentials($scope.user.user, $scope.user.password);
	                    if (resp) {
	                        this.initLoginStatus().then(function (authedUser) {
	                            $scope.user.password = '';
	                            $scope.authError = null;
	                            try {
	                                $uibModalInstance.close(authedUser);
	                            } catch (err) {}
	                            $scope.status.authenticating = false;
	                        }, function (error) {
	                            if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
	                                $scope.$apply(function () {
	                                    $scope.authError = 'Login Failed!';
	                                });
	                            } else {
	                                $scope.authError = 'Login Failed!';
	                            }
	                            $scope.status.authenticating = false;
	                        });
	                    } else {
	                        $scope.authError = 'Login Failed!';
	                        $scope.status.authenticating = false;
	                    }
	                };
	                $scope.modalOptions.close = function () {
	                    $scope.status.authenticating = false;
	                    $uibModalInstance.dismiss('User Canceled Login');
	                };
	            }];
	        }
	        return $uibModal.open(tempModalDefaults).result;
	    };
	};
	SecurityService.$inject = ["$rootScope", "$uibModal", "AUTH_EVENTS", "$q", "LOGIN_VIEW_CONFIG", "SECURITY_CONFIG", "strataService", "AlertService", "RHAUtils"];

	exports.default = SecurityService;

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "<li class=\"rha-treeselector-node\">\n    <div>\n        <span class=\"icon\" ng-class=\"{collapsed: choice.collapsed, expanded: !choice.collapsed}\" ng-show=\"choice.children.length > 0\" ng-click=\"choice.collapsed = !choice.collapsed\">\n        </span>\n        <span class=\"label\" ng-if=\"choice.children.length > 0\" ng-class=\"folder\">{{choice.name}}\n        </span>\n        <span class=\"label\" ng-if=\"choice.children.length === 0\"  ng-click=\"choiceClicked(choice)\">\n            <input type=\"checkbox\" ng-checked=\"choice.checked\">{{choice.name}}\n        </span>\n    </div>\n</li>"

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["uds"] = factory();
		else
			root["uds"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
		    if (true) {
		        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		    } else if (typeof exports !== "undefined") {
		        factory(exports, require('jsuri'));
		    } else {
		        var mod = {
		            exports: {}
		        };
		        factory(mod.exports, global.jsuri);
		        global.uds = mod.exports;
		    }
		})(this, function (exports, Uri) {
		    'use strict';

		    Object.defineProperty(exports, "__esModule", {
		        value: true
		    });
		    exports.fetchCaseDetails = fetchCaseDetails;
		    exports.fetchCaseComments = fetchCaseComments;
		    exports.fetchComments = fetchComments;
		    exports.fetchCaseAssociateDetails = fetchCaseAssociateDetails;
		    exports.getlock = getlock;
		    exports.releaselock = releaselock;
		    exports.fetchAccountDetails = fetchAccountDetails;
		    exports.fetchAccountNotes = fetchAccountNotes;
		    exports.fetchUserDetails = fetchUserDetails;
		    exports.fetchUser = fetchUser;
		    exports.fetchCases = fetchCases;
		    exports.generateBomgarSessionKey = generateBomgarSessionKey;
		    exports.postPublicComments = postPublicComments;
		    exports.postPrivateComments = postPrivateComments;
		    exports.updateCaseDetails = updateCaseDetails;
		    exports.updateCaseOwner = updateCaseOwner;
		    exports.fetchCaseHistory = fetchCaseHistory;
		    exports.getCQIQuestions = getCQIQuestions;
		    exports.getCQIs = getCQIs;
		    exports.postCQIScore = postCQIScore;
		    exports.getSolutionDetails = getSolutionDetails;
		    exports.getSQIQuestions = getSQIQuestions;
		    exports.getSQIs = getSQIs;
		    exports.postSQIScore = postSQIScore;
		    exports.getSbrList = getSbrList;
		    exports.fetchCaseSbrs = fetchCaseSbrs;
		    exports.fetchCaseSbrsExternal = fetchCaseSbrsExternal;
		    exports.pinSolutionToCase = pinSolutionToCase;
		    exports.removeUserSbr = removeUserSbr;
		    exports.getRoleList = getRoleList;
		    exports.getRoleDetails = getRoleDetails;
		    exports.removeUserRole = removeUserRole;
		    exports.updateUserRole = updateUserRole;
		    exports.postAddUsersToSBR = postAddUsersToSBR;
		    exports.postAddUsersToRole = postAddUsersToRole;
		    exports.getOpenCasesForAccount = getOpenCasesForAccount;
		    exports.getCallLogsForCase = getCallLogsForCase;
		    exports.getQuestionDependencies = getQuestionDependencies;
		    exports.postRoleLevel = postRoleLevel;
		    exports.postEditPrivateComments = postEditPrivateComments;
		    exports.postPvtToPubComments = postPvtToPubComments;
		    exports.createCaseNep = createCaseNep;
		    exports.updateCaseNep = updateCaseNep;
		    exports.removeCaseNep = removeCaseNep;
		    exports.getAvgCSATForAccount = getAvgCSATForAccount;
		    exports.getCaseContactsForAccount = getCaseContactsForAccount;
		    exports.getCaseGroupsForContact = getCaseGroupsForContact;
		    exports.getRMECountForAccount = getRMECountForAccount;
		    exports.addAssociates = addAssociates;
		    exports.deleteAssociates = deleteAssociates;
		    exports.fetchSolutionDetails = fetchSolutionDetails;
		    exports.setHandlingSystem = setHandlingSystem;
		    exports.fetchKCSFromDrupal = fetchKCSFromDrupal;
		    exports.fetchSolr = fetchSolr;
		    exports.fetchCaseSolr = fetchCaseSolr;
		    exports.addCaseSbrs = addCaseSbrs;
		    exports.removeCaseSbrs = removeCaseSbrs;
		    exports.getAllRolesList = getAllRolesList;
		    exports.createRole = createRole;
		    exports.updateRole = updateRole;
		    exports.deleteRole = deleteRole;
		    exports.getAdditionalContacts = getAdditionalContacts;
		    exports.removeAdditionalContacts = removeAdditionalContacts;
		    exports.addAdditionalContacts = addAdditionalContacts;
		    exports.getBrmsResponse = getBrmsResponse;
		    exports.fetchTopCasesFromSolr = fetchTopCasesFromSolr;
		    exports.getUserDetailsFromSFDC = getUserDetailsFromSFDC;
		    exports.updateUserDetailsInSFDC = updateUserDetailsInSFDC;
		    exports.getCallCenterFromSFDC = getCallCenterFromSFDC;
		    exports.getCaseTagsList = getCaseTagsList;
		    exports.addCaseTags = addCaseTags;
		    exports.removeCaseTags = removeCaseTags;
		    exports.fetchPriorityTemplates = fetchPriorityTemplates;
		    exports.fetchCaseLanguages = fetchCaseLanguages;
		    exports.fetchBugzillas = fetchBugzillas;
		    exports.fetchBugzillaComments = fetchBugzillaComments;
		    exports.addLanguageToUser = addLanguageToUser;
		    exports.removeLanguagesFromUser = removeLanguagesFromUser;
		    exports.addTagToUser = addTagToUser;
		    exports.removeTagsFromUser = removeTagsFromUser;
		    exports.addUserAsQB = addUserAsQB;
		    exports.removeUserQBs = removeUserQBs;
		    exports.addNNOToUser = addNNOToUser;
		    exports.removeNNOsFromUser = removeNNOsFromUser;
		    exports.setGbdSuperRegion = setGbdSuperRegion;
		    exports.setOutOfOfficeflag = setOutOfOfficeflag;
		    exports.updateResourceLink = updateResourceLink;
		    exports.updateNightShiftForUser = updateNightShiftForUser;
		    exports.updateCaseAttachment = updateCaseAttachment;


		    var udsHostName = new Uri('https://unified-ds-ci.gsslab.brq.redhat.com/');

		    if (window.location.hostname === 'access.redhat.com' || window.location.hostname === 'prod.foo.redhat.com' || window.location.hostname === 'fooprod.redhat.com' || window.location.hostname === 'skedge.redhat.com') {
		        udsHostName = new Uri('https://unified-ds.gsslab.rdu2.redhat.com/');
		    } else {
		        if (window.location.hostname === 'access.qa.redhat.com' || window.location.hostname === 'qa.foo.redhat.com' || window.location.hostname === 'fooqa.redhat.com' || window.location.hostname === 'skedge.qa.redhat.com') {
		            udsHostName = new Uri('https://unified-ds-qa.gsslab.pnq2.redhat.com/');
		        } else {
		            if (window.location.hostname === 'access.devgssci.devlab.phx1.redhat.com' || window.location.hostname === 'ci.foo.redhat.com' || window.location.hostname === 'fooci.redhat.com' || window.location.hostname === 'skedge.ci.redhat.com') {
		                udsHostName = new Uri('https://unified-ds-ci.gsslab.brq.redhat.com/');
		            } else {
		                if (window.location.hostname === 'access.stage.redhat.com' || window.location.hostname === 'stage.foo.redhat.com' || window.location.hostname === 'foostage.redhat.com' || window.location.hostname === 'skedge.stage.redhat.com') {
		                    udsHostName = new Uri('https://unified-ds-stage.gsslab.pnq2.redhat.com/');
		                }
		            }
		        }
		    }

		    if (localStorage && localStorage.getItem('udsHostname')) {
		        udsHostName = localStorage.getItem('udsHostname');
		    }

		    var baseAjaxParams = {
		        accepts: {
		            jsonp: 'application/json, text/json'
		        },
		        crossDomain: true,
		        type: 'GET',
		        method: 'GET',
		        //beforeSend: function(xhr) {
		        //    xhr.setRequestHeader('X-Omit', 'WWW-Authenticate');
		        //    //xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent('<username>' + ':' + '<password>'))))
		        //},
		        //headers: {
		        //    Accept: 'application/json, text/json'
		        //},
		        xhrFields: {
		            withCredentials: true
		        },
		        data: {},
		        dataType: ''
		    };

		    // If the token is expiring within 60 seconds, go ahead and refresh it.  Using 60 seconds considering jwt.js checks if
		    // the token needs to be refreshed every 60 seconds with a TTE of 90 seconds.  So 60 seconds guarantees that
		    // we are at the boundary of what jwt.js does without overlapping a great deal
		    function isTokenExpired() {
		        return window.sessionjs && window.sessionjs.isTokenExpired();
		    }

		    function forceTokenRefresh() {
		        console.warn('Udsjs detected the JWT token has expired, forcing an update');
		        // updateToken(true) forces the token to update by passing -1 to keycloak.updateToken
		        return window.sessionjs.updateToken(true);
		    }

		    function getToken() {
		        if (window.sessionjs && window.sessionjs._state.keycloak.token) {
		            if (window.sessionjs.isAuthenticated()) {
		                return window.sessionjs._state.keycloak.token;
		            }
		        }
		        return null;
		    }

		    var executeUdsAjaxCall = function executeUdsAjaxCall(url, httpMethod) {
		        return new Promise(function (resolve, reject) {
		            return $.ajax($.extend({}, baseAjaxParams, {
		                url: url,
		                type: httpMethod,
		                method: httpMethod,
		                beforeSend: function beforeSend(xhr) {
		                    if (getToken()) {
		                        xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
		                    } else {
		                        console.warn('Could not set JWT token on request, unauthenticated.');
		                    }
		                },
		                success: function success(response, status, xhr) {
		                    return resolve(xhr.status === 204 ? null : response);
		                },
		                error: function error(xhr, status, errorThrown) {
		                    reject(xhr);
		                }
		            }));
		        });
		        return Promise.resolve();
		    };

		    var executeUdsAjaxCallWithJwt = function executeUdsAjaxCallWithJwt(url, httpMethod) {
		        return new Promise(function (resolve, reject) {
		            if (isTokenExpired()) {
		                forceTokenRefresh().success(function () {
		                    executeUdsAjaxCall(url, httpMethod).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                }).error(function () {
		                    // Even if there was an error updating the token, we still need to hit udsjs, which at this point would probably return the "JWT expired" though this edge case is very unlikely.
		                    console.warn('Udsjs unable to force an update of the JWT token.');
		                    executeUdsAjaxCall(url, httpMethod).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                });
		            } else {
		                // Else we have a valid token and continue as always.
		                executeUdsAjaxCall(url, httpMethod).then(function (response) {
		                    return resolve(response);
		                }).catch(function (error) {
		                    return reject(error);
		                });
		            }
		        });
		    };

		    var executeUdsAjaxCallUnAuthed = function executeUdsAjaxCallUnAuthed(url, httpMethod) {
		        return new Promise(function (resolve, reject) {
		            return $.ajax($.extend({}, baseAjaxParams, {
		                url: url,
		                type: httpMethod,
		                method: httpMethod,
		                xhrFields: {
		                    withCredentials: false
		                },
		                success: function success(response, status, xhr) {
		                    return resolve(xhr.status === 204 ? null : response);
		                },
		                error: function error(xhr, status) {
		                    return reject(xhr);
		                }
		            }));
		        });
		        return Promise.resolve();
		    };

		    var executeUdsAjaxCallWithData = function executeUdsAjaxCallWithData(url, data, httpMethod, dataType) {
		        return new Promise(function (resolve, reject) {
		            return $.ajax($.extend({}, baseAjaxParams, {
		                url: url,
		                data: JSON.stringify(data),
		                contentType: 'application/json',
		                type: httpMethod,
		                method: httpMethod,
		                beforeSend: function beforeSend(xhr) {
		                    // xhr.setRequestHeader('X-Omit', 'WWW-Authenticate');
		                    if (window.sessionjs && window.sessionjs.isAuthenticated() && window.sessionjs._state.keycloak.token) {
		                        xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionjs._state.keycloak.token);
		                    }
		                },
		                dataType: dataType || '',
		                success: function success(response, status, xhr) {
		                    return resolve(xhr.status === 204 ? null : response);
		                },
		                error: function error(xhr, status) {
		                    return reject(xhr);
		                }
		            }));
		        });
		    };

		    var executeUdsAjaxCallWithDataWithJwt = function executeUdsAjaxCallWithDataWithJwt(url, data, httpMethod, dataType) {
		        return new Promise(function (resolve, reject) {
		            if (isTokenExpired()) {
		                forceTokenRefresh().success(function () {
		                    executeUdsAjaxCallWithData(url, data, httpMethod, dataType).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                }).error(function () {
		                    // Even if there was an error updating the token, we still need to hit udsjs, which at this point would probably return the "JWT expired" though this edge case is very unlikely.
		                    console.warn('Udsjs unable to force an update of the JWT token.');
		                    executeUdsAjaxCallWithData(url, data, httpMethod, dataType).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                });
		            } else {
		                // Else we have a valid token and continue as always.
		                executeUdsAjaxCallWithData(url, data, httpMethod, dataType).then(function (response) {
		                    return resolve(response);
		                }).catch(function (error) {
		                    return reject(error);
		                });
		            }
		        });
		    };

		    function fetchCaseDetails(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseComments(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchComments(uql) {
		        var url = udsHostName.clone().setPath('/case/comments').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseAssociateDetails(uql) {
		        var url = udsHostName.clone().setPath('/case/associates').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    //hold the lock on the case
		    function getlock(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/lock");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    //release the lock on the case
		    function releaselock(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/lock");
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function fetchAccountDetails(accountNumber, resourceProjection) {

		        var url = udsHostName.clone().setPath('/account/' + accountNumber);
		        if (resourceProjection != null) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        } else {
		            url.addQueryParam('resourceProjection', 'Minimal');
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchAccountNotes(accountNumber) {
		        var url = udsHostName.clone().setPath('/account/' + accountNumber + '/notes');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchUserDetails(ssoUsername) {
		        var url = udsHostName.clone().setPath('/user/') + ssoUsername;
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchUser(userUql, resourceProjection) {
		        var url = udsHostName.clone().setPath('/user').addQueryParam('where', userUql);
		        if (resourceProjection != null) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCases(uql, resourceProjection, limit, sortOption, statusOnly, nepUql) {
		        var path = '/case';
		        if (statusOnly) {
		            path = '/case/list-status-only';
		        }
		        var url = udsHostName.clone().setPath(path).addQueryParam('where', uql);
		        if (nepUql != null) {
		            url.addQueryParam('nepWhere', nepUql);
		        }
		        if (resourceProjection != null) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        } else {
		            url.addQueryParam('resourceProjection', 'Minimal');
		        }
		        if (limit != null) {
		            url.addQueryParam('limit', limit);
		        }
		        if (sortOption != null) {
		            url.addQueryParam('orderBy', sortOption);
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function generateBomgarSessionKey(caseId) {
		        var url = udsHostName.clone().setPath('/case/' + caseId + '/remote-session-key');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postPublicComments(caseNumber, caseComment, doNotChangeSbt, hoursWorked) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/public");
		        if (hoursWorked !== undefined) {
		            url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/public/hoursWorked/" + hoursWorked);
		        }
		        if (doNotChangeSbt) {
		            url.addQueryParam('doNotChangeSbt', doNotChangeSbt);
		        }
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'POST');
		    }

		    function postPrivateComments(caseNumber, caseComment, hoursWorked) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/private");
		        if (hoursWorked === undefined) {
		            url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/private");
		        } else {
		            url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/private/hoursWorked/" + hoursWorked);
		        }
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'POST');
		    }

		    function updateCaseDetails(caseNumber, caseDetails) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber);
		        return executeUdsAjaxCallWithDataWithJwt(url, caseDetails, 'PUT');
		    }

		    function updateCaseOwner(caseNumber, ownerSSO) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/owner/' + ownerSSO);
		        return executeUdsAjaxCallWithJwt(url, 'PUT');
		    }

		    function fetchCaseHistory(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/history");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCQIQuestions(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/reviews/questions');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    // Allows for UQL for fetching CQIs
		    function getCQIs(uql) {
		        var url = udsHostName.clone().setPath('/case/reviews').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postCQIScore(caseNumber, reviewData) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/reviews');
		        return executeUdsAjaxCallWithDataWithJwt(url, reviewData, 'POST');
		    }

		    function getSolutionDetails(solutionNumber, resourceProjection) {
		        var url = udsHostName.clone().setPath('/documentation/solution/' + solutionNumber);
		        if (resourceProjection !== undefined) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getSQIQuestions(solutionNumber) {
		        var url = udsHostName.clone().setPath('/documentation/solution/' + solutionNumber + '/reviews/questions');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    // Allows for UQL for fetching SQIs
		    function getSQIs(uql) {
		        var url = udsHostName.clone().setPath('/documentation/solution/reviews').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postSQIScore(solutionNumber, reviewData) {
		        var url = udsHostName.clone().setPath('/documentation/solution/' + solutionNumber + '/reviews');
		        return executeUdsAjaxCallWithDataWithJwt(url, reviewData, 'POST');
		    }

		    function getSbrList(resourceProjection, query) {
		        var url = udsHostName.clone().setPath('/user/metadata/sbrs');
		        url.addQueryParam('resourceProjection', resourceProjection);
		        url.addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseSbrs() {
		        var url = udsHostName.clone().setPath('/case/sbrs');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    // Unauthed sbrs
		    function fetchCaseSbrsExternal() {
		        var url = udsHostName.clone().setPath('/external/case/sbrs');
		        return executeUdsAjaxCallUnAuthed(url, 'GET');
		    }

		    function pinSolutionToCase(caseNumber, solutionJson) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber);
		        return executeUdsAjaxCallWithDataWithJwt(url, solutionJson, 'PUT');
		    }

		    function removeUserSbr(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/sbr').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function getRoleList(query) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles');
		        url.addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getRoleDetails(roleId) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/' + roleId);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function removeUserRole(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/role').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function updateUserRole(userId, role) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/role/' + role.externalModelId);
		        return executeUdsAjaxCallWithDataWithJwt(url, role.resource, 'PUT');
		    }

		    function postAddUsersToSBR(userId, uql, data) {
		        if (uql == null || uql == undefined || uql === '') {
		            throw 'User Query is mandatory';
		        }
		        var url = udsHostName.clone().setPath('/user/' + userId + '/sbr').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithDataWithJwt(url, data, 'POST');
		    }

		    function postAddUsersToRole(userId, uql, data) {
		        if (uql == null || uql == undefined || uql === '') {
		            throw 'User Query is mandatory';
		        }
		        var url = udsHostName.clone().setPath('/user/' + userId + '/role').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithDataWithJwt(url, data, 'POST');
		    }

		    function getOpenCasesForAccount(uql) {
		        var path = '/case';
		        var url = udsHostName.clone().setPath(path).addQueryParam('where', uql);
		        url.addQueryParam('resourceProjection', 'Minimal');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCallLogsForCase(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/calls");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getQuestionDependencies() {
		        var path = '/case/ktquestions';
		        var url = udsHostName.clone().setPath(path);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postRoleLevel(userId, roleName, roleLevel) {
		        var url = udsHostName.clone().setPath('/user/' + userId + "/role-level/" + roleName);
		        return executeUdsAjaxCallWithDataWithJwt(url, roleLevel, 'PUT');
		    }

		    function postEditPrivateComments(caseNumber, caseComment, caseCommentId, draft) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/" + caseCommentId + "/private");
		        url.addQueryParam('draft', draft);
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'PUT');
		    }

		    function postPvtToPubComments(caseNumber, caseComment, caseCommentId, draft) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/" + caseCommentId + "/public");
		        url.addQueryParam('draft', draft);
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'PUT');
		    }

		    function createCaseNep(caseNumber, nep) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/nep");
		        return executeUdsAjaxCallWithDataWithJwt(url, nep, 'POST');
		    }

		    function updateCaseNep(caseNumber, nep) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/nep");
		        return executeUdsAjaxCallWithDataWithJwt(url, nep, 'PUT');
		    }

		    function removeCaseNep(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/nep");
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function getAvgCSATForAccount(uql) {
		        var url = udsHostName.clone().setPath('/metrics/CsatAccountAvg').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCaseContactsForAccount(accountNumber) {
		        var url = udsHostName.clone().setPath('/account/' + accountNumber + "/contacts");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCaseGroupsForContact(contactSSO) {
		        var url = udsHostName.clone().setPath('/case/casegroups/user/' + contactSSO);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getRMECountForAccount(uql) {
		        var url = udsHostName.clone().setPath('/case/history').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addAssociates(caseNumber, jsonAssociates) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/associate");
		        return executeUdsAjaxCallWithDataWithJwt(url, jsonAssociates, 'POST');
		    }

		    function deleteAssociates(caseNumber, jsonAssociates) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/associate");
		        return executeUdsAjaxCallWithDataWithJwt(url, jsonAssociates, 'DELETE');
		    }

		    function fetchSolutionDetails(solutionIdQuery) {
		        var url = udsHostName.clone().setPath('/documentation/solution').addQueryParam('where', solutionIdQuery);
		        url.addQueryParam('resourceProjection', 'Minimal');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function setHandlingSystem(caseNumber, handlingSystemArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/handlingsystems");
		        return executeUdsAjaxCallWithDataWithJwt(url, handlingSystemArray, 'PUT');
		    }

		    function fetchKCSFromDrupal(id) {
		        var url = udsHostName.clone().setPath('/documentation/drupalapi/' + id);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchSolr(query) {
		        if (query.q == null || query.q === '') throw 'SOLR Query is mandatory';

		        var url = udsHostName.clone().setPath('/solr');
		        url.addQueryParam('wt', 'json');
		        url.addQueryParam('q', query.q);
		        if (query.fq != null && query.fq !== '') {
		            url.addQueryParam('fq', query.fq);
		        }
		        if (query.start != null) {
		            url.addQueryParam('start', query.start);
		        }
		        if (query.rows != null) {
		            url.addQueryParam('rows', query.rows);
		        }
		        if (query.sort != null && query.sort !== '') {
		            url.addQueryParam('sort', query.sort);
		        }
		        if (query.fl != null && query.fl !== '') {
		            url.addQueryParam('fl', query.fl);
		        }

		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseSolr(query) {
		        if (query.q == null || query.q === '') throw 'SOLR Query is mandatory';

		        var url = udsHostName.clone().setPath('/solr/cases');
		        url.addQueryParam('wt', 'json');
		        url.addQueryParam('q', query.q);
		        if (query.fq != null && query.fq !== '') {
		            url.addQueryParam('fq', query.fq);
		        }
		        if (query.start != null) {
		            url.addQueryParam('start', query.start);
		        }
		        if (query.rows != null) {
		            url.addQueryParam('rows', query.rows);
		        }
		        if (query.sort != null && query.sort !== '') {
		            url.addQueryParam('sort', query.sort);
		        }
		        if (query.fl != null && query.fl !== '') {
		            url.addQueryParam('fl', query.fl);
		        }

		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addCaseSbrs(caseNumber, sbrArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/sbrs");
		        return executeUdsAjaxCallWithDataWithJwt(url, sbrArray, 'PUT');
		    }

		    function removeCaseSbrs(caseNumber, sbrArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/sbrs");
		        return executeUdsAjaxCallWithDataWithJwt(url, sbrArray, 'DELETE');
		    }

		    function getAllRolesList(query) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/query');
		        url.addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function createRole(roleDetails) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/add');
		        return executeUdsAjaxCallWithDataWithJwt(url, roleDetails, 'POST');
		    }

		    function updateRole(roleId, rolePayload) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/' + roleId);
		        return executeUdsAjaxCallWithDataWithJwt(url, rolePayload, 'PUT');
		    }

		    function deleteRole(roleId) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/' + roleId);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function getAdditionalContacts(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/contacts");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function removeAdditionalContacts(caseNumber, contacts) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/contacts");
		        return executeUdsAjaxCallWithDataWithJwt(url, contacts, 'DELETE');
		    }

		    function addAdditionalContacts(caseNumber, contacts) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/contacts");
		        return executeUdsAjaxCallWithDataWithJwt(url, contacts, 'PUT');
		    }

		    function getBrmsResponse(jsonObject) {
		        var url = udsHostName.clone().setPath('/brms');
		        return executeUdsAjaxCallWithDataWithJwt(url, jsonObject, 'POST', 'text');
		    }

		    function fetchTopCasesFromSolr(queryString) {
		        var url = udsHostName.clone().setPath('/solr?' + queryString);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getUserDetailsFromSFDC(userID) {
		        var url = udsHostName.clone().setPath('/salesforce/user/' + userID);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function updateUserDetailsInSFDC(ssoUsername, data) {
		        var url = udsHostName.clone().setPath('/user/salesforce/' + ssoUsername);
		        return executeUdsAjaxCallWithDataWithJwt(url, data, 'PUT');
		    }

		    function getCallCenterFromSFDC(callCenterId) {
		        var url = udsHostName.clone().setPath('/callcenter/' + callCenterId);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCaseTagsList() {
		        var url = udsHostName.clone().setPath('/case/tags');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addCaseTags(caseNumber, tagsArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/tags");
		        return executeUdsAjaxCallWithDataWithJwt(url, tagsArray, 'PUT');
		    }

		    function removeCaseTags(caseNumber, tagsArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/tags");
		        return executeUdsAjaxCallWithDataWithJwt(url, tagsArray, 'DELETE');
		    }

		    function fetchPriorityTemplates(uql) {
		        var url = udsHostName.clone().setPath('/user/metadata/templates');
		        url.addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseLanguages() {
		        var url = udsHostName.clone().setPath('/case/languages');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchBugzillas(uql) {
		        var url = udsHostName.clone().setPath('/bug');
		        url.addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchBugzillaComments(uql) {
		        var url = udsHostName.clone().setPath('/bug/comments');
		        url.addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addLanguageToUser(userId, language, type) {
		        if (type !== "primary" && type !== "secondary") type = "primary";
		        var url = udsHostName.clone().setPath('/user/' + userId + '/language/' + type + '/' + language);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeLanguagesFromUser(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/language').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function addTagToUser(userId, tagName) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/tag/' + tagName);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeTagsFromUser(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/tag').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function addUserAsQB(qbUserId, userId) {
		        var url = udsHostName.clone().setPath('/user/' + qbUserId + '/queuebuddy/' + userId);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeUserQBs(qbUserId, query) {
		        var url = udsHostName.clone().setPath('/user/' + qbUserId + '/queuebuddy').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function addNNOToUser(userId, nnoRegion) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/nnoregion/' + nnoRegion);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeNNOsFromUser(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/nnoregion').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function setGbdSuperRegion(userId, value) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/virtualoffice/' + value);
		        return executeUdsAjaxCallWithJwt(url, 'PUT');
		    }

		    function setOutOfOfficeflag(userId, value) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/out-of-office');
		        return executeUdsAjaxCallWithDataWithJwt(url, value, 'POST');
		    }

		    function updateResourceLink(caseNumber, resourceLink) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/resourcelink');
		        return executeUdsAjaxCallWithDataWithJwt(url, resourceLink, 'PUT');
		    }

		    function updateNightShiftForUser(userId, value) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/nightshift/' + value);
		        return executeUdsAjaxCallWithJwt(url, 'PUT');
		    }

		    function updateCaseAttachment(caseNumber, attachmentId, attachmentDetails) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/attachment/' + attachmentId);
		        return executeUdsAjaxCallWithDataWithJwt(url, attachmentDetails, 'PUT');
		    }
		});

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_RESULT__;/*!
		 * jsUri
		 * https://github.com/derek-watson/jsUri
		 *
		 * Copyright 2013, Derek Watson
		 * Released under the MIT license.
		 *
		 * Includes parseUri regular expressions
		 * http://blog.stevenlevithan.com/archives/parseuri
		 * Copyright 2007, Steven Levithan
		 * Released under the MIT license.
		 */

		 /*globals define, module */

		(function(global) {

		  var re = {
		    starts_with_slashes: /^\/+/,
		    ends_with_slashes: /\/+$/,
		    pluses: /\+/g,
		    query_separator: /[&;]/,
		    uri_parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		  };

		  /**
		   * Define forEach for older js environments
		   * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
		   */
		  if (!Array.prototype.forEach) {
		    Array.prototype.forEach = function(callback, thisArg) {
		      var T, k;

		      if (this == null) {
		        throw new TypeError(' this is null or not defined');
		      }

		      var O = Object(this);
		      var len = O.length >>> 0;

		      if (typeof callback !== "function") {
		        throw new TypeError(callback + ' is not a function');
		      }

		      if (arguments.length > 1) {
		        T = thisArg;
		      }

		      k = 0;

		      while (k < len) {
		        var kValue;
		        if (k in O) {
		          kValue = O[k];
		          callback.call(T, kValue, k, O);
		        }
		        k++;
		      }
		    };
		  }

		  /**
		   * unescape a query param value
		   * @param  {string} s encoded value
		   * @return {string}   decoded value
		   */
		  function decode(s) {
		    if (s) {
		        s = s.toString().replace(re.pluses, '%20');
		        s = decodeURIComponent(s);
		    }
		    return s;
		  }

		  /**
		   * Breaks a uri string down into its individual parts
		   * @param  {string} str uri
		   * @return {object}     parts
		   */
		  function parseUri(str) {
		    var parser = re.uri_parser;
		    var parserKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "isColonUri", "relative", "path", "directory", "file", "query", "anchor"];
		    var m = parser.exec(str || '');
		    var parts = {};

		    parserKeys.forEach(function(key, i) {
		      parts[key] = m[i] || '';
		    });

		    return parts;
		  }

		  /**
		   * Breaks a query string down into an array of key/value pairs
		   * @param  {string} str query
		   * @return {array}      array of arrays (key/value pairs)
		   */
		  function parseQuery(str) {
		    var i, ps, p, n, k, v, l;
		    var pairs = [];

		    if (typeof(str) === 'undefined' || str === null || str === '') {
		      return pairs;
		    }

		    if (str.indexOf('?') === 0) {
		      str = str.substring(1);
		    }

		    ps = str.toString().split(re.query_separator);

		    for (i = 0, l = ps.length; i < l; i++) {
		      p = ps[i];
		      n = p.indexOf('=');

		      if (n !== 0) {
		        k = decode(p.substring(0, n));
		        v = decode(p.substring(n + 1));
		        pairs.push(n === -1 ? [p, null] : [k, v]);
		      }

		    }
		    return pairs;
		  }

		  /**
		   * Creates a new Uri object
		   * @constructor
		   * @param {string} str
		   */
		  function Uri(str) {
		    this.uriParts = parseUri(str);
		    this.queryPairs = parseQuery(this.uriParts.query);
		    this.hasAuthorityPrefixUserPref = null;
		  }

		  /**
		   * Define getter/setter methods
		   */
		  ['protocol', 'userInfo', 'host', 'port', 'path', 'anchor'].forEach(function(key) {
		    Uri.prototype[key] = function(val) {
		      if (typeof val !== 'undefined') {
		        this.uriParts[key] = val;
		      }
		      return this.uriParts[key];
		    };
		  });

		  /**
		   * if there is no protocol, the leading // can be enabled or disabled
		   * @param  {Boolean}  val
		   * @return {Boolean}
		   */
		  Uri.prototype.hasAuthorityPrefix = function(val) {
		    if (typeof val !== 'undefined') {
		      this.hasAuthorityPrefixUserPref = val;
		    }

		    if (this.hasAuthorityPrefixUserPref === null) {
		      return (this.uriParts.source.indexOf('//') !== -1);
		    } else {
		      return this.hasAuthorityPrefixUserPref;
		    }
		  };

		  Uri.prototype.isColonUri = function (val) {
		    if (typeof val !== 'undefined') {
		      this.uriParts.isColonUri = !!val;
		    } else {
		      return !!this.uriParts.isColonUri;
		    }
		  };

		  /**
		   * Serializes the internal state of the query pairs
		   * @param  {string} [val]   set a new query string
		   * @return {string}         query string
		   */
		  Uri.prototype.query = function(val) {
		    var s = '', i, param, l;

		    if (typeof val !== 'undefined') {
		      this.queryPairs = parseQuery(val);
		    }

		    for (i = 0, l = this.queryPairs.length; i < l; i++) {
		      param = this.queryPairs[i];
		      if (s.length > 0) {
		        s += '&';
		      }
		      if (param[1] === null) {
		        s += param[0];
		      } else {
		        s += param[0];
		        s += '=';
		        if (typeof param[1] !== 'undefined') {
		          s += encodeURIComponent(param[1]);
		        }
		      }
		    }
		    return s.length > 0 ? '?' + s : s;
		  };

		  /**
		   * returns the first query param value found for the key
		   * @param  {string} key query key
		   * @return {string}     first value found for key
		   */
		  Uri.prototype.getQueryParamValue = function (key) {
		    var param, i, l;
		    for (i = 0, l = this.queryPairs.length; i < l; i++) {
		      param = this.queryPairs[i];
		      if (key === param[0]) {
		        return param[1];
		      }
		    }
		  };

		  /**
		   * returns an array of query param values for the key
		   * @param  {string} key query key
		   * @return {array}      array of values
		   */
		  Uri.prototype.getQueryParamValues = function (key) {
		    var arr = [], i, param, l;
		    for (i = 0, l = this.queryPairs.length; i < l; i++) {
		      param = this.queryPairs[i];
		      if (key === param[0]) {
		        arr.push(param[1]);
		      }
		    }
		    return arr;
		  };

		  /**
		   * removes query parameters
		   * @param  {string} key     remove values for key
		   * @param  {val}    [val]   remove a specific value, otherwise removes all
		   * @return {Uri}            returns self for fluent chaining
		   */
		  Uri.prototype.deleteQueryParam = function (key, val) {
		    var arr = [], i, param, keyMatchesFilter, valMatchesFilter, l;

		    for (i = 0, l = this.queryPairs.length; i < l; i++) {

		      param = this.queryPairs[i];
		      keyMatchesFilter = decode(param[0]) === decode(key);
		      valMatchesFilter = param[1] === val;

		      if ((arguments.length === 1 && !keyMatchesFilter) || (arguments.length === 2 && (!keyMatchesFilter || !valMatchesFilter))) {
		        arr.push(param);
		      }
		    }

		    this.queryPairs = arr;

		    return this;
		  };

		  /**
		   * adds a query parameter
		   * @param  {string}  key        add values for key
		   * @param  {string}  val        value to add
		   * @param  {integer} [index]    specific index to add the value at
		   * @return {Uri}                returns self for fluent chaining
		   */
		  Uri.prototype.addQueryParam = function (key, val, index) {
		    if (arguments.length === 3 && index !== -1) {
		      index = Math.min(index, this.queryPairs.length);
		      this.queryPairs.splice(index, 0, [key, val]);
		    } else if (arguments.length > 0) {
		      this.queryPairs.push([key, val]);
		    }
		    return this;
		  };

		  /**
		   * test for the existence of a query parameter
		   * @param  {string}  key        add values for key
		   * @param  {string}  val        value to add
		   * @param  {integer} [index]    specific index to add the value at
		   * @return {Uri}                returns self for fluent chaining
		   */
		  Uri.prototype.hasQueryParam = function (key) {
		    var i, len = this.queryPairs.length;
		    for (i = 0; i < len; i++) {
		      if (this.queryPairs[i][0] == key)
		        return true;
		    }
		    return false;
		  };

		  /**
		   * replaces query param values
		   * @param  {string} key         key to replace value for
		   * @param  {string} newVal      new value
		   * @param  {string} [oldVal]    replace only one specific value (otherwise replaces all)
		   * @return {Uri}                returns self for fluent chaining
		   */
		  Uri.prototype.replaceQueryParam = function (key, newVal, oldVal) {
		    var index = -1, len = this.queryPairs.length, i, param;

		    if (arguments.length === 3) {
		      for (i = 0; i < len; i++) {
		        param = this.queryPairs[i];
		        if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
		          index = i;
		          break;
		        }
		      }
		      if (index >= 0) {
		        this.deleteQueryParam(key, decode(oldVal)).addQueryParam(key, newVal, index);
		      }
		    } else {
		      for (i = 0; i < len; i++) {
		        param = this.queryPairs[i];
		        if (decode(param[0]) === decode(key)) {
		          index = i;
		          break;
		        }
		      }
		      this.deleteQueryParam(key);
		      this.addQueryParam(key, newVal, index);
		    }
		    return this;
		  };

		  /**
		   * Define fluent setter methods (setProtocol, setHasAuthorityPrefix, etc)
		   */
		  ['protocol', 'hasAuthorityPrefix', 'isColonUri', 'userInfo', 'host', 'port', 'path', 'query', 'anchor'].forEach(function(key) {
		    var method = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
		    Uri.prototype[method] = function(val) {
		      this[key](val);
		      return this;
		    };
		  });

		  /**
		   * Scheme name, colon and doubleslash, as required
		   * @return {string} http:// or possibly just //
		   */
		  Uri.prototype.scheme = function() {
		    var s = '';

		    if (this.protocol()) {
		      s += this.protocol();
		      if (this.protocol().indexOf(':') !== this.protocol().length - 1) {
		        s += ':';
		      }
		      s += '//';
		    } else {
		      if (this.hasAuthorityPrefix() && this.host()) {
		        s += '//';
		      }
		    }

		    return s;
		  };

		  /**
		   * Same as Mozilla nsIURI.prePath
		   * @return {string} scheme://user:password@host:port
		   * @see  https://developer.mozilla.org/en/nsIURI
		   */
		  Uri.prototype.origin = function() {
		    var s = this.scheme();

		    if (this.userInfo() && this.host()) {
		      s += this.userInfo();
		      if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
		        s += '@';
		      }
		    }

		    if (this.host()) {
		      s += this.host();
		      if (this.port() || (this.path() && this.path().substr(0, 1).match(/[0-9]/))) {
		        s += ':' + this.port();
		      }
		    }

		    return s;
		  };

		  /**
		   * Adds a trailing slash to the path
		   */
		  Uri.prototype.addTrailingSlash = function() {
		    var path = this.path() || '';

		    if (path.substr(-1) !== '/') {
		      this.path(path + '/');
		    }

		    return this;
		  };

		  /**
		   * Serializes the internal state of the Uri object
		   * @return {string}
		   */
		  Uri.prototype.toString = function() {
		    var path, s = this.origin();

		    if (this.isColonUri()) {
		      if (this.path()) {
		        s += ':'+this.path();
		      }
		    } else if (this.path()) {
		      path = this.path();
		      if (!(re.ends_with_slashes.test(s) || re.starts_with_slashes.test(path))) {
		        s += '/';
		      } else {
		        if (s) {
		          s.replace(re.ends_with_slashes, '/');
		        }
		        path = path.replace(re.starts_with_slashes, '/');
		      }
		      s += path;
		    } else {
		      if (this.host() && (this.query().toString() || this.anchor())) {
		        s += '/';
		      }
		    }
		    if (this.query().toString()) {
		      s += this.query().toString();
		    }

		    if (this.anchor()) {
		      if (this.anchor().indexOf('#') !== 0) {
		        s += '#';
		      }
		      s += this.anchor();
		    }

		    return s;
		  };

		  /**
		   * Clone a Uri object
		   * @return {Uri} duplicate copy of the Uri
		   */
		  Uri.prototype.clone = function() {
		    return new Uri(this.toString());
		  };

		  /**
		   * export via AMD or CommonJS, otherwise leak a global
		   */
		  if (true) {
		    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		      return Uri;
		    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		    module.exports = Uri;
		  } else {
		    global.Uri = Uri;
		  }
		}(this));


	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 53 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ]);