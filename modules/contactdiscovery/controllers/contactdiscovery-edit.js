// import admin
angular.module('contactdiscovery').controller('contactdiscoveryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    $scope.contactdiscovery={};
    $scope.obj={};
    $scope.answers=[];
    $scope.answersadd=[];
    $scope.ansremove=[];
	$scope.jobId = $routeParams.jobId;
  $scope.apiURL = $rootScope.baseURL+'/contact/edit/'+$scope.jobId;

  $scope.addto = function() {
        
        $scope.answersadd.push($scope.obj);
        $('#qm_questions').focus();
        $scope.obj="";

    };
  $scope.getSearch = function(vals) {

      var searchTerms = {search: vals};
      
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/manager/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
  };
    
  $scope.getEntry = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/job/'+$scope.jobId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(contactdiscoveryObj)
	    {
	    	contactdiscoveryObj.forEach(function (value, key) {
                value.dm_mm_id=value.mm_pm_name;
	      		$scope.contactdiscovery = value;
              });
                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/job/question/'+$scope.jobId,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                })
                .success(function(dataObj)
                {
                    dataObj.forEach(function (value, key) {

                        $scope.answers.push(value);
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
    

    $scope.deleteQA=function(index){
        $scope.ansremove.push($scope.answers[index]);
        $scope.answers.splice(index,1)
        $('#qm_questions').focus();
    };
    $scope.deleteQA1=function(index){
        $scope.answersadd.splice(index,1);
        $('#qm_questions').focus();
    };
  $scope.updateEntry = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if($('#dm_mm_id').val() == undefined || $('#dm_mm_id').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Project</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
	    else if($('#dm_first_name').val() == undefined || $('#dm_first_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter first name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dm_last_name').val() == undefined || $('#dm_last_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter last name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
      else if($('#dm_job_title').val() == undefined || $('#dm_job_title').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter job title.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#dm_job_level').val() == undefined || $('#dm_job_level').val() == ""){
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
        else if($('#dm_email_id').val() == undefined || $('#dm_email_id').val() == ""){
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
        else if($('#dm_company_name').val() == undefined || $('#dm_company_name').val() == ""){
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
        else if($('#dm_postal_code').val() == undefined || $('#dm_postal_code').val() == ""){
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
        else if($('#dm_company_size').val() == undefined || $('#dm_company_size').val() == ""){
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
                $scope.objects={
                    contactdiscovery:$scope.contactdiscovery,
                    answers:$scope.answers,
                    answersadd:$scope.answersadd,
                    remove:$scope.ansremove
                }
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");
		    $http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.objects,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
		    })
		    .success(function(login)
		    {
                $('#btnsave').text("SAVE");
                $('#btnsave').removeAttr('disabled');
		       window.location.href = '#/contactdiscovery/joblist';  
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