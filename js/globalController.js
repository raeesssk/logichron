/*
 *  Controller To Set Global Definitions
 */
function GlobalCtrl($rootScope, $http, $scope, $timeout) {

    $('#11').click(function(){
           
              $(this).addClass('pcoded-trigger');
              
            
          });

    $rootScope.tokken=localStorage.getItem("logichron_admin_access_token");
    $rootScope.username=localStorage.getItem("logichron_admin_username");
    $rootScope.firstname=localStorage.getItem("logichron_admin_firstname");
    $rootScope.iconimage=localStorage.getItem("logichron_admin_iconimage");
    $rootScope.userid=localStorage.getItem('logichron_userid');
    // console.log($rootScope.userid);
    $rootScope.roleId=localStorage.getItem('logichron_role_id');
    $rootScope.baseURL = 'http://localhost:3111';

    // $rootScope.baseURL = 'http://logichron.3commastechnologies.com:3111';
    // $rootScope.baseURL = 'http://10.1.0.21:3001';
    
    $rootScope.socket = io.connect($rootScope.baseURL,{transports: ['websocket']});
    $rootScope.socket.on('connect',function(){
     })
    if(localStorage.getItem("logichron_admin_access_token") === null)
      {
          window.location = 'login.html';
      }

    // $rootScope.back = function () {
    //     window.history.back();
    // };
    $scope.role=[];
    $scope.url=[];
    $scope.checksupermission=[];
      $scope.getpermission=function(){
        $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/login/permission/'+$rootScope.roleId,
                  headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                })
                .success(function(permission)
                {

                  permission.forEach(function(val,key){
                    $scope.obj={
                      roleid : $rootScope.roleId,
                      pm_id : val.pm_id
                    }
                    $http({
                        method: 'POST',
                        url: $rootScope.baseURL+'/login/sub',
                        data: $scope.obj,
                        headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                      })
                      .success(function(sub)
                      {
                        val.subpermission=[];
                        sub.forEach(function(value,key){
                          $scope.url.push(value.url);
                          localStorage.setItem('permission',JSON.stringify($scope.url));
                          val.subpermission.push(value);
                        }); 
                        $scope.role.push(val);
                      })
                      .error(function(data) 
                      {   
                        var dialog = bootbox.dialog({
                            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                closeButton: false
                            });
                            setTimeout(function(){
                                dialog.modal('hide'); 
                            }, 1500);            
                      });
                  });
                })
                .error(function(data) 
                {   
                  var dialog = bootbox.dialog({
                      message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                          closeButton: false
                      });
                      setTimeout(function(){
                          dialog.modal('hide'); 
                      }, 1500);            
                });
                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/login/superole/'+$rootScope.roleId,
                        //data: $scope.data,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                      })
                      .success(function(obj3)
                      {
                          
                            obj3.forEach(function(value3,key3){
                              $scope.checksupermission.push(value3.rpm_pssm_id);
                              localStorage.setItem('supermission',JSON.stringify($scope.checksupermission));
                              
                            });
                      })  
                      .error(function(data) 
                      {   
                          toastr.error('Oops, Something Went Wrong.', 'Error', {
                              closeButton: true,
                              progressBar: true,
                              positionClass: "toast-top-center",
                              timeOut: "500",
                              extendedTimeOut: "500",
                          });  
                      });

            };
            $scope.getpermission();
            

      $rootScope.test = function(id){

          if ($("#"+id).hasClass('pcoded-trigger')) {
              $("#"+id).removeClass('pcoded-trigger');
          } else {
              $("#"+id).closest('.pcoded-inner-navbar').find('li.pcoded-trigger').removeClass('pcoded-trigger');
              $("#"+id).addClass('pcoded-trigger');
          }
        
      }
     
      $rootScope.logOut = function(){

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/login/isoffline',
          data: 'username='+$rootScope.username,
          headers: {'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' :'Bearer '+$rootScope.tokken}
        })
        .success(function(deliverycount)
        {   
            localStorage.removeItem('logichron_admin_username');
            localStorage.removeItem('logichron_admin_firstname');
            localStorage.removeItem('logichron_admin_iconimage');
            localStorage.removeItem('logichron_admin_access_token');
            localStorage.removeItem('logichron_admin_expires_in');
            localStorage.removeItem('logichron_admin_refresh_token');
            localStorage.removeItem('logichron_admin_token_type');
            localStorage.clear();
            window.location = 'login.html'; 
        })
        .error(function(data) 
        {   
            //console.log("url"+$scope.apiURL);
            /*console.log("Oops, Something Went Wrong!");*/
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');
            }, 3001);
        });
      };

      $rootScope.backup = function(){

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/backup',
          // data: 'username='+$rootScope.userid,
          headers: {'Content-Type': 'application/json',
          'Authorization' :'Bearer '+$rootScope.tokken}
        })
        .success(function(deliverycount)
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Successfully Backup!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');
            }, 3001);
        })
        .error(function(data) 
        {   
            //console.log("url"+$scope.apiURL);
            /*console.log("Oops, Something Went Wrong!");*/
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');
            }, 3001);
        });
      };

    // $scope.Log_Out = function () {

    //     localStorage.clear();
    //     Parse.User.logOut();
    //     window.location = "login.html";
    // };

    //check user is idle
    // $rootScope.idle = 800; //800 expire time 24 hrs
    // $rootScope.timeout = 60; //60 warning time 1 minute

  $rootScope.$on('IdleStart', function() {
        // the user appears to have gone idle
        // $rootScope.oldTokken=$rootScope.tokken;
        //  console.log("Before"+$rootScope.oldTokken);
        console.log("start");
      });

  $rootScope.$on('IdleWarn', function(e, countdown) {
        // follows after the IdleStart event, but includes a countdown until the user is considered timed out
        // the countdown arg is the number of seconds remaining until then.
        // you can change the title or display a warning dialog from here.
        // you can let them resume their session by calling Idle.watch()
      });

  $rootScope.$on('IdleTimeout', function() {    
        // the user has timed out (meaning idleDuration + timeout has passed without any activity)
        // this is where you'd log them

        $rootScope.logOut(); 
      });

  $rootScope.$on('IdleEnd', function() {
        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
        console.log("end")
      });

}