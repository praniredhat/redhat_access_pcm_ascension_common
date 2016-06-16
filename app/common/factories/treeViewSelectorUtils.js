'use strict';

export default function () {
    const removeParams = function (path) {
        if (path) {
            var split = path.split('?');
            return split[0];
        }
        return path;
    };
    const isLeafChecked = function (path) {
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
    const parseTreeNode = function (splitPath, tree, fullFilePath) {
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
    const hasSelectedLeaves = function (tree) {
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
    const getSelectedNames = function (tree, container) {
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
        parseTreeList: function (tree, data) {
            var files = data.split('\n');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var splitPath = file.split('/');
                parseTreeNode(splitPath, tree, file);
            }
        },
        hasSelections: function (tree) {
            return hasSelectedLeaves(tree);
        },
        getSelectedLeaves: function (tree) {
            if (tree === undefined) {
                return [];
            }
            var container = [];
            getSelectedNames(tree, container);
            return container;
        }
    };
}
