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

	__webpack_require__(50);

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
	    str = str || __webpack_require__(55).readFileSync(filename, 'utf8')
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
	        template: __webpack_require__(52),
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
	    $(window).on('unload', function () {
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

	var uds = __webpack_require__(53);

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
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function webpackUniversalModuleDefinition(root, factory) {
	    if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["hydrajs"] = factory();else root["hydrajs"] = factory();
	})(undefined, function () {
	    return (/******/function (modules) {
	            // webpackBootstrap
	            /******/ // The module cache
	            /******/var installedModules = {};
	            /******/
	            /******/ // The require function
	            /******/function __webpack_require__(moduleId) {
	                /******/
	                /******/ // Check if module is in cache
	                /******/if (installedModules[moduleId]) {
	                    /******/return installedModules[moduleId].exports;
	                    /******/
	                }
	                /******/ // Create a new module (and put it into the cache)
	                /******/var module = installedModules[moduleId] = {
	                    /******/i: moduleId,
	                    /******/l: false,
	                    /******/exports: {}
	                    /******/ };
	                /******/
	                /******/ // Execute the module function
	                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	                /******/
	                /******/ // Flag the module as loaded
	                /******/module.l = true;
	                /******/
	                /******/ // Return the exports of the module
	                /******/return module.exports;
	                /******/
	            }
	            /******/
	            /******/
	            /******/ // expose the modules object (__webpack_modules__)
	            /******/__webpack_require__.m = modules;
	            /******/
	            /******/ // expose the module cache
	            /******/__webpack_require__.c = installedModules;
	            /******/
	            /******/ // define getter function for harmony exports
	            /******/__webpack_require__.d = function (exports, name, getter) {
	                /******/if (!__webpack_require__.o(exports, name)) {
	                    /******/Object.defineProperty(exports, name, {
	                        /******/configurable: false,
	                        /******/enumerable: true,
	                        /******/get: getter
	                        /******/ });
	                    /******/
	                }
	                /******/
	            };
	            /******/
	            /******/ // getDefaultExport function for compatibility with non-harmony modules
	            /******/__webpack_require__.n = function (module) {
	                /******/var getter = module && module.__esModule ?
	                /******/function getDefault() {
	                    return module['default'];
	                } :
	                /******/function getModuleExports() {
	                    return module;
	                };
	                /******/__webpack_require__.d(getter, 'a', getter);
	                /******/return getter;
	                /******/
	            };
	            /******/
	            /******/ // Object.prototype.hasOwnProperty.call
	            /******/__webpack_require__.o = function (object, property) {
	                return Object.prototype.hasOwnProperty.call(object, property);
	            };
	            /******/
	            /******/ // __webpack_public_path__
	            /******/__webpack_require__.p = "";
	            /******/
	            /******/ // Load entry module and return exports
	            /******/return __webpack_require__(__webpack_require__.s = 8);
	            /******/
	        }(
	        /************************************************************************/
	        /******/[
	        /* 0 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";
	            /* WEBPACK VAR INJECTION */
	            (function (process) {
	                Object.defineProperty(exports, "__esModule", { value: true });
	                // Since we aren't transpiling to babel can't use ES6 imports here
	                var Uri = __webpack_require__(11);
	                var btoa = __webpack_require__(12);
	                function createBasicAuth(user, pass) {
	                    return "Basic " + btoa(user + ':' + pass);
	                }
	                exports.createBasicAuth = createBasicAuth;
	                var hydraHostName = new Uri('');
	                var pcmHostName = new Uri('');
	                var hydraFSHostName = new Uri('');
	                var pathPrefix = '/hydra/rest';
	                var fsPathPrefix = '/hydrafs/rest';
	                var auth = null;
	                // Add any new services consuming hydrajs to below arrays
	                var prodHostNames = ['access.redhat.com', 'prod.foo.redhat.com', 'fooprod.redhat.com', 'skedge.redhat.com'];
	                var qaHostNames = ['access.qa.redhat.com', 'qa.foo.redhat.com', 'fooqa.redhat.com', 'skedge.qa.redhat.com'];
	                var fteHostNames = ['access.devgssfte.devlab.phx1.redhat.com', 'fte.foo.redhat.com', 'foofte.redhat.com'];
	                var ciHostNames = ['access.devgssci.devlab.phx1.redhat.com', 'ci.foo.redhat.com', 'fooci.redhat.com', 'skedge.ci.redhat.com'];
	                var stageHostNames = ['access.stage.redhat.com', 'stage.foo.redhat.com', 'foostage.redhat.com', 'skedge.stage.redhat.com'];
	                if (process && Object({ "NODE_ENV": "production" }) && Object({ "NODE_ENV": "production" }).RHN_USER) {
	                    auth = createBasicAuth(Object({ "NODE_ENV": "production" }).RHN_USER, Object({ "NODE_ENV": "production" }).RHN_PASS);
	                }
	                if (process && Object({ "NODE_ENV": "production" }) && (Object({ "NODE_ENV": "production" }).HYDRA_HOSTNAME || Object({ "NODE_ENV": "production" }).PCM_HOSTNAME)) {
	                    if (Object({ "NODE_ENV": "production" }).HYDRA_HOSTNAME) hydraHostName = new Uri(Object({ "NODE_ENV": "production" }).HYDRA_HOSTNAME);
	                    if (Object({ "NODE_ENV": "production" }).PCM_HOSTNAME) pcmHostName = new Uri(Object({ "NODE_ENV": "production" }).PCM_HOSTNAME);
	                    if (Object({ "NODE_ENV": "production" }).HYDRA_FS_HOSTNAME) hydraFSHostName = new Uri(Object({ "NODE_ENV": "production" }).HYDRA_FS_HOSTNAME);
	                } else if (typeof window !== 'undefined' && window) {
	                    if (prodHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                        hydraFSHostName = new Uri('https://access.redhat.com/hydrafs/rest');
	                        fsPathPrefix = '/hydrafs/rest';
	                    } else if (qaHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.qa.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                        hydraFSHostName = new Uri('https://hydra.fs.dev.redhat.com/hydra/rest/');
	                        fsPathPrefix = pathPrefix;
	                    } else if (fteHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.devgssfte.devlab.phx1.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                    } else if (ciHostNames.indexOf(window.location.hostname) !== -1) {
	                        // There is no Hydra CI
	                        pcmHostName = new Uri('https://hydraadmin-corp-dev-redhat-com.vserver.devlab.ext.phx1.redhat.com/hydra/rest/');
	                    } else if (stageHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.stage.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                        hydraFSHostName = new Uri('https://hydra-fs.ext.paas.stage.redhat.com/hydra/rest/');
	                        fsPathPrefix = pathPrefix;
	                    }
	                } else {
	                    throw new Error('Could not determine hostname, if you are running in Node make sure to set the HYDRA_HOSTNAME, PCM_HOSTNAME, RHN_USER, and RHN_PASS env variables.');
	                }
	                var Env = /** @class */function () {
	                    function Env() {}
	                    Env.hydraHostName = hydraHostName;
	                    Env.pcmHostName = pcmHostName;
	                    Env.hydraFSHostName = hydraFSHostName;
	                    Env.pathPrefix = pathPrefix;
	                    Env.fsPathPrefix = fsPathPrefix;
	                    Env.auth = auth;
	                    return Env;
	                }();
	                exports.default = Env;

	                /* WEBPACK VAR INJECTION */
	            }).call(exports, __webpack_require__(10));

	            /***/
	        },
	        /* 1 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            // Since we aren't transpiling to babel can't use ES6 imports here.  Also we can't specify the Response and Request
	            // types for fetch since A) They happen automatically with import which we can't use and B) the reference paths would
	            // be different in downstream apps
	            var env_1 = __webpack_require__(0);
	            function errorHandler(response) {
	                return response.text().then(function (body) {
	                    if (body == null || body === '') {
	                        var error = new Error(body);
	                        Object.assign(error, { status: response.status }, { statusText: response.statusText });
	                        throw error;
	                    }
	                    var parsedError;
	                    try {
	                        parsedError = JSON.parse(body);
	                    } catch (e) {}
	                    if (parsedError) {
	                        var error = new Error(parsedError && parsedError.message || body);
	                        Object.assign(error, parsedError, { isHydraError: true }, { status: response.status }, { statusText: response.statusText });
	                        throw error;
	                    } else {
	                        var error = new Error(body);
	                        Object.assign(error, { status: response.status }, { statusText: response.statusText });
	                        throw error;
	                    }
	                });
	            }
	            function getIsTokenExpired() {
	                if (window.sessionjs && window.sessionjs.isTokenExpired) {
	                    return window.sessionjs.isTokenExpired;
	                } else {
	                    // For PCM we use the below line because in sessionjs we don't get the isTokenExpired() function directly
	                    // also it throws an error in PCM - window.sessionjs.isTokenExpired() is not a function
	                    if (window.sessionjs && window.sessionjs._state && window.sessionjs._state.keycloak) {
	                        return window.sessionjs._state.keycloak.isTokenExpired;
	                    }
	                }
	            }
	            // If the token is expiring within 30 seconds, go ahead and refresh it.  Using 30 seconds considering jwt.js checks if
	            // the token needs to be refreshed every 58 seconds with a TTE of 90 seconds.  So 30 seconds guarantees that
	            // we are at the boundary of what jwt.js does without overlapping a great deal
	            function isTokenExpired() {
	                var _isTokenExpired = getIsTokenExpired();
	                return _isTokenExpired(30);
	            }
	            function forceTokenRefresh() {
	                var _isTokenExpired = getIsTokenExpired();
	                console.warn("Hydrajs detected the JWT token has expired, forcing an update");
	                return new Promise(function (resolve, reject) {
	                    // updateToken(true) forces the token to update by passing -1 to keycloak.updateToken
	                    window.sessionjs.updateToken(true).then(function (refreshed) {
	                        if (refreshed) {
	                            resolve(true);
	                        } else if (!refreshed && !_isTokenExpired(0)) {
	                            resolve(true);
	                        } else if (!refreshed && _isTokenExpired(0)) {
	                            reject(new Error("Token not refreshed and is expired."));
	                        }
	                    }).catch(function (e) {
	                        reject(e);
	                    });
	                });
	            }
	            function getToken() {
	                if (window.sessionjs && window.sessionjs._state.keycloak.token) {
	                    if (window.sessionjs.isAuthenticated()) {
	                        return "Bearer " + window.sessionjs._state.keycloak.token;
	                    }
	                }
	                return null;
	            }
	            function responseHandler(response, dataType) {
	                if (response.status === 204) {
	                    return null;
	                } else if (response.status === 200 || response.status === 201) {
	                    return response.clone().text().then(function (body) {
	                        if (body == null || body === '') return null;
	                        if (dataType === 'text') return body;
	                        // Safari must implement the fetch API differently than Chrome/FF as Safari doesn't like the response to
	                        // ever be cloned.  Therefore, if the clone fails here, we can just return the response.json()
	                        try {
	                            return response.clone().json().catch(function (e) {
	                                // The only possible error here is either response is null or parsing json fails.  Both of which
	                                // we just want to return the response, which would either be null or the actual api error
	                                return errorHandler(response);
	                            });
	                        } catch (e) {
	                            return response.json().catch(function (e) {
	                                // The only possible error here is either response is null or parsing json fails.  Both of which
	                                // we just want to return the response, which would either be null or the actual api error
	                                return errorHandler(response);
	                            });
	                        }
	                    });
	                } else {
	                    return errorHandler(response);
	                }
	            }
	            function getSecondsElapsed(previousTime) {
	                return (new Date().getTime() - previousTime) / 1000;
	            }
	            // Once Hydra goes to the Managed Platform then we may be able to remove this as the MP will have an 80s timeout for all requests.
	            function handleLongRunningRequest(uri, params, secondsElapsed) {
	                if (secondsElapsed > 60) {
	                    // Raven
	                    if (typeof window.Raven !== 'undefined' && typeof window.Raven.captureException === 'function') {
	                        window.Raven.captureException(new Error("Hydra long running request, seconds taken: " + secondsElapsed), {
	                            extra: {
	                                secondsElapsed: secondsElapsed,
	                                url: uri.toString(),
	                                params: params
	                            }
	                        });
	                    }
	                }
	            }
	            function isError(error) {
	                return error && error.message != null;
	            }
	            function processCaughtError(uri, params, error) {
	                try {
	                    if (isError(error)) {
	                        error.extra = {
	                            url: uri.toString(),
	                            params: params
	                        };
	                    }
	                } catch (e) {}
	            }
	            function callFetchAndHandleJwt(uri, params, dataType, externalUrl) {
	                if (!externalUrl) {
	                    if (env_1.default.auth) {
	                        params.headers['Authorization'] = env_1.default.auth;
	                    } else if (getToken()) {
	                        params.headers['Authorization'] = getToken();
	                    } else {
	                        var error = new Error("Could not set JWT token on request header, unauthenticated.");
	                        Object.assign(error, { status: 401 }, { statusText: 'Unauthorized' });
	                        throw error;
	                    }
	                }
	                return new Promise(function (resolve, reject) {
	                    var start;
	                    if (!env_1.default.auth && isTokenExpired()) {
	                        forceTokenRefresh().then(function () {
	                            if (!externalUrl) {
	                                params.headers['Authorization'] = getToken();
	                            }
	                            start = new Date().getTime();
	                            if (dataType) {
	                                fetch(uri.toString(), params).then(function (response) {
	                                    return responseHandler(response, dataType);
	                                }).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            } else {
	                                fetch(uri.toString(), params).then(responseHandler).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            }
	                        }).catch(function () {
	                            start = new Date().getTime();
	                            // Even if there was an error updating the token, we still need to hit Hydra, which at this point would probably return the "JWT expired" though this edge case is very unlikely.
	                            if (dataType) {
	                                fetch(uri.toString(), params).then(function (response) {
	                                    return responseHandler(response, dataType);
	                                }).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            } else {
	                                fetch(uri.toString(), params).then(responseHandler).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            }
	                        });
	                    } else {
	                        start = new Date().getTime();
	                        // Else we have a valid token and continue as always.
	                        if (dataType) {
	                            fetch(uri.toString(), params).then(function (response) {
	                                return responseHandler(response, dataType);
	                            }).then(function (output) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                resolve(output);
	                            }).catch(function (error) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                processCaughtError(uri, params, error);
	                                reject(error);
	                            });
	                        } else {
	                            fetch(uri.toString(), params).then(responseHandler).then(function (output) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                resolve(output);
	                            }).catch(function (error) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                processCaughtError(uri, params, error);
	                                reject(error);
	                            });
	                        }
	                    }
	                });
	            }
	            function getUri(uri, headerParams, dataType, externalUrl) {
	                var params = {
	                    method: 'GET',
	                    headers: {}
	                };
	                if (headerParams !== undefined) {
	                    headerParams.forEach(function (element) {
	                        params.headers[element.key] = element.value;
	                    });
	                }
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.getUri = getUri;
	            function postUri(uri, body, dataType, externalUrl) {
	                var params = {
	                    method: 'POST',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.postUri = postUri;
	            function postFormUri(uri, formData, dataType, externalUrl) {
	                var params = {
	                    method: 'POST',
	                    credentials: 'include',
	                    headers: {
	                        'Accept': 'application/json'
	                    },
	                    body: formData
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.postFormUri = postFormUri;
	            function putUri(uri, body, dataType, externalUrl) {
	                var params = {
	                    method: 'PUT',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.putUri = putUri;
	            function patchUri(uri, body, dataType) {
	                var params = {
	                    method: 'PATCH',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.patchUri = patchUri;
	            function deleteUri(uri, dataType) {
	                var params = {
	                    method: 'DELETE',
	                    headers: {
	                        'Content-Type': 'application/json'
	                    }
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.deleteUri = deleteUri;
	            function deleteUriWithBody(uri, body, dataType) {
	                var params = {
	                    method: 'DELETE',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.deleteUriWithBody = deleteUriWithBody;

	            /***/
	        },
	        /* 2 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getUserFields(options) {
	                var finalFields = [];
	                if (options && options.minimal === true) {
	                    var fields = ['id', 'email', 'fullName', 'fullTitle', 'inGSS', 'isActive', 'managerId', 'mobilePhone', 'outOfOffice', 'phone', 'rhatLocation', 'region', 'ssoUsername', 'superRegion', 'title', 'isManager', 'timeZone'];
	                    Array.prototype.push.apply(finalFields, fields);
	                } else {
	                    var fields = ['id', 'accountId', 'accountNumber', 'callCenterId', 'contactId', 'contactNumber', 'email', 'firstName', 'firstNameCustom', 'fullName', 'fullTitle', 'gssCostcenterName', 'genesysUsername', 'ircNick', 'itarUser', 'inGSS', 'isActive', 'kerberosName', 'lastName', 'lastNameCustom', 'managerId', 'mobilePhone', 'name', 'officeLocation', 'outOfOffice', 'phone', 'rhatLocation', 'redhatComEmailAddress', 'region', 'ssoUsername', 'superRegion', 'title', 'userName', 'bomgarUsername', 'canWorkNightShift', 'isManager', 'timeZone', 'userRoleId'];
	                    Array.prototype.push.apply(finalFields, fields);
	                }
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['aboutMe', 'alias', 'city', 'country', 'countryCustom', 'explicitKerberosName',
	                    // 'firstLevelManagerUsername',
	                    'fourthLevelManagerUsername', 'managerSID', 'outOfOfficeChangedBy', 'outOfOfficeChangedOn', 'secondLevelManagerUsername', 'sixthLevelManagerUsername', 'thirdLevelManagerUsername', 'virtualOffice'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                return finalFields;
	            }
	            exports.getUserFields = getUserFields;

	            /***/
	        },
	        /* 3 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getContactFields(options) {
	                var finalFields = [];
	                if (options && options.minimal === true) {
	                    var fields = ['id', 'isOrgAdmin', 'ssoUsername', 'accountId', 'email', 'fullNameCustom', 'isActive', 'phone', 'timezone', 'regionGeo'];
	                    Array.prototype.push.apply(finalFields, fields);
	                } else {
	                    var fields = ['firstName', 'lastName', 'isOrgAdmin', 'ssoUsername', 'id', 'accountId', 'email', 'fullNameCustom', 'isActive', 'phone', 'timezone', 'isInternal', 'canAddAttachments', 'contact24x7', 'contactNumber', 'defaultCaseGroup', 'doNotCall', 'firstNameCustom', 'itarContact', 'isEntitled', 'lastNameCustom', 'manageSupportCases', 'mobilePhone', 'name', 'normalizedTZ', 'preferredLanguage', 'preferredMethodOfContact', 'rhnLoginName', 'regionGeo', 'reportsToId', 'srmContact', 'secureSupportTech', 'tamContact', 'title'];
	                    Array.prototype.push.apply(finalFields, fields);
	                }
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['hasOptedOutOfEmail', 'homePhone', 'npsEligibility', 'noLongerAtCompany', 'otherPhone', 'primaryComment', 'primaryScore', 'salutation', 'surveyOptOut', 'tamNewsletterSubscription', 'typeOfContact'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                return finalFields;
	            }
	            exports.getContactFields = getContactFields;

	            /***/
	        },
	        /* 4 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getCaseGroupFields() {
	                var fields = ['id',
	                // accountId field not found
	                // 'accountId',
	                // 'accountDetails',
	                // 'createdBy',
	                'createdById', 'createdDate', 'folderNumber',
	                // 'lastModifiedBy',
	                'lastModifiedById', 'lastModifiedDate', 'name', 'noAutomationForCases',
	                // 'owner',
	                'ownerId', 'isPrivate'];
	                return fields;
	            }
	            exports.getCaseGroupFields = getCaseGroupFields;

	            /***/
	        },
	        /* 5 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getBugzillaBugFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'assignedTo', 'blocks2', 'blocks', 'bugzillaURL', 'bugzillaKeywords', 'bugzillaLink', 'bugzillaNumber', 'caseNumber', 'linkedAt', 'component', 'createdById', 'createdDate', 'dependsOn', 'depends', 'description', 'dupeOf', 'groups', 'isOpen', 'isPrivate', 'lastModifiedById', 'lastModifiedDate', 'name', 'platform', 'priority', 'product', 'resolution', 'severity', 'status', 'summary', 'version'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = [];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getBugzillaBugFields = getBugzillaBugFields;

	            /***/
	        },
	        /* 6 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getAccountFields(options) {
	                var finalFields = [];
	                var fields = ['accountId', 'accountNumber', 'accountStatus', 'businessHoursId', 'cannotAddAttachments', 'csm', 'gscsmSegment', 'caseCount', 'escalationsInLast30Days', 'description', 'escalateToHomeGeoWith1stTouch', 'escalateToHomeGeoWithoutFirstTouch', 'expectsQuickInitialResponse', 'hardwarePartner', 'hasAvailableEnhancedSLA', 'hasEnhancedSLA', 'holdSupport', 'identifyingAddressCountry', 'identifyingAddressSuperRegion', 'isPartner', 'isActive', 'name', 'noAutomationForCases', 'ownerId', 'responseTime', 'secureSupport', 'securedEnvironment', 'specialHandlingRequired', 'strategic', 'superRegion', 'supportPartner', 'tactical', 'totalNumberOfEscalations', 'watchlist', 'hasSRM', 'hasTAM', 'isInternal', 'informManagement'];
	                // owner: IUser;
	                // csmUser: IUser;
	                // parent: IAccount;
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['accountKey', 'accountAlias', 'additionalEnhancedEntitlementCount', 'customerSegment', 'csmUserId', 'escalationsInLast60Days', 'hasGroupACLs', 'npsScore', 'parentId', 'requireCGroupOnCreate', 'remainingEnhancedEntitlementCases'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeApiSpecificFields) {
	                    var apiFields = ['csmUserName', 'csmUserSSOName', 'escalationsInLast30DaysApi', 'hasChat'];
	                    Array.prototype.push.apply(finalFields, apiFields);
	                }
	                if (options && options.includeCsmUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "csmUser." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getAccountFields = getAccountFields;
	            function getAccountNoteFields(options) {
	                var finalFields = [];
	                var fields = ['body', 'numberOfDaysReviewPending', 'reasonForReview', 'isRetired', 'subject', 'type', 'name', 'lastModifiedDate', 'createdDate'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['accountId', 'accountIdentifier', 'isEditable', 'expiryDate', 'expirySetBy', 'intendedReviewDate', 'lastReviewDate', 'needsReview', 'needsReviewByAuthor', 'noteAuthor', 'retireDate', 'retiredBy', 'createdById', 'lastModifiedById', 'sortedType'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getAccountNoteFields = getAccountNoteFields;
	            function getAccountMemberFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'createdById', 'createdDate', 'lastModifiedDate', 'name', 'role'
	                // 'createdBy: IUser;
	                // 'lastModifiedBy: IUser;
	                // 'account: IAccount;
	                // 'member: IUser;
	                ];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['ownerId', 'isDeleted', 'isAddToCaseTeam', 'isEmailOnUpdates', 'minimumSeverity', 'isNotifyOfNewCases', 'tamCaseStatus'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeMember) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "member." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getAccountMemberFields = getAccountMemberFields;

	            /***/
	        },
	        /* 7 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getProductFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'productCode', 'name', 'productFamily', 'productNumber', 'currentlySupported'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['ownerId', 'isDeleted', 'createdDate', 'createdById', 'lastModifiedDate', 'lastModifiedById', 'systemModstamp', 'lastViewedDate', 'lastReferencedDate', 'connectionReceivedId', 'connectionSentId', 'endOfLifeDate', 'supportedDate', 'doesNotRequireSupportedEntitlement'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeOwner) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "owner." + f;
	                    }));
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getProductFields = getProductFields;

	            /***/
	        },
	        /* 8 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var insights_1 = __webpack_require__(9);
	            var roleMetadata_1 = __webpack_require__(13);
	            var testClass_1 = __webpack_require__(14);
	            var general_1 = __webpack_require__(15);
	            var kyce_1 = __webpack_require__(16);
	            var businessHours_1 = __webpack_require__(17);
	            var tags_1 = __webpack_require__(18);
	            var brms_1 = __webpack_require__(19);
	            var user_1 = __webpack_require__(2);
	            var contact_1 = __webpack_require__(3);
	            var case_1 = __webpack_require__(20);
	            var caseGroup_1 = __webpack_require__(4);
	            var bomgar_1 = __webpack_require__(23);
	            var caseHistory_1 = __webpack_require__(24);
	            var escalation_1 = __webpack_require__(25);
	            var chat_1 = __webpack_require__(26);
	            var bugzilla_1 = __webpack_require__(5);
	            var product_1 = __webpack_require__(7);
	            var externalTracker_1 = __webpack_require__(27);
	            var view_1 = __webpack_require__(28);
	            var account_1 = __webpack_require__(29);
	            var comment_1 = __webpack_require__(30);
	            var user_2 = __webpack_require__(31);
	            var kcs_1 = __webpack_require__(32);
	            var case_2 = __webpack_require__(33);
	            var attachment_1 = __webpack_require__(34);
	            var shiftMetadata_1 = __webpack_require__(35);
	            var templateMetadata_1 = __webpack_require__(36);
	            var vendorProduct_1 = __webpack_require__(37);
	            var certification_1 = __webpack_require__(38);
	            var hive_1 = __webpack_require__(39);
	            var certificationTest_1 = __webpack_require__(40);
	            var userShifts_1 = __webpack_require__(41);
	            var groupMetadata_1 = __webpack_require__(42);
	            var counts_1 = __webpack_require__(43);
	            var review_1 = __webpack_require__(44);
	            var products_1 = __webpack_require__(45);
	            var sbrs_1 = __webpack_require__(46);
	            var externalTrackers_1 = __webpack_require__(47);
	            var solr_1 = __webpack_require__(48);
	            var account_2 = __webpack_require__(49);
	            var callCenters_1 = __webpack_require__(50);
	            var commentFeedback_1 = __webpack_require__(51);
	            var roles_1 = __webpack_require__(52);
	            var vocabulary_1 = __webpack_require__(53);
	            var maintenance_1 = __webpack_require__(54);
	            var account_3 = __webpack_require__(6);
	            var comment_2 = __webpack_require__(55);
	            var metadata_1 = __webpack_require__(56);
	            var successPlan_1 = __webpack_require__(57);
	            var account_4 = __webpack_require__(58);
	            var cta_1 = __webpack_require__(59);
	            var timeline_1 = __webpack_require__(60);
	            var contact_2 = __webpack_require__(61);
	            exports.default = {
	                general: {
	                    health: general_1.health,
	                    hostname: general_1.hostname
	                },
	                kase: {
	                    getComments: comment_1.getComments,
	                    upsertComment: comment_1.upsertComment,
	                    getCase: case_2.getCase,
	                    getCases: case_2.getCases,
	                    updateCase: case_2.updateCase,
	                    updateCaseByInternal: case_2.updateCaseByInternal,
	                    getLinkedJiras: case_2.getLinkedJiras,
	                    linkJiraToCase: case_2.linkJiraToCase,
	                    deleteJiraLinkFromCase: case_2.deleteJiraLinkFromCase,
	                    counts: {
	                        allCounts: counts_1.allCounts,
	                        articlesLinked: counts_1.articlesLinked,
	                        bomgarSessions: counts_1.bomgarSessions,
	                        bugzillas: counts_1.bugzillas,
	                        caseHistory: counts_1.caseHistory,
	                        chatTranscripts: counts_1.chatTranscripts,
	                        comments: counts_1.comments,
	                        escalationsClosed: counts_1.escalationsClosed,
	                        escalationsOpen: counts_1.escalationsOpen,
	                        fileAttachments: counts_1.fileAttachments,
	                        jiras: counts_1.jiras,
	                        solutionsLinked: counts_1.solutionsLinked,
	                        teamMembers: counts_1.teamMembers,
	                        reviews: counts_1.reviews,
	                        testPlan: counts_1.testPlan,
	                        testResult: counts_1.testResult
	                    },
	                    attachments: {
	                        uploadAttachment: attachment_1.uploadAttachment,
	                        getAttachments: attachment_1.getAttachments
	                    },
	                    getLanguages: case_2.getLanguages,
	                    getCaseSbrs: case_2.getCaseSbrs,
	                    getCaseTags: case_2.getCaseTags,
	                    updateCaseTags: case_2.updateCaseTags,
	                    deleteCaseTags: case_2.deleteCaseTags,
	                    getSeverities: case_2.getSeverities,
	                    getStatuses: case_2.getStatuses,
	                    getTypes: case_2.getTypes,
	                    getCaseExternalTrackers: case_2.getCaseExternalTrackers,
	                    getCaseExternalTrackerUpdates: case_2.getCaseExternalTrackerUpdates,
	                    getCaseContacts: case_2.getCaseContacts,
	                    addCaseContacts: case_2.addCaseContacts,
	                    deleteCaseContacts: case_2.deleteCaseContacts,
	                    getAccountCaseGroups: case_2.getAccountCaseGroups,
	                    getCaseHistory: case_2.getCaseHistory,
	                    getAssociates: case_2.getAssociates,
	                    addAssociate: case_2.addAssociate,
	                    deleteAssociate: case_2.deleteAssociate,
	                    updateOwner: case_2.updateOwner,
	                    getLockedCases: case_2.getLockedCases,
	                    lockCase: case_2.lockCase,
	                    unlockCase: case_2.unlockCase,
	                    getBomgarSessionKey: case_2.getBomgarSessionKey,
	                    getNep: case_2.getNep,
	                    createNep: case_2.createNep,
	                    updateNep: case_2.updateNep,
	                    deleteNep: case_2.deleteNep,
	                    getAttachments: case_2.getAttachments,
	                    updateAttachment: case_2.updateAttachment,
	                    getBomgarSessions: case_2.getBomgarSessions,
	                    updateCaseSbrs: case_2.updateCaseSbrs,
	                    deleteCaseSbrs: case_2.deleteCaseSbrs,
	                    getMilestones: case_2.getMilestones,
	                    getChatTranscripts: case_2.getChatTranscripts,
	                    getBugs: case_2.getBugs,
	                    getCasesFromSoql: case_2.getCasesFromSoql
	                },
	                insights: {
	                    runInsights: insights_1.runInsights,
	                    getInsightsRules: insights_1.getInsightsRules
	                },
	                brms: {
	                    getBrmsResponse: brms_1.getBrmsResponse
	                },
	                skedge: {
	                    getAllShiftMetadatas: shiftMetadata_1.getAllShiftMetadatas,
	                    createShiftMetadata: shiftMetadata_1.createShiftMetadata,
	                    updateShiftMetadata: shiftMetadata_1.updateShiftMetadata,
	                    deleteShiftMetadata: shiftMetadata_1.deleteShiftMetadata,
	                    getAllRoleMetadatas: roleMetadata_1.getAllRoleMetadatas,
	                    getAllTemplateMetadatas: templateMetadata_1.getAllTemplateMetadatas,
	                    getTemplateMetadatasForUser: templateMetadata_1.getTemplateMetadatasForUser,
	                    postCustomTemplateForUser: templateMetadata_1.postCustomTemplateForUser,
	                    getAllShiftsForUsers: userShifts_1.getAllShiftsForUsers,
	                    getShiftsForUserFilters: userShifts_1.getShiftsForUserFilters,
	                    postShiftsForUsers: userShifts_1.postShiftsForUsers,
	                    editShiftForUser: userShifts_1.editShiftForUser,
	                    deleteShiftByShiftId: userShifts_1.deleteShiftByShiftId,
	                    deleteShiftForUsers: userShifts_1.deleteShiftForUsers,
	                    getAllGroupMetadatas: groupMetadata_1.getAllGroupMetadatas,
	                    getGroupsForOwner: groupMetadata_1.getGroupsForOwner,
	                    postGroupDetails: groupMetadata_1.postGroupDetails,
	                    updateGroupDetails: groupMetadata_1.updateGroupDetails,
	                    deleteGroupByGroupId: groupMetadata_1.deleteGroupByGroupId
	                },
	                certification: {
	                    createHardwareCertification: certification_1.createHardwareCertification,
	                    updateHardwareCertification: certification_1.updateHardwareCertification,
	                    getCaseNumberFromPortalId: certification_1.getCaseNumberFromPortalId,
	                    getHardwareCertification: certification_1.getHardwareCertification,
	                    createOpenStackCertification: certification_1.createOpenStackCertification,
	                    updateOpenStackCertification: certification_1.updateOpenStackCertification,
	                    getOpenStackCertification: certification_1.getOpenStackCertification,
	                    getOpenStackApi: certification_1.getOpenStackApi,
	                    getOpenStackFeature: certification_1.getOpenStackFeature,
	                    getOpenStackProtocol: certification_1.getOpenStackProtocol,
	                    getOpenStackVendorProduct: vendorProduct_1.getOpenStackVendorProduct,
	                    updateOpenStackVendorProduct: vendorProduct_1.updateOpenStackVendorProduct,
	                    getTestClasses: testClass_1.getTestClasses,
	                    getOpenStackVendorProductComponents: vendorProduct_1.getOpenStackVendorProductComponents,
	                    getCertificationTestPlan: certificationTest_1.getCertificationTestPlan,
	                    updateCertificationTestPlanComponent: certificationTest_1.updateCertificationTestPlanComponent,
	                    updateCertificationTestPlanItem: certificationTest_1.updateCertificationTestPlanItem,
	                    updateCertificationExceptionReason: certificationTest_1.updateCertificationExceptionReason,
	                    getCertificationTestResults: certificationTest_1.getCertificationTestResults,
	                    getCertificationTestLog: certificationTest_1.getCertificationTestLog,
	                    getCertificationSubTestLog: certificationTest_1.getCertificationSubTestLog,
	                    updateResultReview: certificationTest_1.updateResultReview,
	                    updateSubTestStatus: certificationTest_1.updateSubTestStatus
	                },
	                hive: {
	                    getAll: hive_1.getAll,
	                    getProgram: hive_1.getProgram,
	                    getPrograms: hive_1.getPrograms,
	                    getRedHatProduct: hive_1.getRedHatProduct,
	                    getRedHatProducts: hive_1.getRedHatProducts,
	                    getRedHatVersion: hive_1.getRedHatVersion,
	                    getRedHatVersions: hive_1.getRedHatVersions,
	                    getPlatform: hive_1.getPlatform,
	                    getPlatforms: hive_1.getPlatforms
	                },
	                review: {
	                    getQuestions: review_1.getQuestions,
	                    getKtQuestions: review_1.getKtQuestions,
	                    getReviews: review_1.getReviews,
	                    createReview: review_1.createReview
	                },
	                users: {
	                    getUsers: user_2.getUsers,
	                    getUserById: user_2.getUserById,
	                    getUserBySSO: user_2.getUserBySSO,
	                    getCaseGroups: user_2.getCaseGroups,
	                    getRoles: user_2.getRoles,
	                    updateUser: user_2.updateUser,
	                    getChatterComments: comment_1.getChatterComments,
	                    getNnoRegions: user_2.getNnoRegions,
	                    updateUserInformation: user_2.updateUserInformation,
	                    getAllRoleTemplates: user_2.getAllRoleTemplates,
	                    getUserSbrs: user_2.getUserSbrs,
	                    getUserTags: user_2.getUserTags,
	                    getUserQueueBuddies: user_2.getUserQueueBuddies,
	                    getAllRoles: user_2.getAllRoles,
	                    getLanguage: user_2.getLanguage
	                },
	                kyce: {
	                    runKyce: kyce_1.runKyce
	                },
	                commentFeedback: {
	                    createCommentFeedback: commentFeedback_1.createCommentFeedback,
	                    updateCommentFeedback: commentFeedback_1.updateCommentFeedback,
	                    getCommentFeedback: commentFeedback_1.getCommentFeedback
	                },
	                kcs: {
	                    linkKcsResources: kcs_1.linkKcsResources,
	                    getSolution: kcs_1.getSolution,
	                    getResources: kcs_1.getResources
	                },
	                products: {
	                    getProducts: products_1.getProducts,
	                    getProductVersions: products_1.getProductVersions
	                },
	                sbrs: {
	                    getSbr: sbrs_1.getSbr,
	                    getSbrs: sbrs_1.getSbrs,
	                    getSbrTags: sbrs_1.getSbrTags
	                },
	                externalTrackers: {
	                    getExternalTrackers: externalTrackers_1.getExternalTrackers,
	                    getExternalTrackersUpdates: externalTrackers_1.getExternalTrackersUpdates
	                },
	                solr: {
	                    getSolrAccess: solr_1.getSolrAccess,
	                    getSolrCases: solr_1.getSolrCases
	                },
	                accounts: {
	                    getAccount: account_2.getAccount,
	                    getAccountContacts: account_2.getAccountContacts,
	                    getAccountNotes: account_2.getAccountNotes,
	                    getAccountTeamMembers: account_2.getAccountTeamMembers,
	                    patchAccounts: account_2.patchAccounts,
	                    getContactDetailBySso: account_2.getContactDetailBySso
	                },
	                businessHours: {
	                    getBusinessHours: businessHours_1.getBusinessHours
	                },
	                tags: {
	                    getTags: tags_1.getTags
	                },
	                callcenters: {
	                    getCallCenters: callCenters_1.getCallCenters,
	                    getCallCenter: callCenters_1.getCallCenter
	                },
	                fields: {
	                    getCaseFields: case_1.getCaseFields,
	                    getUserFields: user_1.getUserFields,
	                    getContactFields: contact_1.getContactFields,
	                    getCaseGroupFields: caseGroup_1.getCaseGroupFields,
	                    getCaseBomgarSessionFields: bomgar_1.getCaseBomgarSessionFields,
	                    getAccountFields: account_3.getAccountFields,
	                    getAccountNoteFields: account_3.getAccountNoteFields,
	                    getAccountMemberFields: account_3.getAccountMemberFields,
	                    getCaseCommentFields: comment_2.getCaseCommentFields,
	                    getLiveChatTranscriptFields: chat_1.getLiveChatTranscriptFields,
	                    getBugzillaBugFields: bugzilla_1.getBugzillaBugFields,
	                    getProductFields: product_1.getProductFields,
	                    getExternalTrackerFields: externalTracker_1.getExternalTrackerFields
	                },
	                caseHistory: {
	                    getHistory: caseHistory_1.getHistory
	                },
	                escalations: {
	                    getEscalations: escalation_1.getEscalations,
	                    createIceEscalation: escalation_1.createIceEscalation
	                },
	                userManagement: {
	                    createRole: roles_1.createRole,
	                    updateRole: roles_1.updateRole,
	                    deleteRole: roles_1.deleteRole
	                },
	                vocabulary: {
	                    getVocabularyCategory: vocabulary_1.getVocabularyCategory,
	                    getVocabularyComponents: vocabulary_1.getVocabularyComponents,
	                    getVocabularyProducts: vocabulary_1.getVocabularyProducts,
	                    getVocabularySbrs: vocabulary_1.getVocabularySbrs,
	                    getVocabularyTags: vocabulary_1.getVocabularyTags
	                },
	                maintenance: {
	                    getMaintenanceMode: maintenance_1.getMaintenanceMode
	                },
	                dashboard: {
	                    getViews: view_1.getViews,
	                    getLabs: view_1.getLabs,
	                    getAccountDetails: view_1.getAccountDetails,
	                    getAllCaseInfo: view_1.getAllCaseInfo,
	                    getErrata: view_1.getErrata,
	                    getSubscriptionStats: view_1.getSubscriptionStats,
	                    getInsights: view_1.getInsights,
	                    getAccounts: account_1.getAccounts
	                },
	                csp: {
	                    metadata: {
	                        getMetadata: metadata_1.getMetadata
	                    },
	                    account: {
	                        getCSAccounts: account_4.getCSAccounts,
	                        getOpenCaseCount: account_4.getOpenCaseCount,
	                        getCTACount: account_4.getCTACount,
	                        getEntitlementCount: account_4.getEntitlementCount
	                    },
	                    contact: {
	                        getContacts: contact_2.getContacts
	                    },
	                    cta: {
	                        listCtas: cta_1.listCtas,
	                        getCtaGroupedCount: cta_1.getCtaGroupedCount,
	                        getCta: cta_1.getCta,
	                        updateCta: cta_1.updateCta,
	                        updateCtaTask: cta_1.updateCtaTask,
	                        addCta: cta_1.addCta,
	                        addTask: cta_1.addTask,
	                        deleteCta: cta_1.deleteCta,
	                        deleteTask: cta_1.deleteTask,
	                        getCtaTasks: cta_1.getCtaTasks,
	                        getCtaComments: cta_1.getCtaComments,
	                        getCtaComment: cta_1.getCtaComment,
	                        updateCtaComment: cta_1.updateCtaComment,
	                        deleteCtaComment: cta_1.deleteCtaComment,
	                        addCtaComment: cta_1.addCtaComment
	                    },
	                    successPlan: {
	                        getSuccessPlansForUserName: successPlan_1.getSuccessPlansForUserName,
	                        getSuccessPlansForAccountNumber: successPlan_1.getSuccessPlansForAccountNumber,
	                        getSuccessPlansForId: successPlan_1.getSuccessPlansForId,
	                        updateSuccessPlan: successPlan_1.updateSuccessPlan,
	                        addSuccessPlan: successPlan_1.addSuccessPlan,
	                        removeSuccessPlan: successPlan_1.removeSuccessPlan,
	                        addProduct: successPlan_1.addProduct,
	                        updateProduct: successPlan_1.updateProduct,
	                        removeProduct: successPlan_1.removeProduct,
	                        addObjective: successPlan_1.addObjective,
	                        updateObjective: successPlan_1.updateObjective,
	                        removeObjective: successPlan_1.removeObjective,
	                        addObjectiveLink: successPlan_1.addObjectiveLink,
	                        updateObjectiveLink: successPlan_1.updateObjectiveLink,
	                        removeObjectiveLink: successPlan_1.removeObjectiveLink,
	                        addObjectiveStakeholder: successPlan_1.addObjectiveStakeholder,
	                        updateObjectiveStakeholder: successPlan_1.updateObjectiveStakeholder,
	                        removeObjectiveStakeholder: successPlan_1.removeObjectiveStakeholder
	                    },
	                    timeline: {
	                        getTimeline: timeline_1.getTimeline,
	                        getTimelineActivity: timeline_1.getTimelineActivity,
	                        updateTimelineActivity: timeline_1.updateTimelineActivity,
	                        addTimelineActivity: timeline_1.addTimelineActivity,
	                        deleteTimelineActivity: timeline_1.deleteTimelineActivity
	                    }
	                }
	            };

	            /***/
	        },
	        /* 9 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function runInsights(caseNumber, attachmentId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/attachments/" + attachmentId + "/insights");
	                return fetch_1.getUri(uri);
	            }
	            exports.runInsights = runInsights;
	            function getInsightsRules(ruleIds) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/insights/rules");
	                return !!ruleIds ? fetch_1.postUri(uri, { ruleIds: ruleIds }) : fetch_1.getUri(uri);
	            }
	            exports.getInsightsRules = getInsightsRules;

	            /***/
	        },
	        /* 10 */
	        /***/function (module, exports) {

	            // shim for using process in browser
	            var process = module.exports = {};

	            // cached from whatever global is present so that test runners that stub it
	            // don't break things.  But we need to wrap it in a try catch in case it is
	            // wrapped in strict mode code which doesn't define any globals.  It's inside a
	            // function because try/catches deoptimize in certain engines.

	            var cachedSetTimeout;
	            var cachedClearTimeout;

	            function defaultSetTimout() {
	                throw new Error('setTimeout has not been defined');
	            }
	            function defaultClearTimeout() {
	                throw new Error('clearTimeout has not been defined');
	            }
	            (function () {
	                try {
	                    if (typeof setTimeout === 'function') {
	                        cachedSetTimeout = setTimeout;
	                    } else {
	                        cachedSetTimeout = defaultSetTimout;
	                    }
	                } catch (e) {
	                    cachedSetTimeout = defaultSetTimout;
	                }
	                try {
	                    if (typeof clearTimeout === 'function') {
	                        cachedClearTimeout = clearTimeout;
	                    } else {
	                        cachedClearTimeout = defaultClearTimeout;
	                    }
	                } catch (e) {
	                    cachedClearTimeout = defaultClearTimeout;
	                }
	            })();
	            function runTimeout(fun) {
	                if (cachedSetTimeout === setTimeout) {
	                    //normal enviroments in sane situations
	                    return setTimeout(fun, 0);
	                }
	                // if setTimeout wasn't available but was latter defined
	                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	                    cachedSetTimeout = setTimeout;
	                    return setTimeout(fun, 0);
	                }
	                try {
	                    // when when somebody has screwed with setTimeout but no I.E. maddness
	                    return cachedSetTimeout(fun, 0);
	                } catch (e) {
	                    try {
	                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	                        return cachedSetTimeout.call(null, fun, 0);
	                    } catch (e) {
	                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	                        return cachedSetTimeout.call(this, fun, 0);
	                    }
	                }
	            }
	            function runClearTimeout(marker) {
	                if (cachedClearTimeout === clearTimeout) {
	                    //normal enviroments in sane situations
	                    return clearTimeout(marker);
	                }
	                // if clearTimeout wasn't available but was latter defined
	                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	                    cachedClearTimeout = clearTimeout;
	                    return clearTimeout(marker);
	                }
	                try {
	                    // when when somebody has screwed with setTimeout but no I.E. maddness
	                    return cachedClearTimeout(marker);
	                } catch (e) {
	                    try {
	                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	                        return cachedClearTimeout.call(null, marker);
	                    } catch (e) {
	                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	                        return cachedClearTimeout.call(this, marker);
	                    }
	                }
	            }
	            var queue = [];
	            var draining = false;
	            var currentQueue;
	            var queueIndex = -1;

	            function cleanUpNextTick() {
	                if (!draining || !currentQueue) {
	                    return;
	                }
	                draining = false;
	                if (currentQueue.length) {
	                    queue = currentQueue.concat(queue);
	                } else {
	                    queueIndex = -1;
	                }
	                if (queue.length) {
	                    drainQueue();
	                }
	            }

	            function drainQueue() {
	                if (draining) {
	                    return;
	                }
	                var timeout = runTimeout(cleanUpNextTick);
	                draining = true;

	                var len = queue.length;
	                while (len) {
	                    currentQueue = queue;
	                    queue = [];
	                    while (++queueIndex < len) {
	                        if (currentQueue) {
	                            currentQueue[queueIndex].run();
	                        }
	                    }
	                    queueIndex = -1;
	                    len = queue.length;
	                }
	                currentQueue = null;
	                draining = false;
	                runClearTimeout(timeout);
	            }

	            process.nextTick = function (fun) {
	                var args = new Array(arguments.length - 1);
	                if (arguments.length > 1) {
	                    for (var i = 1; i < arguments.length; i++) {
	                        args[i - 1] = arguments[i];
	                    }
	                }
	                queue.push(new Item(fun, args));
	                if (queue.length === 1 && !draining) {
	                    runTimeout(drainQueue);
	                }
	            };

	            // v8 likes predictible objects
	            function Item(fun, array) {
	                this.fun = fun;
	                this.array = array;
	            }
	            Item.prototype.run = function () {
	                this.fun.apply(null, this.array);
	            };
	            process.title = 'browser';
	            process.browser = true;
	            process.env = {};
	            process.argv = [];
	            process.version = ''; // empty string to avoid regexp issues
	            process.versions = {};

	            function noop() {}

	            process.on = noop;
	            process.addListener = noop;
	            process.once = noop;
	            process.off = noop;
	            process.removeListener = noop;
	            process.removeAllListeners = noop;
	            process.emit = noop;
	            process.prependListener = noop;
	            process.prependOnceListener = noop;

	            process.listeners = function (name) {
	                return [];
	            };

	            process.binding = function (name) {
	                throw new Error('process.binding is not supported');
	            };

	            process.cwd = function () {
	                return '/';
	            };
	            process.chdir = function (dir) {
	                throw new Error('process.chdir is not supported');
	            };
	            process.umask = function () {
	                return 0;
	            };

	            /***/
	        },
	        /* 11 */
	        /***/function (module, exports, __webpack_require__) {

	            var __WEBPACK_AMD_DEFINE_RESULT__; /*!
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

	            (function (global) {

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
	                    Array.prototype.forEach = function (callback, thisArg) {
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

	                    parserKeys.forEach(function (key, i) {
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

	                    if (typeof str === 'undefined' || str === null || str === '') {
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
	                ['protocol', 'userInfo', 'host', 'port', 'path', 'anchor'].forEach(function (key) {
	                    Uri.prototype[key] = function (val) {
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
	                Uri.prototype.hasAuthorityPrefix = function (val) {
	                    if (typeof val !== 'undefined') {
	                        this.hasAuthorityPrefixUserPref = val;
	                    }

	                    if (this.hasAuthorityPrefixUserPref === null) {
	                        return this.uriParts.source.indexOf('//') !== -1;
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
	                Uri.prototype.query = function (val) {
	                    var s = '',
	                        i,
	                        param,
	                        l;

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
	                    var arr = [],
	                        i,
	                        param,
	                        l;
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
	                    var arr = [],
	                        i,
	                        param,
	                        keyMatchesFilter,
	                        valMatchesFilter,
	                        l;

	                    for (i = 0, l = this.queryPairs.length; i < l; i++) {

	                        param = this.queryPairs[i];
	                        keyMatchesFilter = decode(param[0]) === decode(key);
	                        valMatchesFilter = param[1] === val;

	                        if (arguments.length === 1 && !keyMatchesFilter || arguments.length === 2 && (!keyMatchesFilter || !valMatchesFilter)) {
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
	                    var i,
	                        len = this.queryPairs.length;
	                    for (i = 0; i < len; i++) {
	                        if (this.queryPairs[i][0] == key) return true;
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
	                    var index = -1,
	                        len = this.queryPairs.length,
	                        i,
	                        param;

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
	                ['protocol', 'hasAuthorityPrefix', 'isColonUri', 'userInfo', 'host', 'port', 'path', 'query', 'anchor'].forEach(function (key) {
	                    var method = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
	                    Uri.prototype[method] = function (val) {
	                        this[key](val);
	                        return this;
	                    };
	                });

	                /**
	                 * Scheme name, colon and doubleslash, as required
	                 * @return {string} http:// or possibly just //
	                 */
	                Uri.prototype.scheme = function () {
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
	                Uri.prototype.origin = function () {
	                    var s = this.scheme();

	                    if (this.userInfo() && this.host()) {
	                        s += this.userInfo();
	                        if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
	                            s += '@';
	                        }
	                    }

	                    if (this.host()) {
	                        s += this.host();
	                        if (this.port() || this.path() && this.path().substr(0, 1).match(/[0-9]/)) {
	                            s += ':' + this.port();
	                        }
	                    }

	                    return s;
	                };

	                /**
	                 * Adds a trailing slash to the path
	                 */
	                Uri.prototype.addTrailingSlash = function () {
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
	                Uri.prototype.toString = function () {
	                    var path,
	                        s = this.origin();

	                    if (this.isColonUri()) {
	                        if (this.path()) {
	                            s += ':' + this.path();
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
	                Uri.prototype.clone = function () {
	                    return new Uri(this.toString());
	                };

	                /**
	                 * export via AMD or CommonJS, otherwise leak a global
	                 */
	                if (true) {
	                    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	                        return Uri;
	                    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	                } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	                    module.exports = Uri;
	                } else {
	                    global.Uri = Uri;
	                }
	            })(this);

	            /***/
	        },
	        /* 12 */
	        /***/function (module, exports) {

	            module.exports = function _btoa(str) {
	                return btoa(str);
	            };

	            /***/
	        },
	        /* 13 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllRoleMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/roleMetadata/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllRoleMetadatas = getAllRoleMetadatas;

	            /***/
	        },
	        /* 14 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getTestClasses(productType, pluginType) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/testclasses");
	                uri.addQueryParam('isSupport', true);
	                uri.addQueryParam('productType', productType);
	                if (pluginType) {
	                    uri.addQueryParam('pluginType', pluginType);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getTestClasses = getTestClasses;

	            /***/
	        },
	        /* 15 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function health() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/health");
	                return fetch_1.getUri(uri);
	            }
	            exports.health = health;
	            function hostname() {
	                return env_1.default.hydraHostName.toString();
	            }
	            exports.hostname = hostname;

	            /***/
	        },
	        /* 16 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function runKyce(attachmentId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/hardgrok/attachments/" + attachmentId + "/inspect");
	                var headerParam = [];
	                headerParam.push({
	                    key: 'Accept',
	                    value: 'application/vnd.api.v1+json'
	                });
	                return fetch_1.getUri(uri, headerParam);
	            }
	            exports.runKyce = runKyce;

	            /***/
	        },
	        /* 17 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getBusinessHours(timezone) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/businesshours");
	                uri.addQueryParam('timezone', timezone);
	                return fetch_1.getUri(uri);
	            }
	            exports.getBusinessHours = getBusinessHours;

	            /***/
	        },
	        /* 18 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getTags(fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/tags");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getTags = getTags;

	            /***/
	        },
	        /* 19 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getBrmsResponse(brmsPayload) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/brms/");
	                return fetch_1.postUri(uri, brmsPayload, 'text');
	            }
	            exports.getBrmsResponse = getBrmsResponse;

	            /***/
	        },
	        /* 20 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            var contact_1 = __webpack_require__(3);
	            var caseGroup_1 = __webpack_require__(4);
	            var bugzilla_1 = __webpack_require__(5);
	            var account_1 = __webpack_require__(6);
	            var entitlement_1 = __webpack_require__(21);
	            var product_1 = __webpack_require__(7);
	            var recordType_1 = __webpack_require__(22);
	            function getCaseFields(options) {
	                var finalFields = [];
	                var caseFields = ['accountBugzillaConfidentialGroup', 'accountId', 'accountNumber', 'actionPlan', 'actionPlanLastUpdated', 'actionPlanLastUpdatedByUserId', 'alternateId', 'amcFinalRemedyProvided', 'amcTemporaryRemedyProvided', 'automationEnabledForCaseComputed', 'bugId', 'bugzillaLink', 'bugzillaNumber', 'bugzillaSummary', 'businessHoursId', 'caseContact', 'caseCreatedDayOfWeek', 'caseCreatedHourOfDay', 'caseGroupId', 'caseLanguage', 'caseLink', 'caseNumber', 'caseOwnerId', 'caseSummary', 'caseType', 'certArchitecture', 'certCategory', 'certPortalId', 'certProduct', 'certVendorName', 'certVendorPortalId', 'certVendorProductName', 'certVendorProductPortalId', 'certVersion', 'certProgram', 'closedDate', 'commentCount', 'contactId', 'contactInfo24x7', 'contributors', 'createdByContactId', 'createdByUserId', 'createdByName', 'createdDate', 'critSit', 'currentCaseOwnerManagersEmail', 'customerCaseNotes', 'customerEngagementScorecard', 'customerEscalation', 'customerSegment', 'description', 'emailAddress', 'enhancedSLA', 'entitlementId', 'entitlementNeedsAttention', 'entitlementState', 'environment', 'externalHandlingSystem', 'externalLock', 'externalLockById', 'externalLockDate', 'fts', 'ftsHandoverReady', 'ftsRole', 'hasCommentsUnreadByOwner', 'hasNewPublicComment', 'hasSelfServiceComments', 'hostname', 'hotfixDelivered', 'hotfixDeliveredDate', 'hotfixRequestDate', 'hotfixRequested', 'hoursSinceLastPublicComment', 'id', 'identifyingAddressCountry', 'initialServiceLevel', 'internalStatus', 'isABRTCaseThatShouldRemainClosed', 'isClosed', 'isDeleted', 'isEscalated', 'isPOC', 'isReviewed', 'isStopped', 'issue', 'itar', 'kickCase', 'lastBreach', 'lastClosedAt', 'lastEscalationUpdatedAt', 'lastModifiedByContactId', 'lastModifiedById', 'lastModifiedByLink', 'lastModifiedByName', 'lastModifiedByUserId', 'lastModifiedDate', 'legacyId', 'legacySystem', 'linkToCaseInPortal', 'linkedResourceCount', 'linkedToRecommendationOnClosure', 'linkedToRecommendationOnClosureSet', 'milestoneStatus', 'name', 'needsNewOwner', 'noAutomationForCase', 'normalizedServiceLevel', 'numberOfBreaches', 'origin', 'ownerIRCNickname', 'ownerId', 'ownersManagersEmail', 'ownerOutOfOffice', 'priorityScore', 'isPrivate', 'proactive', 'privateCommentCount', 'product', 'productFamily', 'publicComment', 'publicCommentCount', 'publicTSEComments', 'reliefAt', 'remoteSessionCount', 'requestManagementEscalation', 'resolution', 'resolutionDescription', 'resolvedAt', 'sbrGroup', 'sbt', 'sbtState', 'searchHelper', 'sendCSATSurvey', 'severity', 'slaExitDate', 'slaStartDate', 'srmFlag', 'status', 'strategic', 'subject', 'summaryLastModifiedByUserId', 'summaryLastUpdated', 'tags', 'tamCase', 'targetDate', 'translators', 'ttc', 'version', 'waitingOnCallback'];
	                Array.prototype.push.apply(finalFields, caseFields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['accountNumberRef', 'assetId', 'caseOwnerIsTam', 'caseOwnerManagersEmail', 'caseOwnerSuperRegion', 'createdById', 'createdByLink', 'createdDateGainsight', 'closedDateGainsight', 'company', 'connectionReceivedId', 'connectionSentId', 'contactLink', 'contactPreferredLanguage', 'firstCaseInactivityWarningSentAt', 'highestSeverity', 'hoursInCurrentStatus', 'hoursSinceCaseLastUpdated', 'hoursSinceLastCommentOfAnyType', 'hoursSinceLastPrivateComment', 'hxComment', 'hxDirection', 'hxHubId', 'hxId', 'hxIsEscalation', 'hxPartnerId', 'hxStatus', 'lastETUUpdatedAt', 'lastEscalationAssociatedAt', 'lastPrivateCommentDateTime', 'lastPublicAttachmentMs', 'lastPublicCaseUpdateContactId', 'lastPublicCaseUpdateMs', 'lastPublicCaseUpdateUserId', 'lastPublicCommentDateTime', 'lastPublicCommentPublishedMs', 'lastPublicUpdateBy', 'lastPublicUpdateDateDisplay', 'lastReferencedDate', 'lastStatusChange', 'lastUpdateDate', 'lastViewedDate', 'ltrocClosed', 'ltrocClosedSet', 'manuallySetNoCSATSurvey', 'newTimestamp', 'originalDescription', 'originalEnvironment', 'originalIssue', 'originalPeriodicityOfIssue', 'originalProduct', 'originalServiceLevel', 'originalSeverity', 'originalSubject', 'originalTimeFramesAndUrgency', 'originalVersion',
	                    // 'parent',
	                    'parentId', 'periodicityOfIssue', 'prsRecordId', 'pushToPartner', 'priorityScoreExplanation', 'priorityScoreFormula', 'phone', 'priorityScoreLastUpdateDate', 'reason', 'redHatLogin', 'recordType', 'recordTypeId', 'redHatLoginRef', 'refTagForEmails', 'relatedChanges', 'reopenCount', 'resetSBTCount', 'rhProductId', 'rhVersionId', 'secondCaseInactivityWarningSentAt', 'stopStartDate', 'systemModstamp', 'timeFramesAndUrgency', 'timeSinceCaseWasLastUpdated', 'totalDaysWoCollaboration', 'totalEscalation', 'userAgent', 'vhtScore'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "createdByContact." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdByUser." + f;
	                    }));
	                }
	                if (options && options.includeActionPlanLastUpdatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "actionPlanLastUpdatedByUser." + f;
	                    }));
	                }
	                if (options && options.includeExternalLockBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "externalLockBy." + f;
	                    }));
	                }
	                if (options && options.includeAccount) {
	                    Array.prototype.push.apply(finalFields, account_1.getAccountFields(options).map(function (f) {
	                        return "account." + f;
	                    }));
	                }
	                if (options && options.includeRecordType) {
	                    Array.prototype.push.apply(finalFields, recordType_1.getRecordTypeFields(options).map(function (f) {
	                        return "recordType." + f;
	                    }));
	                }
	                // Currently not used
	                if (options && options.includeBug) {
	                    Array.prototype.push.apply(finalFields, bugzilla_1.getBugzillaBugFields().map(function (f) {
	                        return "bug." + f;
	                    }));
	                }
	                if (options && options.includeCaseGroup) {
	                    Array.prototype.push.apply(finalFields, caseGroup_1.getCaseGroupFields().map(function (f) {
	                        return " caseGroup." + f;
	                    }));
	                }
	                if (options && options.includeCaseOwner) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "caseOwner." + f;
	                    }));
	                }
	                if (options && options.includeContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "contact." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedByUser." + f;
	                    }));
	                }
	                if (options && options.includeLastPublicCaseUpdateUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastPublicCaseUpdateUser." + f;
	                    }));
	                }
	                if (options && options.includeLastPublicCaseUpdateContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "lastPublicCaseUpdateContact." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "lastModifiedByContact." + f;
	                    }));
	                }
	                if (options && options.includeSummaryLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "summaryLastModifiedByUser." + f;
	                    }));
	                }
	                if (options && options.includeEntitlement) {
	                    Array.prototype.push.apply(finalFields, entitlement_1.getEntitlementFields(options).map(function (f) {
	                        return "entitlement." + f;
	                    }));
	                }
	                if (options && options.includeProduct) {
	                    Array.prototype.push.apply(finalFields, product_1.getProductFields(options).map(function (f) {
	                        return "rhProduct." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getCaseFields = getCaseFields;

	            /***/
	        },
	        /* 21 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getEntitlementFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'name', 'status', 'serviceLevel', 'serviceType', 'supportLevel'];
	                // 'createdBy: IUser;
	                // 'lastModifiedBy: IUser;
	                // 'account: IAccount;
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['createdById', 'createdDate', 'lastModifiedById', 'lastModifiedDate', 'isDeleted', 'accountId', 'assetId', 'isAssociatedWithNoEngineeringProducts', 'businessHoursId', 'businessUnit', 'casesPerEntitlement', 'isConsiderSupported', 'contractLineItemId', 'contractLineItemSubscriptionProductNum', 'endDate', 'entitlementProcessRule', 'externalAccountNumber', 'externalContractId', 'externalContractLineItemId', 'externalEntitlementId', 'externalProductCode', 'installBaseNumber', 'isPerIncident', 'isActive', 'isL3', 'isLayered', 'isManuallySelectedEntitlementProcess', 'isTAMEntitlement', 'lastReferencedDate', 'lastViewedDate', 'levelTypeConcat', 'oracleStatus', 'quantity', 'remainingCases', 'serviceContractId', 'serviceLevelLabel', 'serviceValue', 'slaProcessId', 'startDate', 'statusAndStartDate', 'subscriptionNumber', 'subscriptionProductNumber', 'type', 'coordinates'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                return finalFields;
	            }
	            exports.getEntitlementFields = getEntitlementFields;

	            /***/
	        },
	        /* 22 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getRecordTypeFields(options) {
	                var finalFields = [];
	                var fields = ['name'];
	                Array.prototype.push.apply(finalFields, fields);
	                return finalFields;
	            }
	            exports.getRecordTypeFields = getRecordTypeFields;

	            /***/
	        },
	        /* 23 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getCaseBomgarSessionFields(options) {
	                var finalFields = [];
	                var caseBomgarSessionFields = ['id', 'createdById', 'createdDate', 'lastModifiedById', 'lastModifiedDate', 'name', 'duration', 'primaryCustomerName', 'primarySupportRepName', 'salesforceRecordId', 'sessionRecordingUrl', 'sessionStartDate', 'sessionEndDate'];
	                Array.prototype.push.apply(finalFields, caseBomgarSessionFields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['ownerId', 'isDeleted', 'chatDownloadUrl', 'chatViewUrl', 'externalKey', 'fileTransferCount', 'hostname', 'os', 'privateIp', 'publicSiteId', 'publicIp', 'recordingDownloadUrl', 'recordingViewUrl', 'relatedCase', 'durationHours', 'sessionRecording', 'lastActivityDate', 'lastReferencedDate', 'lastViewedDate'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getCaseBomgarSessionFields = getCaseBomgarSessionFields;

	            /***/
	        },
	        /* 24 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getHistory(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/history");
	                if (options) {
	                    if (options.fields && options.fields.length > 0) {
	                        uri.addQueryParam('fields', options.fields.join(','));
	                    }
	                    Object.keys(options).filter(function (k) {
	                        return k !== 'fields';
	                    }).forEach(function (k) {
	                        if (options[k] !== undefined) {
	                            uri.addQueryParam(k, options[k]);
	                        }
	                    });
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getHistory = getHistory;

	            /***/
	        },
	        /* 25 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getEscalations(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/escalations");
	                if (options.caseNumber) {
	                    uri.addQueryParam('caseNumber', options.caseNumber);
	                }
	                if (options.accountNumber) {
	                    uri.addQueryParam('accountNumber', options.accountNumber);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getEscalations = getEscalations;
	            function createIceEscalation(escalation) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/escalations");
	                return fetch_1.postUri(uri, escalation);
	            }
	            exports.createIceEscalation = createIceEscalation;

	            /***/
	        },
	        /* 26 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getLiveChatTranscriptFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'createdDate', 'chatDuration', 'lastModifiedDate', 'body', 'status'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['isDeleted', 'accountId', 'accountIdFormula', 'averageResponseTimeOperator', 'averageResponseTimeVisitor', 'browser', 'browserLanguage', 'caseId', 'createdById', 'lastModifiedById', 'caseNumber', 'contactId', 'contactIdFormula', 'endTime', 'endedBy', 'ipAddress', 'lastReferencedDate', 'lastViewedDate', 'leadId', 'liveChatButtonId', 'liveChatDeploymentId', 'liveChatVisitorId', 'location', 'operatorMessageCount', 'ownerId', 'platform', 'referrerUri', 'requestTime', 'ssoUsername', 'screenResolution', 'skillId', 'startTime', 'timeToAnswer', 'userAgent', 'visitorMessageCount'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeAccount) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "account." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getLiveChatTranscriptFields = getLiveChatTranscriptFields;

	            /***/
	        },
	        /* 27 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getExternalTrackerFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'createdDate', 'description', 'hasBeenPushedSuccessfully', 'hasBeenPushed', 'lastModifiedDate', 'rejected', 'resourceKey', 'resourceURL', 'status', 'system', 'ticketReference', 'title'];
	                // 'collaborationComment: ICaseComment;
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['closedAt', 'collaborationCommentId', 'caseId', 'createdAt', 'createdById', 'deletedAt', 'deletedByName', 'establishedBy', 'eligibilityKeyValue', 'identifier', 'lastModifiedById', 'lastActivityDate', 'lastReferencedDate', 'lastViewedDate', 'lastPushRequest', 'liveID', 'name', 'overrideEntitlementCheck', 'productID', 'productName', 'rejectedAt', 'rejectedMessage', 'severity', 'solveCallingCountry', 'supportTopicID', 'supportTopicName', 'systemInstance', 'visibilityLevel'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getExternalTrackerFields = getExternalTrackerFields;

	            /***/
	        },
	        /* 28 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getViews(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/views");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getViews = getViews;
	            function getLabs(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/labs");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getLabs = getLabs;
	            function getAccountDetails(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/account/details");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountDetails = getAccountDetails;
	            function getAllCaseInfo(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/cases");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllCaseInfo = getAllCaseInfo;
	            function getErrata(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/errata");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getErrata = getErrata;
	            function getInsights(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/insights");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getInsights = getInsights;
	            function getSubscriptionStats(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/subscriptions");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getSubscriptionStats = getSubscriptionStats;
	            function paramValid(param) {
	                return !(param.length === 0 && param === '');
	            }

	            /***/
	        },
	        /* 29 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAccounts() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/accounts");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccounts = getAccounts;

	            /***/
	        },
	        /* 30 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getComments(caseNumber, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments");
	                if (options && options.limit && options.limit > 0) {
	                    uri.addQueryParam('limit', options.limit);
	                }
	                if (options && options.orderDirection) {
	                    uri.addQueryParam('orderDirection', options.orderDirection);
	                }
	                if (options && options.orderBy) {
	                    uri.addQueryParam('orderBy', options.orderBy);
	                }
	                if (options && options.offsetType) {
	                    uri.addQueryParam('offsetType', options.offsetType);
	                }
	                if (options && options.offsetValue) {
	                    uri.addQueryParam('offsetValue', options.offsetValue);
	                }
	                if (options && options.fields && options.fields.length > 0) {
	                    return fetch_1.postUri(uri, { fields: options.fields.join(',') });
	                } else {
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getComments = getComments;
	            function upsertComment(comment, doNotSendEmail) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/comments");
	                if (doNotSendEmail === true) {
	                    uri.addQueryParam('doNotSendEmail', true);
	                }
	                return fetch_1.putUri(uri, comment);
	            }
	            exports.upsertComment = upsertComment;
	            function getChatterComments(userId, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/comments");
	                if (options && options.fromDate) {
	                    uri.addQueryParam('fromDate', options.fromDate);
	                }
	                if (options && options.toDate) {
	                    uri.addQueryParam('toDate', options.toDate);
	                }
	                if (options && options.dateType) {
	                    uri.addQueryParam('dateType', options.dateType);
	                }
	                if (options.fields && options.fields.length > 0) {
	                    uri.addQueryParam('fields', options.fields.join(','));
	                }
	                if (options.limit && options.limit > 0) {
	                    uri.addQueryParam('limit', options.limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getChatterComments = getChatterComments;

	            /***/
	        },
	        /* 31 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getUsers(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users");
	                if (options) {
	                    if (options.fields && options.fields.length > 0) {
	                        uri.addQueryParam('fields', options.fields.join(','));
	                    }
	                    // By default the limit is 100 so if left undefined it will be 100
	                    if (options.limit !== undefined) {
	                        uri.addQueryParam('limit', options.limit);
	                    }
	                    Object.keys(options).filter(function (k) {
	                        return k !== 'fields' && k !== 'limit';
	                    }).forEach(function (k) {
	                        if (options[k] !== undefined) {
	                            uri.addQueryParam(k, options[k]);
	                        }
	                    });
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getUsers = getUsers;
	            function getUserBySSO(sso, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/sso/" + sso);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserBySSO = getUserBySSO;
	            function getUserById(id, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + id);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserById = getUserById;
	            function getCaseGroups(ssoUsername) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + ssoUsername + "/casegroups");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseGroups = getCaseGroups;
	            function updateUser(ssoUsername, user) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/sso/" + ssoUsername);
	                return fetch_1.patchUri(uri, user);
	            }
	            exports.updateUser = updateUser;
	            function getRoles(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/roles");
	                return fetch_1.getUri(uri);
	            }
	            exports.getRoles = getRoles;
	            function getNnoRegions(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/nnoregions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getNnoRegions = getNnoRegions;
	            function getLanguage(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/languages");
	                return fetch_1.getUri(uri);
	            }
	            exports.getLanguage = getLanguage;
	            function getUserSbrs(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/sbrs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserSbrs = getUserSbrs;
	            function getUserTags(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/tags");
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserTags = getUserTags;
	            function getUserQueueBuddies(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/queuebuddies");
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserQueueBuddies = getUserQueueBuddies;
	            // update language,roles, sbrs
	            function updateUserInformation(userId, updateOps) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId);
	                return fetch_1.patchUri(uri, updateOps);
	            }
	            exports.updateUserInformation = updateUserInformation;
	            function getAllRoles() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllRoles = getAllRoles;
	            function getAllRoleTemplates() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roleTemplates");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllRoleTemplates = getAllRoleTemplates;

	            /***/
	        },
	        /* 32 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function linkKcsResources(kcsLinkedResources, isCertificationCase) {
	                if (isCertificationCase === void 0) {
	                    isCertificationCase = false;
	                }
	                if (isCertificationCase) {
	                    var uri_1 = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/cases/certification/KnowledgeResources");
	                    return fetch_1.putUri(uri_1, kcsLinkedResources);
	                }
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/resource");
	                return fetch_1.postUri(uri, kcsLinkedResources);
	            }
	            exports.linkKcsResources = linkKcsResources;
	            function getSolution(id, revisionId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solutions/" + id);
	                if (revisionId) {
	                    uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solutions/" + id + "/revision/" + revisionId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getSolution = getSolution;
	            function getResources(caseNumber, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/resources");
	                if (options) {
	                    if (options.fields && options.fields.length > 0) {
	                        uri.addQueryParam('fields', options.fields.join(','));
	                    }
	                    Object.keys(options).filter(function (k) {
	                        return k !== 'fields';
	                    }).forEach(function (k) {
	                        if (options[k] !== undefined) {
	                            uri.addQueryParam(k, options[k]);
	                        }
	                    });
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getResources = getResources;

	            /***/
	        },
	        /* 33 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            exports.CaseMilestoneTypes = {
	                ONGOING_RESPONES: 'Ongoing Response',
	                FIRST_RESPONSE: 'First Response',
	                BREACH: 'Breach',
	                AMC_FINAL_REMEDY: 'AMC Final Remedy',
	                AMC_TEMPORARY_REMEDY: 'AMC Temporary Remedy'
	            };
	            // caseId can be id or case number
	            // Note that fields can't currently be Fields<ICase> since we don't actively type each field and sub relationship field
	            function getCase(caseId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId);
	                if (fields && fields.length > 0) {
	                    return fetch_1.postUri(uri, { fields: fields.join(',') });
	                } else {
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getCase = getCase;
	            function getCases(filters, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCases = getCases;
	            function updateCase(caseId, kase) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId);
	                return fetch_1.putUri(uri, kase);
	            }
	            exports.updateCase = updateCase;
	            // PCM-3403 - it will honor all email settings the same way like SFDC does
	            function updateCaseByInternal(caseId, kase) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/internal/cases/" + caseId);
	                return fetch_1.putUri(uri, kase);
	            }
	            exports.updateCaseByInternal = updateCaseByInternal;
	            function getLinkedJiras(caseId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/jiras");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getLinkedJiras = getLinkedJiras;
	            function linkJiraToCase(caseId, newLink) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/jira");
	                return fetch_1.postUri(uri, newLink);
	            }
	            exports.linkJiraToCase = linkJiraToCase;
	            function deleteJiraLinkFromCase(caseId, issueKey) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/jira/" + issueKey);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteJiraLinkFromCase = deleteJiraLinkFromCase;
	            function getLanguages() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/languages");
	                return fetch_1.getUri(uri);
	            }
	            exports.getLanguages = getLanguages;
	            function getCaseSbrs() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/metadata/sbrs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseSbrs = getCaseSbrs;
	            function getCaseTags(limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/metadata/tags");
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseTags = getCaseTags;
	            function updateCaseTags(caseNumber, tagsUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/tags");
	                return fetch_1.putUri(uri, tagsUpdate);
	            }
	            exports.updateCaseTags = updateCaseTags;
	            function deleteCaseTags(caseNumber, tagsUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/tags");
	                return fetch_1.deleteUriWithBody(uri, tagsUpdate);
	            }
	            exports.deleteCaseTags = deleteCaseTags;
	            function getSeverities() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/severities");
	                return fetch_1.getUri(uri);
	            }
	            exports.getSeverities = getSeverities;
	            function getStatuses() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/statuses");
	                return fetch_1.getUri(uri);
	            }
	            exports.getStatuses = getStatuses;
	            function getTypes() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/types");
	                return fetch_1.getUri(uri);
	            }
	            exports.getTypes = getTypes;
	            function getCaseExternalTrackers(caseId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externaltrackers");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseExternalTrackers = getCaseExternalTrackers;
	            function getCaseExternalTrackerUpdates(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externaltrackerupdates");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseExternalTrackerUpdates = getCaseExternalTrackerUpdates;
	            function getCaseContacts(caseNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/contacts");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseContacts = getCaseContacts;
	            function addCaseContacts(caseNumber, contacts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/contacts");
	                var apiContacts = (contacts || []).filter(function (c) {
	                    return c.ssoUsername;
	                }).map(function (c) {
	                    return {
	                        ssoName: c.ssoUsername
	                    };
	                });
	                var modifyContacts = {
	                    contacts: apiContacts
	                };
	                return fetch_1.putUri(uri, modifyContacts);
	            }
	            exports.addCaseContacts = addCaseContacts;
	            function deleteCaseContacts(caseNumber, contacts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/contacts");
	                var apiContacts = (contacts || []).filter(function (c) {
	                    return c.ssoUsername;
	                }).map(function (c) {
	                    return {
	                        ssoName: c.ssoUsername
	                    };
	                });
	                var modifyContacts = {
	                    contacts: apiContacts
	                };
	                return fetch_1.deleteUriWithBody(uri, modifyContacts);
	            }
	            exports.deleteCaseContacts = deleteCaseContacts;
	            function getAccountCaseGroups(accountNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/groups/" + accountNumber);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountCaseGroups = getAccountCaseGroups;
	            function getCaseHistory(caseId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/history");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseHistory = getCaseHistory;
	            function getAssociates(caseId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/associates");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAssociates = getAssociates;
	            function addAssociate(caseId, associateUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/associate");
	                return fetch_1.putUri(uri, associateUpdate);
	            }
	            exports.addAssociate = addAssociate;
	            function deleteAssociate(caseId, associateUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/associate");
	                return fetch_1.deleteUriWithBody(uri, associateUpdate);
	            }
	            exports.deleteAssociate = deleteAssociate;
	            function updateOwner(caseId, ssoUsername) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/owner");
	                return fetch_1.putUri(uri, ssoUsername);
	            }
	            exports.updateOwner = updateOwner;
	            function lockCase(caseId, kase) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externalLock");
	                return fetch_1.putUri(uri, kase);
	            }
	            exports.lockCase = lockCase;
	            function unlockCase(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externalLock");
	                return fetch_1.deleteUri(uri);
	            }
	            exports.unlockCase = unlockCase;
	            function getLockedCases(userId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/locked/" + userId);
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                if (fields && fields.length > 0) {
	                    return fetch_1.postUri(uri, { fields: fields.join(',') });
	                } else {
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getLockedCases = getLockedCases;
	            function getBomgarSessionKey(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/bomgar");
	                return fetch_1.getUri(uri);
	            }
	            exports.getBomgarSessionKey = getBomgarSessionKey;
	            function getNep(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.getUri(uri);
	            }
	            exports.getNep = getNep;
	            function createNep(caseNumber, nep) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.postUri(uri, { nep: nep });
	            }
	            exports.createNep = createNep;
	            function updateNep(caseNumber, nep) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.putUri(uri, { nep: nep });
	            }
	            exports.updateNep = updateNep;
	            function deleteNep(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteNep = deleteNep;
	            function getAttachments(caseNumber, includeDeleted) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/attachments/");
	                if (includeDeleted === true) {
	                    uri.addQueryParam('includeDeleted', includeDeleted);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAttachments = getAttachments;
	            function updateAttachment(caseNumber, attachmentId, updateOps) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/attachments/" + attachmentId);
	                return fetch_1.patchUri(uri, updateOps);
	            }
	            exports.updateAttachment = updateAttachment;
	            function getBomgarSessions(caseNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/remotesessions");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getBomgarSessions = getBomgarSessions;
	            function updateCaseSbrs(caseNumber, sbrs) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/sbrs");
	                return fetch_1.putUri(uri, sbrs);
	            }
	            exports.updateCaseSbrs = updateCaseSbrs;
	            function deleteCaseSbrs(caseNumber, sbrs) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/sbrs");
	                return fetch_1.deleteUriWithBody(uri, sbrs);
	            }
	            exports.deleteCaseSbrs = deleteCaseSbrs;
	            function getMilestones(caseNumber, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/milestones");
	                if (options && options.fields && options.fields.length > 0) {
	                    uri.addQueryParam('fields', options.fields.join(','));
	                }
	                if (options && options.limit !== undefined) {
	                    uri.addQueryParam('limit', options.limit);
	                }
	                if (options && options.type) {
	                    uri.addQueryParam('type', options.type.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getMilestones = getMilestones;
	            function getChatTranscripts(caseNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/livechattranscripts");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getChatTranscripts = getChatTranscripts;
	            function getBugs(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/bugs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getBugs = getBugs;
	            function getCasesFromSoql(query) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/soql");
	                return fetch_1.postUri(uri, query);
	            }
	            exports.getCasesFromSoql = getCasesFromSoql;

	            /***/
	        },
	        /* 34 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function uploadAttachment(caseNumber, formData) {
	                var path = "/cwe/cases/" + caseNumber + "/attachments";
	                var uri = env_1.default.hydraFSHostName.clone().setPath(env_1.default.fsPathPrefix + path);
	                return fetch_1.postFormUri(uri, formData);
	            }
	            exports.uploadAttachment = uploadAttachment;
	            function getAttachments(caseNumber) {
	                var path = "/cwe/cases/" + caseNumber + "/attachments";
	                var uri = env_1.default.hydraFSHostName.clone().setPath(env_1.default.fsPathPrefix + path);
	                return fetch_1.getUri(uri);
	            }
	            exports.getAttachments = getAttachments;

	            /***/
	        },
	        /* 35 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllShiftMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllShiftMetadatas = getAllShiftMetadatas;
	            function createShiftMetadata(shiftMetadata) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/");
	                return fetch_1.postUri(uri, shiftMetadata);
	            }
	            exports.createShiftMetadata = createShiftMetadata;
	            function updateShiftMetadata(shiftId, shiftMetadata) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/" + shiftId);
	                return fetch_1.putUri(uri, shiftMetadata);
	            }
	            exports.updateShiftMetadata = updateShiftMetadata;
	            function deleteShiftMetadata(shiftId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/" + shiftId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteShiftMetadata = deleteShiftMetadata;

	            /***/
	        },
	        /* 36 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllTemplateMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/templatesMetadata/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllTemplateMetadatas = getAllTemplateMetadatas;
	            function getTemplateMetadatasForUser(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/templatesMetadata/user/" + userId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getTemplateMetadatasForUser = getTemplateMetadatasForUser;
	            function postCustomTemplateForUser(template) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/templatesMetadata");
	                return fetch_1.postUri(uri, template);
	            }
	            exports.postCustomTemplateForUser = postCustomTemplateForUser;

	            /***/
	        },
	        /* 37 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getOpenStackVendorProduct(vendorProductPortalId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/" + vendorProductPortalId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackVendorProduct = getOpenStackVendorProduct;
	            function getOpenStackVendorProductComponents(vendorProductPortalId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/" + vendorProductPortalId + "/components");
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackVendorProductComponents = getOpenStackVendorProductComponents;
	            function updateOpenStackVendorProduct(vendorProductPortalId, updateOps) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/" + vendorProductPortalId);
	                return fetch_1.patchUri(uri, updateOps);
	            }
	            exports.updateOpenStackVendorProduct = updateOpenStackVendorProduct;

	            /***/
	        },
	        /* 38 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getHardwareCertification(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/hardware/certcases/" + caseNumber);
	                return fetch_1.getUri(uri);
	            }
	            exports.getHardwareCertification = getHardwareCertification;
	            function createHardwareCertification(certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/hardware/certcases/");
	                return fetch_1.getUri(uri);
	            }
	            exports.createHardwareCertification = createHardwareCertification;
	            function updateHardwareCertification(caseNumber, certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/hardware/certcases/" + caseNumber);
	                return fetch_1.putUri(uri, certification);
	            }
	            exports.updateHardwareCertification = updateHardwareCertification;
	            function getOpenStackCertification(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/certcases/" + caseNumber);
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackCertification = getOpenStackCertification;
	            function createOpenStackCertification(certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/certcases/");
	                return fetch_1.postUri(uri, certification);
	            }
	            exports.createOpenStackCertification = createOpenStackCertification;
	            function updateOpenStackCertification(caseNumber, certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/certcases/" + caseNumber);
	                return fetch_1.putUri(uri, certification);
	            }
	            exports.updateOpenStackCertification = updateOpenStackCertification;
	            function getOpenStackApi(component) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/plugin/api");
	                if (component) {
	                    uri.addQueryParam('component', component);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackApi = getOpenStackApi;
	            function getOpenStackFeature(component) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/plugin/feature");
	                if (component) {
	                    uri.addQueryParam('pluginType', component);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackFeature = getOpenStackFeature;
	            function getOpenStackProtocol(component) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/plugin/protocol");
	                if (component) {
	                    uri.addQueryParam('pluginType', component);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackProtocol = getOpenStackProtocol;
	            function getCaseNumberFromPortalId(portalId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certs/casenumber");
	                if (portalId) {
	                    uri.addQueryParam('portalId', portalId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseNumberFromPortalId = getCaseNumberFromPortalId;

	            /***/
	        },
	        /* 39 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getAll(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/all");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                var result = fetch_1.getUri(uri);
	                return result;
	            }
	            exports.getAll = getAll;
	            function getProgram(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/programs/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getProgram = getProgram;
	            function getPrograms(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/programs");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getPrograms = getPrograms;
	            function getRedHatProduct(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/products/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatProduct = getRedHatProduct;
	            function getRedHatProducts(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/products");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatProducts = getRedHatProducts;
	            function getRedHatVersion(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/versions/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatVersion = getRedHatVersion;
	            function getRedHatVersions(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/versions");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatVersions = getRedHatVersions;
	            function getPlatform(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/platforms/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getPlatform = getPlatform;
	            function getPlatforms(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/platforms");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getPlatforms = getPlatforms;

	            /***/
	        },
	        /* 40 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getCertificationTestPlan(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationTestPlan = getCertificationTestPlan;
	            function updateCertificationTestPlanComponent(caseNumber, testplanComponent) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.patchUri(uri, testplanComponent);
	            }
	            exports.updateCertificationTestPlanComponent = updateCertificationTestPlanComponent;
	            function updateCertificationTestPlanItem(caseNumber, testplanItem) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.patchUri(uri, testplanItem);
	            }
	            exports.updateCertificationTestPlanItem = updateCertificationTestPlanItem;
	            function updateCertificationExceptionReason(caseNumber, exceptionReason) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.patchUri(uri, exceptionReason);
	            }
	            exports.updateCertificationExceptionReason = updateCertificationExceptionReason;
	            function getCertificationTestResults(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationTestResults = getCertificationTestResults;
	            function getCertificationTestLog(caseNumber, rpmId, testId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId + "/tests/" + testId + "/runtimelog");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationTestLog = getCertificationTestLog;
	            function getCertificationSubTestLog(caseNumber, rpmId, testId, subTestId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId + "/tests/" + testId + "/subtests/" + subTestId + "/runtimelog");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationSubTestLog = getCertificationSubTestLog;
	            function updateResultReview(caseNumber, rpmId, reviewPatch) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId);
	                return fetch_1.patchUri(uri, reviewPatch);
	            }
	            exports.updateResultReview = updateResultReview;
	            function updateSubTestStatus(caseNumber, rpmId, runNumber, testId, subTestId, updatePatch) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId + "/runs/" + runNumber + "/tests/" + testId);
	                return fetch_1.patchUri(uri, updatePatch);
	            }
	            exports.updateSubTestStatus = updateSubTestStatus;

	            /***/
	        },
	        /* 41 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllShiftsForUsers() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllShiftsForUsers = getAllShiftsForUsers;
	            function getShiftsForUserFilters(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/filter");
	                return fetch_1.postUri(uri, filters);
	            }
	            exports.getShiftsForUserFilters = getShiftsForUserFilters;
	            function postShiftsForUsers(userShifts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/bulk");
	                return fetch_1.postUri(uri, userShifts);
	            }
	            exports.postShiftsForUsers = postShiftsForUsers;
	            function editShiftForUser(shiftRecordId, updatedShiftDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/" + shiftRecordId);
	                return fetch_1.putUri(uri, updatedShiftDetails);
	            }
	            exports.editShiftForUser = editShiftForUser;
	            function deleteShiftByShiftId(shiftId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/" + shiftId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteShiftByShiftId = deleteShiftByShiftId;
	            function deleteShiftForUsers(userShifts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/remove");
	                return fetch_1.deleteUriWithBody(uri, userShifts);
	            }
	            exports.deleteShiftForUsers = deleteShiftForUsers;

	            /***/
	        },
	        /* 42 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllGroupMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllGroupMetadatas = getAllGroupMetadatas;
	            function getGroupsForOwner(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/filter");
	                return fetch_1.postUri(uri, filters);
	            }
	            exports.getGroupsForOwner = getGroupsForOwner;
	            function postGroupDetails(groups) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/");
	                return fetch_1.postUri(uri, groups);
	            }
	            exports.postGroupDetails = postGroupDetails;
	            function updateGroupDetails(groups, groupId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/" + groupId + "/");
	                return fetch_1.putUri(uri, groups);
	            }
	            exports.updateGroupDetails = updateGroupDetails;
	            function deleteGroupByGroupId(groupId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/" + groupId + "/");
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteGroupByGroupId = deleteGroupByGroupId;

	            /***/
	        },
	        /* 43 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function allCounts(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.allCounts = allCounts;
	            function articlesLinked(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/articles/linked");
	                return fetch_1.getUri(uri);
	            }
	            exports.articlesLinked = articlesLinked;
	            function bomgarSessions(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/bomgarsessions");
	                return fetch_1.getUri(uri);
	            }
	            exports.bomgarSessions = bomgarSessions;
	            function bugzillas(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/bugzillas");
	                return fetch_1.getUri(uri);
	            }
	            exports.bugzillas = bugzillas;
	            function caseHistory(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/casehistory");
	                return fetch_1.getUri(uri);
	            }
	            exports.caseHistory = caseHistory;
	            function chatTranscripts(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/chattranscripts");
	                return fetch_1.getUri(uri);
	            }
	            exports.chatTranscripts = chatTranscripts;
	            function comments(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/comments");
	                return fetch_1.getUri(uri);
	            }
	            exports.comments = comments;
	            function escalationsClosed(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/escalations/closed");
	                return fetch_1.getUri(uri);
	            }
	            exports.escalationsClosed = escalationsClosed;
	            function escalationsOpen(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/escalations/open");
	                return fetch_1.getUri(uri);
	            }
	            exports.escalationsOpen = escalationsOpen;
	            function fileAttachments(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/fileattachments");
	                return fetch_1.getUri(uri);
	            }
	            exports.fileAttachments = fileAttachments;
	            function jiras(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/jiras");
	                return fetch_1.getUri(uri);
	            }
	            exports.jiras = jiras;
	            function solutionsLinked(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/solutions/linked");
	                return fetch_1.getUri(uri);
	            }
	            exports.solutionsLinked = solutionsLinked;
	            function teamMembers(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/teammembers");
	                return fetch_1.getUri(uri);
	            }
	            exports.teamMembers = teamMembers;
	            function reviews(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + options.qualityIndexType + "/count");
	                if (options.userId) {
	                    uri.addQueryParam('userId', options.userId);
	                }
	                if (options.createdFrom) {
	                    uri.addQueryParam('createdFrom', options.createdFrom);
	                }
	                if (options.createdTo) {
	                    uri.addQueryParam('createdTo', options.createdTo);
	                }
	                if (options.contentId) {
	                    uri.addQueryParam('contentId', options.contentId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.reviews = reviews;
	            function testPlan(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/count/testplan");
	                return fetch_1.getUri(uri);
	            }
	            exports.testPlan = testPlan;
	            function testResult(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/count/certrpms");
	                return fetch_1.getUri(uri);
	            }
	            exports.testResult = testResult;

	            /***/
	        },
	        /* 44 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getQuestions(qualityIndexType) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + qualityIndexType + "/reviews/questions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getQuestions = getQuestions;
	            function getKtQuestions(qualityIndexType) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + qualityIndexType + "/reviews/ktquestions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getKtQuestions = getKtQuestions;
	            function getReviews(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + options.qualityIndexType + "/reviews");
	                if (options.createdBy) {
	                    uri.addQueryParam('createdBy', options.createdBy);
	                }
	                if (options.createdFrom) {
	                    uri.addQueryParam('createdFrom', options.createdFrom);
	                }
	                if (options.createdTo) {
	                    uri.addQueryParam('createdTo', options.createdTo);
	                }
	                if (options.contentId) {
	                    uri.addQueryParam('contentId', options.contentId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getReviews = getReviews;
	            function createReview(qualityIndexType, review) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + qualityIndexType + "/reviews");
	                return fetch_1.postUri(uri, review);
	            }
	            exports.createReview = createReview;

	            /***/
	        },
	        /* 45 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getProducts(sso) {
	                if (sso) {
	                    var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/products/contact/" + sso);
	                    return fetch_1.getUri(uri);
	                } else {
	                    var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/products");
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getProducts = getProducts;
	            function getProductVersions(productName) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/products/" + productName + "/versions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getProductVersions = getProductVersions;

	            /***/
	        },
	        /* 46 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getSbr(sbrId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/sbrs/" + sbrId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSbr = getSbr;
	            function getSbrTags(sbrId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/sbrs/" + sbrId + "/tags");
	                return fetch_1.getUri(uri);
	            }
	            exports.getSbrTags = getSbrTags;
	            function getSbrs() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/sbrs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getSbrs = getSbrs;

	            /***/
	        },
	        /* 47 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getExternalTrackers(externalTrackerId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/externaltrackers/{id}");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getExternalTrackers = getExternalTrackers;
	            function getExternalTrackersUpdates(externalTrackerId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/externaltrackerupdates/{id}");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getExternalTrackersUpdates = getExternalTrackersUpdates;

	            /***/
	        },
	        /* 48 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getSolrAccess(solrQuery) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solr/access").addQueryParam('q', solrQuery.q).addQueryParam('fl', '*, score') // this will add the score to each response
	                .addQueryParam('facet', 'true').addQueryParam('facet.field', 'accessState').addQueryParam('facet.field', 'hasPublishedRevision').addQueryParam('hl', 'true').addQueryParam('hl.simple.post', '%3C%2Fmark%3E').addQueryParam('hl.simple.pre', '%3Cmark%3E').addQueryParam('hl.fl', 'abstract').addQueryParam('enableElevation', 'true') // Enable hand picked solutions
	                .addQueryParam('wt', 'json');
	                // It's currently not completely clear if we need to explictly set the language facet.  Mani was unsure.
	                // .addQueryParam('fq', 'language:(en)')
	                if (solrQuery.fq != null) {
	                    uri.addQueryParam('fq', solrQuery.fq);
	                }
	                if (solrQuery.sort != null) {
	                    uri.addQueryParam('sort', solrQuery.sort);
	                }
	                if (solrQuery.start != null) {
	                    uri.addQueryParam('start', solrQuery.start);
	                }
	                if (solrQuery.rows != null) {
	                    uri.addQueryParam('rows', solrQuery.rows);
	                }
	                var headerParams = [{
	                    key: 'Accept',
	                    value: 'application/vnd.redhat.solr+json'
	                }];
	                return fetch_1.getUri(uri, headerParams);
	            }
	            exports.getSolrAccess = getSolrAccess;
	            function getSolrCases(solrQuery) {
	                if (solrQuery.q == null || solrQuery.q === '') throw 'SOLR Query is mandatory';
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solr/case");
	                uri.addQueryParam('wt', 'json');
	                uri.addQueryParam('q', solrQuery.q);
	                if (solrQuery.fq != null && solrQuery.fq !== '') {
	                    uri.addQueryParam('fq', solrQuery.fq);
	                }
	                if (solrQuery.start != null) {
	                    uri.addQueryParam('start', solrQuery.start);
	                }
	                if (solrQuery.rows != null) {
	                    uri.addQueryParam('rows', solrQuery.rows);
	                }
	                if (solrQuery.sort != null && solrQuery.sort !== '') {
	                    uri.addQueryParam('sort', solrQuery.sort);
	                }
	                if (solrQuery.fl != null && solrQuery.fl !== '') {
	                    uri.addQueryParam('fl', solrQuery.fl);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getSolrCases = getSolrCases;

	            /***/
	        },
	        /* 49 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAccount(accountNumber, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccount = getAccount;
	            function getAccountContacts(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber + "/contacts");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountContacts = getAccountContacts;
	            function getAccountNotes(accountNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber + "/notes");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountNotes = getAccountNotes;
	            function getAccountTeamMembers(accountNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber + "/associates");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountTeamMembers = getAccountTeamMembers;
	            function patchAccounts(accounts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts");
	                return fetch_1.patchUri(uri, accounts);
	            }
	            exports.patchAccounts = patchAccounts;
	            function getContactDetailBySso(sso) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/contacts/sso/" + sso);
	                return fetch_1.getUri(uri);
	            }
	            exports.getContactDetailBySso = getContactDetailBySso;

	            /***/
	        },
	        /* 50 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getCallCenters() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/callcenters");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCallCenters = getCallCenters;
	            function getCallCenter(callCenterId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/callcenters/" + callCenterId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getCallCenter = getCallCenter;

	            /***/
	        },
	        /* 51 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function createCommentFeedback(caseNumber, comment) {
	                var uri = env_1.default.pcmHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments/feedback");
	                return fetch_1.postUri(uri, comment);
	            }
	            exports.createCommentFeedback = createCommentFeedback;
	            function updateCommentFeedback(caseNumber, comment) {
	                var uri = env_1.default.pcmHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments/feedback");
	                return fetch_1.putUri(uri, comment);
	            }
	            exports.updateCommentFeedback = updateCommentFeedback;
	            function getCommentFeedback(caseNumber) {
	                var uri = env_1.default.pcmHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments/feedback");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCommentFeedback = getCommentFeedback;

	            /***/
	        },
	        /* 52 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function createRole(role) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles/");
	                return fetch_1.postUri(uri, role);
	            }
	            exports.createRole = createRole;
	            function updateRole(roleId, role) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles/" + roleId);
	                return fetch_1.putUri(uri, role);
	            }
	            exports.updateRole = updateRole;
	            function deleteRole(roleId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles/" + roleId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteRole = deleteRole;

	            /***/
	        },
	        /* 53 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getVocabularyTags() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/tag");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyTags = getVocabularyTags;
	            function getVocabularyProducts() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/product");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyProducts = getVocabularyProducts;
	            function getVocabularySbrs() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/sbr");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularySbrs = getVocabularySbrs;
	            function getVocabularyCategory() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/category");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyCategory = getVocabularyCategory;
	            function getVocabularyComponents() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/component");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyComponents = getVocabularyComponents;

	            /***/
	        },
	        /* 54 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getMaintenanceMode(configurationType) {
	                if (configurationType === void 0) {
	                    configurationType = 'ascension_maintenance';
	                }
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/configuration/" + configurationType);
	                return fetch_1.getUri(uri);
	            }
	            exports.getMaintenanceMode = getMaintenanceMode;

	            /***/
	        },
	        /* 55 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            var contact_1 = __webpack_require__(3);
	            function getBugzillaCommentFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'bugzillaBugId', 'bugzillaId', 'caseCommentId', 'createdById', 'createdDate', 'isPrivate', 'lastModifiedById', 'lastModifiedDate'];
	                // Not yet mapped as we have no need for it.
	                // 'bugzillaBug',
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeCreatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getBugzillaCommentFields = getBugzillaCommentFields;
	            function getCaseCommentFields(options) {
	                var finalFields = [];
	                if (options && options.minimal === true) {
	                    var minimalFields = ['id', 'commentBody', 'caseNumber', 'createdDate', 'createdByText', 'createdByLink', 'doNotChangeSBT', 'externalHandlingSystem', 'hoursWorked', 'isPublic', 'lastModifiedDate', 'sbt', 'sortDate', 'createdByType'];
	                    Array.prototype.push.apply(finalFields, minimalFields);
	                } else {
	                    var fields = ['id', 'bugzillaCommentId', 'caseNumber', 'caseCommentId', 'caseID', 'commentBody', 'createdById', 'createdDate', 'createdByContactID', 'createdByText', 'createdByLink', 'createdByUserID', 'createdWithBug', 'doNotChangeSBT', 'externalHandlingSystem', 'fromBug', 'hoursWorked', 'inBreach', 'isDraft', 'isPublic', 'lastModifiedById', 'lastModifiedDate', 'lastReferencedDate', 'lastModifiedByContactID', 'lastModifiedByText', 'lastModifiedByUserID', 'lastModifiedDateCustom', 'name', 'sbt', 'sortDate', 'targetDate', 'createdByType'];
	                    Array.prototype.push.apply(finalFields, fields);
	                }
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['caseCommentCreatedDayOfWeek', 'caseCommentCreatedHourOfDay', 'caseCommentCreatedByLocation', 'connectionReceivedId', 'connectionSentId', 'externalCaseCommentId', 'externalId', 'externalTrackerToPartnerPrivateMap', 'helpsResolutionScore', 'lastModifiedByLink', 'lastViewedDate', 'lastModifiedByIdCustom', 'prsRecordID', 'lastVotedOnHelpsResolutionAt', 'representedInOtherSystemsAs', 'roleOfCreatedBy', 'isDeleted', 'managerOfCreatedBy', 'milestoneTargetDate', 'publishedDate', 'publishedMs', 'rhLocation', 'searchHelper', 'systemModstamp'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeBugzillaComment) {
	                    Array.prototype.push.apply(finalFields, getBugzillaCommentFields(options).map(function (f) {
	                        return "bugzillaComment." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdByUser." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedByUser." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "createdByContact." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "lastModifiedByContact." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getCaseCommentFields = getCaseCommentFields;

	            /***/
	        },
	        /* 56 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getMetadata() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/metadata");
	                return fetch_1.getUri(uri);
	            }
	            exports.getMetadata = getMetadata;

	            /***/
	        },
	        /* 57 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            // success Plan
	            function getSuccessPlansForUserName(ssoUsername) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans");
	                uri.addQueryParam('username', ssoUsername);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSuccessPlansForUserName = getSuccessPlansForUserName;
	            function getSuccessPlansForAccountNumber(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/accounts/" + accountNumber);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSuccessPlansForAccountNumber = getSuccessPlansForAccountNumber;
	            function getSuccessPlansForId(successPlanId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSuccessPlansForId = getSuccessPlansForId;
	            function addSuccessPlan(successPlan) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans");
	                return fetch_1.postUri(uri, successPlan);
	            }
	            exports.addSuccessPlan = addSuccessPlan;
	            function updateSuccessPlan(successPlanId, successPlan) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId);
	                return fetch_1.putUri(uri, successPlan);
	            }
	            exports.updateSuccessPlan = updateSuccessPlan;
	            function removeSuccessPlan(successPlanId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeSuccessPlan = removeSuccessPlan;
	            // Products
	            function addProduct(successPlanId, product) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/products");
	                return fetch_1.postUri(uri, product);
	            }
	            exports.addProduct = addProduct;
	            function updateProduct(product) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + product.successPlanId + "/products/" + product.id);
	                return fetch_1.putUri(uri, product);
	            }
	            exports.updateProduct = updateProduct;
	            function removeProduct(successPlanId, productId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/products/" + productId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeProduct = removeProduct;
	            // Objectives
	            function addObjective(successPlanId, objective) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives");
	                return fetch_1.postUri(uri, objective);
	            }
	            exports.addObjective = addObjective;
	            function updateObjective(objective) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + objective.successPlanId + "/objectives/" + objective.id);
	                return fetch_1.putUri(uri, objective);
	            }
	            exports.updateObjective = updateObjective;
	            function removeObjective(successPlanId, objectiveId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeObjective = removeObjective;
	            // objective doclinks
	            function addObjectiveLink(successPlanId, objectiveId, doclink) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/doclinks");
	                return fetch_1.postUri(uri, doclink);
	            }
	            exports.addObjectiveLink = addObjectiveLink;
	            function updateObjectiveLink(successPlanId, doclink) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + doclink.objectiveId + "/doclinks/" + doclink.id);
	                return fetch_1.putUri(uri, doclink);
	            }
	            exports.updateObjectiveLink = updateObjectiveLink;
	            function removeObjectiveLink(successPlanId, objectiveId, doclinkId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/doclinks/" + doclinkId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeObjectiveLink = removeObjectiveLink;
	            // Objective Stakeholders
	            function addObjectiveStakeholder(successPlanId, objectiveId, stakeholder) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/stakeholders");
	                return fetch_1.postUri(uri, stakeholder);
	            }
	            exports.addObjectiveStakeholder = addObjectiveStakeholder;
	            function updateObjectiveStakeholder(successPlanId, stakeholder) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + stakeholder.objectiveId + "/stakeholders/" + stakeholder.id);
	                return fetch_1.putUri(uri, stakeholder);
	            }
	            exports.updateObjectiveStakeholder = updateObjectiveStakeholder;
	            function removeObjectiveStakeholder(successPlanId, objectiveId, stakeholderId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/stakeholders/" + stakeholderId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeObjectiveStakeholder = removeObjectiveStakeholder;

	            /***/
	        },
	        /* 58 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            // TODO: Need to create Params interface.
	            function getCSAccounts(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCSAccounts = getCSAccounts;
	            function getOpenCaseCount(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/" + accountNumber + "/cases/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenCaseCount = getOpenCaseCount;
	            function getCTACount(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/" + accountNumber + "/ctas/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCTACount = getCTACount;
	            function getEntitlementCount(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/" + accountNumber + "/entitlements/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.getEntitlementCount = getEntitlementCount;

	            /***/
	        },
	        /* 59 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function listCtas(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.listCtas = listCtas;
	            function getCtaGroupedCount(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/count");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaGroupedCount = getCtaGroupedCount;
	            function getCta(ctaId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getCta = getCta;
	            function updateCta(ctaId, ctaDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId);
	                return fetch_1.putUri(uri, ctaDetails);
	            }
	            exports.updateCta = updateCta;
	            function addCta(ctaDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas");
	                return fetch_1.postUri(uri, ctaDetails);
	            }
	            exports.addCta = addCta;
	            function deleteCta(ctaId, params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId);
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteCta = deleteCta;
	            function getCtaTasks(ctaId, params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaTasks = getCtaTasks;
	            function updateCtaTask(taskId, ctaId, taskDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks/" + taskId);
	                return fetch_1.putUri(uri, taskDetails);
	            }
	            exports.updateCtaTask = updateCtaTask;
	            function addTask(ctaId, taskDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks");
	                return fetch_1.postUri(uri, taskDetails);
	            }
	            exports.addTask = addTask;
	            function deleteTask(taskId, ctaId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks/" + taskId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteTask = deleteTask;
	            function getCtaComments(ctaId, params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaComments = getCtaComments;
	            function getCtaComment(commentId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + commentId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaComment = getCtaComment;
	            function updateCtaComment(commentId, ctaId, comment) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments/" + commentId);
	                return fetch_1.putUri(uri, comment);
	            }
	            exports.updateCtaComment = updateCtaComment;
	            function addCtaComment(ctaId, comment) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments");
	                return fetch_1.postUri(uri, comment);
	            }
	            exports.addCtaComment = addCtaComment;
	            function deleteCtaComment(commentId, ctaId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments/" + commentId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteCtaComment = deleteCtaComment;

	            /***/
	        },
	        /* 60 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getTimeline(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getTimeline = getTimeline;
	            function getTimelineActivity(activityId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline/" + activityId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getTimelineActivity = getTimelineActivity;
	            function updateTimelineActivity(activityId, activity) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline/" + activityId);
	                return fetch_1.putUri(uri, activity);
	            }
	            exports.updateTimelineActivity = updateTimelineActivity;
	            function addTimelineActivity(activity) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline");
	                return fetch_1.postUri(uri, activity);
	            }
	            exports.addTimelineActivity = addTimelineActivity;
	            function deleteTimelineActivity(activityId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline/" + activityId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteTimelineActivity = deleteTimelineActivity;

	            /***/
	        },
	        /* 61 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getContacts(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/contacts/");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getContacts = getContacts;

	            /***/
	        }]
	        /******/)
	    );
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ },
/* 45 */
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
/* 46 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = { verbose: true };

/***/ },
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Controllers

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _securityController = __webpack_require__(48);

	var _securityController2 = _interopRequireDefault(_securityController);

	var _loginStatus = __webpack_require__(49);

	var _loginStatus2 = _interopRequireDefault(_loginStatus);

	var _securityService = __webpack_require__(51);

	var _securityService2 = _interopRequireDefault(_securityService);

	var _authEvents = __webpack_require__(45);

	var _authEvents2 = _interopRequireDefault(_authEvents);

	var _loginViewConfig = __webpack_require__(46);

	var _loginViewConfig2 = _interopRequireDefault(_loginViewConfig);

	var _securityConfig = __webpack_require__(47);

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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _hydrajs = __webpack_require__(44);

	var _hydrajs2 = _interopRequireDefault(_hydrajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
	    this.isSubscriptionServiceM = false;
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
	    this.initLoginStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	        var _this2 = this;

	        var defer, user, accountPromise, configuration, userPromise, managedAccountsPromise, managersForAccountPromise;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        this.loggingIn = true;
	                        this.loginFailure = false;
	                        defer = $q.defer();
	                        // var wasLoggedIn = this.loginStatus.isLoggedIn;

	                        this.loginStatus.verifying = true;

	                        if (!(window.sessionjs != null && window.sessionjs.isAuthenticated() && RHAUtils.isNotEmpty(window.sessionjs.getUserInfo().account_number))) {
	                            _context.next = 26;
	                            break;
	                        }

	                        // JWT specific auth
	                        user = window.sessionjs.getUserInfo();
	                        //load account

	                        strata.addAccountNumber(user.account_number);
	                        accountPromise = strataService.accounts.get(user.account_number).then(function (account) {
	                            _this2.loginStatus.account = account;
	                        }).catch(function () {
	                            _this2.loginStatus.account = null;
	                        });
	                        _context.prev = 8;
	                        _context.next = 11;
	                        return _hydrajs2.default.maintenance.getMaintenanceMode('pcm_configurations');

	                    case 11:
	                        configuration = _context.sent;

	                        if (configuration.length >= 0) {
	                            configuration.map(function (value) {
	                                if (value.fieldName === 'isEntitled' && value.fieldValue === '1') {
	                                    _this2.isSubscriptionServiceM = true;
	                                }
	                            });
	                        }
	                        _context.next = 19;
	                        break;

	                    case 15:
	                        _context.prev = 15;
	                        _context.t0 = _context['catch'](8);

	                        this.isSubscriptionServiceM = false;
	                        console.log('Error getting PCM Configurations' + _context.t0);

	                    case 19:
	                        userPromise = {};

	                        if (this.isSubscriptionServiceM === true) {
	                            userPromise = strataService.users.getBySSO(user.username);
	                        } else {
	                            userPromise = strataService.users.get(user.user_id);
	                        }

	                        managedAccountsPromise = strataService.accounts.managedAccounts.get(user.account_number);
	                        managersForAccountPromise = strataService.accounts.accountManagers.get(user.account_number);


	                        Promise.all([accountPromise, userPromise, managedAccountsPromise, managersForAccountPromise]).then(function (_ref2) {
	                            var _ref3 = _slicedToArray(_ref2, 4),
	                                account = _ref3[0],
	                                authedUser = _ref3[1],
	                                managedAccounts = _ref3[2],
	                                accountManagers = _ref3[3];

	                            // PCM-6964 hardcoded is_entitled = true when subscrition service is down
	                            if (_this2.isSubscriptionServiceM === true) {
	                                authedUser.account_number = user.account_number, authedUser.preferred_language = user.lang, authedUser.is_entitled = true, authedUser.is_active = true, authedUser.timezone = 'America/New_York', authedUser.rights = {
	                                    "right": [{
	                                        "name": "AllowEmailContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowFaxContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowMailContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowPhoneContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowThirdPartyContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "portal_manage_cases",
	                                        "description": "Customer Portal: Manage Support Cases",
	                                        "has_access": true
	                                    }, {
	                                        "name": "portal_manage_subscriptions",
	                                        "description": "Customer Portal: Manage Subscriptions",
	                                        "has_access": true
	                                    }, {
	                                        "name": "portal_download",
	                                        "description": "Customer Portal: Download Software and Updates",
	                                        "has_access": true
	                                    }, {
	                                        "name": "portal_system_management",
	                                        "description": "Customer Portal: System Management",
	                                        "has_access": true
	                                    }]
	                                };
	                            }
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
	                        _context.next = 27;
	                        break;

	                    case 26:
	                        strataService.authentication.checkLogin().then(angular.bind(this, function (authedUser) {
	                            var _this3 = this;

	                            if (authedUser.account) {
	                                this.setAccount(authedUser.account);
	                                // PCM-6964 hardcoded is_entitled = true when subscrition service is down
	                                if (this.isSubscriptionServiceM === true) {
	                                    authedUser.is_entitled = true;
	                                }
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

	                    case 27:
	                        return _context.abrupt('return', defer.promise);

	                    case 28:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this, [[8, 15]]);
	    }));
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
/* 52 */
/***/ function(module, exports) {

	module.exports = "<li class=\"rha-treeselector-node\">\n    <div>\n        <span class=\"icon\" ng-class=\"{collapsed: choice.collapsed, expanded: !choice.collapsed}\" ng-show=\"choice.children.length > 0\" ng-click=\"choice.collapsed = !choice.collapsed\">\n        </span>\n        <span class=\"label\" ng-if=\"choice.children.length > 0\" ng-class=\"folder\">{{choice.name}}\n        </span>\n        <span class=\"label\" ng-if=\"choice.children.length === 0\"  ng-click=\"choiceClicked(choice)\">\n            <input type=\"checkbox\" ng-checked=\"choice.checked\">{{choice.name}}\n        </span>\n    </div>\n</li>"

/***/ },
/* 53 */
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
/* 54 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 55 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ]);