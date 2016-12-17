var performAccel = angular.module('performAccel');

performAccel.controller('homeCtrl', function ($scope, $location, $http, statusService, $window, retreiveGoals, programJson) {
	console.log('Oh did resolve worked ??')
	console.log(statusService);
	$scope.enableMorn = false;
	$scope.enableEve = false;
	

/*	getUserData.getData()
    .then(function(resp) {
*/
    	$scope.userName = statusService.first_name;
    	$scope.userEmail = statusService.email;
    	$scope.showEntriesFlag = false;

    dt = new Date();
    console.log(dt);
    console.log('Current time above')
    console.log(dt.getHours())
    
    currHrs = dt.getHours();
    
    
    	
	$scope.activate = true;
	angular.element($window).scrollTop(0);
	$scope.mpCompleted = statusService.mpCompleted;
	$scope.erCompleted = statusService.erCompleted;
	
	

	var checkDashReportUrl='/a/customer/' + $scope.userEmail +  '/dashboardReport';
      // var d = $q.defer();
      $http.get(checkDashReportUrl)
        .success(function(data, status, headers, config) {
          console.log('check if dash report.......................');
          console.log(data);
          var inviteeDetails = data;
          if(typeof inviteeDetails.total_prog_days === 'undefined' || inviteeDetails.total_prog_days === 'null') {
            console.log('no data');
          } else {
          	// calculation for days left
            $scope.progPerc = (inviteeDetails.days_sinc_start * 100) / inviteeDetails.total_prog_days;
            $scope.progPerc = Math.round($scope.progPerc);
            $scope.daysLeft = inviteeDetails.total_prog_days - inviteeDetails.days_sinc_start;
            console.log($scope.progPerc);
            
           // alert($scope.daysLeft);
            
            if ($scope.daysLeft <= 0 ){
            	$scope.daysLeftPosi = false;
            } else {
            	$scope.daysLeftPosi = true;
            }

            // calculation for m preview completed

            $scope.mPrevPerc = (inviteeDetails.morning_done * 100) / inviteeDetails.days_sinc_start;
            $scope.mPrevPerc = Math.round($scope.mPrevPerc);

            if ($scope.mPrevPerc  > 100 ) {
            	$scope.mPrevPerc  = 100;
            }
            
            // calculation for e review completed

            $scope.eRevPerc = (inviteeDetails.eve_done * 100) / inviteeDetails.days_sinc_start;
            $scope.eRevPerc = Math.round($scope.eRevPerc);
            
            if ($scope.eRevPerc  > 100 ) {
            	$scope.eRevPerc  = 100;
            }
            
            //$scope.daysLeft = inviteeDetails.total_prog_days - inviteeDetails.days_sinc_start;
          }

            // d.resolve(goalsData);
        })
        .error(function(data, status, headers, config) {
          console.log('errorrrr..............');
          var response = data;
          $scope.showReviewOpt = false;
          console.log(response);
                   // d.reject(response);
        });

	$scope.openMPreview = function() {
		console.log($scope.userEmail);
		//alert($scope.daysLeftPosi)
		if ( !$scope.daysLeftPosi ) {
			alert('Your training program has ended');
			return;
		}
		
/*		if (currHrs > 12 && currHrs <= 23 ) {

            ohSnap('You are allowed to do morning preview between 12 AM to 12 PM !!', {'color':'red'});
            $location.path('/home');
            return;
	    
	    }*/
		
    var response = programJson.getData();
    console.log(response);
    $location.path('/mpreview');
		// retreiveGoals.getGoalsData($scope.userEmail)
		// .then(function(success) {
		// 	console.log('mpreview service response success');
		// 	console.log(success);
		// 	$location.path("/mpreview");
		// }, function(error) {
		// 	console.log('mpreview service response error');
		// 	console.log(error);
		// 	ohSnap('Please create a program first !!', {'color':'red'});
		// });
	}

    var mPreviewUrl = '/a/customer/' + $scope.userEmail + '/morningPrev';

    $http.get(mPreviewUrl).success(function(data, status, headers, config) {
 	   console.log('get called');

 		$scope.mpCompleted =  data.morning_prev_done;
 		$scope.erCompleted = data.evening_prev_done;

    });

  $scope.openEReview = function() {
  		console.log($scope.userEmail);

/*		if (currHrs > 0 && currHrs <= 12 ) {

            ohSnap('You are allowed to do evening preview between 12 PM to 12 AM !!', {'color':'red'});
            $location.path('/home'); 	
            return;
	    
	    }*/

      var mPreviewUrl = '/a/customer/' + $scope.userEmail + '/morningPrev';

          $http.get(mPreviewUrl).success(function(data, status, headers, config) {
             $location.path('/ereview');
          })
           .error(function(data, status, headers, config) {
            //console.log(data);
                ohSnap('Please complete morning preview first !!', {'color':'red'});
                $location.path('/home');
            });

		// retreiveGoals.getGoalsData($scope.userEmail)
		// .then(function(success) {
		// 	console.log('ereview service response success');
		// 	console.log(success);
		// 	$location.path('/ereview');
		// }, function(error) {
		// 	console.log('ereview service response error');
		// 	console.log(error);
		// 	ohSnap('Please create a program first !!', {'color':'red'});
		// });
	}
  
  

	$scope.newPage = function(pageType) {
		if (pageType === 1) {
			$location.path("/mpreview");
		} else if (pageType === 2) {
			$location.path("/ereview");
		}

	}
	
    showEntryData = function(){
		//alert('ok')
    	
      	var selectedDate =  new Date($("#datetimepicker1").data('date'));  //$("#datetimepicker1").data('date');
    	console.log(selectedDate.getDate())
    	
    	console.log((selectedDate.getDate() ) + '' +  (selectedDate.getMonth() + 1) + '' +  selectedDate.getFullYear())
    	datStr = (selectedDate.getDate() ) + '' + (selectedDate.getMonth() + 1) + '' +  selectedDate.getFullYear()
    	
    	urlToCall = '/a/customer/' + $scope.userEmail + '/report/' + datStr;
    	

            $http.post(urlToCall).success(function(data, status, headers, config) {
                    console.log(data);
                    if (data.user_ratings == undefined){
                    	//alert('Review was not done');
                    	$scope.ratedTree = [];
	                    ohSnap('Review not done for the specified date', {'color':'red'});

                    	return
                    }
                    else {
                    $scope.ratedTree = data;
                    $scope.show4Quest = true;
                    }
                    
            })
            .error(function(data, status, headers, config) {
                    console.log(data);
            })
    	
	}

	
	$scope.collapse=function(option, newHash1) {
		//alert('show');

      	if (option == 0) {
		 	$scope.showEntriesFlag=!$scope.showEntriesFlag;

		} }


//});
});

