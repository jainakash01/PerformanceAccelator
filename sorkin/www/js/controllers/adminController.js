var performAccel = angular.module('performAccel');

performAccel.controller('DeleteItemCtrlAdmin', function($scope, $modalInstance, node, treeStruct) {

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

        });

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





performAccel.controller('adminCtrl', function ($scope, $location, $http, getUserData,$modal, appProgSetup, $window, programJson) {
	$scope.activate = true;

console.log('Inside amdin ctrk');

getUserData.getData()
.then(function(resp) {

	//console.log('Inside mpreview Ctrlller');
	console.log(resp);

	if (resp.application_role != 'Admin'){
		$location.path('/dashboard');
	};






    var changePassUrl = '/a/appPrograms';
    // var d = $q.defer();
    $http.get(changePassUrl)
      .success(function(data, status, headers, config) {
        console.log('Fetching Application programs');
        console.log(data);

        $scope.newOgList  = data.og;
        $scope.newIdgList  = data.idg;
        $scope.newIpgList  = data.ipg;
        $scope.newSkillsList  = data.skills;
        $scope.newRootFactor  = data.roots;

      })
      .error(function(data, status, headers, config) {
        console.log('errorrrr in saving programs..............');

      });



	$scope.saveProgParameters = function()

	{
		console.log($scope.newOgList.toString())
		jsonLoad = {'og':$scope.newOgList.toString(),'ipg':$scope.newipgList.toString(),'idg':$scope.newidgList.toString(),'skills':$scope.newSkillsList.toString(),'roots':$scope.newRootFactor.toString()}


	      var changePassUrl = '/a/appPrograms';
	      // var d = $q.defer();
	      $http.put(changePassUrl,jsonLoad)
	        .success(function(data, status, headers, config) {
	          console.log('Updating Application programs');
	          console.log(data);
	          ohSnap('Program updated', {'color':'green'});

	        })
	        .error(function(data, status, headers, config) {
	          console.log('errorrrr in saving programs..............');
	        });


	}

	$scope.showProgramDtls = false;

	$scope.changedPersonDtls = function(personToBeRated){


		console.log('Bringing in persons program');


        programJson.getData(personToBeRated).then(function(resp) {
            // console.error('................................................................');
            console.log('After getting persons program data');
            console.log(resp);

            if (resp.error) {

            	$scope.showProgramDtls = false;

            	ohSnap('No programs as of now', {'color':'blue'});

                $scope.tree =
                    [{
                        'itemType': 'Organisational Goal',
                        'children': []
                    }]

            } else {
            	$scope.showProgramDtls = true;
            	$scope.inputCycle = resp.training_cycle;
                $scope.tree = resp.programs;

            }
            console.log($scope.tree)
        });


	}



    var allUsers = '/a/allCustomers';
    // var d = $q.defer();
    $http.get(allUsers)
      .success(function(data, status, headers, config) {
    	 console.log('Got list of all users');
    	 console.log(data);
    	 var firstVal = {
	    	 	email:"Please select user..."
	    	 };
    	 $scope.allUsers = [];
    	 $scope.allUsers.push(firstVal);
    	 for(var i=0; i<data.length;i++) {
    	 	$scope.allUsers.push(data[i]);
    	 }
    	 $scope.personToBeRated = 'Please select user...';
    	 // $scope.allUsers = data;

      })
      .error(function(data, status, headers, config) {
        console.log('errorrrr in fetching programs..............');
      });


    $scope.deleteUser = function(userToDel){

        if (userToDel === null || typeof userToDel === 'undefined') {
            ohSnap('Please enter User ID', {'color':'red'});
        } else {
            console.log('Going to delete ' + userToDel);
            urlDel = '/a/customer/' + userToDel ;

            $http.delete(urlDel)
            .success(function(data, status, headers, config) {
              console.log('user Deleted');
              ohSnap('User Deleted Successfully', {'color':'green'});
            })
            .error(function(data, status, headers, config) {
                console.log('user not Deleted');
                console.log(data);
                
                if (data.message = "No Such User Exists"){
                	ohSnap('No Such user exists', {'color':'red'});
                } else {
                
                ohSnap('Error in deleting user', {'color':'red'});
                }
            });
        }

    }

	$scope.changePassword= function(changeUserPass, newPassword){
		console.log('Okay chaning password');

        if (changeUserPass === null || typeof changeUserPass === 'undefined' || newPassword === null || typeof newPassword === 'undefined') {
            ohSnap('Please enter User ID and new password', {'color':'red'});
        } else {
            jsonLoad = {'userName' : $scope.changeUserPass , 'newPassword' : $scope.newPassword , 'iAmAdmin' : true };

            var changePassUrl = '/a/customer/' + $scope.changeUserPass +  '/changePassword';
            // var d = $q.defer();
            $http.put(changePassUrl,jsonLoad)
            .success(function(data, status, headers, config) {
                console.log('changing password');
                console.log(data);
                ohSnap('Password Changed', {'color':'green'});
                $scope.changeUserPass = "";
                $scope.newPassword = "";
                // d.resolve(goalsData);
            })
            .error(function(data, status, headers, config) {
                console.log('errorrrr..............');
                if (data.message=="User Not found"){
                    ohSnap(data.message, {'color':'red'});
                }
            });

        }
	}



	$scope.changeAdmin= function(changeUserPass, newRole){
		console.log('Okay chaning to Admin');

        if (changeUserPass === null || typeof changeUserPass === 'undefined' || newRole === null || typeof newRole === 'undefined') {
            ohSnap('Please enter User ID and its new role', {'color':'red'});
        } else {
            jsonLoad = {'userName' : changeUserPass , 'newRole' :  newRole , 'iAmAdmin' : true };
            var changePassUrl = '/a/customer/' + changeUserPass +  '/changeAdmin';
            // var d = $q.defer();
            $http.put(changePassUrl,jsonLoad)
            .success(function(data, status, headers, config) {
                console.log('changing admin');
                console.log(data);
                ohSnap('Role Changed', {'color':'green'});
                $scope.changeUserAdmin = "";
                $scope.newRole = "";
                // d.resolve(goalsData);
            })
            .error(function(data, status, headers, config) {
              console.log('errorrrr..............');
              if (data.message=="User Not found"){
                  ohSnap(data.message, {'color':'red'});
              }
            });
        }

	}


	// from here 

	$scope.saveProgUser = function(){

		console.log('Saving user program');

		//console.log(cyc);

		console.log($scope.tree);

		console.log('Above tree');

		console.log('saving for ' + $scope.personToBeRated);

        progUrl = '/a/customer/' + $scope.personToBeRated + '/program';

        jsonToSend = {'program' : $scope.tree , 'training_cycle' : $scope.inputCycle}

        $http.put(progUrl,jsonToSend).success(function(data, status, headers, config) {
                console.log(data);
                ohSnap('Congrates, your program has been created / saved', {'color':'green'});
            })
            .error(function(data, status, headers, config) {
                console.log('Error in updating program');
                ohSnap('Error in updating program', {'color':'red'});
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
	
	
	
$scope.deleteBranch = function(node){
    console.log(node);
    var modalInstance = $modal.open({
        templateUrl: 'confirmDeleteAdmin.html',
        controller: 'DeleteItemCtrlAdmin',
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

	$scope.userName = resp.first_name;
	$scope.userEmail = resp.email;


});


});