// import admin
angular.module('role').controller('roleAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.role = {};
    $scope.permissionList=[];
    $scope.role.userid=localStorage.getItem('logichron_userid');
	$scope.apiURL = $rootScope.baseURL+'/role/add';
    
   
    
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
    $scope.checkstatus = function(sub,index) {
        if(sub.psm_select)
        {
            $scope.newpermission.push(sub);
        }
        else
        {
            $scope.removepermission.push($scope.newpermission[index]);
            $scope.newpermission.splice(index);
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