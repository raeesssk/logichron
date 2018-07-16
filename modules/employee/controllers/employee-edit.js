// import admin
angular.module('employee').controller('employeeEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.employee={};
	$scope.employeeId = $routeParams.employeeId;
  $scope.apiURL = $rootScope.baseURL+'/employee/edit/'+$scope.employeeId;
  $scope.getpermission=function(){
      if(localStorage.getItem('logichron_user_permission') == 0){
        alert('You are not authorized');
        window.location.href='#/';
      }
    };
    $scope.getpermission();
  $scope.getEmployee = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/employee/'+$scope.employeeId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(employeeObj)
	    {
	    	employeeObj.forEach(function (value, key) {
	      		$scope.employee = value;
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
	    
	    if($('#emp_name').val() == undefined || $('#emp_name').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Employee name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#emp_mobile').val() == undefined || $('#emp_mobile').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#emp_address').val() == undefined || $('#emp_address').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Residential Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#emp_correspondence_address').val() == undefined || $('#emp_correspondence_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Correspondence Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#emp_aadhar_no').val() == undefined || $('#emp_aadhar_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Adhaar No.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#emp_pancard_no').val() == undefined || $('#emp_pancard_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Pancard No.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#emp_designation').val() == undefined || $('#emp_designation').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Designation.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#emp_emp_no').val() == undefined || $('#emp_emp_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Employee Id.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#emp_email_id').val() == undefined || $('#emp_email_id').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Email-Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#emp_qualification').val() == undefined || $('#emp_qualification').val() == ""){
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
		      data: $scope.employee,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("SAVE");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/employee';  
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