function resetCtrl($scope, $location, $http, $routeParams, $rootScope) {
$scope.baseURL = 'http://localhost:3111';

// $scope.baseURL = 'http://unitech.3commastechnologies.com:3001';
	 //window.location.href
	
	var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
    	}
	};
	var tech = getUrlParameter('token');
	console.log(tech);
	$scope.tokenId = $routeParams.tokenId;
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
		      url: $scope.baseURL+'/emailsent/reset/'+tech,
		      data: $scope.pass,
		      headers: {'Content-Type': 'application/json'}
		    })
		    .success(function(login)
		    {
		    	console.log(login);
		    	if(login == 'Token not Found')
		    	{
		    		var dialog = bootbox.dialog({
		            message: '<p class="text-center">Invalid Token or Token Expired</p>',
		                closeButton: false
		            });
		            setTimeout(function(){
		                dialog.modal('hide'); 
		            }, 1500); 
		            setTimeout(function(){ window.location.href='forget.html' }, 2000);
		    	}
		    	else
		    	{
		    		var dialog = bootbox.dialog({
		            message: '<p class="text-center">Password Updated</p>',
		                closeButton: false
		            });
		            setTimeout(function(){
		                dialog.modal('hide'); 
		            }, 1500); 
		           setTimeout(function(){ window.location.href='login.html' }, 1500);
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