var performAccel = angular.module('performAccel');

performAccel.directive('simpleCaptcha', function() {
    return {
        restrict: 'E',
        scope: { valid: '=' },
        template: '<div><input ng-model="a.value" ng-show="a.input" style="width:225px;text-align: center;font-size: 20px;"><span ng-hide="a.input" style="font-size: 20px;">{{a.value}}</span><span style="font-size: 20px;">&nbsp;{{operation}}&nbsp;</span><input ng-model="b.value" ng-show="b.input" style="width:225px; text-align: center;font-size: 20px;"><span ng-hide="b.input" style="font-size: 20px;">{{b.value}}</span><span style="font-size: 20px;">&nbsp;=&nbsp;{{result}}</span></div>',
        controller: function($scope) {
            
            var show = Math.random() > 0.5;
            
            var value = function(max){
                return Math.floor(max * Math.random());
            };
            
            var int = function(str){
                return parseInt(str, 10);
            };
            
            $scope.a = {
                value: show? undefined : 1 + value(4),
                input: show
            };
            $scope.b = {
                value: !show? undefined : 1 + value(4),
                input: !show
            };
            $scope.operation = '+';
            
            $scope.result = 5 + value(5);
            
            var a = $scope.a;
            var b = $scope.b;
            var result = $scope.result;
            
            var checkValidity = function(){
                if (a.value && b.value) {
                    var calc = int(a.value) + int(b.value);
                    $scope.valid = calc == result;
                } else {
                    $scope.valid = false;
                }
                // $scope.$apply(); // needed to solve 2 cycle delay problem;
            };
            
            
            $scope.$watch('a.value', function(){    
                checkValidity();
            });
            
            $scope.$watch('b.value', function(){    
                checkValidity();
            });
            
          
            
        }
    };
});



performAccel.controller('TandCctrl', function($scope, $modalInstance,firstData) {

   console.log(firstData);
   
	
	
	$scope.ok = function() {
		
        $modalInstance.close();

        $.jStorage.set("Sorkin_Session", firstData);
        $.jStorage.setTTL("Sorkin_Session", 24 * 60 * 60 * 1000);
        
     	window.location.assign('/');
     	
	}    });



performAccel.controller('loginCtrl', function ($scope, $location, $http,$modal) {

	console.log('Inside login')
	var invalidAttempt = 0;
	$scope.activate = true;
	// $scope.showsignup = false;
	$scope.shownoti = false;
	$scope.invalidEmail = false;
	$scope.invalidPass = false;
	$scope.invalidPass1 = false;
	$scope.invalidPass2 = false;
	$scope.invalidEmail2 = false;
	$scope.invalidEmail3 = false;
	$scope.showForgetPass = false;
	$scope.invalidFName = false;
	$scope.invalidLName = false;
	$scope.invalidComp = false;
	$scope.invalidRole = false;
	$scope.invalidPhone = false;
	$scope.showForgetPassNoti  = false;
	// console.error($scope.showsignup);
	// to do stuff
	// to do stuff
	$('.message a').click(function(){
	   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	});

	$scope.toggleLogin = function() {
		// alert($scope.showsignup);
		// console.error($scope.showsignup);
		$scope.showsignup = false;
	}
	$scope.toggleSignup = function() {
		// alert($scope.showsignup);
		$scope.showsignup = true;
	}

	$scope.validateFName = function() {
		if ($scope.fname === null || typeof $scope.fname === 'undefined') {
			$scope.invalidFName = true;
		} else {
			$scope.invalidFName = false;
		}
	}

	$scope.validateLName = function() {
		if ($scope.lname === null || typeof $scope.lname === 'undefined') {
			$scope.invalidLName = true;
		} else {
			$scope.invalidLName = false;
		}
	}

	$scope.validateComp = function() {
		if ($scope.company === null || typeof $scope.company === 'undefined') {
			$scope.invalidComp = true;
		} else {
			$scope.invalidComp = false;
		}
	}

	$scope.validateRole = function() {
		if ($scope.role === null || typeof $scope.role === 'undefined') {
			$scope.invalidRole = true;
		} else {
			$scope.invalidRole = false;
		}
	}

	$scope.validatePhone = function() {
		if ($scope.phoneNumber === null || typeof $scope.phoneNumber === 'undefined') {
			$scope.invalidPhone = true;
		} else {
			$scope.invalidPhone = false;
		}
	}

	$scope.validatePassword1 = function() {
		if ($scope.passwordSignUp === null || typeof $scope.passwordSignUp === 'undefined') {
			$scope.invalidPass1 = true;
		} else {
			$scope.invalidPass1 = false;
		}
	}

	$scope.validateEmailId = function() {
		if ($scope.email === null || typeof $scope.email === 'undefined') {
			$scope.invalidEmail2 = true;
		} else {
			$scope.invalidEmail2 = false;
		}

	}
	
	$scope.saveUser = function() {

		$scope.validateFName();
		$scope.validateLName();
		$scope.validateComp();
		$scope.validateRole();
		$scope.validatePhone();
		$scope.validatePassword1();
		$scope.validateEmailId();
		
		//alert($scope.captchaValid);
		if(!$scope.invalidFName && !$scope.invalidLName && !$scope.invalidComp && !$scope.invalidRole && !$scope.invalidPhone && !$scope.invalidPass1 && !$scope.invalidPass2 && $scope.captchaValid) {
			signupUrl = '/a/customer/' + $scope.email;

			subData = {'email' : $scope.email  , 'password' : $scope.passwordSignUp ,  'role' : $scope.role,'company' : $scope.company,  'phone_number' : $scope.phoneNumber,  'first_name' : $scope.fname , 'last_name' : $scope.lname}

	        $http.post(signupUrl, subData).success(function(data, status, headers, config) {
	        	console.log('Success');
	        	console.log('Please check ur mail for confirmation');
	        	$scope.shownoti = true;

	        	$scope.showsignup = false;
	        	ohSnap('Thank you ' + $scope.fname + ', Please check your ' + $scope.email + ' to continue', {'color':'green'});
	        })
	        .error(function(data, status, headers, config) {
	        	console.log('Errored')
	        });
		} else {
			
			if (!$scope.captchaValid) {
				alert('Invalid captcha !!')
			}

			return;
		}

		
	};

	$scope.resetPass = function() {
		if(typeof $scope.resetpassemail != 'undefined' || $scope.resetpassemail != null) {

			$scope.showForgetPass = false;
			$scope.showsignup = false;
			// $scope.showsignup = !$scope.showsignup;
			fpUrl = '/a/customer/' +  $scope.resetpassemail  + '/forgetPassword';

	        $http.put(fpUrl).success(function(data, status, headers, config) {
	        	console.log('Success');
	        	console.log('Please check ur mail for confirmation');
	        	$scope.showForgetPassNoti  = true;
	        	ohSnap('Your password has been send to ' + $scope.resetpassemail, {'color':'green'});
	        })
	        .error(function(data, status, headers, config) {
	        	console.log('Errored');
	        	ohSnap(data.message, {'color':'red'});
	        });

		} else {
			ohSnap('Please enter email id', {'color':'red'});
		}


	}

	$scope.validateEmail = function(emailId, page) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	;
		if (re.test(emailId)) {
			if(page === 'login') {
				$scope.invalidEmail = false;
			} else if(page === 'resetpass') {
				$scope.invalidEmail3 = false;
			} else {
				$scope.invalidEmail2 = false;
			}

		} else {
			if(page === 'login') {
				$scope.invalidEmail = true;
			} else if(page === 'resetpass') {
				$scope.invalidEmail3 = true;
			} else {
				$scope.invalidEmail2 = true;
			}
		}
	}

	$scope.validatePassword = function() {
		if($scope.passwordSignUp !== $scope.cpassword) {
			$scope.invalidPass2 = true;
		} else {
			$scope.invalidPass2 = false;
		}
	}
	$scope.signup = function() {
		$scope.showsignup = true;
		console.log('Signup page');
	}
	$scope.signin = function() {
		console.log('login');
		if(!$scope.invalidEmail) {
			$scope.shownoti = false;
			$scope.showsignup = false;
			$scope.validateUser();
		} else {
			return;
		}

	}

	$scope.validateUser = function() {

		console.log('Validating ...');

		if($scope.username != "" || $scope.password != null) {

			console.log('Inside');
			
			//alert($scope.username);

			var subData = {
			"username":$scope.username,
			"password":$scope.password
			};

			console.log('Calling URL');
			$http.put('/a/customer/' + $scope.username + '/verify', subData).success(function(data) {
				$scope.response = data;
				console.log('After verifying user pass');

				
				$http.get('/a/customer/' + $scope.username + '/checkFirstLogging').success(function(data1){
					console.log('API called for checking 1st logging');
					console.log(data1);
					console.log('Success');
					//alert('here')
					if (data1.first_time_logging == true){
						
		            	var modalInstance = $modal.open({
		                    templateUrl: 'termsAndCondition.html',
		                    controller: 'TandCctrl',
		                    windowClass: 'modal fade in',
		                    size: 'sm',
		                    resolve : {
		                    	'firstData' : data1
		                    }
	                })
						
						//alert('Terms and Condition modal window');
					}
					else {
						//alert('Not 1st logging')
						//alert(data);
						$.jStorage.set("Sorkin_Session", data);
		                 $.jStorage.setTTL("Sorkin_Session", 24 * 60 * 60 * 1000);
		                 
						window.location.assign('/');
						
					}
					 

				})
				
				
				 
			})
			.error(function(data){

				console.log(data);
				// alert(data.message);
				
				invalidAttempt =  invalidAttempt + 1;
				ohSnap(data.message + ': Please enter valid email and password', {'color':'red'});
				console.log('Ohh error in calling URL');
				if (invalidAttempt >= 3 && invalidAttempt < 5 ){
					alert('If you have forgotten password, you may please visit Reset password link.')
				};
				if (invalidAttempt >= 5){
					alert('Your account has been locked for next 1 hour');
					$http.put('/a/customer/' + $scope.username + '/lock').success(function(data) {
						console.log('After locking the customer')
						window.location.assign('/');

					})
				}
			})

		}
	}

});