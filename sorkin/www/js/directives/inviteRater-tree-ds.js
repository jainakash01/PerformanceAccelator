/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesInviteRater', []);
    app.directive('nodeTreeInviteRaterds', function () {
        return {
            template: '<nodeirds ng-repeat="nodeirds in tree"></nodeirds>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('nodeirds', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node-inviteRaterds.html', // HTML for a single node.
            link: function (scope, element) {
                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                if (scope.nodeirds && scope.nodeirds.children && scope.nodeirds.children.length > 0) {
                    scope.nodeirds.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!nodeirds.childrenVisibility"><node-tree-invite-rater children="nodeirds.children"></node-tree-invite-rater></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.nodeirds.childrenVisibility = false;
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
                $scope.checkNode = function (nodeirds) {
                    console.log('Inside directive')
                    console.log(nodeirds)
                    nodeirds.checked = !nodeirds.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = nodeirds.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(nodeirds);
                };
            }]
        };
    });
})(angular);