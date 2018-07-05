// import admin
angular.module('employee').controller('employeeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
    $scope.employee = {};

  $scope.displayImages = "resources/images/default-image.png";

    $scope.employee.cm_mobile = "N/A";
    $scope.employee.cm_address = "N/A";
    $scope.employee.cm_email = "N/A";
    $scope.employee.cm_gst = "N/A";

	$scope.apiURL = $rootScope.baseURL+'/employee/add';
    $scope.addEmployee = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#em_name').val() == undefined || $('#em_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Employee name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#em_mobile').val() == undefined || $('#em_mobile').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
      else if($('#em_address').val() == undefined || $('#em_address').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Residential Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#em_crraddress').val() == undefined || $('#em_crraddress').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Correspondence Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_aadharno').val() == undefined || $('#em_aadharno').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Adhaar No.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_panCard').val() == undefined || $('#em_panCard').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter PanCard No.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_designation').val() == undefined || $('#em_designation').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Designation.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_id').val() == undefined || $('#em_id').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Employee Id.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_emailId').val() == undefined || $('#em_emailId').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Email-Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_qualification').val() == undefined || $('#em_qualification').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Qualification.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }/*
        else if($('#em_photo').val() == undefined || $('#em_photo').val() == ""){
            var dialem_photoog = bootbox.dialog({
            message: '<p class="text-center">please Add Image.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }*/
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