function resetCtrl($scope, $location, $http, $routeParams, $rootScope) {
$scope.baseURL = 'http://localhost:3001';
	$scope.pass={};
	$scope.reset=function(){
		if($scope.pass.old_password == undefined || $scope.pass.old_password == ""){
				var dialog = bootbox.dialog({
            message: '<p class="text-center">This Field Can not be Blank</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}
  		else if($scope.pass.new_password == undefined || $scope.pass.new_password == ""){
				var dialog = bootbox.dialog({
            message: '<p class="text-center">This Field Can not be Blank</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}
  		else
  		{
			/*$http({
		      method: 'POST',
		      url: $scope.baseURL+'/employee/forgot',
		      data:$scope.emp,
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
		    });*/
			
  		}
	}

};