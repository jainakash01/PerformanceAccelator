/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesEveReview', []);
    app.directive('nodeTreeEveReview', function () {
        return {
            template: '<nodeer ng-repeat="nodeer in tree"></nodeer>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('nodeer', function ($compile, $window, $q) {
        function load_script() {
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = 'js/star-ratingnew.js';
            document.body.appendChild(s);
        }
        function lazyLoadApi(key) {
            var deferred = $q.defer();
            $window.initialize = function () {
                deferred.resolve();
            };
            // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
            if ($window.attachEvent) {
                $window.attachEvent('onload', load_script); 
            } else {
                $window.addEventListener('load', load_script(), false);
            }
            return deferred.promise;
        }
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/node-eReview.html', // HTML for a single node.
            link: function (scope, element) {

                lazyLoadApi().then(function () {
                        console.log('promise resolved');
                        
                    }, function () {
                        console.log('promise rejected');
                    });

                if (scope.nodeer && scope.nodeer.children && scope.nodeer.children.length > 0) {
                    scope.nodeer.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!nodeer.childrenVisibility"><node-tree-eve-review children="nodeer.children"></node-tree-eve-review></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.nodeer.childrenVisibility = false;
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
                $scope.checkNode = function (nodeer) {
                	console.log('Inside directive')
                	console.log(nodeer)
                    nodeer.checked = !nodeer.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = nodeer.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(nodeer);
                };
            }]
        };
    });
})(angular);