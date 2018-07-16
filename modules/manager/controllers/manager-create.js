// import admin
angular.module('manager').controller('managerCreateCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.project = {};

	$scope.apiURL = $rootScope.baseURL+'/manager/add';

    $scope.getpermission=function(){
      if(localStorage.getItem('logichron_user_permission') == 0){
        alert('You are not authorized');
        window.location.href='#/';
      }
    };
    $scope.getpermission();
    $scope.addUser = function () {
      $scope.user='';
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
        if($('#mm_pm_name').val() == undefined || $('#mm_pm_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Project Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#mm_pm_details').val() == undefined || $('#mm_pm_details').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Project Details.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
      else if($('#mm_pm_type').val() == undefined || $('#mm_pm_type').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Project Type.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#mm_pm_assign').val() == undefined || $('#mm_pm_assign').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please Assign Project.</p>',
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
                      data: $scope.project,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(login)
                    {
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/';  
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