/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree.directivesRaterPage', []);
    app.directive('nodeTreeRaterPage', function () {

        return {
            template: '<noderp ng-repeat="noderp in tree"></noderp>',
            replace: true,
            restrict: 'E',
            scope: {
                tree: '=children'
            }
        };
    });
    app.directive('noderp', function ($compile, $window, $q) {
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
            templateUrl: 'partials/node-raterPage.html', // HTML for a single node.
            link: function (scope, element) {
                /*
                 * Here we are checking that if current node has children then compiling/rendering children.
                 * */
                 lazyLoadApi().then(function () {
                        console.log('promise resolved');
                        
                    }, function () {
                        console.log('promise rejected');
                    });
                if (scope.noderp && scope.noderp.children && scope.noderp.children.length > 0) {
                    scope.noderp.childrenVisibility = false;
                    var childNode = $compile('<ul class="tree" ng-if="!noderp.childrenVisibility"><node-tree-rater-page children="noderp.children"></node-tree-rater=page></ul>')(scope);
                    element.append(childNode);
                } else {
                    scope.noderp.childrenVisibility = false;
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
                $scope.checkNode = function (noderp) {
                	console.log('Inside directive')
                	console.log(noderp)
                    noderp.checked = !noderp.checked;
                    function checkChildren(c) {
                        angular.forEach(c.children, function (c) {
                            c.checked = noderp.checked;
                            checkChildren(c);
                        });
                    }

                    checkChildren(noderp);
                };
            }]
        };
    });
})(angular);