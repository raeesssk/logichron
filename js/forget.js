function forgetCtrl($scope, $location, $http, $routeParams, $rootScope) {
$scope.baseURL = 'http://localhost:3111';
// $scope.baseURL = 'http://unitech.3commastechnologies.com:3111';
	$scope.user={};

	$scope.forgot=function(){
		if($scope.user.username == undefined || $scope.user.username == ""){
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
		      url: $scope.baseURL+'/user/forgot',
		      data:$scope.user,
		      headers:{'Content-Type': 'application/json'}
		    })
		    .success(function(roleobj)
		    {
		    	$scope.email = JSON.stringify(roleobj[0].username);
	            $http({
				      method: 'POST',
				      url: $scope.baseURL+'/emailsent',
				      data: 'email='+$scope.email,
				      headers:{'Content-Type': 'application/x-www-form-urlencoded'}
				    })
				    .success(function(roleobj)
				    {
				    	var dialog = bootbox.dialog({
			            message: '<p class="text-center">We have emailed you the reset password link</p>',
			                closeButton: false
			            });
			            dialog.find('.modal-body').addClass("btn-success");
			            setTimeout(function(){
			                dialog.modal('hide'); 
			            }, 2500);
			            $scope.user='';
			            // window.location.href="reset.html";
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