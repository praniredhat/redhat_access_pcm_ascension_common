'use strict';

export default {
	'sfdcOutageMessage': '<ul class="message"><li class="alertSystem">Creating and updating support cases online is currently disabled. Please <a target="_blank" href="https://access.redhat.com/support/contact/technicalSupport/">contact Red Hat support</a> if you need immediate assistance.</li></ul>',
	'doSfdcHealthCheck': false,
	'sfdcIsHealthy': true, // This property should be made false only when 'doSfdcHealthCheck' is set to false
	'healthCheckInterval': 60000,
	'showTitle': true,
	'titlePrefix': 'Red Hat Access: ',
	'isGS4': false
}