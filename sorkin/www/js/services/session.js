var performAccel = angular.module('performAccel');

performAccel.service('getUserData', function($http, $q) {

    this.getData = function() {
    	console.log('Callied service');
        var userData = $.jStorage.get("Sorkin_Session");
        var d = $q.defer();

        if (userData) {
            console.log('Yes, retrieved from Cache');
            d.resolve(userData);
            console.log(userData.user_logging);
        } else {
        	window.location.assign('/login');
        	
        	return;
/*                    $.jStorage.set("Sorkin_Session", response);
                    $.jStorage.setTTL("Sorkin_Session" + compName, 100 * 60 * 1000);
                    d.resolve(response);*/

        };
        return d.promise;
    };

});