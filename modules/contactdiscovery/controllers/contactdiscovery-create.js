// import admin
angular.module('contactdiscovery').controller('contactdiscoveryAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  
    $scope.contactdiscovery = {};
    $scope.obj={};
    $scope.contactdiscovery.userid=localStorage.getItem('logichron_userid');
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
    // $scope.keywordList=[];    
  $scope.apiURL = $rootScope.baseURL+'/contact/add';

    $scope.url = 'Tried to enter contact discovery add Page';

    $('#cdm_state_input').hide();
    $('#cdm_state_select').hide();
    $('#cdm_city_input').hide();
    $('#cdm_city_select').hide();
    $('#hidediv').hide();
    $('#tabeldiv').hide();
    // $scope.gethistory=function(){
    //   $scope.history={
    //     user_id : $rootScope.userid,
    //     url : $scope.url
    //   }
    //   $http({
    //         method: 'POST',
    //         url: $rootScope.baseURL+'/history/add',
    //         data: $scope.history,
    //         headers: {'Content-Type': 'application/json',
    //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
    //       })
    //       .success(function(login)
    //       {
              
    //       })
    //       .error(function(data) 
    //       {   
    //         var dialog = bootbox.dialog({
    //           message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
    //               closeButton: false
    //           });
    //           setTimeout(function(){
    //           $('#btnsave').text("SAVE");
    //           $('#btnsave').removeAttr('disabled');
    //               dialog.modal('hide'); 
    //         }, 1500);            
    //     });
    // };
    // $scope.gethistory();

    // var permission=JSON.parse(localStorage.getItem('permission'));
    // var value = '#/contactdiscovery/createjob';
    // var access = permission.includes(value);
    // $scope.getrolepermission=function(){
      
    //   // for(var i=0;i<permission.length;i++)
    //   // {
    //     if(access)
    //     {
    //       return true
    //     }
    //     else
    //     {
    //        var dialog = bootbox.dialog({
    //       message: '<p class="text-center">You Are Not Authorized</p>',
    //           closeButton: false
    //       });
    //       dialog.find('.modal-body').addClass("btn-danger");
    //       setTimeout(function(){
    //           dialog.modal('hide'); 
    //       }, 1500);
    //       $location.path('/');
    //       $scope.gethistory();
    //     }
    //     /*
    //     break;
    //   }*/

    // };
    // $scope.getrolepermission();
  

    $("#cdm_campaign_name").focus();
    

    //Campaign Name list record for campaign Name input
    $scope.getSearchCampaign = function(vals) {

    $('#hidediv').hide();
    $('#tabeldiv').hide();
    $scope.contactdiscovery="";
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
      $('#hidediv').show();
      $('#tabeldiv').show();

      $('#cdm_state_input').hide();
      $('#cdm_state_select').hide();
      $('#cdm_city_input').hide();
      $('#cdm_city_select').hide();

      $scope.titleList=[];
      $scope.levelList=[];
      $scope.deptList=[];
      $scope.industryList=[];
      $scope.sizeList=[];
      $scope.revenueList=[];
      $scope.assetList=[];
      $scope.aldomainList=[];

      $scope.companyList=[];

      $scope.questionans=[];
      $scope.suppList=[];
      $scope.denydomain=[];

      $scope.countryList=[]; 

      $scope.firstNameList=[];
      $scope.emailList=[];
      $scope.contactNumberList=[];
      $scope.locationList=[];
      $scope.keywordAllowList=[];
      $scope.keywordDisallowList=[];

      $scope.contactdiscovery.cm_comment = '';
      $scope.contactdiscovery.country = '';
      $scope.contactdiscovery.state = '';
      $scope.contactdiscovery.city = '';

        if($scope.contactdiscovery.cdm_cm_id.cm_contact_name == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/contact_name/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                obj.forEach(function(val,key){
                  $scope.firstNameList.push(val);
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

        if($scope.contactdiscovery.cdm_cm_id.cm_email == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/email/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                obj.forEach(function(val,key){
                  $scope.emailList.push(val);
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

        if($scope.contactdiscovery.cdm_cm_id.cm_contact_number == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/contact_number/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                obj.forEach(function(val,key){
                  $scope.contactNumberList.push(val);
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

        if($scope.contactdiscovery.cdm_cm_id.cm_location == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/location/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                console.log(obj);
                obj.forEach(function(val,key){
                  $scope.locationList.push(val);
                // $scope.contactdiscovery.country.c_search = val.country_name;
                });


          $('#cdm_state_select').show();
          // $('#cdm_city_select').show();
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
          $('#cdm_state_input').show();
          $('#cdm_city_input').show();  
        }
      
        if($scope.contactdiscovery.cdm_cm_id.cm_title == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/titles/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                obj.forEach(function(val,key){
                  $scope.titleList.push(val);
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


        if($scope.contactdiscovery.cdm_cm_id.cm_job == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/level/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_dept == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/dept/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {  
                obj.forEach(function(val,key){
                  $scope.deptList.push(val);
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


        if($scope.contactdiscovery.cdm_cm_id.cm_industry == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/industries/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_emp_size == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/empsize/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_revenue == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/revenue/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_campaign_asset == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/asset/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_allow_domain == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/allowdomain/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


    // custom Question
        if($scope.contactdiscovery.cdm_cm_id.cm_custom_question == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/question/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_supression_file == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/supression/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_denied_domain == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/deniedomain/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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


        if($scope.contactdiscovery.cdm_cm_id.cm_account_list == "Yes"){
              $http({
                method: 'GET',
                url: $rootScope.baseURL+'/campaign/account/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
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

        // if($scope.contactdiscovery.cdm_cm_id.cm_keyword_allow == "Yes"){
        //       $http({
        //         method: 'GET',
        //         url: $rootScope.baseURL+'/campaign/keyword_allow/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
        //         headers: {'Content-Type': 'application/json',
        //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        //       })
        //       .success(function(obj)
        //       {  
        //         obj.forEach(function(val,key){
        //           $scope.keywordAllowList.push(val);
        //         });
        //       })
        //       .error(function(data) 
        //       {   
        //           var dialog = bootbox.dialog({
        //             message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
        //                 closeButton: false
        //             });
        //             setTimeout(function(){
        //                 dialog.modal('hide'); 
        //             }, 1500);            
        //       });
        // }

        // if($scope.contactdiscovery.cdm_cm_id.cm_keyword_disallow == "Yes"){
        //       $http({
        //         method: 'GET',
        //         url: $rootScope.baseURL+'/campaign/keyword_disallow/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
        //         headers: {'Content-Type': 'application/json',
        //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        //       })
        //       .success(function(obj)
        //       {  
        //         obj.forEach(function(val,key){
        //           $scope.keywordDisallowList.push(val);
        //         });
        //       })
        //       .error(function(data) 
        //       {   
        //           var dialog = bootbox.dialog({
        //             message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
        //                 closeButton: false
        //             });
        //             setTimeout(function(){
        //                 dialog.modal('hide'); 
        //             }, 1500);            
        //       });
        // }
  };

  // $scope.blurFirstLastName = function () {
  //     if($scope.contactdiscovery.cdm_cm_id.cm_contact_name == "Yes"){
  //         angular.forEach($scope.firstNameList, function(value,key){
  //               if ($('#cdm_first_name').val().toLowerCase() == value.ccnm_first_name.toLowerCase() && $('#cdm_last_name').val().toLowerCase() == value.ccnm_last_name.toLowerCase()) {

  //                   $scope.contactdiscovery.cdm_first_name = "";
  //                   $scope.contactdiscovery.cdm_last_name = "";
  //                   var dialog = bootbox.dialog({
  //                     message: '<p class="text-center">Name Present in Suppression List</p>',
  //                         closeButton: false
  //                     });
  //                     dialog.find('.modal-body').addClass("btn-warning");
  //                     setTimeout(function(){
  //                         dialog.modal('hide'); 
  //                         // $('#cdm_first_name').focus();
  //                     }, 1500);
  //               }
  //         });
  //     }
  // };
  $scope.blurFirstLastName = function () {
      if($scope.contactdiscovery.cdm_cm_id.cm_contact_name == "Yes"){

        if($('#cdm_first_name').val() == undefined || $('#cdm_first_name').val() == "" || $('#cdm_last_name').val() == undefined || $('#cdm_last_name').val() == ""){
            
        }
        else{
          $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/firstlastname/typeahead/search',
                data: $scope.contactdiscovery,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {    
                  if(obj.length > 0){
                      $scope.contactdiscovery.cdm_first_name = "";
                      $scope.contactdiscovery.cdm_last_name = "";
                      var dialog = bootbox.dialog({
                        message: '<p class="text-center">Name Present in Suppression List</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-warning");
                        setTimeout(function(){
                            dialog.modal('hide'); 
                            // $('#cdm_first_name').focus();
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
                        dialog.modal('hide'); 
                    }, 1500);            
              });
        }
      }
  };


  $('#cdm_email').keyup(function(){
      this.value = this.value.toLowerCase();
  });         
  $scope.blurEmail = function () {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
    var email = $('#cdm_email').val();
    var name   = email.substring(0, email.lastIndexOf("@"));
    var domain = email.substring(email.lastIndexOf("@") +1);
    $scope.contactdiscovery.cdm_domain = domain;
    $scope.contactdiscovery.adomain = domain;

      if(!emailRegex.test($scope.contactdiscovery.cdm_email)){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Correct Email.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  // $('#cdm_email').focus();
                  $scope.contactdiscovery.cdm_email = "";
              }, 1500);
      }
      else if($scope.contactdiscovery.cdm_cm_id.cm_email == "Yes"){

            $http({
                    method: 'POST',
                    url: $rootScope.baseURL+'/campaign/email/typeahead/search',
                    data: $scope.contactdiscovery,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                  })
                  .success(function(obj)
                  {    
                    console.log(obj);
                       if(obj.length > 0)
                        {
                            $scope.contactdiscovery.cdm_email = "";
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Email Present in Suppression List!</p>',
                                  closeButton: false
                              });
                              dialog.find('.modal-body').addClass("btn-warning");
                              setTimeout(function(){
                                  dialog.modal('hide'); 
                              }, 1500);
                        }
                        else if($scope.contactdiscovery.cdm_cm_id.cm_allow_domain == "Yes"){
                               
                                $http({
                                      method: 'POST',
                                      url: $rootScope.baseURL+'/campaign/allow_domain/typeahead/search',
                                      data: $scope.contactdiscovery,
                                      headers: {'Content-Type': 'application/json',
                                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                    })
                                    .success(function(obj)
                                    {    
                                      console.log(obj);
                                        if(obj.length != 1){
                                             $scope.contactdiscovery.cdm_email = "";
                                            var dialog = bootbox.dialog({
                                              message: '<p class="text-center">Domain Not Matched!</p>',
                                                  closeButton: false
                                              });
                                              dialog.find('.modal-body').addClass("btn-warning");
                                              setTimeout(function(){
                                                  dialog.modal('hide'); 
                                                  // $('#cdm_first_name').focus();
                                              }, 1500);
                                        }
                                        else{
                                              if($scope.contactdiscovery.cdm_cm_id.cm_allow_domain == "Yes"){
                                                    $http({
                                                          method: 'POST',
                                                          url: $rootScope.baseURL+'/contact/allow_domain_limit/typeahead/search',
                                                          data: $scope.contactdiscovery,
                                                          headers: {'Content-Type': 'application/json',
                                                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                                        })
                                                        .success(function(obj)
                                                        {    
                                                          console.log(obj);
                                                           if(obj.length == 1){
                                                            if(obj[0].adcm_domain_limit == null)
                                                            {
                                                                if(obj[0].domain >= parseInt(parseInt($scope.contactdiscovery.cdm_cm_id.cm_domain_limit) * 3))
                                                                {
                                                          // console.log(obj[0].domain <= parseInt(parseInt($scope.contactdiscovery.cdm_cm_id.cm_domain_limit));
                                                                   var dialog = bootbox.dialog({
                                                                        message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                                            closeButton: false
                                                                        });
                                                                        dialog.find('.modal-body').addClass("btn-warning");
                                                                        setTimeout(function(){
                                                                            dialog.modal('hide'); 
                                                                            $scope.contactdiscovery.cdm_email = "";
                                                                        }, 1500);
                                                                }
                                                            }
                                                            else{
                                                                if(obj[0].domain >= parseInt(parseInt(obj[0].adcm_domain_limit) * 3))
                                                                {
                                                                   var dialog = bootbox.dialog({
                                                                        message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                                            closeButton: false
                                                                        });
                                                                        dialog.find('.modal-body').addClass("btn-warning");
                                                                        setTimeout(function(){
                                                                            dialog.modal('hide'); 
                                                                            $scope.contactdiscovery.cdm_email = "";
                                                                        }, 1500);
                                                                }
                                                            }
                                                            
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
                                                }
                                                else{
                                                  $http({
                                                          method: 'POST',
                                                          url: $rootScope.baseURL+'/contact/domain_limit/typeahead/search',
                                                          data: $scope.contactdiscovery,
                                                          headers: {'Content-Type': 'application/json',
                                                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                                        })
                                                        .success(function(obj)
                                                        {    
                                                          if(obj.length == 1 && (obj[0].domain >= parseInt(parseInt(obj[0].cm_domain_limit) * 3)))
                                                          {
                                                             var dialog = bootbox.dialog({
                                                                  message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                                      closeButton: false
                                                                  });
                                                                  dialog.find('.modal-body').addClass("btn-warning");
                                                                  setTimeout(function(){
                                                                      dialog.modal('hide'); 
                                                                            $scope.contactdiscovery.cdm_email = "";
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
                                                                  dialog.modal('hide'); 
                                                              }, 1500);            
                                                        });
                                                }
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
                        }
                        else if($scope.contactdiscovery.cdm_cm_id.cm_denied_domain == "Yes"){
                                     $http({
                                            method: 'POST',
                                            url: $rootScope.baseURL+'/campaign/denied_domain/typeahead/search',
                                            data: $scope.contactdiscovery,
                                            headers: {'Content-Type': 'application/json',
                                                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                          })
                                          .success(function(obj)
                                          {    
                                            console.log('helo');
                                            console.log(obj);
                                              if(obj.length > 0){
                                                   $scope.contactdiscovery.cdm_email = "";
                                                  var dialog = bootbox.dialog({
                                                    message: '<p class="text-center">Domain Is Denied!</p>',
                                                        closeButton: false
                                                    });
                                                    dialog.find('.modal-body').addClass("btn-warning");
                                                    setTimeout(function(){
                                                        dialog.modal('hide'); 
                                                        // $('#cdm_first_name').focus();
                                                    }, 1500);
                                              }
                                              else{
                                                  $http({
                                                          method: 'POST',
                                                          url: $rootScope.baseURL+'/contact/domain_limit/typeahead/search',
                                                          data: $scope.contactdiscovery,
                                                          headers: {'Content-Type': 'application/json',
                                                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                                        })
                                                        .success(function(obj)
                                                        {    
                                                          if(obj.length == 1 && (obj[0].domain >= parseInt(parseInt(obj[0].cm_domain_limit) * 3)))
                                                          {
                                                             var dialog = bootbox.dialog({
                                                                  message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                                      closeButton: false
                                                                  });
                                                                  dialog.find('.modal-body').addClass("btn-warning");
                                                                  setTimeout(function(){
                                                                      dialog.modal('hide'); 
                                                                            $scope.contactdiscovery.cdm_email = "";
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
                                                                  dialog.modal('hide'); 
                                                              }, 1500);            
                                                        });
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

           
      }
      else{
console.log('SuppressionEMail');
            if($scope.contactdiscovery.cdm_cm_id.cm_allow_domain == "Yes"){
                    $http({
                          method: 'POST',
                          url: $rootScope.baseURL+'/campaign/allow_domain/typeahead/search',
                          data: $scope.contactdiscovery,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj)
                        {    
                            if(obj.length != 1){
                                 $scope.contactdiscovery.cdm_email = "";
                                var dialog = bootbox.dialog({
                                  message: '<p class="text-center">Domain Not Matched!</p>',
                                      closeButton: false
                                  });
                                  dialog.find('.modal-body').addClass("btn-warning");
                                  setTimeout(function(){
                                      dialog.modal('hide'); 
                                  }, 1500);
                            }
                            else{
                                  if($scope.contactdiscovery.cdm_cm_id.cm_allow_domain == "Yes"){
                                    $http({
                                          method: 'POST',
                                          url: $rootScope.baseURL+'/contact/allow_domain_limit/typeahead/search',
                                          data: $scope.contactdiscovery,
                                          headers: {'Content-Type': 'application/json',
                                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                        })
                                        .success(function(obj)
                                        {    
                                          console.log(obj.length);
                                           if(obj.length == 1){
                                            if(obj[0].adcm_domain_limit == null)
                                            {
                                                if(obj[0].domain >= parseInt(parseInt($scope.contactdiscovery.cdm_cm_id.cm_domain_limit) * 3))
                                                {
                                          // console.log(obj[0].domain <= parseInt(parseInt($scope.contactdiscovery.cdm_cm_id.cm_domain_limit));
                                                   var dialog = bootbox.dialog({
                                                        message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                            closeButton: false
                                                        });
                                                        dialog.find('.modal-body').addClass("btn-warning");
                                                        setTimeout(function(){
                                                            dialog.modal('hide'); 
                                                            $scope.contactdiscovery.cdm_email = "";
                                                        }, 1500);
                                                }
                                            }
                                            else{
                                                if(obj[0].domain >= parseInt(parseInt(obj[0].adcm_domain_limit) * 3))
                                                {
                                                   var dialog = bootbox.dialog({
                                                        message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                            closeButton: false
                                                        });
                                                        dialog.find('.modal-body').addClass("btn-warning");
                                                        setTimeout(function(){
                                                            dialog.modal('hide'); 
                                                            $scope.contactdiscovery.cdm_email = "";
                                                        }, 1500);
                                                }
                                            }
                                            
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
                                }
                                else{
                                  $http({
                                          method: 'POST',
                                          url: $rootScope.baseURL+'/contact/domain_limit/typeahead/search',
                                          data: $scope.contactdiscovery,
                                          headers: {'Content-Type': 'application/json',
                                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                        })
                                        .success(function(obj)
                                        {    
                                          if(obj.length == 1 && (obj[0].domain >= parseInt(parseInt(obj[0].cm_domain_limit) * 3)))
                                          {
                                             var dialog = bootbox.dialog({
                                                  message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                      closeButton: false
                                                  });
                                                  dialog.find('.modal-body').addClass("btn-warning");
                                                  setTimeout(function(){
                                                      dialog.modal('hide'); 
                                                            $scope.contactdiscovery.cdm_email = "";
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
                                                  dialog.modal('hide'); 
                                              }, 1500);            
                                        });
                                }
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
            }
            else if($scope.contactdiscovery.cdm_cm_id.cm_denied_domain == "Yes"){
                  $http({
                          method: 'POST',
                          url: $rootScope.baseURL+'/campaign/denied_domain/typeahead/search',
                          data: $scope.contactdiscovery,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj)
                        {    
                            if(obj.length > 0){
                                 $scope.contactdiscovery.cdm_email = "";
                                var dialog = bootbox.dialog({
                                  message: '<p class="text-center">Domain Is Denied!</p>',
                                      closeButton: false
                                  });
                                  dialog.find('.modal-body').addClass("btn-warning");
                                  setTimeout(function(){
                                      dialog.modal('hide'); 
                                  }, 1500);
                            }
                            else{
                                $http({
                                      method: 'POST',
                                      url: $rootScope.baseURL+'/contact/domain_limit/typeahead/search',
                                      data: $scope.contactdiscovery,
                                      headers: {'Content-Type': 'application/json',
                                              'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                    })
                                    .success(function(obj)
                                    {    
                                      if(obj.length == 1 && (obj[0].domain >= parseInt(parseInt(obj[0].cm_domain_limit) * 3)))
                                      {
                                         var dialog = bootbox.dialog({
                                              message: '<p class="text-center">Domain Limit Exceeded!</p>',
                                                  closeButton: false
                                              });
                                              dialog.find('.modal-body').addClass("btn-warning");
                                              setTimeout(function(){
                                                  dialog.modal('hide'); 
                                                        $scope.contactdiscovery.cdm_email = "";
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
                                              dialog.modal('hide'); 
                                          }, 1500);            
                                    });
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
              }
      }

  };

   
  $scope.blurContactNo = function () {
    var numRegex = /^\d+(\.\d{1,2})?$/;

      if(!numRegex.test($scope.contactdiscovery.cdm_contact_number)){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Correct Direct Number / Landline Number.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
                  // $('#cdm_contact_number').focus();
                    $scope.contactdiscovery.cdm_contact_number = "";
              }, 1500);
      }
      else if($scope.contactdiscovery.cdm_cm_id.cm_contact_number  == "Yes"){
          // angular.forEach($scope.contactNumberList, function(value,key){
          //       if ($('#cdm_contact_number').val() == value.ccnm_contact_number) {

          //           $scope.contactdiscovery.cdm_contact_number = "";
          //           // $scope.contactdiscovery.cdm_last_name = "";
          //           var dialog = bootbox.dialog({
          //             message: '<p class="text-center">Contact Number Present in Suppression List</p>',
          //                 closeButton: false
          //             });
          //             dialog.find('.modal-body').addClass("btn-warning");
          //             setTimeout(function(){
          //                 dialog.modal('hide'); 
          //                 // $('#cdm_contact_number').focus();
          //             }, 1500);
          //       }
          // });
          if($('#cdm_contact_number').val() == undefined || $('#cdm_contact_number').val() == ""){
            
          }
          else{
            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/contact_number/typeahead/search',
                data: $scope.contactdiscovery,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {    
                  if(obj.length > 0){
                      $scope.contactdiscovery.cdm_contact_number = "";
                      var dialog = bootbox.dialog({
                        message: '<p class="text-center">Contact Number Present in Suppression List</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-warning");
                        setTimeout(function(){
                            dialog.modal('hide'); 
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
                        dialog.modal('hide'); 
                    }, 1500);            
              });
          }
      }
  };

  $scope.blurCompanyName = function () {
      if($scope.contactdiscovery.cdm_cm_id.cm_account_list == "Yes"){
          if($('#cdm_company_name').val() == undefined || $('#cdm_company_name').val() == ""){
            
          }
          else{
            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/company_name_account/typeahead/search',
                data: $scope.contactdiscovery,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {    
                console.log(obj);
                  if(obj.length != 1){
                      $scope.contactdiscovery.cdm_company_name = "";
                      var dialog = bootbox.dialog({
                        message: '<p class="text-center">Company Name Not Present in List</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-warning");
                        setTimeout(function(){
                            dialog.modal('hide'); 
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
                        dialog.modal('hide'); 
                    }, 1500);            
              });
          }
      }
      
      else if($scope.contactdiscovery.cdm_cm_id.cm_supression_file == "Yes"){
        console.log('hello')
          // angular.forEach($scope.suppList, function(value,key){
          //       if ($('#cdm_company_name').val().toLowerCase() == value.scm_company.toLowerCase()) {
          //           $scope.contactdiscovery.companies.amcm_company = "";
          //           var dialog = bootbox.dialog({
          //             message: '<p class="text-center">Company Present in Suppression List</p>',
          //                 closeButton: false
          //             });
          //             dialog.find('.modal-body').addClass("btn-warning");
          //             setTimeout(function(){
          //                 dialog.modal('hide'); 
          //                 $('#cdm_company_name').focus();
          //             }, 1500);
          //       }
          // });
          if($('#cdm_company_name').val() == undefined || $('#cdm_company_name').val() == ""){
            
          }
          else{
            console.log('hellosj');
            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/company_name_supp/typeahead/search',
                data: $scope.contactdiscovery,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {    
                console.log(obj);
                  if(obj.length > 0){
                      $scope.contactdiscovery.cdm_company_name = "";
                      var dialog = bootbox.dialog({
                        message: '<p class="text-center">Company Name Present in Suppression List</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-warning");
                        setTimeout(function(){
                            dialog.modal('hide'); 
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
                        dialog.modal('hide'); 
                    }, 1500);            
              });
          }
      }
  };
  
  $scope.blurJobTitle = function () {
    if($('#cdm_job_level').val() == undefined || $('#cdm_job_level').val() == ""){
          var dialog = bootbox.dialog({
          message: '<p class="text-center">Please Enter Or Select  Job Level.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide');
              // $('#cdm_job_level').focus(); 
              $scope.contactdiscovery.cdm_job_title = "";
          }, 1500);
      }
      else if($('#cdm_dept').val() == undefined || $('#cdm_dept').val() == ""){
          var dialog = bootbox.dialog({
          message: '<p class="text-center">Please Enter Or Select  Department.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
              // $('#cdm_dept').focus();
              $scope.contactdiscovery.cdm_job_title = "";
          }, 1500);
      }
      else{
          $scope.dept = $scope.contactdiscovery.departments.cdm_department.toLowerCase();
          $scope.level = $scope.contactdiscovery.levels.cjlm_job_level.toLowerCase();

          var word = $scope.contactdiscovery.cdm_job_title.toLowerCase();
          var ss = word.includes($scope.level);
          var aa = word.includes($scope.dept);
          if(ss != true || aa != true){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Job Level And Department Should Match!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-warning");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    // $('#cdm_job_title').focus();
                   $scope.contactdiscovery.cdm_job_title = "";
                }, 2000);
          }
      }
   
  };
  $scope.changeJoblvlDept = function(){
      $scope.contactdiscovery.cdm_job_title = "";
  };
  // $(document).ready(function(){
  //   $("#cdm_job_level").change(function(){
  //     console.log('hi');
  //   });
  // });
  // $scope.blurDomain = function () {
  //   console.log('dkd');
  //     if($scope.contactdiscovery.cdm_cm_id.cm_denied_domain == "Yes"){

  //         angular.forEach($scope.denydomain, function(value,key){
  //               if ($('#cdm_domain').val().toLowerCase() == value.ddcm_website.toLowerCase()) {

  //                   $scope.contactdiscovery.domains.adcm_website = "";
  //                   var dialog = bootbox.dialog({
  //                     message: '<p class="text-center">Domain Present in Denied Domain Website</p>',
  //                         closeButton: false
  //                     });
  //                     dialog.find('.modal-body').addClass("btn-warning");
  //                     setTimeout(function(){
  //                         dialog.modal('hide'); 
  //                         $('#cdm_domain').focus();
  //                     }, 1500);
  //               }
  //         });
  //     }
  // };

  // $scope.blurDomain = function () {
  //     if($scope.contactdiscovery.cdm_cm_id.cm_allow_domain == "Yes"){
  //             $http({
  //                 method: 'POST',
  //                 url: $rootScope.baseURL+'/campaign/allowed_domain_name/typeahead/search',
  //                 data: $scope.contactdiscovery,
  //                 headers: {'Content-Type': 'application/json',
  //                         'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //               })
  //               .success(function(obj)
  //               {    
  //                   if(obj.length != 1){
  //                       $scope.contactdiscovery.cdm_domain = "";
  //                       var dialog = bootbox.dialog({
  //                         message: '<p class="text-center">Domain Not Allowed</p>',
  //                             closeButton: false
  //                         });
  //                         dialog.find('.modal-body').addClass("btn-warning");
  //                         setTimeout(function(){
  //                             dialog.modal('hide'); 
  //                         }, 1500);
  //                   }

  //               })
  //               .error(function(data) 
  //               {   
  //                   var dialog = bootbox.dialog({
  //                     message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //                         closeButton: false
  //                     });
  //                     setTimeout(function(){
  //                         dialog.modal('hide'); 
  //                     }, 1500);            
  //               });

  //     }
  //     else if($scope.contactdiscovery.cdm_cm_id.cm_denied_domain == "Yes"){
  //             $http({
  //                 method: 'POST',
  //                 url: $rootScope.baseURL+'/campaign/denied_domain_name/typeahead/search',
  //                 data: $scope.contactdiscovery,
  //                 headers: {'Content-Type': 'application/json',
  //                         'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //               })
  //               .success(function(obj)
  //               {    
  //                   if(obj.length > 0){
  //                       $scope.contactdiscovery.cdm_domain = "";
  //                       var dialog = bootbox.dialog({
  //                         message: '<p class="text-center">Domain Present in Suppression List</p>',
  //                             closeButton: false
  //                         });
  //                         dialog.find('.modal-body').addClass("btn-warning");
  //                         setTimeout(function(){
  //                             dialog.modal('hide'); 
  //                         }, 1500);
  //                   }

  //               })
  //               .error(function(data) 
  //               {   
  //                   var dialog = bootbox.dialog({
  //                     message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
  //                         closeButton: false
  //                     });
  //                     setTimeout(function(){
  //                         dialog.modal('hide'); 
  //                     }, 1500);            
  //               });

  //     }
  // };

  // $scope.blurKeyword = function () {
  //     if($scope.contactdiscovery.cdm_cm_id.cm_keyword_disallow == "Yes"){
  //         angular.forEach($scope.keywordDisallowList, function(value,key){
  //               if ($('#cdm_keyword').val().toLowerCase() == value.ckdm_keyword_disallow.toLowerCase()) {
  //                   $scope.contactdiscovery.keyword.ckam_keyword_allow = "";
  //                   var dialog = bootbox.dialog({
  //                     message: '<p class="text-center">Keyword Present in Suppression List</p>',
  //                         closeButton: false
  //                     });
  //                     dialog.find('.modal-body').addClass("btn-warning");
  //                     setTimeout(function(){
  //                         dialog.modal('hide'); 
  //                         $('#cdm_keyword').focus();
  //                     }, 1500);
  //               }
  //         });
  //     }
  // };

  //Country Name list record for country Name input
    $scope.getSearchCountry = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/location/countries/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };
    $scope.getSearchState = function(vals) {
        if($('#cdm_country').val() == undefined || $('#cdm_country').val() == "" || $scope.contactdiscovery.country.id == undefined){
            var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Select Country!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_country').focus();
                    // $scope.location.state = '';
                }, 1500);
        }
        else{
          var searchTerms = {search: vals, c_id : $scope.contactdiscovery.country.id};
            const httpOptions = {
                headers: {
                  'Content-Type':  'application/json',
                  'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
                }
            };
            return $http.post($rootScope.baseURL+'/location/states/typeahead/search', searchTerms, httpOptions).then((result) => {
                return result.data;
            });
        }
    };
    $scope.getSearchCity = function(vals) {
      
        if($('#cdm_state_input').val() == undefined || $('#cdm_state_input').val() == "" || $scope.contactdiscovery.state.id == undefined){
            var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Select State!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#cm_state').focus();                
                // $scope.contactdiscovery.city = '';
                }, 1500);
        }
        else{
            var searchTerms = {search: vals, s_id : $scope.contactdiscovery.state.id};
                const httpOptions = {
                    headers: {
                      'Content-Type':  'application/json',
                      'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
                    }
                };
                return $http.post($rootScope.baseURL+'/location/cities/typeahead/search', searchTerms, httpOptions).then((result) => {
                    return result.data;

                });
        }
      
    };

    $scope.changeCountry = function(){

      $('#cdm_city_input').hide(); 
      $('#cdm_city_select').hide(); 

      $('#cdm_state_input').val('');
      $('#cdm_city_input').val('');

      $('#cdm_state_select').prop('selectedIndex',0);
      $('#cdm_city_select').prop('selectedIndex',0);

      $scope.stateList = [];
      $scope.limit={};
      $scope.limit.c_id = $scope.contactdiscovery.country.country_id;
      $scope.limit.cm_id = $scope.contactdiscovery.cdm_cm_id.cm_id;

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/campaign/location/states',
          data: $scope.limit,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {  
          obj.forEach(function(val,key){
            $scope.stateList.push(val);
          });

          if(obj.length > 0){
            $('#cdm_state_input').hide();
            $('#cdm_state_select').show();
          }
          else{

            $('#cdm_state_select').hide();
            $scope.contactdiscovery.country.id = $scope.contactdiscovery.country.country_id;
            $('#cdm_state_input').show();
          }

          if($("#cdm_state_input").is("input")) {
            $('#cdm_city_select').hide();
              $('#cdm_city_input').show();
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
    };

    // $('#cdm_state_input').keydown(function(){
    // });
    $scope.keypressCountry = function(){
      $scope.contactdiscovery.state = "";
      $scope.contactdiscovery.city = "";
    };
    $scope.keypressState = function(){
      $scope.contactdiscovery.city = "";
    };
    $scope.changeState = function(){

      $scope.contactdiscovery.city = "";

      $('#cdm_city_select').prop('selectedIndex',0);

      $scope.cityList = [];
      $scope.limit={};
      $scope.limit.s_id = $scope.contactdiscovery.state.state_id;
      $scope.limit.cm_id = $scope.contactdiscovery.cdm_cm_id.cm_id;

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/campaign/location/cities',
          data: $scope.limit,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {  
          obj.forEach(function(val,key){
            $scope.cityList.push(val);
          });
          if(obj.length > 0){
            $('#cdm_city_input').hide();
            $('#cdm_city_select').show();
          }
          else{

            $('#cdm_city_select').hide();
            $scope.contactdiscovery.state.id = $scope.contactdiscovery.state.state_id;
            $('#cdm_city_input').show();
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
    };

    $scope.obj.userid=localStorage.getItem('logichron_userid');

    $('#cdm_campaign_name').focus();
    $scope.addEntry = function () {
        console.log('$scope.contactdiscovery.country.country_name');
      var nameRegex = /^\d+$/;
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var numRegex = /^\d+(\.\d{1,2})?$/;
        
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
      else if($('#cdm_email').val() == undefined || $('#cdm_email').val() == ""){
          var dialog = bootbox.dialog({
          message: '<p class="text-center">Please Enter Email-Address.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide');
              $('#cdm_email').focus(); 
          }, 1500);
      }
      else if($('#cdm_contact_number').val() == undefined || $('#cdm_contact_number').val() == ""){
          var dialog = bootbox.dialog({
          message: '<p class="text-center">Please Enter Direct Number / Landline Number.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
              $('#cdm_contact_number').focus();
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
      else if($('#cdm_ip_address').val() == undefined || $('#cdm_ip_address').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">Please Enter Ip Address.</p>',
                closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                dialog.modal('hide');
                $('#cdm_ip_address').focus(); 
              }, 1500);
      }
      else{
            // if ($scope.contactdiscovery.cdm_cm_id.cm_location == 'Yes') {
            //     $scope.contactdiscovery.country.c_search = $scope.contactdiscovery.country.country_name;
            // }
            // else{
            //     $scope.contactdiscovery.country.c_search = $scope.contactdiscovery.country.name;
            // }

                $scope.objs={
                    contact:$scope.contactdiscovery,
                    userid : $rootScope.userid
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
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">List Created!</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                        dialog.modal('hide');  
                    }, 1500);
                      // $('#btnsave').text("Save");
                      // $('#btnsave').removeAttr('disabled');
                      $scope.contactdiscovery.cdm_first_name = "";
                      $scope.contactdiscovery.cdm_last_name = "";
                      $scope.contactdiscovery.cdm_email = "";
                      $scope.contactdiscovery.cdm_contact_number = "";
                      $scope.contactdiscovery.cdm_address = "";
                      $scope.contactdiscovery.cdm_postal_code = "";
                      $scope.contactdiscovery.cdm_country = ""; 
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


});