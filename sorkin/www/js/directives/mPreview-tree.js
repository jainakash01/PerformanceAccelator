/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesMorningPrev', []);
    app.directive('nodeTreeMornPrev', function () {
        return {
            template: '<nodemprev ng-repeat="nodemprev in tree"></nodemprev>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('nodemprev', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node-mornPrev.html', // HTML for a single node.
            link: function (scope, element) {
                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                if (scope.nodemprev && scope.nodemprev.children && scope.nodemprev.children.length > 0) {
                    scope.nodemprev.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!nodemprev.childrenVisibility"><node-tree-morn-prev children="nodemprev.children"></node-tree-morn-prev></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.nodemprev.childrenVisibility = false;
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
                $scope.checkNode = function (nodemprev) {
                	console.log('Inside directive')
                	console.log(nodemprev)
                    nodemprev.checked = !nodemprev.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = nodemprev.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(nodemprev);
                };
            }]
        };
    });
})(angular);