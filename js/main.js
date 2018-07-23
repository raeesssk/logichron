angular.module('logichron',
    [
// External Dependencies
        'ngRoute',
        'oc.lazyLoad',
        // 'ngValidate',
        'ui.bootstrap',
        'angularFileUpload',
        'ngIdle',
        // 'ngAnimate',
        // 'toastr',
        //'Modular Dependencies',
        'admin',
        'user',
        'role',
        'employee',
        'dataentry',
        'telecaller',
        'manager',
    // ]).config(cityMotorRouter);

]).config(function($routeProvider, IdleProvider, KeepaliveProvider, $controllerProvider) {
  // configure Idle settings
  IdleProvider.idle(3600); // in seconds
  IdleProvider.timeout(5); // in seconds
  KeepaliveProvider.interval(2); // in seconds
  $controllerProvider.allowGlobals();
  $routeProvider
}).directive('permissionList',function(){
  return{
    restrict:'A',
    scope:{
        permissionList: '='
    },
    link: function(scope,elem,attr){
        
          if(scope.permissionList[0]){
            
            elem.show();
          }
          else if(scope.permissionList[1])
          {
            elem.hide();
          }
    }
  }
})
.run(function(Idle){
  // start watching when the app runs. also starts the Keepalive service by default.
  Idle.watch();
});
// function cityMotorRouter($routeProvider, IdleProvider, KeepaliveProvider, $controllerProvider) {
//     $controllerProvider.allowGlobals();
//     $routeProvider
// }

