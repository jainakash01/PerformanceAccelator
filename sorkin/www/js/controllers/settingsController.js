var performAccel = angular.module('performAccel');

performAccel.controller('settingsCtrl', function ($scope, $location, $http, $anchorScroll, $window, getUserData, programJson) {

    	//console.log(statusService);
    $scope.showChangeIcon = false;
    $scope.showEditor = false;

    // $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {

    //    // $state.href(from, fromParams)
    //    console.log(from);
    // });
	$scope.selectedGoals = [];

    	getUserData.getData()
        .then(function(resp) {
        	console.log('Setting')
        	console.log(resp);

        statusService = resp;

      	$scope.userName = resp.first_name;
    	$scope.userEmail = resp.email;
    	$scope.userPassword = resp.password;
        $scope.userPicUrl = 'assets/img/find_user.png';
        $scope.coachId = resp.coach_id;
        $scope.phoneNumber = resp.phone_number;

    	$scope.indiGoalSelected = [];
    	$scope.indiPerformGoalSlc = [];
    	$scope.indiDeveGoalSlc = [];
    	$scope.indiSkillSlc = [];
    	$scope.indiRootSlct = [];
    	$scope.model = {};

	    $http.get('/a/GetUploadPhotoUrl/' + $scope.userEmail).success(function(data, status, headers, config) {
	    	console.log('upload URL');
	    	console.log(data);
	    	$scope.uploadUrl = data;
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('Errored');
	    	//alert(data);
	    });



	    $http.get('/a/customer/' + $scope.userEmail + '/photo').success(function(data, status, headers, config) {
	    	console.log('image data URL');
	    	$scope.userPicUrl = data;
	    	//console.log(data);
	    	//$scope.uploadUrl = data;
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('Errored');
	    	//alert(data);
	    });



    	$scope.urlUpload = '/a/uploadPhoto/' + $scope.userEmail;


    	goalData = programJson.getData($scope.userEmail)



    	$scope.uploadPhoto=function(){
    		console.log('uploading pic');
    		console.log($scope.userPic);
    		url = '/a/customer/' + $scope.userEmail + '/uploadPhoto';
    	    $http.post(url).success(function(data, status, headers, config) {
    	    	console.log('Pending');

    	    })
    	    .error(function(data, status, headers, config) {
    	    	console.log('Errored');
    	    	//alert(data);
    	    });

    	}

        $scope.cancel = function(){
        	$location.path('#/home');
        }

        $scope.edit = function(){
            $scope.userNameEdit = $scope.userName;
            $scope.companyEdit = $scope.company;
            $scope.roleEdit = $scope.role;
            $scope.coachEdit = $scope.coachId;
            $scope.inputCycleEdit = $scope.trainingCycle;
            $scope.newPasswordEdit = $scope.userPassword;
            $scope.phoneNumberEdit = $scope.phoneNumber;

            $scope.showEditor = true;

        }

        $scope.saveToDb = function(){
            $scope.showEditor = false;

            saveUrl = '/a/customer/' + $scope.userEmail;

            body2={'first_name' : $scope.userNameEdit, 'password' : $scope.newPasswordEdit ,'phone_number': $scope.phoneNumberEdit, 'company': $scope.companyEdit,'role':$scope.roleEdit , 'coach_id' : $scope.coachEdit};

    	    $http.put(saveUrl,body2).success(function(data, status, headers, config) {
    	    	console.log('saving to DB');

    	    	$.jStorage.deleteKey("Sorkin_Session");

    			var subData = {
    			"username":$scope.userEmail,
    			"password":$scope.newPasswordEdit
    			};

    			console.log('Calling URL');
    			$http.put('/a/customer/' + $scope.userEmail + '/verify', subData).success(function(data) {
    				$scope.response = data;
    				console.log('After verifying user pass');

    				 console.log('Success');
    				 $.jStorage.set("Sorkin_Session", data);
                     $.jStorage.setTTL("Sorkin_Session", 24 * 60 * 60 * 1000);

    				$location.path('/settings');
    				ohSnap($scope.userName + ', your profile has been updated.Please refresh page', {'color':'green'});


    	    })
    	    .error(function(data, status, headers, config) {
    	    	console.log('Errored');
    	    	//alert(data);
    	    });

        })};


    	goalData
        .then(function(data){
          console.log('after get called check');
          console.log(data.programs);
          $scope.tree = data.programs;
          $scope.trainingCycle = data.training_cycle;

        });


    	$scope.addItemInSelected = function(item){

    		console.log($scope.selectedGoals.length);

    		if ($scope.selectedGoals.length == 0){
    			console.log('Adding 1st');
    			$scope.selectedGoals.push(item.name);
    			$scope.$apply();
    		}


    		else {
    			console.log('Coming to else');

    		for (i=0;i<=$scope.selectedGoals.length -1 ;i++){
    			console.log('Inside for loop');
    			console.log($scope.selectedGoals)
    			if ($scope.selectedGoals[i] == item.name){
    				$scope.selectedGoals.splice(i);
    				$scope.$apply();
    				return;
    			}
    			else {
    				console.log('Adding here');
    				$scope.selectedGoals.push(item.name);
    				$scope.$apply();
    				return;
    			}

    		} }

    	};

	$scope.activate = true;
	$scope.showProfile=false;
	$scope.showinviteRater=false;
	$scope.showManage=false;
	$scope.showAccept=false;
	$scope.showOption = false;
	$scope.role = statusService.role;
	$scope.company = statusService.company;



	manageInvitersUrl = '/a/customer/' + $scope.userEmail   + '/manageRaters';

    $http.get(manageInvitersUrl).success(function(data, status, headers, config) {
    	console.log('Pending');
    	console.log(data.pending);
    	$scope.pendingList = data.pending;
    	$scope.acceptedList = data.acceptedList;
    })
    .error(function(data, status, headers, config) {
    	console.log('Errored');
    	//alert(data);
    });




	toAcceptUrl = '/a/customer/' + $scope.userEmail   + '/toAccept';


    $http.get(toAcceptUrl).success(function(data, status, headers, config) {
    	console.log('Success');
    	console.log('Fetching to Accept details');
    	console.log(data);
    	$scope.toAcceptList = data;
    	$scope.numberAccept = data.length;

    })
    .error(function(data, status, headers, config) {
    	console.log('Errored');
    });


    $scope.editDs = function(nodeir){
    	alert('clicked')
    }




	$scope.submitReview = function(){

		console.log('Check all checked');
		console.log($scope.tree);
    	//$scope.sendModelFlag = [];


		inviteUrl = '/a/customer/' + $scope.userEmail  + '/invite';

		//alert($scope.emailId)

		console.log('Check the selected items');

        if(typeof $scope.emailId == 'undefined' || $scope.emailId == null) {
            ohSnap('Please enter email id of invitee ', {'color':'red'});
        } else {

    		inviteParams = {'rater_id' : $scope.emailId, 'raterScopes' : $scope.tree , 'gapDays' : $scope.gapDays , 'gapRatings' : $scope.gapRatings}

            $http.put(inviteUrl, inviteParams).success(function(data, status, headers, config) {
            	console.log('Success');
            	console.log('raters to be notified by mail');
            	// window.location.reload();
            	ohSnap('Notification has been send to '+ $scope.emailId + ' for invitation', {'color':'green'});

            })
            .error(function(data, status, headers, config) {
            	if (data.message == 'Already your rater'){
            		// alert('Already your rater');
            		ohSnap($scope.emailId+' is already your rater', {'color':'red'});
            		//ohSnap('Already your rater', {'color':'red'});

            	}
            	console.log('Errored')
            });
        }

	};

	$scope.collapse=function(option, newHash1) {
		//alert('show');

      	if (option == 0) {
		 	$scope.showinviteRater=false;
			$scope.showManage=false;
			$scope.showAccept=false;
		 	$scope.showProfile=!$scope.showProfile;
		} else if (option == 1) {
		 	$scope.showProfile=false;
		 	$scope.showManage=false;
			$scope.showAccept=false;
			$scope.showinviteRater=!$scope.showinviteRater;
			angular.element($window).scrollTop(290);

		} else if (option == 2) {
		 	$scope.showProfile=false;
		 	$scope.showinviteRater=false;
		 	$scope.showAccept=false;
		 	$scope.showManage=!$scope.showManage;
		 	angular.element($window).scrollTop(405);
		 } else if (option == 3) {
		 	$scope.showProfile=false;
		 	$scope.showinviteRater=false;
		 	$scope.showManage=false;
			$scope.showAccept=!$scope.showAccept;
			angular.element($window).scrollTop(620);
		 }
		// var newHash = newHash1;
		// if ($location.hash() !== newHash) {

        	// $location.hash(newHash1);
      	// } else {

        	// $anchorScroll();
      	// }
	}
	$scope.optionCollapse = function() {
		$scope.showOption = !$scope.showOption;
	}

	$scope.optionCollapse = function() {
		$scope.showOption = !$scope.showOption;
	}

	$scope.optionCollapse1 = function() {
		$scope.showOption1 = !$scope.showOption1;
	}

	$scope.optionCollapse2 = function() {
		$scope.showOption2 = !$scope.showOption2;
	}

	$scope.optionCollapse3 = function() {
		$scope.showOption3 = !$scope.showOption3;
	}

	$scope.optionCollapse4 = function() {
		$scope.showOption4 = !$scope.showOption4;
	}

	$scope.optionCollapse5 = function() {
		$scope.showOption5 = !$scope.showOption5;
	}

    $scope.changeProfile = function() {
        $scope.showChangeIcon = true;
    }
    $scope.changeProfileMouseOut = function() {
        $scope.showChangeIcon = false;
    }


	$scope.acceptInvitation = function(invitedBy,confirm){

console.log('Accepting invite');
console.log(invitedBy);
console.log(confirm);

confirmUrl = '/a/customer/' + $scope.userEmail + '/confirmAcceptance/' + invitedBy;

var inviteParams = {'confirm' : confirm};

$http.put(confirmUrl, inviteParams).success(function(data, status, headers, config) {
	console.log('Success');
	console.log('invitation accepted');
	// alert('Request Accepted');
    ohSnap('Request has been accepted !!', {'color':'green'});
	window.location.reload();
})
.error(function(data, status, headers, config) {
	console.log('Errored in accepting invite')
});

	}

	$scope.setPosition = function(newHash1) {
		//angular.element("#inviteBlock")[0].scrollTop = 0;
		// $location.hash('inviteBlock');
		// var newHash = newHash1;
		// if ($location.hash() !== newHash) {

  //       	$location.hash(newHash);
  //     	} else {

  //       	$anchorScroll();
  //     	}

	};
    });
});
