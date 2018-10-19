// import admin
angular.module('role').controller('roleAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.role = {};
    $scope.permissionList=[];
    $scope.role.userid=localStorage.getItem('logichron_userid');
    $scope.apiURL = $rootScope.baseURL+'/role/add';

    $scope.url = 'Tried to enter role add Page';

    $scope.gethistory=function(){
      $scope.history={
        user_id : $rootScope.userid,
        url : $scope.url
      }
      $http({
            method: 'POST',
            url: $rootScope.baseURL+'/history/add',
            data: $scope.history,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(login)
          {
              
          })
          .error(function(data) 
          {   
            var dialog = bootbox.dialog({
              message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                  closeButton: false
              });
              setTimeout(function(){
              $('#btnsave').text("SAVE");
              $('#btnsave').removeAttr('disabled');
                  dialog.modal('hide'); 
            }, 1500);            
        });
    };
    $scope.gethistory();

    var permission=JSON.parse(localStorage.getItem('permission'));
    var value = '#/role/add';
    var access = permission.includes(value);
    $scope.getrolepermission=function(){
      
      // for(var i=0;i<permission.length;i++)
      // {
        if(access)
        {
          return true
        }
        else
        {
           var dialog = bootbox.dialog({
          message: '<p class="text-center">You Are Not Authorized</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
          $location.path('/');
          $scope.gethistory();
        }
        /*
        break;
      }*/

    };
    $scope.getrolepermission();
  
   
    
    $scope.getPermission = function(){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/role',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {

                obj.forEach(function(value, key){
                     $http({
                      method: 'GET',
                      url: $rootScope.baseURL+'/permission/view/'+value.pm_id,
                      //data: $scope.data,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj1)
                    {

                        value.subpermissions=[];
                            obj1.forEach(function(value1, key){
                                value1.SuperSubpermissions=[];
                                $http({
                                      method: 'GET',
                                      url: $rootScope.baseURL+'/permission/supersub/'+value1.psm_id,
                                      //data: $scope.data,
                                      headers: {'Content-Type': 'application/json',
                                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                    })
                                    .success(function(obj2)
                                    {
                                            obj2.forEach(function(value2, key){
                                                value1.SuperSubpermissions.push(value2);
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
                                    value.subpermissions.push(value1);
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
                    $scope.permissionList.push(value);

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

    $scope.newpermission=[];
    $scope.checksub = function(sub) {
        if(sub.psm_select)
        {
          $scope.obj = {
            psm_pm_id : sub.psm_pm_id,
            psm_id : sub.psm_id
          }
            $scope.newpermission.push($scope.obj);
        }
        else 
        if(sub.pssm_select)
        {
          $scope.obj = {
            psm_pm_id : sub.psm_pm_id,
            psm_id : sub.pssm_psm_id,
            pssm_id : sub.pssm_id
          }
            $scope.newpermission.push($scope.obj);
        }
        else if(sub.psm_select == false)
        {
          var index = $scope.newpermission.indexOf(sub);
          $scope.newpermission.splice(index); 
          console.log($scope.newpermission);
        }
        else if(sub.pssm_select == false)
        {
          var index = $scope.newpermission.indexOf(sub);
          $scope.newpermission.splice(index);
          console.log($scope.newpermission);
        }
    };

    

    $scope.addRole = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#rm_name').val() == undefined || $('#rm_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Role Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#rm_description').val() == undefined || $('#rm_description').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Role Discription.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
      else if($scope.newpermission.length <= 0)
      {
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please define permission.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
	    else{
                
                
                $scope.obj={
                    role:$scope.role,
                    permission:$scope.newpermission
                }
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $scope.apiURL,
                  data: $scope.obj,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                })
                .success(function(roles)
                {
                        
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                        window.location.href = '#/role';  
                    
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                        dialog.modal('hide');  
                    }, 1500);
                });
		}
	};

});