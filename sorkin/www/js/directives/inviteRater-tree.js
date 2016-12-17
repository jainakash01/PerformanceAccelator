/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesInviteRater', []);
    app.directive('nodeTreeInviteRater', function () {
        return {
            template: '<nodeir ng-repeat="nodeir in tree"></nodeir>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('nodeir', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node-inviteRater.html', // HTML for a single node.
            link: function (scope, element) {
                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                if (scope.nodeir && scope.nodeir.children && scope.nodeir.children.length > 0) {
                    scope.nodeir.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!nodeir.childrenVisibility"><node-tree-invite-rater children="nodeir.children"></node-tree-invite-rater></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.nodeir.childrenVisibility = false;
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
                $scope.checkNode = function (nodeir) {
                	console.log('Inside directive')
                	console.log(nodeir)
                    nodeir.checked = !nodeir.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = nodeir.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(nodeir);
                };
            }]
        };
    });
})(angular);