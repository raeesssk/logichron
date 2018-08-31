'use strict';
/* Account Module */
angular.module('contactassign', [])
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
            
            .when('/assign/employee',
                {
                    templateUrl: 'modules/contactassign/partials/assign-emp.html',
                    controller: 'assignEmpCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/contactassign/controllers/assign-emp.js']
                            }]);
                        }]
                    }
                })
            .when('/assign/edit',
                {
                    templateUrl: 'modules/contactassign/partials/assign-emp-edit.html',
                    controller: 'assignEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/contactassign/controllers/assign-emp-edit.js']
                            }]);
                        }]
                    }
                })
            .when('/assign',
                {
                    templateUrl: 'modules/contactassign/partials/assign-job.html',
                    controller: 'assignJobCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/contactassign/controllers/assign-job.js']
                            }]);
                        }]
                    }
                });
				
        }]);