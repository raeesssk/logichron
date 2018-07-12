function forgetpassCtrl($scope, $location, $http, $routeParams, $rootScope) {
$scope.baseURL = 'http://localhost:3001';
	$scope.emp={};
	$scope.forgot=function(){
		if($scope.emp.email == undefined || $scope.emp.email == ""){
				var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Email</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}
  		else
  		{
			$http({
		      method: 'POST',
		      url: $scope.baseURL+'/employee/forgot',
		      data:$scope.emp,
		      headers:{'Content-Type': 'application/json'}
		    })
		    .success(function(roleobj)
		    {
		    	console.log(roleobj);
	            $http({
				      method: 'POST',
				      url: $scope.baseURL+'/emailsent',
				      data:roleobj,
				      headers:{'Content-Type': 'application/json'}
				    })
				    .success(function(roleobj)
				    {
				    	var dialog = bootbox.dialog({
			            message: '<p class="text-center">We have emailed you the password</p>',
			                closeButton: false
			            });
			            dialog.find('.modal-body').addClass("btn-success");
			            setTimeout(function(){
			                dialog.modal('hide'); 
			            }, 2500);
			            window.location.href="reset.html";
				    })
				    .error(function(data) 
				    {   
				      var dialog = bootbox.dialog({
			            message: '<p class="text-center">Email does not match</p>',
			                closeButton: false
			            });
			            setTimeout(function(){
			                dialog.modal('hide'); 
			            }, 1500);            
				    });
		    })
		    .error(function(data) 
		    {   
		      var dialog = bootbox.dialog({
	            message: '<p class="text-center">Something Went Wrong!!!</p>',
	                closeButton: false
	            });
	            dialog.find('.modal-body').addClass("btn-danger");
	            setTimeout(function(){
	                dialog.modal('hide'); 
	            }, 1500);            
		    });
			
  		}
	}

};