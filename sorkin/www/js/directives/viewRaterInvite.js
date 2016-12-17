/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesViewInviteRater', []);
    app.directive('nodeTreeViewInviteRater', function () {
        return {
            template: '<nodeviewrate ng-repeat="nodeviewrate in tree"></nodeviewrate>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('nodeviewrate', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node-viewRaterDtls.html', // HTML for a single node.
            link: function (scope, element) {
                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                if (scope.nodeviewrate && scope.nodeviewrate.children && scope.nodeviewrate.children.length > 0) {
                    scope.nodeviewrate.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!nodeviewrate.childrenVisibility"><node-tree-view-invite-rater children="nodeviewrate.children"></node-tree-view-invite-rater></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.nodeviewrate.childrenVisibility = false;
                }
            },
            controller: ["$scope", function ($scope) {
                // This function is for just toggle the visibility of children
                $scope.toggleVisibility = function (node) {
                    if (node.children) {
                        node.childrenVisibility = !node.childrenVisibility;
                    }
                };
                // Here We are marking check/un-check all the nodes.
                $scope.checkNode = function (nodeviewrate) {
                	console.log('Inside directive')
                	console.log(nodeviewrate)
                    nodeviewrate.checked = !nodeviewrate.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = nodeviewrate.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(nodeviewrate);
                };
            }]
        };
    });
})(angular);