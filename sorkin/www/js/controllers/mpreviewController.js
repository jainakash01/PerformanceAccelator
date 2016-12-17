var performAccel = angular.module('performAccel');

performAccel.controller('mpreviewCtrl', function ($scope, $location, $http, getUserData, retreiveGoals , $window, programJson) {


	$scope.activate = true;
	// angular.element($window).scrollTop(550);
	$scope.showOption1 = false;
	$scope.showOption2 = false;
	$scope.showOption3 = false;
	$scope.showOption4 = false;
	$scope.showOption5 = false;
	var progData;
	//$scope.goalData = programJson.getDefaultJson();

	getUserData.getData()
    .then(function(resp) {

    	console.log('Inside mpreview Ctrlller');
    	console.log(resp.email);

  	$scope.userName = resp.first_name;
	$scope.userEmail = resp.email;


	$scope.activate = true;
	$scope.showProfile=false;
	$scope.showinviteRater=false;
	$scope.showManage=false;
	$scope.showAccept=false;
	$scope.showOption = false;

	goalData = programJson.getData($scope.userEmail);

	goalData
    .then(function(data){

      if (data.error == true){
    	  ohSnap(data.message, {'color':'red'});
    	  $location.path('/buildpa');
      }
      $scope.tree = data.programs;



    });


    });

	$scope.submitPreview = function() {

		console.log($scope.tree);


		var error= false;
	      tree= $scope.tree;


	      for (i=0;i<=tree.length-1; i++ ){
	    	  //console.log('For each OG');
	    	  for (j=0;j<=tree[i].children.length-1;j++){

	    		 // console.log('for each IDG');

	    		  for (k=0;k<=tree[i].children[j].children.length-1;k++){
	    			  //console.log('for each IPG');
	    			  //console.log(tree[i].children[j].children);
	    			  for (l=0;l<=tree[i].children[j].children[k].children.length-1;l++){

	    				  //console.log('for each Skills');
	    				  //console.log(tree[i].children[j].children[k].children);

	    				  if (tree[i].children[j].children[k].children[l].children != undefined){

	    				  for (p=1;p<=tree[i].children[j].children[k].children[l].children.length-1;p++){
	    					  console.log('For each RF');
	    					  console.log(tree[i].children[j].children[k].children[l].children[p])
	    					  console.log(tree[i].children[j].children[k].children[l].children[p].checked)
	    					  if ( tree[i].children[j].children[k].children[l].children[p].checked == false ||
	    							  	tree[i].children[j].children[k].children[l].children[p].checked == undefined){
	    						  ohSnap('Nopes, Ensure you follow each of your Daily Statements !!', {'color':'red'});
	    						  error = true;
	    						  return;
	    					  }
	    				  }
	    				  };
	    			  }
	    		  }
	    	  }
	      }




	      if (!error){

		 mPreviewUrl='/a/customer/' + $scope.userEmail +  '/morningPrev';

		  $http.post(mPreviewUrl).success(function(data, status, headers, config) {
			  console.log('Mormning preview done')
			 console.log(data);
			  ohSnap('Great, Morning preview completed !!', {'color':'green'});

			 $location.path('/home');

		  });
	      }
	}

	$scope.cancel = function(){
		window.location.assign('/');
	}

    //});
});