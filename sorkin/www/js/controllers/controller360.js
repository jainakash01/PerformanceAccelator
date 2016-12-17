var performAccel = angular.module('performAccel');

performAccel.controller('showRaterDtlsCtrl',
	    function($scope, $http, $modalInstance,$location,rater_details) {

		console.log('Inside showRater action')


		console.log(rater_details);

		$scope.rater_id = rater_details.invited;

		$scope.tree= rater_details.goals;

		$scope.rater_group = rater_details.raterGroup;

		$scope.StayHere = function(){
			 $modalInstance.close();
		}

})



performAccel.controller('ctrl360', function ($scope, $location, $http, $anchorScroll, $window,getUserData,programJson,$modal) {

    	//console.log(statusService);

    $scope.invalidEmailInvite = false;

    $scope.validateEmail = function(emailId) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        ;
        if (re.test(emailId)) {
            $scope.invalidEmailInvite = false;
        } else {
            $scope.invalidEmailInvite = true;
        }
    }

	$scope.selectedGoals = [];

    	getUserData.getData()
        .then(function(resp) {

        statusService = resp;

      $scope.userName = resp.first_name;
    	$scope.userEmail = resp.email;


    	$scope.indiGoalSelected = [];
    	$scope.indiPerformGoalSlc = [];
    	$scope.indiDeveGoalSlc = [];
    	$scope.indiSkillSlc = [];
    	$scope.indiRootSlct = [];
    	$scope.model = {};

    	goalData = programJson.getData($scope.userEmail)

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
	$scope.showMyUser = false;
	$scope.role = statusService.role;
	$scope.company = statusService.company;



	manageInvitersUrl = '/a/customer/' + $scope.userEmail   + '/manageRaters';

    $http.get(manageInvitersUrl).success(function(data, status, headers, config) {
    	console.log('Pending');
    	console.log(data.pending);
    	$scope.pendingList = data.pending;
    	$scope.acceptedList = data.acceptedList;

    	$scope.deleteRater = function(rater_id){
    		console.log('Deleting Rater');
    		console.log(rater_id);

    		delUrl = '/a/customer/' + $scope.userEmail + '/deleteRater/' + rater_id.invited;


    	    $http.delete(delUrl).success(function(data, status, headers, config) {
    	    	console.log('Success in deleting');
    	    	console.log(data);
    	    	ohSnap('Rater removed successfully ', {'color':'green'});
    	    	window.location.reload();

    	    })
    	    .error(function(data, status, headers, config) {
    	    	console.log('Errored in deleting');
    	    });


    	}

    	$scope.showRaterDtls=function(rater){

    		console.log('Called showRater function');
    		console.log(rater);

            var modalInstance = $modal.open({
                templateUrl: 'showRaterDtls.html',
                controller: 'showRaterDtlsCtrl',
                windowClass: 'modal fade in',
                size: 'lg',
                resolve: {
                	rater_details: function() {
                        return rater
                    },
                }
            });

            modalInstance.result.then(function(dataSubmitted) {
            })
    	}

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

    confirmAcceptedUrl = '/a/customer/' + $scope.userEmail + '/confirmAccepted';
    $http.get(confirmAcceptedUrl).success(function(data, status, headers, config) {
    	console.log('Success');
    	console.log('Fetching to confmed details');
    	console.log(data);
    	$scope.confirmAcceptedList = data;
    	$scope.numberAccepted = data.length;

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

		inviteUrl = '/a/customer/' + $scope.userEmail  + '/invite';

		console.log('Check the selected items');

        if(typeof $scope.emailId == 'undefined' || $scope.emailId == null) {
            ohSnap('Please enter email id of invitee ', {'color':'red'});
        } else {
        	
        	if ($scope.inviteComments == undefined || $scope.inviteComments == null){
        		$scope.inviteComments = ' ';
        	}

    		inviteParams = { 'comments' : $scope.inviteComments, 'firstName': $scope.userName, 'invitedBy' : $scope.userEmail, 'rater_id' : $scope.emailId, 'raterScopes' : $scope.tree , 'gapDays' : 7 , 'gapRatings' : $scope.gapRatings , 'raterGroup':$scope.selectedGroup}

            $http.put(inviteUrl, inviteParams).success(function(data, status, headers, config) {
            	window.location.reload();
            	ohSnap('Notification has been send to '+ $scope.emailId + ' for invitation', {'color':'green'});

            })
            .error(function(data, status, headers, config) {
            	if (data.message == 'Already your rater'){

            		ohSnap($scope.emailId+' is already your rater', {'color':'red'});

            	}
            	console.log('Errored');
            });
        }

	};


	$scope.acceptInvitation = function(invitedBy,confirm){

        confirmUrl = '/a/customer/' + $scope.userEmail + '/confirmAcceptance/' + invitedBy;

        var inviteParams = {'confirm' : confirm};

        $http.put(confirmUrl, inviteParams).success(function(data, status, headers, config) {

        	window.location.reload();
            ohSnap('Request has been accepted !!', {'color':'green'});
        })
        .error(function(data, status, headers, config) {
        	console.log('Errored in accepting invite')
        });

	}

	$scope.collapse=function(option, newHash1) {
		//alert('show');

      	if (option == 0) {
		 	$scope.showinviteRater=false;
			$scope.showManage=false;
			$scope.showAccept=false;
		 	$scope.showProfile=!$scope.showProfile;
		 	$scope.showMyUser = false;
		} else if (option == 1) {
		 	$scope.showProfile=false;
		 	$scope.showManage=false;
			$scope.showAccept=false;
			$scope.showMyUser = false;
			$scope.showinviteRater=!$scope.showinviteRater;
			angular.element($window).scrollTop(290);

		} else if (option == 2) {
		 	$scope.showProfile=false;
		 	$scope.showinviteRater=false;
		 	$scope.showAccept=false;
		 	$scope.showMyUser = false;
		 	$scope.showManage=!$scope.showManage;
		 	angular.element($window).scrollTop(405);
		 } else if (option == 3) {
		 	$scope.showProfile=false;
		 	$scope.showinviteRater=false;
		 	$scope.showManage=false;
		 	$scope.showMyUser = false;
			$scope.showAccept=!$scope.showAccept;
			angular.element($window).scrollTop(620);
		 }

		 else if (option == 4) {
			 	$scope.showProfile=false;
			 	$scope.showinviteRater=false;
			 	$scope.showMyUser=!$scope.showMyUser;
			 	$scope.showManage=false;
			 	//$scope.showMyUser = false;
				$scope.showAccept= false;
				angular.element($window).scrollTop(835);
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



    });
});
