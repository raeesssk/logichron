// import admin
angular.module('manager').controller('managerCreateCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.user = {};
    $scope.user.cm_address = "N/A";
    $scope.user.cm_email = "N/A";
    $scope.user.cm_gst = "N/A";

	$scope.apiURL = $rootScope.baseURL+'/user/add';
    $scope.addUser = function () {
      $scope.user='';
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#um_emp_id').val() == undefined || $('#um_emp_id').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Employee Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#username').val() == undefined || $('#username').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Username.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
      else if($('#password').val() == undefined || $('#password').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#confirm_password').val() == undefined || $('#confirm_password').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter confirm_password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#assign_role').val() == undefined || $('#assign_role').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Assign_role.</p>',
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
                  method: 'GET',
                  url: $rootScope.baseURL+'/customer/code/no',
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length >0)
                        $scope.customer.cm_code = parseInt(orderno[0].cm_code) + 1;
                    else
                        $scope.customer.cm_code = 1;

                    $scope.customer.cm_debit = 0;
                    $scope.customer.cm_balance = 0;
                    $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: $scope.customer,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
                    })
                    .success(function(login)
                    {
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/customer';  
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