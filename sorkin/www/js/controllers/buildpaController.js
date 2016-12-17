		var performAccel = angular.module('performAccel');



		performAccel.controller('NextActionSaveCtrl',
			    function($scope, $http, $modalInstance,$location) {

				console.log('Inside save action')

				$scope.Go360 = function(){
					$modalInstance.close();
					$location.path('/360');
				}

				$scope.StayHere = function(){
					 $modalInstance.close();
				}

		});

		performAccel.controller('DeleteTreeCtrl', function($scope, $modalInstance, emailId, $http) {

			$scope.userEmail = emailId;

			$scope.clickNoDlt = function() {
	            $modalInstance.close();
	        };

	        $scope.clickYesDlt = function() {
	        	progUrl = '/a/customer/' + $scope.userEmail + '/program';

			    //jsonToSend = {'program' : $scope.tree , 'training_cycle' : $scope.inputCycle}
			        $http.delete(progUrl).success(function(data, status, headers, config) {
			        console.log(data);
			        ohSnap('Program and all its related data deleted', {'color':'green'});
			    })
			    .error(function(data, status, headers, config) {
			        console.log('Error in deleting program');
			        ohSnap(data.message, {'color':'red'});
			    });

	        }

		});

		performAccel.controller('DeleteItemCtrl', function($scope, $modalInstance, node, treeStruct) {

			console.log(node);
			console.log(treeStruct);
			$scope.tree = treeStruct;

			$scope.clickNoDlt = function() {
	            $modalInstance.close();
	        };

	        $scope.clickYesDlt = function() {

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

	        	ohSnap('Selected goal has been deleted, please Save My Program' , {'color':'green'});
	            $modalInstance.close();
	        };

			// getUserData.getData().then(function(resp) {

		 //        	$scope.coachId = resp.coach_id;

		 //        	$scope.originialCoachId = resp.coach_id;

		 //            $scope.userName = resp.first_name;
		 //            $scope.userEmail = resp.email;
		 //            $scope.password = resp.password;

		 //            programJson.getData($scope.userEmail).then(function(resp) {
		 //                // console.error('................................................................');
		 //                console.log('After getting program data');
		 //                console.log(resp);

		 //                if (resp.error) {

		 //                    $scope.tree =
		 //                        [{
		 //                            'itemType': 'Organisational Goal',
		 //                            'children': []
		 //                        }]

		 //                } else {
		 //                	$scope.inputCycle = resp.training_cycle;
		 //                    $scope.tree = resp.programs;

		 //                }
		 //                console.log($scope.tree);

		 //            });


		 //        });

		});

		performAccel.controller('AddNewItemCtrl',
		    function($scope, $http, $modalInstance, itemType, programId, appProgSetup) {

		    	console.log('OK AM GOING TO ADD ITEM ISN PROGRAM ID ')
		        console.log(programId);
		        $scope.itemType = itemType;
		        $scope.dsCheck = false;

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

		        if (itemType == "Organisational Goal") {
		            $scope.list = ogList;
		        }

		        if (itemType == "Individual Development Goal") {
		            $scope.list = idgList;
		        }

		        if (itemType == "Individual Performance Goal") {
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

			    $scope.uncheckText = function(){
			    	//alert('hi');
			    	if ($scope.dsCheck == true){
			    		$scope.dailyStat = "";
			    	}
			    	return $scope.dsCheck;

			    };

		        $scope.clickOk = function() {
		        	//alert('hi')
		        	if($scope.selectedItem != 'Please select ...') {
			            if (itemType == "Root Factor") {

			            	if ($scope.selectedItem == 'Custom'){
			            		  $scope.selectedItem = {
						                    'ROOTF': $scope.customGoal,
						                    'DS': $scope.dailyStat
						                };

			            	} else {

			                $scope.selectedItem = {
			                    'ROOTF': $scope.selectedItem,
			                    'DS': $scope.dailyStat
			                };
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



		performAccel.controller('ChangeItemCtrl',
		    function($scope, $http, $modalInstance, itemType, item, programId, appProgSetup) {

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


			            	if ($scope.selectedItem == 'Custom'){
			            		  $scope.selectedItem = {
						                    'ROOTF': $scope.customGoal,
						                    'DS': $scope.dailyStat
						                };

			            	} else {

			                $scope.selectedItem = {
			                    'ROOTF': $scope.selectedItem,
			                    'DS': $scope.dailyStat
			                };
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



		performAccel.controller('buildpaCtrl', function($scope, $location, $http, $modal, $anchorScroll, getUserData, $window, programJson) {

		    //$scope.showOGAdd = false;
		    $scope.activate = true;
		    $scope.showProfile = false;
		    $scope.showinviteRater = false;
		    $scope.showManage = false;
		    $scope.showAccept = false;
		    $scope.showOption = false;
		    $scope.showorgGoal = false;
		    $scope.showPerformGoal = false;
		    $scope.showdevGoal = false;
		    $scope.showskillcomp = false;
		    $scope.showrootFact = false;


		    $scope.orgGoal = 'Please select ...';
		    $scope.indiPerformGoal = 'Please select ...';
		    $scope.indiDevelopGoal = 'Please select ...';
		    $scope.indiSkill = 'Please select ...';
		    $scope.indiRootFactor = 'Please select ...';
		    $scope.inputCycle = '';
		    var totalProgramsLength = 0;




		    getUserData.getData()
		        .then(function(resp) {

		        	$scope.coachId = resp.coach_id;

		        	$scope.originialCoachId = resp.coach_id;

		            $scope.userName = resp.first_name;
		            $scope.userEmail = resp.email;
		            $scope.password = resp.password;


		            $scope.deleteItem = function(){

		            	var modalInstance = $modal.open({
		                    templateUrl: 'confirmDeleteTree.html',
		                    controller: 'DeleteTreeCtrl',
		                    windowClass: 'modal fade in',
		                    size: 'sm',
		                    resolve: {
		                        emailId: function() {
		                            return $scope.userEmail
		                        },
		                        programId: function() {
		                            return true
		                        }

		                    }
		                });

			            // progUrl = '/a/customer/' + $scope.userEmail + '/program';

      		       //      $http.delete(progUrl).success(function(data, status, headers, config) {
		             //        console.log(data);
		             //        ohSnap('Program and all its related data deleted', {'color':'green'});
		             //    })
		             //    .error(function(data, status, headers, config) {
		             //        console.log('Error in deleting program');
		             //        ohSnap(data.message, {'color':'red'});
		             //    });

		            };


		            $scope.saveToDb = function(){
		            	console.log('Value of inputcycle is ');
		            	console.log($scope.inputCycle);

		            	if(typeof $scope.inputCycle ==  undefined || $scope.inputCycle == null ||  $scope.inputCycle == '' ) {
		            		ohSnap('Please enter training cycle', {'color':'red'});
		            	} else {


		            		if ($scope.originialCoachId != $scope.coachId){
		            			credUrl = '/a/customer/' + $scope.userEmail;
		            			credUrlJson = {'coach_id':$scope.coachId};
		            	        $http.put(credUrl,credUrlJson).success(function(data, status, headers, config) {
          		      	    	$.jStorage.deleteKey("Sorkin_Session");
          		    			var subData = {
          		    			"username":$scope.userEmail,
          		    			"password":$scope.password
          		    			};
          		    			$http.put('/a/customer/' + $scope.userEmail + '/verify', subData).success(function(data) {
          		    				$scope.response = data;
          		    				 $.jStorage.set("Sorkin_Session", data);
          		                     $.jStorage.setTTL("Sorkin_Session", 24 * 60 * 60 * 1000);
		            	          })
		            	          .error(function(data, status, headers, config) {
          		                    console.log('Error in updating coach Id');
          		                    ohSnap('Error in updating coach Id, please contact System Administrator', {'color':'red'});
          		                });
		            		})
		            		}

				            progUrl = '/a/customer/' + $scope.userEmail + '/program';

				            jsonToSend = {'program' : $scope.tree , 'training_cycle' : $scope.inputCycle}

				          		            $http.put(progUrl,jsonToSend).success(function(data, status, headers, config) {
				            		                    console.log(data);
				            		                    ohSnap('Congrates, your program has been created', {'color':'green'});

				            			                var modalInstance = $modal.open({
				            			                    templateUrl: 'NextActionSave.html',
				            			                    controller: 'NextActionSaveCtrl',
				            			                    windowClass: 'modal fade in',
				            			                    size: 'sm'
				            			                });

				            		                })
				            		                .error(function(data, status, headers, config) {
				            		                    console.log('Error in updating program');
				            		                    ohSnap('Error in updating program', {'color':'red'});
				            		                });
				           	}

		            }

		            $scope.deleteBranch = function(node){
		            	console.log(node);
		            	var modalInstance = $modal.open({
		                    templateUrl: 'confirmDelete.html',
		                    controller: 'DeleteItemCtrl',
		                    windowClass: 'modal fade in',
		                    size: 'sm',
		                    resolve: {
		                        node: function() {
		                            return node
		                        },
		                        treeStruct: function() {
		                            return $scope.tree
		                        }

		                    }
		                });

		            }

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
		                                                console.log($scope.tree[i].children[j].children[k].name )

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

		                                                console.log('After adding SKC ');

		                                                console.log($scope.tree[i].children);
		                                                //$scope.$apply();

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


		            programJson.getData($scope.userEmail).then(function(resp) {
		                // console.error('................................................................');
		                console.log('After getting program data');
		                console.log(resp);

		                if (resp.error) {

		                    $scope.tree =
		                        [{
		                            'itemType': 'Organisational Goal',
		                            'children': []
		                        }]

		                } else {
		                	$scope.inputCycle = resp.training_cycle;
		                    $scope.tree = resp.programs;

		                }
		                console.log($scope.tree)
		            });

		            // }


		            //$scope.addNewTable = function() {}

		            //$scope.addItem = function() {};

		            $scope.collapse = function(option, newHash1) {
		                //alert('show');
		                if (option == 0) {
		                    $scope.showinviteRater = false;
		                    $scope.showManage = false;
		                    $scope.showAccept = false;
		                    $scope.showProfile = !$scope.showProfile;
		                    angular.element($window).scrollTop($scope.programList.length * 50 + 1000);
		                } else if (option == 1) {
		                    $scope.showProfile = false;
		                    $scope.showManage = false;
		                    $scope.showAccept = false;
		                    $scope.showinviteRater = !$scope.showinviteRater;
		                    $scope.programList.length
		                    angular.element($window).scrollTop($scope.programList.length * 70 + 290);

		                } else if (option == 2) {
		                    $scope.showProfile = false;
		                    $scope.showinviteRater = false;
		                    $scope.showAccept = false;
		                    $scope.showManage = !$scope.showManage;
		                    angular.element($window).scrollTop($scope.programList.length * 70 + 405);
		                } else if (option == 3) {
		                    $scope.showProfile = false;
		                    $scope.showinviteRater = false;
		                    $scope.showManage = false;
		                    $scope.showAccept = !$scope.showAccept;
		                    angular.element($window).scrollTop($scope.programList.length * 70 + 620);
		                }
		            }

		            $scope.optionCollapse = function() {
		                $scope.showOption = !$scope.showOption;
		            }

		            $scope.setPosition = function(newHash1) {

		            }

		            $scope.cancel = function() {
		                window.location.assign('/');
		            };

		        });

		});
