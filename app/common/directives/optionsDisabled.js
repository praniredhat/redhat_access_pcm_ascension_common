'use strict';

export default function($parse) {
    'ngInject';

    const disableOptions = function (scope, attr, element, data, fnDisableIfTrue) {
        // refresh the disabled options in the select element.
        $('option[value!="?"]', element).each(function (i, e) {
            var locals = {};
            locals[attr] = data[i];
            $(this).attr('disabled', fnDisableIfTrue(scope, locals));
        });
    };
    return {
        priority: 0,
        link: function (scope, element, attrs, ctrl) {
            // parse expression and build array of disabled options
            var expElements = attrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
            var fnDisableIfTrue = $parse(expElements[1]);
            var options = expElements[3];
            scope.$watch(options, (newValue, oldValue) => {
                if (newValue) {
                    disableOptions(scope, expElements[2], element, newValue, fnDisableIfTrue);
                }
            }, true);
        }
    };
}
