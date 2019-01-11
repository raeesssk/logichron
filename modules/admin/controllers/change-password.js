// import admin
angular.module('admin').controller('changePasswordCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	

  $scope.changePassword = function () {

console.log('test');
	    if($('#curpassword').val() === undefined || $('#curpassword').val() === ""){
	    	// toastr.error('please enter current password.', 'Error', {
		    //     closeButton: true,
		    //     progressBar: true,
			  	// positionClass: "toast-top-center",
			  	// timeOut: "500",
			  	// extendedTimeOut: "500",
		    // });
		    var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter current password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_aadhar_no').focus();  
            }, 1500);
	    }
	    else if($('#password').val() === undefined || $('#password').val() === ""){
	    	// toastr.error('please enter new password.', 'Error', {
		    //     closeButton: true,
		    //     progressBar: true,
			  	// positionClass: "toast-top-center",
			  	// timeOut: "500",
			  	// extendedTimeOut: "500",
		    // });
		    var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter new password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_aadhar_no').focus();  
            }, 1500);
	    }
	    else if($('#conpassword').val() == undefined || $('#conpassword').val() == ""){
	    	// toastr.error('please enter confirm password.', 'Error', {
		    //     closeButton: true,
		    //     progressBar: true,
			  	// positionClass: "toast-top-center",
			  	// timeOut: "500",
			  	// extendedTimeOut: "500",
		    // });
		    var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter confirm password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_aadhar_no').focus();  
            }, 1500);
	    }
	    else if($('#conpassword').val() != $('#password').val()){
	    	// toastr.error('the new password and confirm password do not match.', 'Error', {
		    //     closeButton: true,
		    //     progressBar: true,
			  	// positionClass: "toast-top-center",
			  	// timeOut: "500",
			  	// extendedTimeOut: "500",
		    // });
		    var dialog = bootbox.dialog({
            message: '<p class="text-center">the new password and confirm password do not match.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_aadhar_no').focus();  
            }, 1500);
	    }
	    else{
            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");
            $scope.user.username = $rootScope.userid;
    		$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/login/changepassword',
		      data: $scope.user,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
		    })
		    .success(function(login)
		    {
		    	if(login.length == 0){
		    		toastr.error('current password do not match.', 'Error', {
				        closeButton: true,
				        progressBar: true,
					  	positionClass: "toast-top-center",
					  	timeOut: "500",
					  	extendedTimeOut: "500",
				    });
	                $('#btnsave').text("Update Password");
	                $('#btnsave').removeAttr('disabled');
		    	}
		    	else{
		    		$('#btnsave').text("Update Password");
	                $('#btnsave').removeAttr('disabled');
			       	window.location.href = '#/';
		    	}
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
                $('#btnsave').text("Update Password");
                $('#btnsave').removeAttr('disabled');
		    });
		}
	    
	};

});