'use strict';
/* Account Module */
angular.module('telecaller', [])
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
            
            .when('/telecaller/joblist',
                {
                    templateUrl: 'modules/telecaller/partials/telecaller-list.html',
                    controller: 'telecallerListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/telecaller/controllers/telecaller-list.js']
                            }]);
                        }]
                    }
                })

				
        }]);