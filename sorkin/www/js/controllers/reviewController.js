var performAccel = angular.module('performAccel');

performAccel.controller('reviewCtrl', function ($scope, $location, $http, statusService, retreiveGoals, $window, programJson, getUserData) {
	$scope.activate = true;

	var mornData ;





        var checkRaterUrl='/a/customer/' + $scope.userEmail +  '/checkIfRater';
        $http.get(checkRaterUrl)
          .success(function(data, status, headers, config) {
            console.log('check if rater.......................');
            console.log(data);
            var inviteeDetails = data;

            $scope.allPersons = [];
            var selectVal = {
              rating_for: 'Please select...'
            };

            $scope.allPersons.push(selectVal);

            for(var a=0; a<data.length; a++) {
              $scope.allPersons.push(data[a]);
            }
            $scope.personToBeRated = 'Please select...';


            $scope.changedPerson = function(personToBeRated){

            console.log('Person in picture is ');
            console.log(personToBeRated);


            for (i=0;i<=inviteeDetails.length-1;i++){
            	var goalData = [];
                if (inviteeDetails[i].rating_for == personToBeRated){
                    concernedData = inviteeDetails[i].rating_scopes;
                    console.log(concernedData);

                    tree = concernedData;


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
                  					  console.log(tree[i].children[j].children[k].children[l].children[p])
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
                    break;
                    }
                }
            }
         })
          .error(function(data, status, headers, config) {
             console.log(data);
             // alert('User has not done his review Yet !!');
             ohSnap('User has not done his review Yet !!', {'color':'red'});
             //window.location.assign('/');

            });


    	 $scope.submitReview = function() {

            	var ePreviewUrl = '/a/customer/' + $scope.userEmail + '/submitRatersRate/' + $scope.personToBeRated;


            	console.log('Submitting Raters rating se pehle');
            	console.log($scope.tree);

            	var toBeSend = {'rating_by': $scope.userEmail , 'ratings':$scope.tree};

               $http.put(ePreviewUrl,toBeSend).success(function(data, status, headers, config) {
            	   console.log('post evening called');
            	   //console.log(mornData);
            	   window.location.assign('/');
                 ohSnap('Rating has been submitted for' + $scope.userEmail, {'color':'green'});
               });
       	 }

});



