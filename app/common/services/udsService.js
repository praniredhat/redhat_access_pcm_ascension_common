'use strict';

const uds = require('udsjs');

export default class UdsService {
    constructor() {
        'ngInject';

        this.cases = {
            list: function (uql, resourceProjection, limit, sortOption, onlyStatus) {
                return uds.fetchCases(uql,
                    resourceProjection,
                    limit,
                    sortOption,
                    onlyStatus
                );
            },
            sbrs: function () {
                return uds.fetchCaseSbrs();
            },
            listTopCases: function (queryString) {
                return uds.fetchTopCasesFromSolr(queryString);
            },
            listLanguages: function () {
                return uds.fetchCaseLanguages();
            }
        };
        this.brms = {
            getResponse: function (jsonObject) {
                return uds.getBrmsResponse(jsonObject);
            }
        };
        this.bomgar = {
            getSessionKey: function (caseId) {
                return uds.generateBomgarSessionKey(caseId);
            }
        };
        this.kase = {
            handlingSystem: {
                set: function (caseNumber, handlingSystemArray) {
                    return uds.setHandlingSystem(caseNumber, handlingSystemArray);
                }
            },
            details: {
                get: function (caseNumber) {
                    return uds.fetchCaseDetails(caseNumber);

                },
                put: function (caseNumber, caseDetails) {
                    return uds.updateCaseDetails(caseNumber, caseDetails);
                }
            },
            nep: {
                create: function (caseNumber, nep) {
                    return uds.createCaseNep(caseNumber, nep);
                },
                update: function (caseNumber, nep) {
                    return uds.updateCaseNep(caseNumber, nep);
                },
                remove: function (caseNumber) {
                    return uds.removeCaseNep(caseNumber);
                }
            },
            associates: {
                get: function (uqlContributors) {
                    return uds.fetchCaseAssociateDetails(uqlContributors);
                },
                post: function (caseId, userId, roleName) {
                    var jsonAssociates =
                    {
                        "resource": {
                            "associate": {
                                "externalModelId": userId

                            },
                            "role": roleName
                        }

                    };
                    return uds.addAssociates(caseId,
                        jsonAssociates
                    );

                },
                remove: function (caseId, associateId) {
                    return uds.deleteAssociates(caseId, associateId);
                },
                update: function (caseId, userId, roleName, associateId) {
                    var jsonAssociates =
                    {
                        "resource": {
                            "associate": {
                                "externalModelId": userId

                            },
                            "role": roleName
                        },
                        "externalModelId": associateId
                    };
                    return uds.updateCaseAssociate(caseId, jsonAssociates);
                }
            },
            comments: {
                get: function (caseNumber) {
                    return uds.fetchCaseComments(caseNumber);

                },
                post: {
                    private: function (caseNumber, commentText, hoursWorked) {
                        return uds.postPrivateComments(caseNumber,
                            commentText,
                            hoursWorked
                        );
                    },
                    public: function (caseNumber, commentText, doNotChangeSbt, hoursWorked) {
                        return uds.postPublicComments(caseNumber,
                            commentText,
                            doNotChangeSbt,
                            hoursWorked
                        );
                    }
                },
                put: {
                    private: function (caseNumber, commentText, caseCommentId, draft) {
                        return uds.postEditPrivateComments(
                            caseNumber,
                            commentText,
                            caseCommentId,
                            draft
                        );
                    },
                    public: function (caseNumber, commentText, caseCommentId, draft) {
                        return uds.postPvtToPubComments(
                            caseNumber,
                            commentText,
                            caseCommentId,
                            draft
                        );
                    }
                }
            },
            history: {
                get: function (caseNumber) {
                    return uds.fetchCaseHistory(caseNumber);

                }
            },
            resourceLinks: {
                get: function (solutionIdQuery) {
                    return uds.fetchSolutionDetails(solutionIdQuery);
                }
            },
            lock: {
                get: function (caseNumber) {
                    return uds.getlock(caseNumber);

                },
                remove: function (caseNumber) {
                    return uds.releaselock(caseNumber);
                }
            },
            calls: {
                get: function (caseNumber) {
                    return uds.getCallLogsForCase(caseNumber);
                }
            },
            sbt: {
                get: function (uql) {
                    return uds.fetchCases(uql, null, null, null, true);
                }
            },
            sbrs: {
                add: function (caseNumber, sbrArray) {
                    return uds.addCaseSbrs(caseNumber, sbrArray);
                },
                remove: function (caseNumber, sbrArray) {
                    return uds.removeCaseSbrs(caseNumber, sbrArray);
                }
            },
            tags: {
                get: function () {
                    return uds.getCaseTagsList();
                },
                add: function (caseNumber, tagsArray) {
                    return uds.addCaseTags(caseNumber, tagsArray);
                },
                remove: function (caseNumber, tagsArray) {
                    return uds.removeCaseTags(caseNumber, tagsArray);
                }
            },
            additionalContacts: {
                get: function (caseNumber) {
                    return uds.getAdditionalContacts(caseNumber);
                },
                remove: function (caseNumber, contacts) {
                    return uds.removeAdditionalContacts(caseNumber, contacts);
                },
                put: function (caseNumber, contacts) {
                    return uds.addAdditionalContacts(caseNumber, contacts);
                }
            },
            owner: {
                update: function(caseNumber, ownerSSO) {
                    return uds.updateCaseOwner(caseNumber, ownerSSO);
                }
            }
        };
        // This is not to be confused with kase.comments.  This top level comments object allows you to query
        // /case/comments with custom UQL
        this.comments = {
            get: function (uql) {
                return uds.fetchComments(uql);

            }
        };
        this.account = {
            get: function (accountNumber) {
                return uds.fetchAccountDetails(accountNumber);
            },
            notes: function (accountNumber) {
                return uds.fetchAccountNotes(accountNumber);
            },
            openCases: function (uql) {
                return uds.getOpenCasesForAccount(uql);
            },
            avgCSAT: {
                get: function (uql) {
                    return uds.getAvgCSATForAccount(uql);
                }
            },
            getCaseContacts: function (accountNumber) {
                return uds.getCaseContactsForAccount(accountNumber);
            },
            getCaseGroups: function (contactSSO) {
                return uds.getCaseGroupsForContact(contactSSO);
            },
            rmeCount: {
                get: function (uql) {
                    return uds.getRMECountForAccount(uql);
                }
            }
        };
        this.user = {
            get: function (uql, resourceProjection) {
                return uds.fetchUser(uql,
                    resourceProjection
                );
            },
            details: function (ssoUsername) {
                return uds.fetchUserDetails(ssoUsername);
            },
            languages: {
                add: function(userId, language, type) {
                    return uds.addLanguageToUser(userId, language, type);
                },
                remove: function(userId, query) {
                    return uds.removeLanguagesFromUser(userId, query);
                }
            },
            tags: {
                add: function(userId, tagName) {
                    return uds.addTagToUser(userId, tagName);
                },
                remove: function(userId, query) {
                    return uds.removeTagsFromUser(userId, query);
                }
            },
            queueBuddies: {
                setAsQB: function(qbUserId, userId) {
                    return uds.addUserAsQB(qbUserId, userId);
                },
                remove: function (qbUserId, query) {
                    return uds.removeUserQBs(qbUserId, query);
                }
            },
            nnoRegions: {
                add: function(userId, nnoRegion) {
                    return uds.addNNOToUser(userId, nnoRegion);
                },
                remove: function(userId, query) {
                    return uds.removeNNOsFromUser(userId, query);
                }
            }
        };
        this.cqi = {
            // Run UQL against the CQI endpoint
            get: function (uql) {
                return uds.getCQIs(uql);

            },
            questions: {
                get: function (caseNumber) {
                    return uds.getCQIQuestions(
                        caseNumber
                    );
                }
            },
            score: {
                put: function (caseNumber, reviewData) {
                    return uds.postCQIScore(
                        caseNumber,
                        reviewData
                    );
                }
            }
        };
        this.reviews = {
            dependencies: {
                get: function () {
                    return uds.getQuestionDependencies();
                }
            }
        };
        this.solution = {
            details: {
                get: function (solutionNumber, resourceProjection) {
                    return uds.getSolutionDetails(
                        solutionNumber,
                        resourceProjection
                    );
                }
            },
            sqi: {
                questions: {
                    get: function (solutionNumber) {
                        return uds.getSQIQuestions(solutionNumber);
                    }
                },
                score: {
                    put: function (solutionNumber, reviewData) {
                        return uds.postSQIScore(solutionNumber,
                            reviewData
                        );
                    }
                },
                // Run UQL against the SQI endpoint
                get: function (uql) {
                    return uds.getSQIs(uql);

                }
            },
            pinSolution: function (caseNumber, solutionJson) {
                return uds.pinSolutionToCase(caseNumber, solutionJson);
            }
        };
        this.sbr = {
            list: function (resourceProjection, query) {
                return uds.getSbrList(resourceProjection,
                    query
                );
            },
            removeUserSbr: function (userId, query) {
                return uds.removeUserSbr(userId,
                    query
                );
            },
            user: {
                put: function (userId, uql, data) {
                    return uds.postAddUsersToSBR(userId,
                        uql,
                        data
                    );
                }
            }
        };
        this.roles = {
            list: function (query) {
                return uds.getRoleList(query
                );
            },
            roleDetails: function (roleId) {
                return uds.getRoleDetails(roleId);
            },
            listAllRoles: function (query) {
                return uds.getAllRolesList(query);
            },
            createRole: function (roleDetails) {
                return uds.createRole(roleDetails);
            },
            updateRole: function (roleId, rolePayload) {
                return uds.updateRole(roleId, rolePayload);
            },
            deleteRole: function (roleId) {
                return uds.deleteRole(roleId);
            },
            removeUserRole: function (userId, query) {
                return uds.removeUserRole(userId,
                    query
                );
            },
            postRoleLevel: function (userId, roleName, roleLevel) {
                return uds.postRoleLevel(userId, roleName, roleLevel);
            },
            user: {
                put: function (userId, uql, data) {
                    return uds.postAddUsersToRole(
                        userId,
                        uql,
                        data
                    );
                },
                update: function (userId, role) {
                    return uds.updateUserRole(userId, role);
                }
            },
            templates: {
                list: function(query) {
                    return uds.fetchPriorityTemplates(query);
                }
            }
        };
        this.solr = {
            access: {
                get: function (query) {
                    return uds.fetchSolr(query).then(function (response) {
                        if (typeof response === 'string') return JSON.parse(response);

                        return response;
                    });
                }
            },
            cases: {
                get: function (query) {
                    return uds.fetchCaseSolr(query).then(function (response) {
                        if (typeof response === 'string') return JSON.parse(response);

                        return response;
                    });
                }
            }

        };
        this.sfdc = {
            user: {
                get: function (userID) {
                    return uds.getUserDetailsFromSFDC(userID);
                }
            },
            callCenter: {
                get: function (callCenterId) {
                    return uds.getCallCenterFromSFDC(callCenterId);
                }
            }
        };
    }
}
