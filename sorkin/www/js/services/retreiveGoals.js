var performAccel = angular.module('performAccel');

performAccel.service('retreiveGoals', function($http, $q) {

    this.getGoalsData = function(userName) {
    	console.log('Calling service to retreive goals');

    	 var d = $q.defer();

    	   mPreviewUrl='/a/customer/' + userName +  '/program';

    	   $http.get(mPreviewUrl).success(function(data, status, headers, config) {
    		   console.log(data);
    		   var goalsData = data;
    		   d.resolve(goalsData);
    	   })
    	   .error(function(data, status, headers, config) {
    		   if (data.message == 'No Program exists as of now!!'){
    			   	// alert('Please create a program first !!');
    			   	// window.location.assign('/');
    		   };
               var response = data;
    		   console.log(response);
               d.reject(response);
    	   });

        return d.promise;
    };

});