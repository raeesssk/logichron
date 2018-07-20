// import admin
angular.module('manager').controller('managerEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.project={};
	$scope.projectId = $routeParams.projectId;
  $scope.apiURL = $rootScope.baseURL+'/manager/edit/'+$scope.projectId;
  $scope.getpermission=function(){
      if(localStorage.getItem('logichron_user_permission') == 0){
        
        window.location.href='#/';
      }
    };
    $scope.getpermission();
  $scope.getproject = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/manager/'+$scope.projectId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(projectObj)
	    {
	    	projectObj.forEach(function (value, key) {
	      		$scope.project = value;
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


  $scope.updateProject = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	    if($('#mm_pm_name').val() == undefined || $('#mm_pm_name').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter project name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#mm_pm_details').val() == undefined || $('#mm_pm_details').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter project details</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#mm_pm_type').val() == undefined || $('#mm_pm_type').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please mention project type</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#mm_pm_assign').val() == undefined || $('#mm_pm_assign').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Assign Project</p>',
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
		       window.location.href = '#/projectlist';  
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