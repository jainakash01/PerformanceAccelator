var performAccel = angular.module('performAccel');

performAccel.service('programJson', function($http, $q) {
    var jsonData = [];
    // jsonData = {
    //     'program':[]
    // };
    this.setData = function(jsonObj,userEmail) {
        //console.log(userEmail);

    	console.log('Called Json setter service ...............');
         

    	setProgramUrl = '/a/customer/' + userEmail + '/program';

    	 $http.put(setProgramUrl,jsonObj).success(function(data, status, headers, config) {


  	   })
  	   .error(function(data, status, headers, config) {
  		   console.log('Error in Create new program');

 	   });


        jsonData.push(jsonObj);

        return jsonData;
    };
    this.getData = function(userEmail) {

        console.log(userEmail);

    	var d = $q.defer();

    	getProgramUrl = '/a/customer/' + userEmail + '/program';

   	 	$http.get(getProgramUrl).success(function(data, status, headers, config) {
   	 		console.log('After calling getter')
   	 		console.log(data);
   	 		d.resolve(data);
   	 		//jsonData2 = data;
 	   })
 	   .error(function(data, status, headers, config) {
 		   console.log('Error in GET new program 2');
 		   d.resolve(data);
	   });

        console.log('Getter service called...............');
        //console.log(d.promise[0].value);
        return d.promise;
    };
    this.getDefaultJson = function() {
        console.log('Getter service called for default json...............');
        var jsonData = [{
                        'training_cycle':30,
                        'OG':'',
                        'IPG':'',
                        'IDG':'',
                        'SKILLCOMP':'',
                        'ROOTFACT':'Humanity',
                        'DS':'Daily statement 1',
                        'rater':[],
                        'coach' : 'stephen@iaccel-atstakeperformance.com'
                        },
                        {
                        'training_cycle':40,
                        'OG':'',
                        'IPG':'',
                        'IDG':'',
                        'SKILLCOMP':'',
                        'ROOTFACT':'Ownership',
                        'DS':'Daily statement 2',
                        'rater':[],
                        'coach' : 'stephen@iaccel-atstakeperformance.com'
                        },
                        {
                        'training_cycle':50,
                        'OG':'',
                        'IPG':'',
                        'IDG':'',
                        'SKILLCOMP':'',
                        'ROOTFACT':'I thinking',
                        'DS':'Daily statement 3',
                        'rater':[],
                        'coach' : 'stephen@iaccel-atstakeperformance.com'
                        },
                        ]
        return jsonData;
    };
});