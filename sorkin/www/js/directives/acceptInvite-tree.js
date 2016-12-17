/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesAcceptInvite', []);
    app.directive('nodeTreeAcceptInvite', function () {
        return {
            template: '<nodeain ng-repeat="nodeain in tree"></nodeain>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('nodeain', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node-acceptInvite.html', // HTML for a single node.
            link: function (scope, element) {
                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                if (scope.nodeain && scope.nodeain.children && scope.nodeain.children.length > 0) {
                    scope.nodeain.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!nodeain.childrenVisibility"><node-tree-accept-invite children="nodeain.children"></node-tree-accept-invite></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.nodeain.childrenVisibility = false;
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
                $scope.checkNode = function (nodeain) {
                	console.log('Inside directive')
                	console.log(nodeain)
                    nodeain.checked = !nodeain.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = nodeain.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(nodeain);
                };
            }]
        };
    });
})(angular);