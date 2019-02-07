// import admin
angular.module('contactdiscovery').controller('contactdiscoveryEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $scope.contactdiscovery = {};
  $scope.obj={};
  $scope.answers=[];
  $scope.answersadd=[];
  $scope.ansremove=[];
  $scope.questionans=[];
  $scope.suppList=[];
  $scope.denydomain=[];
  $scope.titleList=[];
  $scope.levelList=[];
  $scope.deptList=[];
  $scope.companyList=[];
  $scope.industryList=[];
  $scope.sizeList=[];
  $scope.revenueList=[];
  $scope.assetList=[];
  $scope.aldomainList=[];
	
  $scope.jobId = $routeParams.jobId;
  $scope.apiURL = $rootScope.baseURL+'/contact/edit/'+$scope.jobId;


  $scope.getEntry = function () {
    $scope.questionans=[];
    $scope.suppList=[];
    $scope.denydomain=[];
    $scope.titleList=[];
    $scope.levelList=[];
    $scope.deptList=[];
    $scope.companyList=[];
    $scope.industryList=[];
    $scope.sizeList=[];
    $scope.revenueList=[];
    $scope.assetList=[];
    $scope.aldomainList=[];
    $scope.countryList=[];

      $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/'+$scope.jobId,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(contactdiscoveryObj)
          {
            contactdiscoveryObj.forEach(function (value, key) {
              value.titles={};
              value.levels={};
              value.departments={};
              value.domains={};
              value.country={};
              value.companies={};
              value.industries={};
              value.sizes={};
              value.revenues={};
              value.assets={};
         
                $http({
                      method: 'GET',
                      url: $rootScope.baseURL+'/campaign/titles/'+value.cdm_cm_id,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.titleList = angular.copy(obj);
                            value.titles.ctm_title = value.cdm_job_title;
                        }
                        else
                        {
                            value.titles.ctm_title=value.cdm_job_title;
                        }
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


                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/level/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj2)
                    {  
                        if(obj2.length > 0){
                            $scope.levelList = angular.copy(obj2);
                            value.levels.cjlm_job_level = value.cdm_job_level;
                        }
                        else
                        {
                            value.levels.cjlm_job_level=value.cdm_job_level;
                        }

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


                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/dept/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.deptList = angular.copy(obj);
                            value.departments.cdm_department = value.cdm_dept;
                        }
                        else
                        {
                            value.departments.cdm_department=value.cdm_dept;
                        }
                        
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
        

                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/account/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.companyList = angular.copy(obj);
                            value.companies.amcm_company = value.cdm_company_name;
                        }
                        else
                        {
                            value.companies.amcm_company=value.cdm_company_name;
                        }
                        
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


                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/geo/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.countryList = angular.copy(obj);
                            value.country.cgm_geo = value.cdm_country;
                        }
                        else
                        {
                            value.country.cgm_geo=value.cdm_country;
                        }
                        
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

                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/industries/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.industryList = angular.copy(obj);
                            value.industries.cim_industries = value.cdm_industry;
                        }
                        else
                        {
                            value.industries.cim_industries=value.cdm_industry;
                        }
                        
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

                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/empsize/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.sizeList = angular.copy(obj);
                            value.sizes.cesm_employee_size = value.cdm_company_size;
                        }
                        else
                        {
                            value.sizes.cesm_employee_size=value.cdm_company_size;
                        }
                        
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

                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/revenue/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.revenueList = angular.copy(obj);
                            value.revenues.crem_revenue = value.cdm_revenue;
                        }
                        else
                        {
                            value.revenues.crem_revenue=value.cdm_revenue;
                        }
                        
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



                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/asset/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.assetList = angular.copy(obj);
                            value.assets.cam_campaign_asset = value.cdm_asset;
                        }
                        else
                        {
                            value.assets.cam_campaign_asset=value.cdm_asset;
                        }
                        
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


                $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/campaign/allowdomain/'+value.cdm_cm_id,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(obj)
                    {  
                        if(obj.length > 0){
                            $scope.aldomainList = angular.copy(obj);
                            value.domains.adcm_website = value.cdm_domain;
                        }
                        else
                        {
                            value.domains.adcm_website=value.cdm_domain;
                        }
                        
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

                if(value.cm_custom_question == "Yes"){   
                    $http({
                            method: 'GET',
                            url: $rootScope.baseURL+'/campaign/question/'+value.cdm_cm_id,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj)
                        {  
                            obj.forEach(function(val,key){
                              $scope.questionans.push(val);
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
                }


                if(value.cm_supression_file == "Yes"){   
                    $http({
                            method: 'GET',
                            url: $rootScope.baseURL+'/campaign/supression/'+value.cdm_cm_id,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj)
                        {  
                            obj.forEach(function(val,key){
                              $scope.suppList.push(val);
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
                }

                if(value.cm_denied_domain == "Yes"){
                    $http({
                            method: 'GET',
                            url: $rootScope.baseURL+'/campaign/deniedomain/'+value.cdm_cm_id,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj)
                        {  
                            obj.forEach(function(val,key){
                              $scope.denydomain.push(val);
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
                }

                $scope.contactdiscovery = value;

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
    
    
    $scope.blurCompanyName = function () {
        if($scope.contactdiscovery.cm_supression_file == "Yes"){
            angular.forEach($scope.suppList, function(value,key){
                if ($('#cdm_company_name').val() == value.scm_company) {

                    $scope.contactdiscovery.companies.amcm_company = "";
                    var dialog = bootbox.dialog({
                      message: '<p class="text-center">Company Present in Suppression List</p>',
                          closeButton: false
                      });
                      dialog.find('.modal-body').addClass("btn-warning");
                      setTimeout(function(){
                          dialog.modal('hide'); 
                          $('#cdm_company_name').focus();
                      }, 1500);
                }
            });
        };
    };

    $scope.blurDomain = function () {
        if($scope.contactdiscovery.cm_denied_domain == "Yes"){

            angular.forEach($scope.denydomain, function(value,key){
                if ($('#cdm_domain').val() == value.ddcm_website) {

                    $scope.contactdiscovery.domains.adcm_website = "";
                    var dialog = bootbox.dialog({
                      message: '<p class="text-center">Domain Present in Denied Domain Website</p>',
                          closeButton: false
                      });
                      dialog.find('.modal-body').addClass("btn-warning");
                      setTimeout(function(){
                          dialog.modal('hide'); 
                          $('#cdm_domain').focus();
                      }, 1500);
                }
            });
        };
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
    
    $scope.updateEntry = function () {
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
        
        // if($('#cdm_campaign').val() == undefined || $('#cdm_campaign').val() == "" || $scope.contactdiscovery.cdm_cm_id.cm_id == undefined){
        //     var dialog = bootbox.dialog({
        //         message: '<p class="text-center">Please Enter Campaign Name.</p>',
        //             closeButton: false
        //         });
        //         dialog.find('.modal-body').addClass("btn-danger");
        //         setTimeout(function(){
        //             dialog.modal('hide'); 
        //             $('#cdm_campaign').focus();
        //         }, 1500);
        // }
        if($('#cdm_first_name').val() == undefined || $('#cdm_first_name').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter First Name.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_first_name').focus();
                }, 1500);
        }
        else if($('#cdm_last_name').val() == undefined || $('#cdm_last_name').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Last Name.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_last_name').focus();
                }, 1500);
        }
        else if($('#cdm_job_title').val() == undefined || $('#cdm_job_title').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Job Title.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $('#cdm_job_title').focus(); 
                }, 1500);
        }
        else if($('#cdm_job_level').val() == undefined || $('#cdm_job_level').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Job Level.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_job_level').focus(); 
                }, 1500);
        }
        else if($('#cdm_dept').val() == undefined || $('#cdm_dept').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Department.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_dept').focus();
                }, 1500);
        }
        else if($('#cdm_email_id').val() == undefined || $('#cdm_email_id').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Email-Address.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_email_id').focus(); 
                }, 1500);
        }
        else if(!emailRegex.test($scope.contactdiscovery.cdm_email_id)){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Correct Email.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_email_id').focus();
                }, 1500);
        }
        else if($('#cdm_mobile').val() == undefined || $('#cdm_mobile').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Direct Number / Landline Number.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_mobile').focus();
                }, 1500);
        }
        else if(!numRegex.test($scope.contactdiscovery.cdm_mobile)){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Correct Direct Number / Landline Number.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_mobile').focus();
                }, 1500);
        }
        else if($('#cdm_company_name').val() == undefined || $('#cdm_company_name').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Company name.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_company_name').focus(); 
                }, 1500);
        }
        else if($('#cdm_address').val() == undefined || $('#cdm_address').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Address.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_address').focus();
                }, 1500);
        }
        else if($('#cdm_city').val() == undefined || $('#cdm_city').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter City.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_city').focus(); 
                }, 1500);
        }
        else if($('#cdm_state').val() == undefined || $('#cdm_state').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter State.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_state').focus();
                }, 1500);
        }
        else if($('#cdm_postal_code').val() == undefined || $('#cdm_postal_code').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Postal Code.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_postal_code').focus();
                }, 1500);
        }
        else if($('#cdm_country').val() == undefined || $('#cdm_country').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Country.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_country').focus();
                }, 1500);
        }
        else if($('#cdm_industry').val() == undefined || $('#cdm_industry').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Industry.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide'); 
                  $('#cdm_industry').focus();
                }, 1500);
        }
        else if($('#cdm_company_size').val() == undefined || $('#cdm_company_size').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Select Company Size.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_company_size').focus(); 
                }, 1500);
        }
        else if($('#cdm_revenue').val() == undefined || $('#cdm_revenue').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Revenue.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_revenue').focus(); 
                }, 1500);
        }
        else if($('#cdm_asset').val() == undefined || $('#cdm_asset').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Asset.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_asset').focus(); 
                }, 1500);
        }
        else if($('#cdm_domain').val() == undefined || $('#cdm_domain').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Domain.</p>',
                  closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                  dialog.modal('hide');
                  $('#cdm_domain').focus(); 
                }, 1500);
        }
	    else{
                $scope.objects={
                    contact:$scope.contactdiscovery
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
                            $('#btnsave').text("Update");
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
                            $('#btnsave').text("Update");
                            $('#btnsave').removeAttr('disabled');
            	                dialog.modal('hide'); 
            	            }, 1500);            
            		    });
		    }
	};

});