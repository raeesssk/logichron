'use strict';
/* Account Module */
angular.module('dataentry', [])
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
            
            .when('/dataentry/joblist',
                {
                    templateUrl: 'modules/dataentry/partials/dataentry-list.html',
                    controller: 'dataentryListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dataentry/controllers/dataentry-list.js']
                            }]);
                        }]
                    }
                })

			.when('/dataentry/createjob',
                {
                    templateUrl: 'modules/dataentry/partials/dataentry-create.html',
                    controller: 'dataentryAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dataentry/controllers/dataentry-create.js']
                            }]);
                        }]
                    }
                })
				
			.when('/dataentry/edit/:jobId',
                {
                    templateUrl: 'modules/dataentry/partials/dataentry-edit.html',
                    controller: 'dataentryEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dataentry/controllers/dataentry-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);