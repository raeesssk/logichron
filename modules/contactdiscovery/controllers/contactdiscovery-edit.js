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


  $('#cm_end_date').datepicker({
          validateOnBlur: false,
          todayButton: false,
          timepicker: false,
          scrollInput: false,
          format: 'yyyy-mm-dd',
          autoclose: true,
          orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.campaign.cm_end_date = $('#cm_end_date').val();
          }
    });
     $scope.getCampaignDetails=function(){
        // $scope.personalDetails=[];
        
         $("#cdm_company_name").focusout(function(){
            $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/contact/accountList/'+$scope.contactdiscovery.cdm_campaign_name.cm_id,
                  
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                })
                .success(function(account)
                {  
                  account.forEach(function(value,key){
                    if(value.cm_account_list == 'Yes'){
                    $http({
                        method: 'POST',
                        url: $rootScope.baseURL+'/contact/check/accountList/'+$scope.contactdiscovery.cdm_campaign_name.cm_id,
                        data:$scope.contactdiscovery,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                      })
                      .success(function(account1)
                      {  
                          
                          if(account1.length>0){
                              
                          
                          }
                          else
                          {
                            var dialog = bootbox.dialog({
                            message: '<p class="text-center">Company Does Not Exist.</p>',
                                closeButton: false
                            });
                            dialog.find('.modal-body').addClass("btn-danger");
                            setTimeout(function(){
                                dialog.modal('hide'); 
                                $('#cdm_company_name').val('');
                            }, 1500); 
                          }
                      })
                      .error(function(data) 
                      {   
                          var dialog = bootbox.dialog({
                            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                closeButton: false
                            });
                            setTimeout(function(){
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                                dialog.modal('hide'); 
                            }, 1500);            
                      });
                  }
                  if(value.cm_suppresseion_file == 'Yes'){
                    $http({
                          method: 'POST',
                          url: $rootScope.baseURL+'/contact/check/suppression',
                          data: $scope.contactdiscovery,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(suppression)
                        {  
                          if(suppression.length>0) {
                             var dialog = bootbox.dialog({
                                message: '<p class="text-center">Update List.</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-danger");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                    // $('#cdm_company_name').focus();
                                }, 1500); 
                            }
                        })
                        .error(function(data) 
                        {   
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                  closeButton: false
                              });
                              setTimeout(function(){
                              $('#btnsave').text("Save");
                              $('#btnsave').removeAttr('disabled');
                                  dialog.modal('hide'); 
                              }, 1500);            
                        });
                  }
                  });
                  
            
              })
               .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                      message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                          closeButton: false
                      });
                      setTimeout(function(){
                      $('#btnsave').text("Save");
                      $('#btnsave').removeAttr('disabled');
                          dialog.modal('hide'); 
                      }, 1500);            
                });            
    });

     $("#cdm_domain").focusout(function(){
        $http({
              method: 'GET',
              url: $rootScope.baseURL+'/contact/AllDomain/'+$scope.contactdiscovery.cdm_campaign_name.cm_id,
              
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function(account)
            {  
              account.forEach(function(value,key){
                if(value.cm_allow_domain == 'Yes'){
                $http({
                    method: 'POST',
                    url: $rootScope.baseURL+'/contact/check/AllDomain/'+$scope.contactdiscovery.cdm_campaign_name.cm_id,
                    data:$scope.contactdiscovery,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                  })
                  .success(function(account1)
                  {  
                      
                      if(account1.length>0){
                          
                      
                      }
                      else
                      {
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Domain Does Not Exist.</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-danger");
                        setTimeout(function(){
                            dialog.modal('hide'); 
                            $('#cdm_company_name').val('');
                        }, 1500); 
                      }
                  })
                  .error(function(data) 
                  {   
                      var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                            closeButton: false
                        });
                        setTimeout(function(){
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide'); 
                        }, 1500);            
                  });

              }
              if(value.cm_denied_domain == 'Yes')
              {
                $http({
                      method: 'POST',
                      url: $rootScope.baseURL+'/contact/check/domain',
                      data: $scope.contactdiscovery,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(deny)
                    {  
                        console.log(suppression);
                      if(deny.length>0) {
                         var dialog = bootbox.dialog({
                            message: '<p class="text-center">Update List.</p>',
                                closeButton: false
                            });
                            dialog.find('.modal-body').addClass("btn-danger");
                            setTimeout(function(){
                                dialog.modal('hide'); 
                                // $('#cdm_company_name').focus();
                            }, 1500); 
                        }
                    })
                    .error(function(data) 
                    {   
                        var dialog = bootbox.dialog({
                          message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                              closeButton: false
                          });
                          setTimeout(function(){
                          $('#btnsave').text("Save");
                          $('#btnsave').removeAttr('disabled');
                              dialog.modal('hide'); 
                          }, 1500);            
                    });
              }
              });
              
        
          })
           .error(function(data) 
            {   
                var dialog = bootbox.dialog({
                  message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                      closeButton: false
                  });
                  setTimeout(function(){
                  $('#btnsave').text("Save");
                  $('#btnsave').removeAttr('disabled');
                      dialog.modal('hide'); 
                  }, 1500);            
            });     
    
    });
        
  };

  
  $scope.addto = function() {
         if($('#qm_questions').val() == undefined || $('#qm_questions').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Question.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#qm_questions').focus();
            }, 1500);
        }
        else if($('#qm_answers').val() == undefined || $('#qm_answers').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Answer.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#qm_answers').focus(); 
            }, 1500);
        }
        else{
            $scope.answersadd.push($scope.obj);
            $('#qm_questions').focus();
            $scope.obj="";
        }
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
          value.companies={};
          value.industries={};
          value.sizes={};
          value.revenues={};
          value.assets={};
          value.domains={};
         if(value.cm_custom_question == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/questionans/'+value.cdm_cm_id,
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
            url: $rootScope.baseURL+'/contact/supp/'+value.cdm_cm_id,
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
            url: $rootScope.baseURL+'/contact/denydomain/'+value.cdm_cm_id,
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
        
        if(value.cm_job == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/joblevel/'+value.cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.levelList.push(val);
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
        else{
          value.levels.cjlm_job_level = value.cdm_job_level;
        }
        
        if(value.cm_account_list == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/company/'+value.cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.companyList.push(val);
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
        else{
          value.companies.amcm_company = value.cdm_company_name; 
        }
        if(value.cm_industry == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/industry/'+value.cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.industryList.push(val);
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
        else{
          value.industries.cim_industries = value.cdm_industry;
        }
        if(value.cm_emp_size == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/size/'+value.cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.sizeList.push(val);
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
        else{
          value.sizes.cesm_employee_size = value.cdm_company_size;
        }
        if(value.cm_revenue == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/revenue/'+value.cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.revenueList.push(val);
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
        else{
          value.revenues.crem_revenue = value.cdm_revenue;
        }
        if(value.cm_campaign_asset == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/asset/'+value.cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.assetList.push(val);
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
        else{
          value.assets.cam_campaign_asset = value.cdm_asset;
        }
        if(value.cm_allow_domain == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/allowdomain/'+value.cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.aldomainList.push(val);
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
        else{
          value.domains.adcm_website = value.cdm_domain
        }
            if(value.cm_dept == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/contact/dept/'+value.cdm_cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                obj.forEach(function(val,key){
                    
                    $scope.deptList.push(val);
                    if(value.cdm_dept == val.cdm_department)
                  {
                    value.departments = val.cdm_department;
                  }
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
            else{
              value.departments.cdm_department = value.cdm_dept;
            }
            if(value.cm_title == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/contact/jobtitle/'+value.cdm_cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                obj.forEach(function(val,key){
                  $scope.titleList.push(val);
                  if(value.cdm_job_title == val.ctm_title)
                  {
                    value.titles = $scope.titleList[0].ctm_title;
                  }
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
        else
        {
          // console.log('inside no')
          value.titles.ctm_title=value.cdm_job_title;
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
    
  $scope.getEntry();
    
  $scope.updateEntry = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      // else if($('#cdm_job_title').val() == undefined || $('#cdm_job_title').val() == ""){
      //   var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Job Title.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_job_title').focus(); 
      //       }, 1500);
      // }
      //   else if($('#cdm_job_level').val() == undefined || $('#cdm_job_level').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Job Level.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_job_level').focus(); 
      //       }, 1500);
      //   }
      //   else if($('#cdm_dept').val() == undefined || $('#cdm_dept').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Department.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#cdm_dept').focus();
      //       }, 1500);
      //   }
      //   else if($('#cdm_email_id').val() == undefined || $('#cdm_email_id').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Email-Address.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_email_id').focus(); 
      //       }, 1500);
      //   }
      //   else if($('#cdm_mobile').val() == undefined || $('#cdm_mobile').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Mobile No.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#cdm_mobile').focus();
      //       }, 1500);
      //   }
      //   else if($('#cdm_company_name').val() == undefined || $('#cdm_company_name').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Company name.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_company_name').focus(); 
      //       }, 1500);
      //   }
      //   else if($('#cdm_address').val() == undefined || $('#cdm_address').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Address.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#cdm_address').focus();
      //       }, 1500);
      //   }
      //   else if($('#cdm_city').val() == undefined || $('#cdm_city').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter City.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_city').focus(); 
      //       }, 1500);
      //   }
      //   else if($('#cdm_state').val() == undefined || $('#cdm_state').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter State.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#cdm_state').focus();
      //       }, 1500);
      //   }
      //   else if($('#cdm_postal_code').val() == undefined || $('#cdm_postal_code').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Postal Code.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#cdm_postal_code').focus();
      //       }, 1500);
      //   }
      //   else if($('#cdm_country').val() == undefined || $('#cdm_country').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Country.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#cdm_country').focus();
      //       }, 1500);
      //   }
      //   else if($('#cdm_industry').val() == undefined || $('#cdm_industry').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Industry.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#cdm_industry').focus();
      //       }, 1500);
      //   }
      //   else if($('#cdm_company_size').val() == undefined || $('#cdm_company_size').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Select Company Size.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_company_size').focus(); 
      //       }, 1500);
      //   }
      //   else if($('#cdm_revenue').val() == undefined || $('#cdm_revenue').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Revenue.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_revenue').focus(); 
      //       }, 1500);
      //   }
      //   else if($('#cdm_asset').val() == undefined || $('#cdm_asset').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Asset.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_asset').focus(); 
      //       }, 1500);
      //   }
      //   else if($('#cdm_domain').val() == undefined || $('#cdm_domain').val() == ""){
      //       var dialog = bootbox.dialog({
      //       message: '<p class="text-center">Please Enter Domain.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide');
      //           $('#cdm_domain').focus(); 
      //       }, 1500);
      //   }
        // else if($('#qm_questions').val() == undefined || $('#qm_questions').val() == ""){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">Please Enter Question?.</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide');
        //         $('#qm_questions').focus(); 
        //     }, 1500);
        // }
        // else if($('#qm_answers').val() == undefined || $('#qm_answers').val() == ""){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">Please Enter Answer.</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide');
        //         $('#qm_answers').focus(); 
        //     }, 1500);
        // }
	    else{
                $scope.objects={
                    contact:$scope.contactdiscovery
                }
                console.log($scope.contactdiscovery);
      //           $('#btnsave').attr('disabled','true');
      //           $('#btnsave').text("please wait...");
		    // $http({
		    //   method: 'POST',
		    //   url: $scope.apiURL,
		    //   data: $scope.objects,
		    //   headers: {'Content-Type': 'application/json',
	     //              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
		    // })
		    // .success(function(login)
		    // {
      //           $('#btnsave').text("Update");
      //           $('#btnsave').removeAttr('disabled');
		    //    window.location.href = '#/contactdiscovery/joblist';  
		    // })
		    // .error(function(data) 
		    // {   
		    //   var dialog = bootbox.dialog({
	     //        message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
	     //            closeButton: false
	     //        });
	     //        setTimeout(function(){
      //           $('#btnsave').text("Update");
      //           $('#btnsave').removeAttr('disabled');
	     //            dialog.modal('hide'); 
	     //        }, 1500);            
		    // });
		}
	};

});