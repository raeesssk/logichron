// import admin
angular.module('employee').controller('employeeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
    $scope.employee = {};
    $('#emp_name').focus();
  $scope.displayImages = "resources/images/default-image.png";


	$scope.apiURL = $rootScope.baseURL+'/employee/add';

     $scope.onFileSelect = function ($files) {
        $scope.speakerIcon = $files[0];
        $scope.fileName = $scope.speakerIcon.name;
        var reader = new FileReader();
        reader.readAsDataURL($files[0]);

        reader.onloadend = function () {
            var img_data = reader.result;
            var spl_dt = img_data.split(',');
            $scope.displayImages = 'data:image/png;base64, ' + spl_dt[1];
            $scope.displayImagesdb = spl_dt[1];
            $scope.$apply();
        };
    };

    $scope.getpermission=function(){
      if(localStorage.getItem('logichron_user_permission') == 0){
        alert('You are not authorized');
        window.location.href='#/';
      }
    };
    $scope.getpermission();
    
    $scope.addEmployee = function () {
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
        }/*
        else if($('#emp_image').val() == undefined || $('#emp_image').val() == ""){
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

                var fd = new FormData();
                fd.append('imgUploader', $scope.displayImagesdb);
                fd.append('emp_name', $scope.employee.emp_name);
                fd.append('emp_mobile', $scope.employee.emp_mobile);
                fd.append('emp_address',$scope.employee.emp_address);
                fd.append('emp_correspondence_address',$scope.employee.emp_correspondence_address);
                fd.append('emp_aadhar_no',$scope.employee.emp_aadhar_no);
                fd.append('emp_pancard_no',$scope.employee.emp_pancard_no);
                fd.append('emp_designation',$scope.employee.emp_designation);
                fd.append('emp_emp_no',$scope.employee.emp_emp_no);
                fd.append('emp_email_id',$scope.employee.emp_email_id);
                fd.append('emp_qualification',$scope.employee.emp_qualification);
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");
                    
                    $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: fd,
                      headers: {'Content-Type': undefined,
                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(employees)
                    {
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/employee';  
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