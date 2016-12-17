var performAccel = angular.module('performAccel', [
'ngRoute', 'performAccelIndex' , 'ui.bootstrap' , 'tree.directives' , 'tree.directivesAcceptInvite' , 'tree.directivesViewInviteRater' ,  'tree.directivesMorningPrev'  , 'tree.directivesEveReview' , 'tree.directivesInviteRater','tree.directivesRaterPage'
]);


performAccel.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: '/login.html',
        controller: 'loginCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl',
        resolve: {statusService: function(getUserData){
        	console.log('Resolving data')
            return getUserData.getData();
        } }
      }).
      when('/mpreview', {
        templateUrl: 'partials/mpreview.html',
        controller: 'mpreviewCtrl',
        resolve: {statusService: function(getUserData){
        	console.log('Resolving data')
            return getUserData.getData();
        } }
      }).
       when('/faq', {
        templateUrl: 'partials/faq.html',
        controller: 'faqCtrl',
      }).
        when('/help', {
        templateUrl: 'partials/help.html',
        controller: 'helpCtrl',
      }).
      when('/ereview', {
        templateUrl: 'partials/ereview.html',
        controller: 'ereviewCtrl'
        // resolve: {statusService: function(getUserData){
        // 	console.log('Resolving data')
        //     return getUserData.getData();
        // } }
      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'settingsCtrl',
        resolve: {statusService: function(getUserData){
        	console.log('Resolving data')
            return getUserData.getData();
        } }
      }).
      when('/reports', {
        templateUrl: 'partials/reports.html',
        controller: 'reportsCtrl',
        resolve: {statusService: function(getUserData){
        	console.log('Resolving data')
            return getUserData.getData();
        } }
      }).
      when('/360', {
          templateUrl: 'partials/page360.html',
          controller: 'ctrl360',
          resolve: {statusService: function(getUserData){
            console.log('Resolving data')
              return getUserData.getData();
          } }
        }).
      when('/admin', {
          templateUrl: 'partials/admin.html',
          controller: 'adminCtrl',
          resolve: {statusService: function(getUserData){
          	console.log('Resolving data')
              return getUserData.getData();
          } }
        }).
      when('/buildpa',  {
        templateUrl: 'partials/buildPA.html',
        controller: 'buildpaCtrl',
        resolve: {statusService: function(getUserData){
        	console.log('Resolving data')
        	//alert('ok')
            return getUserData.getData();
        } }
      }).
       when('/review', {
        templateUrl: 'partials/review.html',
        controller: 'reviewCtrl',
        resolve: {statusService: function(getUserData){
        	console.log('Resolving data')
            return getUserData.getData();
        } }
      }).
      when('/coach', {
          templateUrl: 'partials/coach.html',
          controller: 'coachCtrl',
          resolve: {statusService: function(getUserData){
          	console.log('Resolving data')
              return getUserData.getData();
          } }
        }).
      otherwise({
        redirectTo: '/home',
        resolve: {statusService: function(getUserData){
        	console.log('Resolving data')
            return getUserData.getData();
        } }
      });
  }]);

// var performAccel = angular.module('performAccel', [
// 'ngRoute'
// ]);


// performAccel.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/login', {
//         templateUrl: 'partials/login.html',
//         controller: 'loginCtrl'
//       }).
//       when('/home', {
//         templateUrl: 'partials/home.html',
//         controller: 'homeCtrl'
//       }).
//       when('/mpreview', {
//         templateUrl: 'partials/mpreview.html',
//         controller: 'mpreviewCtrl'
//       }).
//       when('/ereview', {
//         templateUrl: 'partials/ereview.html',
//         controller: 'ereviewCtrl'
//       }).
//       when('/settings', {
//         templateUrl: 'partials/settings.html',
//         controller: 'settingsCtrl'
//       }).
//       when('/reports', {
//         templateUrl: 'partials/reports.html',
//         controller: 'reportsCtrl'
//       }).
//       otherwise({
//         redirectTo: '/home'
//       });
//   }]);