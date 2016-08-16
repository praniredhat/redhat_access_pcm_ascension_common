export default class RHAUtils {
    constructor() {
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
                if (obj.hasOwnProperty(prop))
                    return false;
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
            if(this.isEmpty(userTimeZone)) userTimeZone = null;
            var currentDate = window.moment(); //get current date
            var timezoneDate = window.moment(currentDate).tz(userTimeZone); //change as per logged in user's timezone
            //Sunday as 0 and Saturday as 6.
            if (timezoneDate.day() == 0 || timezoneDate.day() == 6) {
                return true;
            } else {
                return false;
            }

        }
    }
}
