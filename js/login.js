/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function LoginCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $scope.apiURL = 'http://10.1.0.21:3001';
	// $scope.apiURL = 'http://localhost:3111';	
	$scope.apiURL = 'http://unitech.3commastechnologies.com:3001';
	
  	$scope.admin = 0;
  	$scope.login = function() {
  		if($scope.username == undefined || $scope.username == ""){
  			var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Username.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}
  		else if($scope.password == undefined || $scope.password == ""){
  			var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
  		}
  		else{
                $('#login').text("please wait...");
  			$http({
		          method: 'POST',
		          url: $scope.apiURL+"/oauth/token",
		          data: 'grant_type=password&username='+ encodeURIComponent($scope.username) +'&password='+ encodeURIComponent($scope.password),
		          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                    'Authorization' : 'Basic Y2xpZW50S2V5OmNsaWVudFNlY3JldEtleQ=='}
			 })
		  	 .success(function(data, status, headers, config)
		  	 {
		  	 		
			        $http({
			          method: 'POST',
			          url: $scope.apiURL+'/login/isonline',
			          data: 'username='+$scope.username,
			          headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                  'Authorization' :'Bearer '+data.access_token}
			        })
			        .success(function(deliverycount)
			        {
			        
			        	$scope.rpm_add=deliverycount[0].rpm_add;
			        	$scope.rpm_edit=deliverycount[0].rpm_edit;
			        	$scope.rpm_delete=deliverycount[0].rpm_delete;
			        	$scope.rpm_list=deliverycount[0].rpm_list;
			        	$scope.rm_name=deliverycount[0].rm_name;
			        	$scope.user = deliverycount[0].username;
			        	$scope.firstname = deliverycount[0].first_name;
			        	$scope.iconimage = deliverycount[0].icon_image;
			        	localStorage.setItem('logichron_add',$scope.rpm_add);
			        	localStorage.setItem('logichron_edit',$scope.rpm_edit);
			        	localStorage.setItem('logichron_delete',$scope.rpm_delete);
			        	localStorage.setItem('logichron_list',$scope.rpm_list);
			        	localStorage.setItem('logichron_role_name', $scope.rm_name);
				  	 	localStorage.setItem('logichron_admin_username', $scope.user);
				  	 	localStorage.setItem('logichron_admin_firstname', $scope.firstname);
				  	 	localStorage.setItem('logichron_admin_iconimage', $scope.iconimage);
				  	 	localStorage.setItem('logichron_admin_access_token', data.access_token);
				        localStorage.setItem('logichron_admin_expires_in', data.expires_in);
				        localStorage.setItem('logichron_admin_refresh_token', data.refresh_token);
				        localStorage.setItem('logichron_admin_token_type', data.token_type);
                		$('#login').text("Login");
				         window.location = "/logichron/";
			        })
			        .error(function(data) 
			        {   
			            var dialog = bootbox.dialog({
			            message: '<p class="text-center">Oops!!! Something Went Wrong</p>',
			                closeButton: false
			            });
			            dialog.find('.modal-body').addClass("btn-danger");
			            setTimeout(function(){
			                dialog.modal('hide'); 
			            }, 1500);
		                $('#login').text("Login");
		                $('#login').removeAttr('disabled');
			        });
		  	 })
		  	 .error(function(data, status, headers, config)
		  	 {
		  	 	var dialog = bootbox.dialog({
	            message: '<p class="text-center">Invalid Username or Password.</p>',
	                closeButton: false
	            });
	            dialog.find('.modal-body').addClass("btn-danger");
	            setTimeout(function(){
	                dialog.modal('hide'); 
	            }, 1500);
                $('#login').text("Login");
                $('#login').removeAttr('disabled');
		     });
  		}
	}

}


