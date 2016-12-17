var performAccel = angular.module('performAccel');

performAccel.controller('sidebarCtrl', function ($scope, $location, $http, statusService, $window ) {

console.log('Inside sidebar ctrl');


    	console.log('Called sesion service');
    	console.log(statusService);
    	$scope.userName = statusService.first_name;


});