// import admin
angular.module('employee').controller('employeeEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $('#dashboardindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#productlsitindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#invoiceaddindex').removeClass("active");
  $('#invoicelistindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#cashbooklistindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#customerindex').addClass("active");
  $('#customerlsitindex').addClass("active");
  
	$scope.customerId = $routeParams.customerId;
  $scope.apiURL = $rootScope.baseURL+'/employee/edit/'+$scope.customerId;

  $scope.getEmployee = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/employee/'+$scope.customerId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {
	      		$scope.customer = value;
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


  $scope.updateEmployee = function () {

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
        // else if(!nameRegex.test($('#cm_mobile').val())){
        //  var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter Mobile no. in digits</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
        // }
        // else if($('#cm_mobile').val().length < 10){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">please enter a valid Mobile no.</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //     }, 1500);
        // }
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
            message: '<p class="text-center">please enter Aadhar No.</p>',
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
        }
	    else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");
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
		}
	};

});