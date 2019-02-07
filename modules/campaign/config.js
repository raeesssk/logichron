'use strict';
/* Account Module */
angular.module('campaign', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {
              /*  if (!localStorageService.get('kayre_access_token')) {
                    alert("Your session has been expired");
                    window.location = 'login.html';
                    return $q.defer.promise;
                }*/

            }]

        };

        $routeProvider
            
            .when('/campaign',
                {
                    templateUrl: 'modules/campaign/partials/campaign-list.html',
                    controller: 'campaignListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/campaign/controllers/campaign-list.js']
                            }]);
                        }]
                    }
                })

			.when('/campaign/create',
                {
                    templateUrl: 'modules/campaign/partials/campaign-create.html',
                    controller: 'campaignAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/campaign/controllers/campaign-create.js']
                            }]);
                        }]
                    }
                })
				
			// .when('/campaign/import',
   //              {
   //                  templateUrl: 'modules/campaign/partials/campaign-import.html',
   //                  controller: 'campaignImportCtrl',
   //                  resolve: {
   //                      lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
   //                          return $ocLazyLoad.load([{
   //                              name: 'myApp',
   //                              files: ['modules/campaign/controllers/campaign-import.js']
   //                          }]);
   //                      }]
   //                  }
   //              })
                
   //          .when('/campaign/import_list',
   //              {
   //                  templateUrl: 'modules/campaign/partials/campaign-import-list.html',
   //                  controller: 'campaignImportListCtrl',
   //                  resolve: {
   //                      lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
   //                          return $ocLazyLoad.load([{
   //                              name: 'myApp',
   //                              files: ['modules/campaign/controllers/campaign-import-list.js']
   //                          }]);
   //                      }]
   //                  }
   //              })
                
            .when('/campaign/edit/:campaignId',
                {
                    templateUrl: 'modules/campaign/partials/campaign-edit.html',
                    controller: 'campaignEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/campaign/controllers/campaign-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);