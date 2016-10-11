'use strict';

export default class ConstantsService {
    constructor(gettextCatalog, STATUS) {
        'ngInject';

        this.sortByParams = [
            {
                ///this refers  in context of "sorting on Newest Date Modified"
                name: gettextCatalog.getString('Newest Date Modified'),
                sortField: 'lastModifiedDate',
                sortOrder: 'DESC'
            },
            {
                ///this refers  in context of "sorting on Oldest Date Modified"
                name: gettextCatalog.getString('Oldest Date Modified'),
                sortField: 'lastModifiedDate',
                sortOrder: 'ASC'
            },
            {
                ///this refers  in context of "sorting on Highest Severity"
                name: gettextCatalog.getString('Highest Severity'),
                sortField: 'severity',
                sortOrder: 'ASC'
            },
            {
                ///this refers  in context of "sorting on Lowest Severity"
                name: gettextCatalog.getString('Lowest Severity'),
                sortField: 'severity',
                sortOrder: 'DESC'
            },
            {
                ///this refers  in context of "sorting on Newest Date Created"
                name: gettextCatalog.getString('Newest Date Created'),
                sortField: 'createdDate',
                sortOrder: 'DESC'
            },
            {
                ///this refers  in context of "sorting on Oldest Date Created"
                name: gettextCatalog.getString('Oldest Date Created'),
                sortField: 'createdDate',
                sortOrder: 'ASC'
            },
            {
                ///this refers  in context of "sorting on Case Owner (A-Z)"
                name: gettextCatalog.getString('Case Owner (A-Z)'),
                sortField: 'owner',
                sortOrder: 'ASC'
            },
            {
                ///this refers  in context of "sorting on Case Owner (Z-A)"
                name: gettextCatalog.getString('Case Owner (Z-A)'),
                sortField: 'owner',
                sortOrder: 'DESC'
            },
            {
                ///this refers  in context of "sorting on Case Status (A-Z)"
                name: gettextCatalog.getString('Case Status (A-Z)'),
                sortField: 'status',
                sortOrder: 'ASC'
            },
            {
                ///this refers  in context of "sorting on Case Status (Z-A)"
                name: gettextCatalog.getString('Case Status (Z-A)'),
                sortField: 'status',
                sortOrder: 'DESC'
            }
        ];
        this.statuses = [
            {
                ///Open and closed refers to Open and Closed support cases
                name: gettextCatalog.getString('Open and Closed'),
                value: STATUS.both
            },
            {
                ///Open refers to Open support cases
                name: gettextCatalog.getString('Open'),
                value: STATUS.open
            },
            {
                ///Closed refers to Closed support cases
                name: gettextCatalog.getString('Closed'),
                value: STATUS.closed
            }
        ];
        this.advancedCaseListColumns = [
            {
                id: 'severity',
                name: gettextCatalog.getString('Severity'),
                description: gettextCatalog.getString('Severity of the case.'),
                default: true
            },
            {
                id: 'number-status',
                name: gettextCatalog.getString('Number & Status'),
                description: gettextCatalog.getString('Number and Status of the case.'),
                required: true,
                default: true
            },
            {
                id: 'summary',
                name: gettextCatalog.getString('Summary'),
                description: gettextCatalog.getString('Summary of the case.'),
                default: true
            },
            {
                id: 'product',
                name: gettextCatalog.getString('Product Name and Version'),
                description: gettextCatalog.getString('Product and Version assigned to the case.'),
                default: true
            },
            {
                id: 'created',
                name: gettextCatalog.getString('Created User and Date'),
                description: gettextCatalog.getString('Name of the person who created the case and date it was created.'),
                default: true
            },
            {
                id: 'modified',
                name: gettextCatalog.getString('Last Modified User and Date'),
                description: gettextCatalog.getString('Name of the person who modified the case last and the date the action was performed.')
            },
            {
                id: 'contact',
                name: gettextCatalog.getString('Contact Name'),
                description: gettextCatalog.getString('Name of the customer contact.')
            },
            {
                id: 'account',
                name: gettextCatalog.getString('Account Number'),
                description: gettextCatalog.getString('Number of the account the case was created under.')
            },
            {
                id: 'owner',
                name: gettextCatalog.getString('Owner Name'),
                description: gettextCatalog.getString('Name of the Red Hat Associate\'s who owns the case.')
            }
        ];


        this.wappsUrl = new Uri('https://ams-dev2.devlab.redhat.com/wapps');
        if (window.location.hostname === 'access.redhat.com' || window.location.hostname === 'prod.foo.redhat.com' || window.location.hostname === 'fooprod.redhat.com') {
            this.wappsUrl = new Uri('https://www.redhat.com/wapps');
        }
        else {
            if (window.location.hostname === 'access.qa.redhat.com' || window.location.hostname === 'qa.foo.redhat.com' || window.location.hostname === 'fooqa.redhat.com') {
                this.wappsUrl = new Uri('https://www.qa.redhat.com/wapps');
            }
            else {
                if (window.location.hostname === 'access.devgssci.devlab.phx1.redhat.com' || window.location.hostname === 'ci.foo.redhat.com' || window.location.hostname === 'fooci.redhat.com') {
                    this.wappsUrl = new Uri('https://ams-dev2.devlab.redhat.com/wapps');
                }
            }
        }
    }
}
