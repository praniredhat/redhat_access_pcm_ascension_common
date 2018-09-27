'use strict';

export default class StrataService {
    constructor($q, gettextCatalog, RHAUtils, CacheFactory, RESOURCE_TYPES) {
        'ngInject';

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
        var errorHandler = function (message, xhr, response, status) {
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
            const allKeys = strataCache.keys();
            if(allKeys) {
                allKeys.forEach(function(key) {
                    if(key.startsWith('filter') || key.startsWith('search') || key.startsWith('advancedSearch')) {
                        clearCache(key);
                    }
                });
            }
        }
        function clearAllCaseGroups(accountNumber) {
            const allKeys = strataCache.keys();
            if(allKeys) {
                allKeys.forEach(function(key) {
                    if(key.startsWith('users' + accountNumber)) {
                        clearCache(key);
                    }
                });
            }
        }
        var service = {
            authentication: {
                checkLogin: function () {
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
                                var error = {message: 'Unauthorized.'};
                                deferred.reject(error);
                            }
                        });
                    }
                    return deferred.promise;
                },
                setCredentials: function (username, password) {
                    return strata.setCredentials(username, password);
                },
                logout: function () {
                    strataCache.removeAll();
                    strata.clearCredentials();
                }
            },
            cache: {
                clr: function (key) {
                    clearCache(key);
                }
            },
            entitlements: {
                get: function (showAll, ssoUserName) {
                    var deferred = $q.defer();
                    strata.entitlements.get(showAll, function (entitlements) {
                        deferred.resolve(entitlements);
                    }, angular.bind(deferred, errorHandler), ssoUserName);
                    return deferred.promise;
                }
            },
            problems: function (data, max) {
                var deferred = $q.defer();
                strata.problems(data, function (solutions) {
                    deferred.resolve(solutions);
                }, angular.bind(deferred, errorHandler), max);
                return deferred.promise;
            },
            recommendations: function (data, max, highlight, highlightTags) {
                var deferred = $q.defer();
                strata.recommendations(data, function (recommendations) {
                    deferred.resolve(recommendations);
                }, angular.bind(deferred, errorHandler), max, highlight, highlightTags);
                return deferred.promise;
            },
            recommendationsXmlHack: function (data, max, highlight, highlightTags) {
                var deferred = $q.defer();
                strata.recommendationsXmlHack(data, function (recommendations) {
                    deferred.resolve(recommendations);
                }, angular.bind(deferred, errorHandler), max, highlight, highlightTags);
                return deferred.promise;
            },
            recommendationsForCase: function (data, limit, start, highlight, highlightTagPre, highlightTagPost) {
                var deferred = $q.defer();
                strata.recommendationsForCase(data, function (response) {
                    deferred.resolve(response);
                }, angular.bind(deferred, errorHandler), limit, start, highlight, highlightTagPre, highlightTagPost);

                return deferred.promise;
            },
            solutionEngine: {
                sendCaseNumber: function (caseNumObj, guid) {
                    var deferred = $q.defer();
                    strata.solutionEngine.sendCaseNumber(caseNumObj, guid, function () {
                        deferred.resolve();
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                }
            },
            solutions: {
                get: function (uri) {
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
                search: function (searchString, max) {
                    var deferred = $q.defer();
                    strata.search(
                        searchString,
                        function (entries) {
                            if (entries !== undefined) {
                                deferred.resolve(entries);
                            }

                        },
                        angular.bind(deferred, errorHandler),
                        max,
                        false);
                    return deferred.promise;

                },
                post: function (solution) {
                    var deferred = $q.defer();
                    strata.solutions.post(
                        solution,
                        function (solution) {
                            deferred.resolve(solution);
                        },
                        angular.bind(deferred, errorHandler)
                    );

                    return deferred.promise;
                }
            },
            articles: {
                get: function (id) {
                    var deferred = $q.defer();
                    strata.articles.get(id, function (article) {
                        article.resource_type = RESOURCE_TYPES.article; //Needed upstream
                        strataCache.put('article' + id, article);
                        deferred.resolve(article);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                }
            },
            search: function (searchString, max) {
                var resultsDeferred = $q.defer();
                var deferreds = [];
                strata.search(
                    searchString,
                    function (entries) {
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
                        $q.all(deferreds).then(
                            function (results) {
                                resultsDeferred.resolve(results);
                            },
                            angular.bind(resultsDeferred, errorHandler));
                    },
                    angular.bind(resultsDeferred, errorHandler),
                    max,
                    false);
                return resultsDeferred.promise;
            },
            products: {
                list: function (ssoUserName) {
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
                versions: function (productCode) {
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
                get: function (productCode) {
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
                get: function (groupNum, ssoUserName) {
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
                list: function (ssoUserName, flushCashe) {
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
                remove: function (groupNum, ssoUserName) {
                    var deferred = $q.defer();
                    strata.groups.remove(groupNum, function (response) {
                        deferred.resolve(response);
                        clearCache('groups' + ssoUserName);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                },
                create: function (groupName, ssoUserName) {
                    var deferred = $q.defer();
                    strata.groups.create(groupName, function (response) {
                        deferred.resolve(response);
                        clearCache('groups' + ssoUserName);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                },
                update: function (group, ssoUserName) {
                    var deferred = $q.defer();
                    strata.groups.update(group, function (response) {
                        deferred.resolve(response);
                        clearCache('groups' + ssoUserName);
                        clearCache('groups' + group.number + ssoUserName);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                },
                createDefault: function (group, ssoUserName, accountNumber) {
                    var deferred = $q.defer();
                    strata.groups.createDefault(group, function (response) {
                        deferred.resolve(response);
                        clearCache('groups' + ssoUserName);
                        clearCache('groups' + group.number + ssoUserName);
                        clearAllCaseGroups(accountNumber);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                }
            },
            groupUsers: {
                update: function (users, accountId, groupnum) {
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
                get: function (accountNumber) {
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
                users: function (accountNumber, group) {
                    var deferred = $q.defer();
                    if (strataCache.get('users' + accountNumber + group)) {
                        deferred.resolve(strataCache.get('users' + accountNumber + group));
                    } else {
                        strata.accounts.users(accountNumber, function (response) {
                            try {
                                strataCache.put('users' + accountNumber + group, response);
                            } catch (error) {
                                clearAllCaseGroups(accountNumber);
                            } finally {
                                deferred.resolve(response);
                            }

                        }, angular.bind(deferred, errorHandler), group);
                    }
                    return deferred.promise;
                },
                list: function () {
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
                addBookmark: function (accountNumber, ssoName) {
                    var deferred = $q.defer();
                    strata.accounts.addBookmark(accountNumber, ssoName, function () {
                        deferred.resolve();
                    }, angular.bind(deferred, errorHandler));

                    return deferred.promise;
                },
                removeBookmark: function (accountNumber, ssoName) {
                    var deferred = $q.defer();
                    strata.accounts.removeBookmark(accountNumber, ssoName, function () {
                        deferred.resolve();
                    }, angular.bind(deferred, errorHandler));

                    return deferred.promise;
                },
                managedAccounts : {
                    get: function (accountNumber) {
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
                accountManagers : {
                    get: function (accountNumber) {
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
                csv: function () {
                    var deferred = $q.defer();
                    strata.cases.csv(function (response) {
                        deferred.resolve(response);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                },
                attachments: {
                    list: function (id) {
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
                    post: function (attachment, caseNumber, onProgress, isPrivate) {
                        var deferred = $q.defer();
                        strata.cases.attachments.post(attachment, caseNumber, function (response, code, xhr) {
                            strataCache.remove('attachments' + caseNumber);
                            deferred.resolve(xhr.getResponseHeader('Location'));
                        }, angular.bind(deferred, errorHandler), onProgress, isPrivate);
                        return deferred.promise;
                    },
                    remove: function (id, caseNumber) {
                        var deferred = $q.defer();
                        strata.cases.attachments.remove(id, caseNumber, function (response) {
                            strataCache.remove('attachments' + caseNumber);
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler));
                        return deferred.promise;
                    }
                },
                externalUpdates: {
                    list: function (id) {
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
                    get: function (id) {
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
                    post: function (caseNumber, text, isPublic, isDraft) {
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
                    put: function (caseNumber, text, isDraft, isPublic, comment_id) {
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
                    get: function (id) {
                        var deferred = $q.defer();
                        strata.cases.symptoms.get(id, function (response) {
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler));
                        return deferred.promise;
                    },
                    solutions: {
                        post: function (limit, isOnlySymptoms, data) {
                            var deferred = $q.defer();
                            strata.cases.symptoms.solutions.post(limit, isOnlySymptoms, data, function (response) {
                                deferred.resolve(response);
                            }, angular.bind(deferred, errorHandler));
                            return deferred.promise;
                        }
                    }
                },
                notified_users: {
                    add: function (caseNumber, ssoUserName) {
                        var deferred = $q.defer();
                        strata.cases.notified_users.add(caseNumber, ssoUserName, function (response) {
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler));
                        return deferred.promise;
                    },
                    remove: function (caseNumber, ssoUserName) {
                        var deferred = $q.defer();
                        strata.cases.notified_users.remove(caseNumber, ssoUserName, function (response) {
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler));
                        return deferred.promise;
                    }
                },
                sbrs: {
                    add: function (caseNumber, sbrGroups) {
                        var deferred = $q.defer();
                        strata.cases.sbrs.add(caseNumber, sbrGroups, function (response) {
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler));
                        return deferred.promise;
                    },
                    remove: function (caseNumber, sbrGroups) {
                        var deferred = $q.defer();
                        strata.cases.sbrs.remove(caseNumber, sbrGroups, function (response) {
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler));
                        return deferred.promise;
                    }
                },
                get: function (id) {
                    var deferred = $q.defer();
                    if (strataCache.get('case' + id)) {
                        //Changing cache response. Making sortModifiedDate as Date before sending
                        var caseChatsResponse = strataCache.get('case' + id);
                        angular.forEach(caseChatsResponse.chats.chat, angular.bind(this, function (chat) {
                            chat.sortModifiedDate = new Date(chat.sortModifiedDate);
                        }));

                        deferred.resolve([
                            caseChatsResponse,
                            true
                        ]);
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
                            deferred.resolve([
                                response,
                                false
                            ]);
                        }, angular.bind(deferred, errorHandler));
                    }
                    return deferred.promise;
                },
                search: function (caseStatus, caseOwner, caseGroup, accountNumber, searchString, sortField, sortOrder, offset, limit, queryParams, start, partnerSearch) {
                    const deferred = $q.defer(),
                          key = `search${Array.prototype.join.call(arguments, '-')}`;

                    if (strataCache.get(key)) {
                        deferred.resolve(strataCache.get(key));
                    } else {
                        strata.cases.search((response) => {
                            angular.forEach(response['case'], (kase) => {
                                const createdDate = RHAUtils.convertToTimezone(kase.created_date);
                                kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
                                const modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
                                kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
                            });
                            strataCache.put(key, response);
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler), caseStatus, caseOwner, caseGroup, accountNumber, searchString, sortField, sortOrder, offset, limit, queryParams, start, partnerSearch);
                    }
                    return deferred.promise;
                },
                advancedSearch: function (query, order, offset, limit, format) {
                    const deferred = $q.defer(),
                          key = `advancedSearch-${Array.prototype.join.call(arguments, '-')}`;

                    if (strataCache.get(key)) {
                        deferred.resolve(strataCache.get(key));
                    } else {
                        strata.cases.advancedSearch((response) => {
                            angular.forEach(response['case'], (kase) => {
                                const createdDate = RHAUtils.convertToTimezone(kase.created_date);
                                kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
                                const modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
                                kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
                            });
                            strataCache.put(key, response);
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler), query, order, offset, limit, format);
                    }

                    return deferred.promise;
                },
                filter: function (params, partnerSearch) {
                    const deferred = $q.defer(),
                          key = `filter${JSON.stringify(params)}`;

                    if (RHAUtils.isEmpty(params)) {
                        params = {};
                    }
                    if (RHAUtils.isEmpty(params.count)) {
                        params.count = 50;
                    }
                    if (strataCache.get(key)) {
                        deferred.resolve(strataCache.get(key));
                    } else {
                        strata.cases.filter(params, partnerSearch, (response) => {
                            angular.forEach(response['case'], (kase) => {
                                const createdDate = RHAUtils.convertToTimezone(kase.created_date);
                                kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
                                const modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
                                kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
                            });
                            strataCache.put(key, response);
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler));
                    }
                    return deferred.promise;
                },
                post: function (caseJSON) {
                    var deferred = $q.defer();
                    strata.cases.post(caseJSON, function (caseNumber) {
                        //Remove any case filters that are cached
                        clearAllCaseSearch();
                        deferred.resolve(caseNumber);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                },
                put: function (caseNumber, caseJSON) {
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
                    update: function (caseNumber, ssoUserName) {
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
                    severity: function () {
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
                    status: function () {
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
                    types: function () {
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
                        size: function () {
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
                businesshours: function (timezone) {
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
                get: function (userId) {
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
                getBySSO: function(userSSO) {
                    var deferred = $q.defer();
                    if(strataCache.get('userSSO' + userSSO)) {
                        deferred.resolve(strataCache.get('userSSO' + userSSO));
                    } else {
                        strata.users.getBySSO(function(response) {
                            strataCache.put('userSSO' + userSSO, response);
                            deferred.resolve(response);
                        }, angular.bind(deferred, errorHandler), userSSO);
                    }
                    return deferred.promise;
                },
                chatSession: {
                    post: function () {
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
                sfdc: function () {
                    var deferred = $q.defer();
                    strata.health.sfdc(function (response) {
                        deferred.resolve(response);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                }
            },
            escalationRequest: {
                create: function (escalationJSON) {
                    var deferred = $q.defer();
                    strata.escalation.create(escalationJSON, function (escalationNum) {
                        deferred.resolve(escalationNum);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                }
            },
            reviews: {
                getCaseNumber: function (query) {
                    var deferred = $q.defer();
                    strata.reviews.getCaseNumber(query, function (response) {
                        deferred.resolve(response);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                },
                getSolutionNumber: function (query) {
                    var deferred = $q.defer();
                    strata.reviews.getSolutionNumber(query, function (response) {
                        deferred.resolve(response);
                    }, angular.bind(deferred, errorHandler));
                    return deferred.promise;
                }
            }
        };
        return service;
    }
}
