/*
 * Login Controller
 */
 //  angular.module('orientfurniture', []).controller('loginCtrl', function($scope, $http) {
function LoginCtrl($scope, $location, $http, $routeParams, $rootScope) {
    
	// $scope.apiURL = 'http://10.1.0.21:3001';
	$scope.apiURL = 'http://localhost:3111';	
	// $scope.apiURL = 'http://unitech.3commastechnologies.com:3111';
	
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

			        	$scope.user = deliverycount[0].username;
			        	$scope.firstname = deliverycount[0].first_name;
			        	$scope.iconimage = deliverycount[0].icon_image;
			        	$scope.rm_name = deliverycount[0].rm_name;
				  	 	localStorage.setItem('logichron_admin_username', $scope.user);
				  	 	localStorage.setItem('logichron_admin_firstname', $scope.firstname);
				  	 	localStorage.setItem('logichron_admin_iconimage', $scope.iconimage);
				  	 	localStorage.setItem('logichron_role_name', $scope.rm_name);
				  	 	localStorage.setItem('logichron_admin_access_token', data.access_token);
				        localStorage.setItem('logichron_admin_expires_in', data.expires_in);
				        localStorage.setItem('logichron_admin_refresh_token', data.refresh_token);
				        localStorage.setItem('logichron_admin_token_type', data.token_type);
			        	deliverycount.forEach(function(value,key){
			        		
			        		if(value.pm_name == 'user_master')
			        		{

			        			$scope.rpm_add = value.rpm_add;
			        			$scope.rpm_edit = value.rpm_edit;
			        			$scope.rpm_delete = value.rpm_delete;
			        			$scope.rpm_list = value.rpm_list;
			        			localStorage.setItem('logichron_useradd_permission',$scope.rpm_add);
			        			localStorage.setItem('logichron_useredit_permission',$scope.rpm_edit);
			        			localStorage.setItem('logichron_userdelete_permission',$scope.rpm_delete);
			        			localStorage.setItem('logichron_userlist_permission',$scope.rpm_list);
			        		}
			        		 if(value.pm_name == 'role_master'){
			        			$scope.rpm_add = value.rpm_add;
			        			$scope.rpm_edit = value.rpm_edit;
			        			$scope.rpm_delete = value.rpm_delete;
			        			$scope.rpm_list = value.rpm_list;
			        			localStorage.setItem('logichron_roleadd_permission',$scope.rpm_add);
			        			localStorage.setItem('logichron_roleedit_permission',$scope.rpm_edit);
			        			localStorage.setItem('logichron_roledelete_permission',$scope.rpm_delete);
			        			localStorage.setItem('logichron_rolelist_permission',$scope.rpm_list);
			        		}
			        		if(value.pm_name == 'contact_master')
			        		{
			        			$scope.rpm_add = value.rpm_add;
			        			$scope.rpm_edit = value.rpm_edit;
			        			$scope.rpm_delete = value.rpm_delete;
			        			$scope.rpm_list = value.rpm_list;
			        			localStorage.setItem('logichron_contactadd_permission',$scope.rpm_add);
			        			localStorage.setItem('logichron_contactedit_permission',$scope.rpm_edit);
			        			localStorage.setItem('logichron_contactdelete_permission',$scope.rpm_delete);
			        			localStorage.setItem('logichron_contactlist_permission',$scope.rpm_list);

			        		}
			        		if(value.pm_name == 'campaign_master')
			        		{
			        			$scope.rpm_add = value.rpm_add;
			        			$scope.rpm_edit = value.rpm_edit;
			        			$scope.rpm_delete = value.rpm_delete;
			        			$scope.rpm_list = value.rpm_list;
			        			localStorage.setItem('logichron_campaignadd_permission',$scope.rpm_add);
			        			localStorage.setItem('logichron_campaignedit_permission',$scope.rpm_edit);
			        			localStorage.setItem('logichron_campaigndelete_permission',$scope.rpm_delete);
			        			localStorage.setItem('logichron_campaignlist_permission',$scope.rpm_list);
							}
			        	});
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


