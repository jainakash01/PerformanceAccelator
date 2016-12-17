var performAccel = angular.module('performAccel');

performAccel.controller('ereviewCtrl', function ($scope, $location, $http, getUserData, retreiveGoals, $window, programJson) {
	$scope.activate = true;

	var mornData = {} ;

	$scope.starWasClicked = false;
	//$scope.goalData = programJson.getDefaultJson();


	getUserData.getData()
    .then(function(resp) {

  	$scope.userName = resp.first_name;
	$scope.userEmail = resp.email;
	var goalData;

	console.log('Email is ' + $scope.userEmail);
	goalData = programJson.getData($scope.userEmail);


	goalData
    .then(function(data){
      if (data.error == true){
    	  ohSnap(data.message, {'color':'red'});
    	  $location.path('/buildpa');
      }

      $scope.starWasClickedEn = function(){
    	  //alert('clicked');
    	  $scope.starWasClicked = true;
      }

      console.log('After calling proham data in e review')
      $scope.tree = data.programs;

      tree= $scope.tree;


      for (i=0;i<=tree.length-1; i++ ){
    	  console.log('For each OG');
    	  for (j=0;j<=tree[i].children.length-1;j++){

    		  console.log('for each IDG');

    		  for (k=0;k<=tree[i].children[j].children.length-1;k++){
    			  console.log('for each IPG');
    			  console.log(tree[i].children[j].children);
    			  for (l=0;l<=tree[i].children[j].children[k].children.length-1;l++){

    				  console.log('for each Skills');
    				  console.log(tree[i].children[j].children[k].children);

    				  if (tree[i].children[j].children[k].children[l].children != undefined){

    				  for (p=0;p<=tree[i].children[j].children[k].children[l].children.length-1;p++){
    					  console.log('For each RF');
    					  console.log(tree[i].children[j].children[k].children[l].children[p]);
    					  tree[i].children[j].children[k].children[l].children[p].rating = 0;
    				  }
    				  };
    			  }
    		  }
    	  }
      }

      $scope.tree = tree;
      console.log('After rating');
      console.log($scope.tree);



          var mPreviewUrl = '/a/customer/' + $scope.userEmail + '/morningPrev';

          $http.get(mPreviewUrl).success(function(data, status, headers, config) {
        	  console.log('OK checking if it works')
        	  console.log(data);
        	  if (data.evening_prev_done){
        		  $scope.tree = data.user_ratings;
        		  $scope.bigChall = data.biggest_chall;
        		  $scope.wayAddress = data.way_addresed;
        		  $scope.reallyWell = data.really_well;
        		  $scope.reasonGrate = data.reason_grateful;
        	  }
          })
           .error(function(data, status, headers, config) {
        	ohSnap('Please complete morning preview first !!', {'color':'red'});
           	$location.path('/home');
          	});

    });


    });

	$scope.submitReview = function() {

		//$location.path('/home');



		// if( ! $scope.starWasClicked) {
		// 	ohSnap('Seems you have not entered any rating. If you really want to give 5 rating for all goals, please click on any rating.', {'color':'red'});
		// 	return;
		// }

    	 var ePreviewUrl = '/a/customer/' + $scope.userEmail + '/eveningPrev';


     	mornData.user_id =  $scope.userEmail;
     	mornData.user_ratings = $scope.tree;

    	 mornData.biggest_chall = $scope.bigChall;
    	 mornData.way_addresed = $scope.wayAddress;
    	 mornData.really_well = $scope.reallyWell;
    	 mornData.reason_grateful = $scope.reasonGrate;

    	 console.log(mornData);


        $http.post(ePreviewUrl,mornData).success(function(data, status, headers, config) {
	       	console.log('post eevening called');
	       	console.log(mornData);
			ohSnap('Great, Evening Review completed', {'color':'green'});

    	    $location.path('/home');
       });

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