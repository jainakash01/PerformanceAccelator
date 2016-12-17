var performAccel = angular.module('performAccel');




performAccel.controller('ChangeItemCtrl',
		function($scope, $http, $modalInstance, itemType, item,programId, appProgSetup) {

			console.log('OK AM GOING TO Change ITEM ISN PROGRAM ID ')
		    console.log(programId);
			console.log(itemType);
		    $scope.itemType = itemType;

		    

		    appProgSetup.getAppSetup().then(function(resp){


		    	console.log('Inside Builpa sevice new')
		    	console.log(resp);
		    	$scope.appSetup = resp;
		    	console.log(resp.og[0].split(','));
		    	ogList = resp.og[0].split(',');
		    	ogList.splice(0, 0, "Please select ...");

		    	skillList = resp.skills[0].split(',');
		    	skillList.splice(0, 0, "Please select ...");

		    	idgList = resp.idg[0].split(',');
		    	idgList.splice(0, 0, "Please select ...");

		    	ipgList = resp.ipg[0].split(',');
		    	ipgList.splice(0, 0, "Please select ...");

		    	rfList = resp.roots[0].split(',');
		    	rfList.splice(0, 0, "Please select ...");



		    $scope.selectedItem = 'Please select ...';
		    $scope.list = rfList;

		    if (itemType == undefined) {
		    	itemType = "Organisational Goal";
		        $scope.list = ogList;
		    }

		    if (itemType == "Organisational Goal") {
		        $scope.list = ogList;
		    }

		    if (itemType == "Individual Development Goal") {
		        $scope.list = idgList;
		    }

		    if (itemType == "Individual Performance Goal") {
		    	console.log('Setting here')
		        $scope.list = ipgList;
		    }

		    if (itemType == "Skills and Competencies") {
		        $scope.list = skillList;
		    }

		    if (itemType == "Root Factor") {
		        $scope.list = rfList;
		        $scope.dailyStat = item.name.DS;
		    }


		    })

		    $scope.clickOk = function() {
		    	if($scope.selectedItem != 'Please select ...') {
		            if (itemType == "Root Factor") {
		                $scope.selectedItem = {
		                    'ROOTF': $scope.selectedItem,
		                    'DS': $scope.dailyStat
		                };
		                if ($scope.dailyStat == undefined) {
		                	ohSnap('Please provide Daily Statement as well !!', {'color':'red'});
		                	$scope.selectedItem = $scope.selectedItem.ROOTF;
		                    // alert('Please provide Daily Statement as well !!')
		                    return;
		                }
		            };
		            // if($scope.selectedItem == 'Custom') {
		            // 	$scope.goalName = $scope.selectedItem
		            // }
		            $scope.goalName = ('Custom' === $scope.selectedItem) ? $scope.customGoal : $scope.selectedItem;

		            dataPreperation = {
		            	'item' : item,
		                'itemType': itemType,
		                'optionSelected': $scope.goalName,
		                'program_id': programId
		            };
		            $modalInstance.close(dataPreperation);
		        } else {
		        	ohSnap('Please select ' + itemType, {'color':'red'});
		        }

		    };


		    $scope.clickNo = function() {
		        $modalInstance.close();
		    };

		})




performAccel.controller('coachCtrl', function ($scope, $location, $http,$modal, statusService, retreiveGoals, $window, programJson, getUserData) {
	$scope.activate = true;

	var mornData ;





        var checkRaterUrl='/a/customer/' + $scope.userEmail +  '/checkIfCoach';
        $http.get(checkRaterUrl)
          .success(function(data, status, headers, config) {
            console.log('check if coach.......................');
            console.log(data);
            var inviteeDetails = data;

            $scope.allPersons = [];
            var selectVal = 'Please select...';

            $scope.allPersons.push(selectVal);

            for(var a=0; a<data.length; a++) {
              $scope.allPersons.push(data[a].coach_for);
            }
            $scope.personToBeRated = 'Please select...';


            $scope.changedPerson = function(personToBeRated){

            console.log('Person in picture is ');
            console.log(personToBeRated);


            for (i=0;i<=inviteeDetails.length-1;i++){
            	var goalData = [];
                if (inviteeDetails[i].coach_for == personToBeRated){
                    //concernedData = inviteeDetails[i].rating_scopes;
                    //console.log(concernedData);

    	            progUrl = '/a/customer/' + personToBeRated + '/program';

		            //jsonToSend = {'program' : $scope.tree , 'training_cycle' : $scope.inputCycle}

		          		            $http.get(progUrl).success(function(data, status, headers, config) {
		            		                    console.log(data);
		            		                    console.log('program URL');
		            		                    tree = data.programs;
		            		                    $scope.inputCycle = data.training_cycle;


		            		                    for (i=0;i<=tree.length-1; i++ ){
		            		                  	  console.log('For each OG');
		            		                  	  for (j=0;j<=tree[i].children.length-1;j++){

		            		                  		  console.log('for each ipg');

		            		                  		  for (k=0;k<=tree[i].children[j].children.length-1;k++){
		            		                  			  for (l=0;l<=tree[i].children[j].children[k].children.length-1;l++){

		            		                  				  if (tree[i].children[j].children[k].children[l].children != undefined){

		            		                  				  for (p=0;p<=tree[i].children[j].children[k].children[l].children.length-1;p++){
		            		                  					  tree[i].children[j].children[k].children[l].children[p].rating = 5;
		            		                  				  }
		            		                  				  };
		            		                  			  }
		            		                  		  }
		            		                  	  }
		            		                    }
		            		                    $scope.tree = tree;
		            		                    //ohSnap('Program and all its related data deleted', {'color':'green'});
		            		                })
		            		                .error(function(data, status, headers, config) {
		            		                    console.log('Error in deleting program');
		            		                    ohSnap(data.message, {'color':'red'});
		            		                });






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

        $scope.datChanged= function(){
        	//alert($("#datetimepicker1").data('date'));
        	console.log('Datetime value is ');
        	var selectedDate =  new Date($("#datetimepicker1").data('date'));  //$("#datetimepicker1").data('date');
        	console.log(selectedDate.getDate())
        	
        	console.log((selectedDate.getDate() ) + '' +  (selectedDate.getMonth() + 1) + '' +  selectedDate.getFullYear())
        	datStr = (selectedDate.getDate() ) + '' + (selectedDate.getMonth() + 1) + '' +  selectedDate.getFullYear()
        	
        	urlToCall = '/a/customer/' + $scope.personToBeRated + '/report/' + datStr;
        	

	            $http.post(urlToCall).success(function(data, status, headers, config) {
	                    console.log(data);
	                    if (data.user_ratings == undefined){
	                    	alert('Review was not done');
	                    	$scope.ratedTree = [];
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
        
        $scope.saveToDb = function(){


	            progUrl = '/a/customer/' + $scope.personToBeRated + '/program';

	            jsonToSend = {'program' : $scope.tree , 'training_cycle' : $scope.inputCycle}

	          		            $http.put(progUrl,jsonToSend).success(function(data, status, headers, config) {
	            		                    console.log(data);
	            		                    ohSnap('Program Updated !!', {'color':'green'});
	            		                })
	            		                .error(function(data, status, headers, config) {
	            		                    console.log('Error in updating program');
	            		                    ohSnap('Error in updating program', {'color':'red'});
	            		                });


        }



        $scope.deleteItem = function(){

            progUrl = '/a/customer/' + $scope.personToBeRated + '/program';

            //jsonToSend = {'program' : $scope.tree , 'training_cycle' : $scope.inputCycle}

          		            $http.delete(progUrl).success(function(data, status, headers, config) {
            		                    console.log(data);
            		                    ohSnap('Program and all its related data deleted', {'color':'green'});
            		                })
            		                .error(function(data, status, headers, config) {
            		                    console.log('Error in deleting program');
            		                    ohSnap(data.message, {'color':'red'});
            		                });

        };



    	$scope.deleteJson = function(node){

    	console.log('Deleting json branch');
    	console.log(node);
    	console.log($scope.tree);


        var modalInstanceDel = $modal.open({
            templateUrl: 'AddNewItem.html',
            controller: 'ChangeItemCtrl',
            windowClass: 'modal fade in',
            size: 'sm',
            resolve: {
                itemType: function() {
                    return node.itemType
                },
                item: function() {
                    return node
                },
                programId: function() {
                    return true
                }

            }
        });





        modalInstanceDel.result.then(function(dataSubmitted) {

        	console.log('Inside modal result');
        	console.log(dataSubmitted);
        	node = dataSubmitted.item;
        	console.log(node);
        	nodeIntrested = dataSubmitted.item.name;

            if (dataSubmitted.itemType == 'Organisational Goal') {
            	console.log('Inside del org');

            	for (i =0;i<=$scope.tree.length -1 ; i++){
            		if ($scope.tree[i].name == nodeIntrested){
            			$scope.tree[i].name = dataSubmitted.optionSelected;
            			for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length -1 ; ipgCount++){
            				$scope.tree[i].children[ipgCount].parent['Organisational Goal'] = dataSubmitted.optionSelected;
                			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){
                				$scope.tree[i].children[ipgCount].children[idgCount].parent['Organisational Goal'] = dataSubmitted.optionSelected;
                				for (skCount = 0; skCount <= $scope.tree[i].children[ipgCount].children[idgCount].children.length - 1; skCount++){
                    				$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].parent['Organisational Goal'] = dataSubmitted.optionSelected;
                    				console.log('Just b4 error');
                    				console.log($scope.tree[i].children[ipgCount].children[idgCount].children[skCount]);
                    				if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children != undefined){
                       				for (rfCount = 0; rfCount <= $scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children.length - 1; rfCount++){
                        				$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].parent['Organisational Goal'] = dataSubmitted.optionSelected;
                			} }
                				} }
            			}
            			} }
            	}



            if (dataSubmitted.itemType == 'Individual Performance Goal') {
                for (i = 0; i <= $scope.tree.length - 1; i++) {
                    console.log('On changing ipg')

                    if ($scope.tree[i].name == node.parent['Organisational Goal']) {

                    	for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length -1 ; ipgCount++){

                    		if($scope.tree[i].children[ipgCount].name == nodeIntrested){
                    			$scope.tree[i].children[ipgCount].name =dataSubmitted.optionSelected;
            				$scope.tree[i].children[ipgCount].parent['Individual Performance Goal'] = dataSubmitted.optionSelected;
                			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){
                				$scope.tree[i].children[ipgCount].children[idgCount].parent['Individual Performance Goal'] = dataSubmitted.optionSelected;
                				for (skCount = 0; skCount <= $scope.tree[i].children[ipgCount].children[idgCount].children.length - 1; skCount++){
                    				$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].parent['Individual Performance Goal'] = dataSubmitted.optionSelected;

                    					if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children !=undefined){
                    				for (rfCount = 0; rfCount <= $scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children.length - 1; rfCount++){
                        				$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].parent['Individual Performance Goal'] = dataSubmitted.optionSelected;
                			} }


                				} } }//2nd if
            			}

                       // console.log('On right track');
                    }


                }
            };


            if (dataSubmitted.itemType == 'Individual Development Goal') {
                console.log('Inside Individual Performacne goal')
                for (i = 0; i <= $scope.tree.length - 1; i++) {
                    //console.log(node.parent['Individual Performance Goal']);
                    //console.log(node.parent['Organisational Goal']);
                    if ($scope.tree[i].name == node.parent['Organisational Goal']) {
                        console.log('Got OG');
                        //console.log($scope.tree[ipgCount].children);
                        for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length - 1; ipgCount++) {
                        	console.log('B4 ipg check ')
                        	console.log($scope.tree[i].children[ipgCount].name);
                            if ($scope.tree[i].children[ipgCount].name == node.parent['Individual Performance Goal']) {
                                console.log('Got the ipg parent');

                                if ($scope.tree[i].children[ipgCount].children.length >0){

                    			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){

                    				if ($scope.tree[i].children[ipgCount].children[idgCount].name == nodeIntrested){

                    				$scope.tree[i].children[ipgCount].children[idgCount].name = dataSubmitted.optionSelected;

                    				$scope.tree[i].children[ipgCount].children[idgCount].parent['Individual Development Goal'] = dataSubmitted.optionSelected;

                    				if ($scope.tree[i].children[ipgCount].children[idgCount].children.length > 0){

                    				for (skCount = 0; skCount <= $scope.tree[i].children[ipgCount].children[idgCount].children.length - 1; skCount++){

                    					console.log('changimg skc');
                    					$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].parent['Individual Development Goal'] = dataSubmitted.optionSelected;
                    					console.log($scope.tree[i].children[ipgCount]);
                    					if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children !=undefined){
                    						for (rfCount = 0; rfCount <= $scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children.length - 1; rfCount++){
    	                    				$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].parent['Individual Development Goal'] = dataSubmitted.optionSelected;
    	                    				//$scope.$apply();
                        				} }



                    				} }}} }





                            }
                        }
                    }
                }
            };




            if (node.itemType == 'Skills and Competencies') {
                console.log('Inside Skills and comptency goal')
                for (i = 0; i <= $scope.tree.length - 1; i++) {

                    if ($scope.tree[i].name == node.parent['Organisational Goal']) {
                        console.log('Got OG');
                        //console.log($scope.tree[ipgCount].children);
                        for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length - 1; ipgCount++) {
                        	console.log('B4 ipg check ')
                        	console.log($scope.tree[i].children[ipgCount].name);
                            if ($scope.tree[i].children[ipgCount].name == node.parent['Individual Performance Goal']) {
                                console.log('Got the ipg parent');

                                if ($scope.tree[i].children[ipgCount].children.length >0){

                    			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){


                    				if ($scope.tree[i].children[ipgCount].children[idgCount].children.length > 0){

                    				for (skCount = 0; skCount <= $scope.tree[i].children[ipgCount].children[idgCount].children.length - 1; skCount++){

                    					if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].name == nodeIntrested){

                    						$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].name = dataSubmitted.optionSelected;

                    						$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].parent['Skills and Competencies'] = dataSubmitted.optionSelected;

                    					$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].parent['Skills and Competencies'] = dataSubmitted.optionSelected;
                    					console.log($scope.tree[i].children[ipgCount]);
                    					if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children !=undefined){
                    						for (rfCount = 0; rfCount <= $scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children.length - 1; rfCount++){
    	                    				$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].parent['Skills and Competencies'] = dataSubmitted.optionSelected;
    	                    				//$scope.$apply();
                        				} }}



                    				} }}}





                            }
                        }
                    }
                }
            };




            if (node.itemType == 'Root Factor') {
                console.log('Inside Root factor goal')
                for (i = 0; i <= $scope.tree.length - 1; i++) {

                    if ($scope.tree[i].name == node.parent['Organisational Goal']) {
                        console.log('Got OG');
                        //console.log($scope.tree[ipgCount].children);
                        for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length - 1; ipgCount++) {
                        	console.log('B4 ipg check ')
                        	console.log($scope.tree[i].children[ipgCount].name);
                            if ($scope.tree[i].children[ipgCount].name == node.parent['Individual Performance Goal']) {
                                console.log('Got the ipg parent');

                                if ($scope.tree[i].children[ipgCount].children.length >0){

                    			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){


                    				if ($scope.tree[i].children[ipgCount].children[idgCount].children.length > 0){

                    				for (skCount = 0; skCount <= $scope.tree[i].children[ipgCount].children[idgCount].children.length - 1; skCount++){
                    					$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].parent['Skills and Competencies'] = dataSubmitted.optionSelected;
                    					if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children !=undefined){
                    						for (rfCount = 0; rfCount <= $scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children.length - 1; rfCount++){

                    							if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].name == nodeIntrested){

                            						$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].name.name = dataSubmitted.optionSelected.ROOTF;
                            						$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].name.DS = dataSubmitted.optionSelected.DS;

                        				} }}



                    				} }}}

                            }
                        }
                    }
                }
            };

        });



}

        $scope.addNewJson = function(node) {

            var modalInstance = $modal.open({
                templateUrl: 'AddNewItem.html',
                controller: 'AddNewItemCtrl',
                windowClass: 'modal fade in',
                size: 'sm',
                resolve: {
                    itemType: function() {
                        return node.itemType
                    },
                    programId: function() {
                        return true
                    }

                }
            });




            modalInstance.result.then(function(dataSubmitted) {

                if (node.itemType == 'Organisational Goal') {
                    $scope.tree.push({
                        'name': dataSubmitted.optionSelected,
                        'children': [{
                            'itemType': 'Individual Performance Goal',
                            'children': [],
                            'parent': {
                                'Organisational Goal': dataSubmitted.optionSelected
                            }
                        }]
                    });
                }


                if (node.itemType == 'Individual Performance Goal') {
                    for (i = 0; i <= $scope.tree.length - 1; i++) {
                        console.log('On Adding ipg')
                        console.log(node)
                        console.log(node.parent['Organisational Goal']);
                        if ($scope.tree[i].name == node.parent['Organisational Goal']) {
                            $scope.tree[i].children.push({
                                'name': dataSubmitted.optionSelected,
                                'itemType': 'Individual Performance Goal',
                                'parent': {
                                    'Organisational Goal': node.parent['Organisational Goal']
                                },
                                'children': [{
                                    'itemType': 'Individual Development Goal',
                                    'children': [],
                                    'parent': {
                                        'Organisational Goal': node.parent['Organisational Goal'],
                                        'Individual Performance Goal': dataSubmitted.optionSelected
                                    }
                                }]
                            })
                            console.log('On right track');
                        }


                    }
                };


                if (node.itemType == 'Individual Development Goal') {
                    console.log('Inside Individual Performacne goal')
                    for (i = 0; i <= $scope.tree.length - 1; i++) {
                        console.log(node.parent['Individual Performance Goal']);
                        console.log(node.parent['Organisational Goal']);
                        if ($scope.tree[i].name == node.parent['Organisational Goal']) {
                            console.log('Got OG');

                            for (j = 0; j <= $scope.tree[i].children.length - 1; j++) {
                                if ($scope.tree[i].children[j].name == node.parent['Individual Performance Goal']) {
                                    console.log('Got the ipg parent');
                                    $scope.tree[i].children[j].children.push({
                                        'name': dataSubmitted.optionSelected,
                                        'itemType': 'Individual Development Goal',
                                        'parent': {
                                            'Organisational Goal': node.parent['Organisational Goal'],
                                            'Individual Performance Goal': node.parent['Individual Performance Goal']
                                        },
                                        'children': [{
                                            'itemType': 'Skills and Competencies',
                                            'parent': {
                                                'Organisational Goal': node.parent['Organisational Goal'],
                                                'Individual Development Goal': dataSubmitted.optionSelected,
                                                'Individual Performance Goal': node.parent['Individual Performance Goal']
                                            }
                                        }]
                                    })
                                    break;
                                }
                            }
                        }
                    }
                };




                if (node.itemType == 'Skills and Competencies') {
                    console.log('Inside Skills and comptency goal')
                    for (i = 0; i <= $scope.tree.length - 1; i++) {
                        console.log(node.parent['Individual Performance Goal']);
                        console.log(node.parent['Organisational Goal']);
                        console.log(node.parent['Individual Development Goal']);
                        if ($scope.tree[i].name == node.parent['Organisational Goal']) {
                            console.log('Got OG');

                            for (j = 0; j <= $scope.tree[i].children.length - 1; j++) {
                                if ($scope.tree[i].children[j].name == node.parent['Individual Performance Goal']) {
                                    console.log('Got the ipg parent');
                                    console.log($scope.tree[i].children[j].children.length);
                                    for (k = 0; k <= $scope.tree[i].children[j].children.length - 1; k++) {

                                        if ($scope.tree[i].children[j].children[k].name == node.parent['Individual Development Goal']) {
                                            console.log('Great Got idg as well !!');

                                            $scope.tree[i].children[j].children[k].children.push({
                                                'name': dataSubmitted.optionSelected,
                                                'itemType': 'Skills and Competencies',
                                                'parent': {
                                                    'Organisational Goal': node.parent['Organisational Goal'],
                                                    'Individual Performance Goal': node.parent['Individual Performance Goal'],
                                                    'Individual Development Goal': node.parent['Individual Development Goal']
                                                },
                                                'children': [{
                                                    'itemType': 'Root Factor',
                                                    'parent': {
                                                        'Organisational Goal': node.parent['Organisational Goal'],
                                                        'Individual Development Goal': node.parent['Individual Development Goal'],
                                                        'Individual Performance Goal': node.parent['Individual Performance Goal'],
                                                        'Skills and Competencies': dataSubmitted.optionSelected
                                                    }
                                                }]
                                            })

                                            break;

                                        }
                                    }




                                    break;
                                }
                            }
                        }
                    }
                };




                if (node.itemType == 'Root Factor') {
                    console.log('Inside Root factor goal')
                    for (i = 0; i <= $scope.tree.length - 1; i++) {
                        console.log(node.parent['Individual Performance Goal']);
                        console.log(node.parent['Organisational Goal']);
                        console.log(node.parent['Individual Development Goal']);
                        console.log(node.parent['Skills and Competencies']);
                        if ($scope.tree[i].name == node.parent['Organisational Goal']) {
                            console.log('Got OG');

                            for (j = 0; j <= $scope.tree[i].children.length - 1; j++) {
                                if ($scope.tree[i].children[j].name == node.parent['Individual Performance Goal']) {
                                    console.log('Got the ipg parent');
                                    console.log($scope.tree[i].children[j].children.length);
                                    for (k = 0; k <= $scope.tree[i].children[j].children.length - 1; k++) {

                                        if ($scope.tree[i].children[j].children[k].name == node.parent['Individual Development Goal']) {
                                            console.log('Great Got idg as well !!');


                                            for (l = 0; l <= $scope.tree[i].children[j].children[k].children.length - 1; l++) {


                                                if ($scope.tree[i].children[j].children[k].children[l].name == node.parent['Skills and Competencies']) {
                                                    console.log('Got Skills')
                                                    $scope.tree[i].children[j].children[k].children[l].children.push({
                                                        'name': {
                                                            'name': dataSubmitted.optionSelected.ROOTF,
                                                            'DS': dataSubmitted.optionSelected.DS
                                                        },
                                                        'itemType': 'Root Factor',
                                                        'parent': {
                                                            'Organisational Goal': node.parent['Organisational Goal'],
                                                            'Individual Performance Goal': node.parent['Individual Performance Goal'],
                                                            'Individual Development Goal': node.parent['Individual Development Goal'],
                                                            'Skills and Competencies': node.parent['Skills and Competencies']
                                                        },
                                                    });
                                                    console.log($scope.tree);
                                                    //saveToDatabase($scope.tree);
                                                    break;




                                                }
                                            }
                                        }
                                    }

                                    break;
                                }
                            }
                        }
                    }
                };

            });
        }

        
        
        
        $scope.deleteBranch = function(node){

    	console.log('Deleting branch would be tough');
    	console.log(node);
    	console.log('Item type is ' + node.itemType);
    	
    	nodeIntrested = node.name;
    	
    	if (node.itemType == undefined){
    		nodeType = 'Organisational Goal';
    	} else {
    		nodeType = node.itemType;
    	}
    	
        if (nodeType == 'Organisational Goal') {
        	console.log('Inside del org');

        	for (i =0;i<=$scope.tree.length -1 ; i++){
        		if ($scope.tree[i].name == nodeIntrested){

        			$scope.tree.splice(i,1);
        			} }
        	}

        if (nodeType == 'Individual Performance Goal') {
        	console.log('Inside del ipg');

        	for (i =0;i<=$scope.tree.length -1 ; i++){
        		
        		if ($scope.tree[i].name == node.parent['Organisational Goal']){

        			for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length -1 ; ipgCount++){
        				if ($scope.tree[i].children[ipgCount].name == nodeIntrested){
        						$scope.tree[i].children.splice(ipgCount,1);
        				};
        			}
        			} }
        	}
    	
    	
        if (nodeType == 'Individual Development Goal') {
        	console.log('Inside del idg');

        	for (i =0;i<=$scope.tree.length -1 ; i++){
        		
        		if ($scope.tree[i].name == node.parent['Organisational Goal']){

        			for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length -1 ; ipgCount++){
        				
        				
        				if ($scope.tree[i].children[ipgCount].name == node.parent['Individual Performance Goal']){
        						
                			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){
                				
                				if ($scope.tree[i].children[ipgCount].children[idgCount].name == nodeIntrested){
                					$scope.tree[i].children[ipgCount].children.splice(idgCount,1);
                				}
                			}	                    					
        				};
        			}
        			} }
        	}	            	
    	
    	
        if (nodeType == 'Skills and Competencies') {
        	console.log('Inside del skcs');

        	for (i =0;i<=$scope.tree.length -1 ; i++){
        		
        		if ($scope.tree[i].name == node.parent['Organisational Goal']){

        			for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length -1 ; ipgCount++){
        				
        				
        				if ($scope.tree[i].children[ipgCount].name == node.parent['Individual Performance Goal']){
        						
                			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){
                				console.log('here 1')
                				if ($scope.tree[i].children[ipgCount].children[idgCount].name == node.parent['Individual Development Goal']){

                    				for (skCount = 0; skCount <= $scope.tree[i].children[ipgCount].children[idgCount].children.length - 1; skCount++){
                    					console.log('here 2')
                    					if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].name == nodeIntrested){
                    						console.log('here 4')
                    						$scope.tree[i].children[ipgCount].children[idgCount].children.splice(skCount,1);
                    						
                    					}
                    					
                    				}
                				
                				}
                			}	                    					
        				};
        			}
        			} }
        	}	            	
    	
    
        
        
        
        
    	
        if (nodeType == 'Root Factor') {
        	console.log('Inside del skcs');

        	for (i =0;i<=$scope.tree.length -1 ; i++){
        		
        		if ($scope.tree[i].name == node.parent['Organisational Goal']){

        			for (ipgCount = 0; ipgCount <= $scope.tree[i].children.length -1 ; ipgCount++){
        				
        				
        				if ($scope.tree[i].children[ipgCount].name == node.parent['Individual Performance Goal']){
        						
                			for (idgCount = 0; idgCount <= $scope.tree[i].children[ipgCount].children.length - 1; idgCount++){
                				console.log('here 1')
                				if ($scope.tree[i].children[ipgCount].children[idgCount].name == node.parent['Individual Development Goal']){

                    				for (skCount = 0; skCount <= $scope.tree[i].children[ipgCount].children[idgCount].children.length - 1; skCount++){
                    					console.log('here 2')
                    					if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].name ==  node.parent['Skills and Competencies']){
                    						console.log('here 4')
                    						
                    						
                    						for (rfCount = 0; rfCount <= $scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children.length - 1; rfCount++){
                    							console.log('RF name');
                    							console.log($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].name);
                    							if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].name != undefined){
                    							console.log($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].name.name);
                    							console.log(nodeIntrested['name'])
                    							if ($scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children[rfCount].name.name === nodeIntrested['name']){
                    								//console.log('Deleting')
                    								$scope.tree[i].children[ipgCount].children[idgCount].children[skCount].children.splice(rfCount,1);
                    							}

                    							}}
                    						
                    						
                    					}
                    					
                    				}
                				
                				}
                			}	                    					
        				};
        			}
        			} }
        	}	
        
        
        
        
        
}


    	 $scope.submitReview = function() {

            	var ePreviewUrl = '/a/customer/' + $scope.userEmail + '/submitRatersRate/' + $scope.personToBeRated;


            	console.log('Submitting Raters rating se pehle');
            	console.log($scope.tree);

            	var toBeSend = {'rating_by': $scope.userEmail , 'ratings':$scope.tree};

               $http.put(ePreviewUrl,toBeSend).success(function(data, status, headers, config) {
            	   console.log('post evening called');
            	   //console.log(mornData);
            	   window.location.assign('/');
               });
       	 }

});



