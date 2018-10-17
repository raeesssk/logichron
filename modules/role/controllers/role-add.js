// import admin
angular.module('role').controller('roleAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.role = {};
    $scope.permissionList=[];
    $scope.role.userid=localStorage.getItem('logichron_userid');
	$scope.apiURL = $rootScope.baseURL+'/role/add';
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
          $location.path('/')
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
    $scope.removepermission=[];
    $scope.newSuperpermission=[];
    $scope.removeSupermission=[];
    $scope.checksub = function(sub,index) {
        if(sub.psm_select)
        {
            $scope.newpermission.push(sub);
            console.log($scope.newpermission);
        }
        else
        {
            $scope.removepermission.push($scope.newpermission[index]);
            $scope.newpermission.splice(index);
            console.log($scope.newpermission);
        }
        if(sub.pssm_select)
        {
            $scope.newSuperpermission.push(sub);
            console.log($scope.newSuperpermission);
        }
        else
        {
            $scope.removeSupermission.push($scope.newSuperpermission[index]);
            $scope.newSuperpermission.splice(index);
            console.log($scope.newSuperpermission);

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
	    else{
                
                
                $scope.obj={
                    role:$scope.role,
                    permission:$scope.newpermission,
                    supermission:$scope.newSuperpermission
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