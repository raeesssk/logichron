// import admin
angular.module('role').controller('roleEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  	$scope.role={};
    $scope.permissionList=[];
	$scope.roleId = $routeParams.roleId;
  $scope.apiURL = $rootScope.baseURL+'/role/edit/'+$scope.roleId;
  

    
  $scope.getrole = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/role/'+$scope.roleId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(roleobj)
	    {
	    	roleobj.forEach(function (value, key) {
	    		$scope.role=value;
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
	};

   $scope.getPermission = function(index){

        $scope.permissionList=[];
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
                    url: $rootScope.baseURL+'/role/subpermission/'+value.pm_id,
                    //data: $scope.data,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                  })
                  .success(function(obj1)
                  {
                        value.subpermissions=[];
                        value.SuperSubpermissions=[];
                        obj1.forEach(function(value1,key){
                          $http({
                                method: 'GET',
                                url: $rootScope.baseURL+'/role/permission/'+$scope.roleId,
                                //data: $scope.data,
                                headers: {'Content-Type': 'application/json',
                                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                              })
                              .success(function(obj2)
                              {
                                obj2.forEach(function(value2,key){
                                  if(value1.psm_pm_id == value2.psm_pm_id)
                                  {
                                    value1.psm_select=true;
                                  }
                                  
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
                                                value.SuperSubpermissions.push(value2);
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
    $scope.getPermission();

	$scope.newpermission=[];
    $scope.removepermission=[];
    $scope.removeoldpermission=[];
    $scope.checkstatus = function(sub,index) {
        $scope.permissionList.forEach(function(val,key){
            val.subpermissions.forEach(function(val1,key){
                if(val1.psm_select == false)
                {
                    $scope.removeoldpermission.push(val1);
                }
                
            });
        });
        console.log($scope.removeoldpermission);
        if(sub.psm_select)
        {
            $scope.newpermission.push(sub);
            console.log($scope.newpermission);
        }
        else
        {
            $scope.removepermission.push($scope.newpermission[index]);
            $scope.newpermission.splice(index);
        }
    };


  $scope.updateRole = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	    if($('#rm_name').val() == undefined || $('#rm_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Roll Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#rm_description').val() == undefined || $('#rm_description').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Description.</p>',
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
                    oldpermission:$scope.removeoldpermission
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
    		    .success(function(login)
    		    {
                    $('#btnsave').text("SAVE");
                    $('#btnsave').removeAttr('disabled');
    		       window.location.href = '#/role';  
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
		}
	};

});