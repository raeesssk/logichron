// import admin
angular.module('dataentry').controller('dataentryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
	$scope.customerId = $routeParams.customerId;
  $scope.apiURL = $rootScope.baseURL+'/employee/edit/'+$scope.customerId;

  $scope.getEntry = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/employee/'+$scope.customerId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {
	      		$scope.customer = value;
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


  $scope.updateEntry = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	    if($('#dm_fname').val() == undefined || $('#dm_fname').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter first name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#dm_lname').val() == undefined || $('#dm_lname').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter last name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#dm_jtitle').val() == undefined || $('#dm_jtitle').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter job title.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#dm_jlevel').val() == undefined || $('#dm_jlevel').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter job level.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_dept').val() == undefined || $('#dm_dept').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter department.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_emailId').val() == undefined || $('#dm_emailId').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Email-Address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_mobile').val() == undefined || $('#dm_mobile').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile No.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_compname').val() == undefined || $('#dm_compname').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Company name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_address').val() == undefined || $('#dm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_city').val() == undefined || $('#dm_city').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter city.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_state').val() == undefined || $('#dm_state').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter state.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_pcode').val() == undefined || $('#dm_pcode').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter postal code.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_country').val() == undefined || $('#dm_country').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter country.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_industry').val() == undefined || $('#dm_industry').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter industry.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_csize').val() == undefined || $('#dm_csize').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter company size.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_revenue').val() == undefined || $('#dm_revenue').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter revenue.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_asset').val() == undefined || $('#dm_asset').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter asset.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_domain').val() == undefined || $('#dm_domain').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter domain.</p>',
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
		      data: $scope.customer,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("unitech_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("SAVE");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/customer';  
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