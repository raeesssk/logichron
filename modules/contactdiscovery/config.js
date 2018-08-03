'use strict';
/* Account Module */
angular.module('contactdiscovery', [])
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
            
            .when('/contactdiscovery/joblist',
                {
                    templateUrl: 'modules/contactdiscovery/partials/contactdiscovery-list.html',
                    controller: 'contactdiscoveryListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/contactdiscovery/controllers/contactdiscovery-list.js']
                            }]);
                        }]
                    }
                })

			.when('/contactdiscovery/createjob',
                {
                    templateUrl: 'modules/contactdiscovery/partials/contactdiscovery-create.html',
                    controller: 'contactdiscoveryAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/contactdiscovery/controllers/contactdiscovery-create.js']
                            }]);
                        }]
                    }
                })
				
			.when('/contactdiscovery/edit/:jobId',
                {
                    templateUrl: 'modules/contactdiscovery/partials/contactdiscovery-edit.html',
                    controller: 'contactdiscoveryEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/contactdiscovery/controllers/contactdiscovery-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);