/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesDisableStar', []);
    app.directive('nodeTreeDisableStar', function () {
        return {
            template: '<nodedisstar ng-repeat="nodedisstar in tree"></nodedisstar>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('nodedisstar', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node-disabledstar.html', // HTML for a single node.
            link: function (scope, element) {
                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                if (scope.nodedisstar && scope.nodedisstar.children && scope.nodedisstar.children.length > 0) {
                    scope.nodedisstar.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!nodedisstar.childrenVisibility"><node-tree-disable-star children="nodedisstar.children"></node-tree-disable-star></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.nodedisstar.childrenVisibility = false;
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
                $scope.checkNode = function (nodedisstar) {
                	console.log('Inside directive')
                	console.log(nodedisstar)
                    nodedisstar.checked = !nodedisstar.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = nodedisstar.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(nodedisstar);
                };
            }]
        };
    });
})(angular);