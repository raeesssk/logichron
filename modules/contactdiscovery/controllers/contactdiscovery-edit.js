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



  $('#cdm_state_input').hide();
  $('#cdm_state_select').hide();
  $('#cdm_city_input').hide();
  $('#cdm_city_select').hide();

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
    $scope.stateList=[];
    $scope.cityList=[];

     $scope.locationList=[];

      $scope.contactdiscovery.country = '';
      $scope.contactdiscovery.state = '';
      $scope.contactdiscovery.city = '';

      $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/'+$scope.jobId,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(contactdiscoveryObj)
          {
            console.log(contactdiscoveryObj);
            contactdiscoveryObj.forEach(function (value, key) {

            // console.log(value.cdm_state);
            // $scope.contactdiscovery.country.c_search = value.cdm_country;
            // $scope.contactdiscovery.state = value.cdm_state;

                if(value.cm_location == "No"){
                    $http({
                            method: 'POST',
                            url: $rootScope.baseURL+'/contact/getcountryname/',
                            data: value,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj2)
                        {  
                            value.country = obj2[0];
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
                            method: 'POST',
                            url: $rootScope.baseURL+'/contact/getstatename/',
                            data: value,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj2)
                        {  
                            value.state = obj2[0];
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
                            method: 'POST',
                            url: $rootScope.baseURL+'/contact/getcityname/',
                            data: value,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                        })
                        .success(function(obj2)
                        {  
                            value.city = obj2[0];
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
                    // value.levels={};
                    // value.departments={};
                    // value.domains={};
                    // value.country={};
                    // value.companies={};
                    // value.industries={};
                    // value.sizes={};
                    // value.revenues={};
                    // value.assets={};

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
                                value.cjlm_job_level = value.cdm_job_level;
                            }
                            else
                            {
                                value.cjlm_job_level=value.cdm_job_level;
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
                                    value.cdm_department = value.cdm_dept;
                                }
                                else
                                {
                                    value.cdm_department=value.cdm_dept;
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
            

                            // $http({
                            //         method: 'GET',
                            //         url: $rootScope.baseURL+'/campaign/account/'+value.cdm_cm_id,
                            //         headers: {'Content-Type': 'application/json',
                            //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                            //     })
                            //     .success(function(obj)
                            //     {  
                            //         if(obj.length > 0){
                            //             $scope.companyList = angular.copy(obj);
                            //             value.companies.amcm_company = value.cdm_company_name;
                            //         }
                            //         else
                            //         {
                            //             value.companies.amcm_company=value.cdm_company_name;
                            //         }
                                    
                            //     })
                            //     .error(function(data) 
                            //     {   
                            //           var dialog = bootbox.dialog({
                            //             message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                            //                 closeButton: false
                            //             });
                            //             setTimeout(function(){
                            //                 dialog.modal('hide'); 
                            //             }, 1500);            
                            //     });


                    // $http({
                    //         method: 'GET',
                    //         url: $rootScope.baseURL+'/campaign/geo/'+value.cdm_cm_id,
                    //         headers: {'Content-Type': 'application/json',
                    //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    //     })
                    //     .success(function(obj)
                    //     {  
                    //         if(obj.length > 0){
                    //             $scope.countryList = angular.copy(obj);
                    //             value.country.cgm_geo = value.cdm_country;
                    //         }
                    //         else
                    //         {
                    //             value.country.cgm_geo=value.cdm_country;
                    //         }
                            
                    //     })
                    //     .error(function(data) 
                    //     {   
                    //           var dialog = bootbox.dialog({
                    //             message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    //                 closeButton: false
                    //             });
                    //             setTimeout(function(){
                    //                 dialog.modal('hide'); 
                    //             }, 1500);            
                    //     });

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
                                value.cim_industries = value.cdm_industry;
                            }
                            else
                            {
                                value.cim_industries=value.cdm_industry;
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
                                value.cesm_employee_size = value.cdm_company_size;
                            }
                            else
                            {
                                value.cesm_employee_size=value.cdm_company_size;
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
                                value.crem_revenue = value.cdm_revenue;
                            }
                            else
                            {
                                value.crem_revenue=value.cdm_revenue;
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
                                value.cam_campaign_asset = value.cdm_asset;
                            }
                            else
                            {
                                value.cam_campaign_asset=value.cdm_asset;
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


                    // $http({
                    //         method: 'GET',
                    //         url: $rootScope.baseURL+'/campaign/allowdomain/'+value.cdm_cm_id,
                    //         headers: {'Content-Type': 'application/json',
                    //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    //     })
                    //     .success(function(obj)
                    //     {  
                    //         if(obj.length > 0){
                    //             $scope.aldomainList = angular.copy(obj);
                    //             value.domains.adcm_website = value.cdm_domain;
                    //         }
                    //         else
                    //         {
                    //             value.domains.adcm_website=value.cdm_domain;
                    //         }
                            
                    //     })
                    //     .error(function(data) 
                    //     {   
                    //           var dialog = bootbox.dialog({
                    //             message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    //                 closeButton: false
                    //             });
                    //             setTimeout(function(){
                    //                 dialog.modal('hide'); 
                    //             }, 1500);            
                    //     });

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

                    // $http({
                    //         method: 'GET',
                    //         url: $rootScope.baseURL+'/campaign/location/'+value.cdm_cm_id,
                    //         headers: {'Content-Type': 'application/json',
                    //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    //     })
                    //     .success(function(obj)
                    //     {  
                    //         if(obj.length > 0){
                    //             $scope.countryList = angular.copy(obj);
                    //             value.country_name = value.cdm_country;
                    //         }
                    //         else
                    //         {
                    //             value.country_name=value.cdm_country;
                    //         }
                            
                    //     })
                    //     .error(function(data) 
                    //     {   
                    //           var dialog = bootbox.dialog({
                    //             message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    //                 closeButton: false
                    //             });
                    //             setTimeout(function(){
                    //                 dialog.modal('hide'); 
                    //             }, 1500);            
                    //     });


                    // if(value.cm_supression_file == "Yes"){   
                    //     $http({
                    //             method: 'GET',
                    //             url: $rootScope.baseURL+'/campaign/supression/'+value.cdm_cm_id,
                    //             headers: {'Content-Type': 'application/json',
                    //                     'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    //         })
                    //         .success(function(obj)
                    //         {  
                    //             obj.forEach(function(val,key){
                    //               $scope.suppList.push(val);
                    //             });
                    //         })
                    //         .error(function(data) 
                    //         {   
                    //               var dialog = bootbox.dialog({
                    //                 message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    //                     closeButton: false
                    //                 });
                    //                 setTimeout(function(){
                    //                     dialog.modal('hide'); 
                    //                 }, 1500);            
                    //         });
                    // }

                    // if(value.cm_denied_domain == "Yes"){
                    //     $http({
                    //             method: 'GET',
                    //             url: $rootScope.baseURL+'/campaign/deniedomain/'+value.cdm_cm_id,
                    //             headers: {'Content-Type': 'application/json',
                    //                     'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    //         })
                    //         .success(function(obj)
                    //         {  
                    //             obj.forEach(function(val,key){
                    //               $scope.denydomain.push(val);
                    //             });
                    //         })
                    //         .error(function(data) 
                    //         {   
                    //             var dialog = bootbox.dialog({
                    //                 message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    //                     closeButton: false
                    //             });
                    //             setTimeout(function(){
                    //                     dialog.modal('hide'); 
                    //             }, 1500);            
                    //         });
                    // }
console.log(value);
                    // if(value.cm_location == "Yes"){
                    //       $http({
                    //         method: 'GET',
                    //         url: $rootScope.baseURL+'/campaign/location/'+value.cdm_cm_id,
                    //         headers: {'Content-Type': 'application/json',
                    //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    //       })
                    //       .success(function(obj)
                    //       {  
                    //         console.log(obj);
                    //         if(obj.length > 0){
                    //             $scope.locationList = angular.copy(obj);                         
                    //             value.country = value.cdm_country;
                    //         }
                    //         else
                    //         {                              
                    //             value.country = value.cdm_country;
                    //         }   


      // $scope.stateList = [];
      // $scope.limit={};
      // $scope.limit.c_id = $scope.contactdiscovery.country_name.country_id;
      // $scope.limit.cm_id = $scope.contactdiscovery.cm_id;
                    //                         $http({
                    //                           method: 'POST',
                    //                           url: $rootScope.baseURL+'/campaign/location/states',
                    //                           data: $scope.limit,
                    //                           headers: {'Content-Type': 'application/json',
                    //                                   'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                    //                         })
                    //                         .success(function(obj)
                    //                         {  
                    //                             console.log(obj);
                    //                           obj.forEach(function(val,key){
                    //                             $scope.stateList.push(val);
                    //                           });

                    //                           if(obj.length > 0){
                    //                             $('#cdm_state_input').hide();
                    //                             $('#cdm_state_select').show();
                    //                           }
                    //                           else{

                    //                             $('#cdm_state_select').hide();
                    //                             $scope.contactdiscovery.country_name.id = $scope.contactdiscovery.country_name.country_id;
                    //                             $('#cdm_state_input').show();
                    //                           }

                    //                           if($("#cdm_state_input").is("input")) {
                    //                             $('#cdm_city_select').hide();
                    //                               $('#cdm_city_input').show();
                    //                           }
                    //                         })
                    //                         .error(function(data) 
                    //                         {   
                    //                             var dialog = bootbox.dialog({
                    //                               message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    //                                   closeButton: false
                    //                               });
                    //                               setTimeout(function(){
                    //                                   dialog.modal('hide'); 
                    //                               }, 1500);            
                    //                         });
                    //           // $('#cdm_state_select').show();
                    //           // $('#cdm_city_select').show();
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
                    // else{
                    //   $('#cdm_state_input').show();
                    //   $('#cdm_city_input').show();  
                    // }

                    $scope.contactdiscovery = value;
                    $scope.contactdiscovery.cdm_campaign_name = value.cm_campaign_name;
                    $scope.contactdiscovery.cdm_email = value.cdm_email_id;
                    $scope.contactdiscovery.cdm_contact_number = value.cdm_mobile;

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
    

    //  //Country Name list record for country Name input
    // $scope.getSearchCountry = function(vals) {
    //   var searchTerms = {search: vals};
    //     const httpOptions = {
    //         headers: {
    //           'Content-Type':  'application/json',
    //           'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
    //         }
    //     };
    //     return $http.post($rootScope.baseURL+'/location/countries/typeahead/search', searchTerms, httpOptions).then((result) => {
    //         return result.data;
    //     });
    // };
    // $scope.getSearchState = function(vals) {
    //     console.log($scope.contactdiscovery.country_name.id);
    //     if($('#cdm_country').val() == undefined || $('#cdm_country').val() == "" || $scope.contactdiscovery.country_name.id == undefined){
    //         var dialog = bootbox.dialog({
    //             message: "<p class='text-center'>Please Select Country!</p>",
    //                 closeButton: false
    //             }); 
    //             dialog.find('.modal-body').addClass("btn-danger");
    //             setTimeout(function(){
    //                 dialog.modal('hide'); 
    //                 $('#cm_country').focus();
    //                 // $scope.location.state = '';
    //             }, 1500);
    //     }
    //     else{
    //       var searchTerms = {search: vals, c_id : $scope.contactdiscovery.country_name.id};
    //         const httpOptions = {
    //             headers: {
    //               'Content-Type':  'application/json',
    //               'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
    //             }
    //         };
    //         return $http.post($rootScope.baseURL+'/location/states/typeahead/search', searchTerms, httpOptions).then((result) => {
    //             return result.data;
    //         });
    //     }
    // };
    // $scope.getSearchCity = function(vals) {
      
    //     if($('#cdm_state_input').val() == undefined || $('#cdm_state_input').val() == "" || $scope.contactdiscovery.state.id == undefined){
    //         var dialog = bootbox.dialog({
    //             message: "<p class='text-center'>Please Select State!</p>",
    //                 closeButton: false
    //             }); 
    //             dialog.find('.modal-body').addClass("btn-danger");
    //             setTimeout(function(){
    //                 dialog.modal('hide'); 
    //             $('#cm_state').focus();                
    //             // $scope.contactdiscovery.city = '';
    //             }, 1500);
    //     }
    //     else{
    //         var searchTerms = {search: vals, s_id : $scope.contactdiscovery.state.id};
    //             const httpOptions = {
    //                 headers: {
    //                   'Content-Type':  'application/json',
    //                   'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
    //                 }
    //             };
    //             return $http.post($rootScope.baseURL+'/location/cities/typeahead/search', searchTerms, httpOptions).then((result) => {
    //                 return result.data;

    //             });
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
      $scope.limit.c_id = $scope.contactdiscovery.country_name.country_id;
      $scope.limit.cm_id = $scope.contactdiscovery.cm_id;

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/campaign/location/states',
          data: $scope.limit,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {  
            console.log(obj);
          obj.forEach(function(val,key){
            $scope.stateList.push(val);
          });

          if(obj.length > 0){
            $('#cdm_state_input').hide();
            $('#cdm_state_select').show();
          }
          else{

            $('#cdm_state_select').hide();
            $scope.contactdiscovery.country_name.id = $scope.contactdiscovery.country_name.country_id;
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
      $scope.limit.s_id = $scope.contactdiscovery.state_name.state_id;
      $scope.limit.cm_id = $scope.contactdiscovery.cm_id;

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

    
    
    $scope.blurFirstLastName = function () {
      if($scope.contactdiscovery.cm_contact_name == "Yes"){

        if($('#cdm_first_name').val() == undefined || $('#cdm_first_name').val() == "" || $('#cdm_last_name').val() == undefined || $('#cdm_last_name').val() == ""){
            
        }
        else{
          $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/firstlastname_edit/typeahead/search',
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
      else if($scope.contactdiscovery.cm_email == "Yes"){
            // angular.forEach($scope.emailList, function(value,key){
            //     if($('#cdm_email').val().toLowerCase() == value.cem_email.toLowerCase())
            //       $scope.tempEmailList.push(value);
            // });

            $http({
                    method: 'POST',
                    url: $rootScope.baseURL+'/campaign/email_edit/typeahead/search',
                    data: $scope.contactdiscovery,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                  })
                  .success(function(obj)
                  {    
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
                        else if($scope.contactdiscovery.cm_allow_domain == "Yes"){
                               
                                $http({
                                      method: 'POST',
                                      url: $rootScope.baseURL+'/campaign/allow_domain_edit/typeahead/search',
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
                                                  // $('#cdm_first_name').focus();
                                              }, 1500);
                                        }
                                        else{
                                              if($scope.contactdiscovery.cm_allow_domain == "Yes"){
                                                    $http({
                                                          method: 'POST',
                                                          url: $rootScope.baseURL+'/contact/allow_domain_limit_edit/typeahead/search',
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
                                                                if(obj[0].domain > parseInt(parseInt($scope.contactdiscovery.cm_domain_limit) * 3))
                                                                {
                                                          // console.log(obj[0].domain <= parseInt(parseInt($scope.contactdiscovery.cm_domain_limit));
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
                                                                if(obj[0].domain > parseInt(parseInt(obj[0].adcm_domain_limit) * 3))
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
                                                          url: $rootScope.baseURL+'/contact/domain_limit_edit/typeahead/search',
                                                          data: $scope.contactdiscovery,
                                                          headers: {'Content-Type': 'application/json',
                                                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                                        })
                                                        .success(function(obj)
                                                        {    
                                                          if(obj.length == 1 && (obj[0].domain > parseInt(parseInt(obj[0].cm_domain_limit) * 3)))
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
                        else if($scope.contactdiscovery.cm_denied_domain == "Yes"){
                                     $http({
                                            method: 'POST',
                                            url: $rootScope.baseURL+'/campaign/denied_domain_edit/typeahead/search',
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

            if($scope.contactdiscovery.cm_allow_domain == "Yes"){
                    $http({
                          method: 'POST',
                          url: $rootScope.baseURL+'/campaign/allow_domain_edit/typeahead/search',
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
                                  if($scope.contactdiscovery.cm_allow_domain == "Yes"){
                                    $http({
                                          method: 'POST',
                                          url: $rootScope.baseURL+'/contact/allow_domain_limit_edit/typeahead/search',
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
                                                if(obj[0].domain > parseInt(parseInt($scope.contactdiscovery.cm_domain_limit) * 3))
                                                {
                                          // console.log(obj[0].domain <= parseInt(parseInt($scope.contactdiscovery.cm_domain_limit));
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
                                                if(obj[0].domain > parseInt(parseInt(obj[0].adcm_domain_limit) * 3))
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
                                          url: $rootScope.baseURL+'/contact/domain_limit_edit/typeahead/search',
                                          data: $scope.contactdiscovery,
                                          headers: {'Content-Type': 'application/json',
                                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                                        })
                                        .success(function(obj)
                                        {    
                                          if(obj.length == 1 && (obj[0].domain > parseInt(parseInt(obj[0].cm_domain_limit) * 3)))
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
            else if($scope.contactdiscovery.cm_denied_domain == "Yes"){
                  $http({
                          method: 'POST',
                          url: $rootScope.baseURL+'/campaign/denied_domain_edit/typeahead/search',
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
      else if($scope.contactdiscovery.cm_contact_number  == "Yes"){
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
                url: $rootScope.baseURL+'/campaign/contact_number_edit/typeahead/search',
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
      if($scope.contactdiscovery.cm_account_list == "Yes"){
          if($('#cdm_company_name').val() == undefined || $('#cdm_company_name').val() == ""){
            
          }
          else{
    console.log('t4');
            console.log($scope.contactdiscovery);
            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/company_name_account_edit/typeahead/search',
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
      
      else if($scope.contactdiscovery.cm_supression_file == "Yes"){

          if($('#cdm_company_name').val() == undefined || $('#cdm_company_name').val() == ""){
            
          }
          else{
            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/company_name_supp_edit/typeahead/search',
                data: $scope.contactdiscovery,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {    
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
          message: '<p class="text-center">Please Enter Or Select Job Level.</p>',
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
          message: '<p class="text-center">Please Enter Or Select Department.</p>',
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
          $scope.dept = $scope.contactdiscovery.cdm_department.toLowerCase();
          $scope.level = $scope.contactdiscovery.cjlm_job_level.toLowerCase();

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
        
        // if($('#cdm_campaign').val() == undefined || $('#cdm_campaign').val() == "" || $scope.contactdiscovery.cm_id == undefined){
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

        // $scope.contactdiscovery.country.c_search = $scope.contactdiscovery.country.name;


        $scope.contactdiscovery.c_search = $scope.contactdiscovery.cdm_country;
        $scope.contactdiscovery.state_name = $scope.contactdiscovery.cdm_state;
        $scope.contactdiscovery.city_name = $scope.contactdiscovery.cdm_city;
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

                          var dialog = bootbox.dialog({
                            message: '<p class="text-center">Contact Discovery Updated.</p>',
                                closeButton: false
                            });
                            dialog.find('.modal-body').addClass("btn-success");
                            setTimeout(function(){
                            $('#btnsave').text("Update");
                            $('#btnsave').removeAttr('disabled');
                           window.location.href = '#/contactdiscovery/joblist'; 
                                dialog.modal('hide'); 
                            }, 1500); 

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