function resetCtrl($scope, $location, $http, $routeParams, $rootScope) {
$scope.baseURL = 'http://localhost:3001';

// $scope.baseURL = 'http://unitech.3commastechnologies.com:3001';
	$scope.employeeId = $routeParams.employeeId;
	$scope.pass={};
	$scope.reset=function(){
		if($scope.pass.password == undefined || $scope.pass.password == ""){
				var dialog = bootbox.dialog({
            message: '<p class="text-center">This Field Can not be Blank</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}
  		else if($scope.pass.conpassword == undefined || $scope.pass.conpassword == ""){
				var dialog = bootbox.dialog({
            message: '<p class="text-center">This Field Can not be Blank</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}

  		else if($scope.pass.password !=  $scope.pass.conpassword){
				var dialog = bootbox.dialog({
            message: '<p class="text-center">Password Does not Match</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}
  		else
  		{

                $('.btn').attr('disabled','true');
                $('.btn').text("please wait...");
  			$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/login/resetpassword/'+$scope.employeeId,
		      data: $scope.pass,
		      headers: {'Content-Type': 'application/json'}
		    })
		    .success(function(login)
		    {
		    	if(login.length == 0){
	                $('.btn').text("Update Password");
	                $('.btn').removeAttr('disabled');
		    	}
		    	else{
		    		$('.btn').text("Password Updated");
	                $('.btn').removeAttr('disabled');
			       	window.location.href = 'login.html';
		    	}
		    })
		    .error(function(data) 
		    {   
		    	var dialog = bootbox.dialog({
	            message: '<p class="text-center">Oops something went wrong!!!</p>',
	                closeButton: false
	            });
	            dialog.find('.modal-body').addClass("btn-danger");
	            setTimeout(function(){
	                dialog.modal('hide'); 
	            }, 1500);
                $('.btn').text("Update Password");
                $('.btn').removeAttr('disabled');
		    });
			
  		}
	}

};