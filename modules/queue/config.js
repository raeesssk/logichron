'use strict';
/* Account Module */
angular.module('queue', [])
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
            
            .when('/prequeue',
                {
                    templateUrl: 'modules/queue/partials/prequeued.html',
                    controller: 'prequeueListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/queue/controllers/prequeued.js']
                            }]);
                        }]
                    }
                })
            .when('/postqueue',
                {
                    templateUrl: 'modules/queue/partials/postqueue.html',
                    controller: 'postqueueListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/queue/controllers/postqueue.js']
                            }]);
                        }]
                    }
                })/*

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
                })*/;
				
        }]);