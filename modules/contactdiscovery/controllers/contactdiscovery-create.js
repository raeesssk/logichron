// import admin
angular.module('contactdiscovery').controller('contactdiscoveryAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
    $scope.contactdiscovery = {};
    $scope.obj={};
    $scope.answers=[];
    $scope.contactdiscovery.userid=localStorage.getItem('logichron_userid');

	$scope.apiURL = $rootScope.baseURL+'/contact/add';

    $scope.url = 'Tried to enter contact discovery add Page';

    $scope.gethistory=function(){
      $scope.history={
        user_id : $rootScope.userid,
        url : $scope.url
      }
      $http({
            method: 'POST',
            url: $rootScope.baseURL+'/history/add',
            data: $scope.history,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(login)
          {
              
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
    };
    $scope.gethistory();

    var permission=JSON.parse(localStorage.getItem('permission'));
    var value = '#/contactdiscovery/createjob';
    var access = permission.includes(value);
    $scope.getrolepermission=function(){
      
      // for(var i=0;i<permission.length;i++)
      // {
        if(access)
        {
          return true
        }
        else
        {
           var dialog = bootbox.dialog({
          message: '<p class="text-center">You Are Not Authorized</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
          $location.path('/');
          $scope.gethistory();
        }
        /*
        break;
      }*/

    };
    $scope.getrolepermission();
  

    $("#cdm_campaign_name").focus();
    

    //Campaign Name list record for campaign Name input
    $scope.getSearchCampaign = function(vals) {
      var searchTerms = {search: vals,userid:$scope.contactdiscovery.userid};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/campaign/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };

     $scope.getCampaignDetails=function(){
        // $scope.personalDetails=[];
        
         $("#cdm_company_name").focusout(function(){
            $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/contact/accountList/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                  
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                })
                .success(function(account)
                {  
                  account.forEach(function(value,key){
                    if(value.cm_account_list == 'Yes'){
                    $http({
                        method: 'POST',
                        url: $rootScope.baseURL+'/contact/check/accountList/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                        data:$scope.contactdiscovery,
                        headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                      })
                      .success(function(account1)
                      {  
                          
                          if(account1.length>0){
                              
                          $('#cdm_address').focus();
                          
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
                                $('#cdm_company_name').focus();
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
                          url: $rootScope.baseURL+'/contact/check/suppression/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                          data: $scope.contactdiscovery,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(suppression)
                        {  
                            console.log(suppression);
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
              url: $rootScope.baseURL+'/contact/AllDomain/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
              
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function(account)
            {  
              account.forEach(function(value,key){
                if(value.cm_allow_domain == 'Yes'){
                $http({
                    method: 'POST',
                    url: $rootScope.baseURL+'/contact/check/AllDomain/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                    data:$scope.contactdiscovery,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                  })
                  .success(function(account1)
                  {  
                      
                      if(account1.length>0){
                          $('#qm_questions').focus();
                      
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
                                $('#cdm_domain').val('');
                                $('#cdm_domain').focus();
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
                      url: $rootScope.baseURL+'/contact/check/domain/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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

   

   
    $scope.obj.userid=localStorage.getItem('logichron_userid');
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
            $scope.answers.push($scope.obj);
            $('#qm_questions').focus();
            $scope.obj="";
        }
    };

    $scope.deleteQA=function(index){
        $scope.answers.splice(index,1);
        $('#qm_questions').focus();
    };

    $('#cdm_campaign_name').focus();
    $scope.addEntry = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    

        if($('#cdm_campaign_name').val() == undefined || $('#cdm_campaign_name').val() == "" || $scope.contactdiscovery.cdm_cm_id.cm_id == undefined){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Campaign Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#cdm_campaign_name').focus();
            }, 1500);
	    }
        else if($('#cdm_first_name').val() == undefined || $('#cdm_first_name').val() == ""){
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
        else if($('#cdm_mobile').val() == undefined || $('#cdm_mobile').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Mobile No.</p>',
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
            message: '<p class="text-center">Please Enter Company Size.</p>',
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
                $scope.objs={
                    answer:$scope.answers,
                    contact:$scope.contactdiscovery
                }
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: $scope.objs,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    })
                    .success(function(login)
                    {
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/contactdiscovery/joblist';  
                    })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                        dialog.modal('hide');  
                    }, 1500);
                });
		}
	};


     //campaign details on typeahead select
   

    

});