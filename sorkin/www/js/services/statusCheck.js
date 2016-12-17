var performAccel = angular.module('performAccel');
performAccel.factory('statusService', function($http){
         
      var sessionObj = {};
      sessionObj.mpCompleted = false;
      sessionObj.erCompleted = false;
      return sessionObj;

});