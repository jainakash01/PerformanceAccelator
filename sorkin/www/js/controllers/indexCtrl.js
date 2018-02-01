var performAccelIndex = angular.module('performAccelIndex',[]);


performAccelIndex.directive('starRating', function () {


        return {
            restrict: 'EA',
            template:
              '<ul class="star-rating" ng-class="{readonly: readonly}">' +
              '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
              '    <i class="fa fa-star"></i>' + // or &#9733
              '  </li>' +
              '</ul>',
            scope: {
              ratingValue: '=ngModel',
              max: '=?', // optional (default is 5)
              onRatingSelect: '&?',
              readonly: '=?'
            },
            link: function(scope, element, attributes) {
              if (scope.max == undefined) {
                scope.max = 5;
              }
              function updateStars() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                  scope.stars.push({
                    filled: i < scope.ratingValue
                  });
                }
              };
              scope.toggle = function(index) {
                if (scope.readonly == undefined || scope.readonly === false){
                  scope.ratingValue = index + 1;
                  scope.onRatingSelect({
                    rating: index + 1
                  });
                }
              };
              scope.$watch('ratingValue', function(oldValue, newValue) {
                if (newValue) {
                  updateStars();
                }
              });
            }
          };
});


performAccelIndex.controller('indexCtrl', function ($scope, $http, $location, getUserData) {

  if ($(window).width() < 768) {
      $("#optHome").attr("data-toggle","collapse");
      $("#optHome").attr("data-target",".sidebar-collapse");

      $("#optBuildPA").attr("data-toggle","collapse");
      $("#optBuildPA").attr("data-target",".sidebar-collapse");

      $("#optReview").attr("data-toggle","collapse");
      $("#optReview").attr("data-target",".sidebar-collapse");

      $("#optCoach").attr("data-toggle","collapse");
      $("#optCoach").attr("data-target",".sidebar-collapse");

      $("#optAdmin").attr("data-toggle","collapse");
      $("#optAdmin").attr("data-target",".sidebar-collapse");

      $("#opt360").attr("data-toggle","collapse");
      $("#opt360").attr("data-target",".sidebar-collapse");

      $("#optSettings").attr("data-toggle","collapse");
      $("#optSettings").attr("data-target",".sidebar-collapse");
  } else {
          $("#optHome").removeAttr("data-toggle");
          $("#optHome").removeAttr("data-target");

          $("#optBuildPA").removeAttr("data-toggle");
          $("#optBuildPA").removeAttr("data-target");

          $("#optReview").removeAttr("data-toggle");
          $("#optReview").removeAttr("data-target");
          
          $("#optCoach").removeAttr("data-toggle");
          $("#optCoach").removeAttr("data-target");

          $("#optAdmin").removeAttr("data-toggle");
          $("#optAdmin").removeAttr("data-target");

          $("#opt360").removeAttr("data-toggle");
          $("#opt360").removeAttr("data-target");
          
          $("#optSettings").removeAttr("data-toggle");
          $("#optSettings").removeAttr("data-target");
       }

  $(window).resize(function(){
    //console.log(window.innerWidth);
    $scope.$apply(function(){
       if (window.innerWidth < 768) {
          $("#optHome").attr("data-toggle","collapse");
          $("#optHome").attr("data-target",".sidebar-collapse");

          $("#optBuildPA").attr("data-toggle","collapse");
          $("#optBuildPA").attr("data-target",".sidebar-collapse");

          $("#optReview").attr("data-toggle","collapse");
          $("#optReview").attr("data-target",".sidebar-collapse");

          $("#optCoach").attr("data-toggle","collapse");
          $("#optCoach").attr("data-target",".sidebar-collapse");

          $("#optAdmin").attr("data-toggle","collapse");
          $("#optAdmin").attr("data-target",".sidebar-collapse");

          $("#opt360").attr("data-toggle","collapse");
          $("#opt360").attr("data-target",".sidebar-collapse");

          $("#optSettings").attr("data-toggle","collapse");
          $("#optSettings").attr("data-target",".sidebar-collapse");
          
       } else {
          $("#optHome").removeAttr("data-toggle");
          $("#optHome").removeAttr("data-target");

          $("#optBuildPA").removeAttr("data-toggle");
          $("#optBuildPA").removeAttr("data-target");

          $("#optReview").removeAttr("data-toggle");
          $("#optReview").removeAttr("data-target");
          
          $("#optCoach").removeAttr("data-toggle");
          $("#optCoach").removeAttr("data-target");

          $("#optAdmin").removeAttr("data-toggle");
          $("#optAdmin").removeAttr("data-target");

          $("#opt360").removeAttr("data-toggle");
          $("#opt360").removeAttr("data-target");
          
          $("#optSettings").removeAttr("data-toggle");
          $("#optSettings").removeAttr("data-target");
       }

    });
  });

  $scope.showReviewOpt = false;
  $scope.userPicUrl = 'assets/img/find_user.png';

  $scope.openFaqPage = function(){
    $location.path('/faq');
  };

  $scope.openHelpPage = function(){
    $location.path('/help');

  };
  


	$scope.logout = function(){
		  
		$http.get('/a/customer/' + $scope.userEmail + '/logout').success(function() {
			  	console.log('Logut URL');
			  	
			  })
		$.jStorage.deleteKey("Sorkin_Session");
		window.location.assign('/login');
	        };

	getUserData.getData()
    .then(function(resp) {
    	console.log('Inside Index Ctrl');
    	console.log(resp);
     
    	if(resp.application_role == 'Admin'){
    		console.log('Yes its Amdin')
    		$scope.showAdmin=true;
    	}
      // if(resp.user_logging == 'true'){
      //   console.log('Yes login true')
      //   $scope.userEmail = resp.email;
      // }
    //  console.log(resp.user_logging);

    	$scope.userName = resp.first_name;
    	$scope.userEmail = resp.email;

	    $http.get('/a/customer/' + $scope.userEmail + '/photo').success(function(data, status, headers, config) {
	    	console.log('image data URL');
	    	$scope.userPicUrl = data;
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('Errored');
	    	//alert(data);
	    });

      var checkRaterUrl='/a/customer/' + $scope.userEmail +  '/checkIfRater';
      // var d = $q.defer();
      $http.get(checkRaterUrl)
        .success(function(data, status, headers, config) {
          console.log('check if rater.......................');
          console.log(data);
          var inviteeDetails = data;
          for (i=0;i<=inviteeDetails.length-1;i++){
        	  if( !$scope.showReviewOpt &&  (typeof inviteeDetails[i].rating_scopes === 'undefined' || inviteeDetails[i].rating_scopes === 'null') ) {
                  $scope.showReviewOpt = false;
                } else {
                  $scope.showReviewOpt = true;
                }
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




      var checkCoachUrl='/a/customer/' + $scope.userEmail +  '/checkIfCoach';
      // var d = $q.defer();
      $http.get(checkCoachUrl)
        .success(function(data, status, headers, config) {
          console.log('check if coach.......................');
          console.log(data);
          if(typeof data[0] != 'undefined') {
            if (data[0].flag == true){
            $scope.showCoachOpt = true;
            }
            else {
          	  $scope.showCoachOpt = false;
            }
          }
        })
        .error(function(data, status, headers, config) {
          console.log('errorrrr..............');
          var response = data;
          $scope.showCoachOpt = false;
          console.log(response);
        });



    	$scope.check = 'checked';
      $scope.showWa = true;
      $scope.showNoti = false;
      $scope.showBadge = true;

	angular.element('#optHome').click(function(){
    	$("#optHome").addClass("active-menu");
    	$("#optAdmin").removeClass("active-menu");
    	$("#optSettings").removeClass("active-menu");
    	$("#optBuildPA").removeClass("active-menu");
    	$("#opt360").removeClass("active-menu");
      $("#optReview").removeClass("active-menu");
      $("#optCoach").removeClass("active-menu");

	});

    angular.element('#optCoach').click(function(){
      $("#optCoach").addClass("active-menu");
      $("#optHome").removeClass("active-menu");
      $("#optAdmin").removeClass("active-menu");
      $("#optSettings").removeClass("active-menu");
      $("#optBuildPA").removeClass("active-menu");
      $("#opt360").removeClass("active-menu");
      $("#optReview").removeClass("active-menu");

  });


	angular.element('#optAdmin').click(function(){
    	$("#optAdmin").addClass("active-menu");
    	$("#optHome").removeClass("active-menu");
    	$("#optSettings").removeClass("active-menu");
    	$("#optBuildPA").removeClass("active-menu");
    	$("#opt360").removeClass("active-menu");
      $("#optReview").removeClass("active-menu");
      $("#optCoach").removeClass("active-menu");

	});

  angular.element('#optReview').click(function(){
      $("#optReview").addClass("active-menu");
      $("#optHome").removeClass("active-menu");
      $("#optSettings").removeClass("active-menu");
      $("#optBuildPA").removeClass("active-menu");
      $("#opt360").removeClass("active-menu");
      $("#optAdmin").removeClass("active-menu");
      $("#optCoach").removeClass("active-menu");

  });

	angular.element('#optBuildPA').click(function(){
    	$("#optBuildPA").addClass("active-menu");
    	$("#optHome").removeClass("active-menu");
    	$("#optSettings").removeClass("active-menu");
    	$("#optAdmin").removeClass("active-menu");
    	$("#opt360").removeClass("active-menu");
      $("#optReview").removeClass("active-menu");
      $("#optCoach").removeClass("active-menu");

	});


	angular.element('#optSettings').click(function(){
    	$("#optSettings").addClass("active-menu");
    	$("#optHome").removeClass("active-menu");
    	$("#optAdmin").removeClass("active-menu");
    	$("#optBuildPA").removeClass("active-menu");
    	$("#opt360").removeClass("active-menu");
      $("#optReview").removeClass("active-menu");
      $("#optCoach").removeClass("active-menu");
	});

	angular.element('#opt360').click(function(){
		  $("#opt360").addClass("active-menu");
    	$("#optSettings").removeClass("active-menu");
    	$("#optHome").removeClass("active-menu");
    	$("#optAdmin").removeClass("active-menu");
    	$("#optBuildPA").removeClass("active-menu");
      $("#optReview").removeClass("active-menu");
      $("#optCoach").removeClass("active-menu");
	});

  // angular.element('#treediv1').click(function(){
  //           alert('gdg');
  //             $("#markspan").addClass("hover-effect-span");
  //         });

	   $scope.showNotif = function() {
	        $scope.showNoti = !$scope.showNoti;
	    }

	    $scope.closeNotif = function() {
	        $scope.showNoti = !$scope.showNoti;
	        $scope.showBadge = false;
	    }

    $scope.expandSidebar = function() {

        $("#page-wrapper").removeClass("page-wrapperorg");
        $("#navbar-coll").removeClass("navbar-side-collorg");

        $("#page-wrapper").addClass("page-wrappercls");
        $("#navbar-coll").addClass("navbar-side-coll");

    }
    $scope.collapseSidebarLeave = function() {
        //alert('alert');
        $("#page-wrapper").removeClass("page-wrappercls");
        $("#navbar-coll").removeClass("navbar-side-coll");

        $("#page-wrapper").addClass("page-wrapperorg");
        $("#navbar-coll").addClass("navbar-side-collorg");

    }

    });
});


