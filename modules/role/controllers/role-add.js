// import admin
angular.module('role').controller('roleAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.role = {};


	$scope.apiURL = $rootScope.baseURL+'/role/add';
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

                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $scope.apiURL,
                  data: $scope.role,
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