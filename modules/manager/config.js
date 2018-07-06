'use strict';
/* Account Module */
angular.module('manager', [])
    .config(['$routeProvider', function config($routeProvider) {
       

        $routeProvider
            
            .when('/manager/joblist',
                {
                    templateUrl: 'modules/manager/partials/manager-list.html',
                    controller: 'managerListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/manager/controllers/manager-list.js']
                            }]);
                        }]
                    }
                })
            .when('/manager/jobassign',
                {
                    templateUrl: 'modules/manager/partials/manager-assign.html',
                    controller: 'managerAssignCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/manager/controllers/manager-assign.js']
                            }]);
                        }]
                    }
                })

            .when('/manager/create',
                {
                    templateUrl: 'modules/manager/partials/manager-create.html',
                    controller: 'managerCreateCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/manager/controllers/manager-create.js']
                            }]);
                        }]
                    }
                })
				
        }]);