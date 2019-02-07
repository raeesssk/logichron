// import admin
angular.module('campaign').controller('campaignAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {
  
    $scope.campaign = {};
    $scope.obj={};

    $scope.restrict={};
    $scope.oldrestrictList=[];
    $scope.restrictList=[];

    $scope.account={};
    $scope.oldaccountList=[];
    $scope.accountList=[];

    $scope.supression={};
    $scope.oldsupressionList=[];
    $scope.supressionList=[];

    $scope.domain_limit={};
    $scope.olddomainList=[];
    $scope.domainList=[];

    $scope.Employee_sizes={};
    $scope.oldempsizeList=[];
    $scope.empsizeList=[];

    $scope.titled={};
    $scope.oldtitleList=[];
    $scope.titleList=[];

    $scope.Vertical = {};
    $scope.oldverticalList=[];
    $scope.verticalList=[];

    $scope.allow_domain={};
    $scope.oldallowDomainList=[];
    $scope.allowDomainList=[];

    $scope.Revenue={};
    $scope.oldrevenueList=[];
    $scope.revenueList=[];

    $scope.custom_question={};
    $scope.oldcustomQuestionList=[];
    $scope.customQuestionList=[];

    $scope.denied_domain={};
    $scope.olddeniedDomainList=[];
    $scope.deniedDomainList=[];

    $scope.campAsset={};
    $scope.oldcampAssetList=[];
    $scope.campAssetList=[];

    $scope.industry={};
    $scope.oldindustryList=[];
    $scope.industryList=[];

    $scope.departments={};
    $scope.olddepartmentList=[];
    $scope.departmentList=[];

    $scope.JobLevel={};
    $scope.oldlevelList=[];
    $scope.levelList=[];

    $scope.contact_name={};
    $scope.oldcontactnameList=[];
    $scope.contactnameList=[];

    $scope.email={};
    $scope.oldemailList=[];
    $scope.emailList=[];

    $scope.contactnumber={};
    $scope.oldcontactnumberList=[];
    $scope.contactnumberList=[];

    $scope.keyword_allow={};
    $scope.oldkeyword_allowList=[];
    $scope.keyword_allowList=[];

    $scope.keyword_disallow={};
    $scope.oldkeyword_disallowList=[];
    $scope.keyword_disallowList=[];


    $scope.locationList = [];

    $scope.campaign.userid=localStorage.getItem('logichron_userid');
    $scope.account.userid=localStorage.getItem('logichron_userid');
    $scope.supression.userid=localStorage.getItem('logichron_userid');
    $scope.allow_domain.userid=localStorage.getItem('logichron_userid');
    $scope.custom_question.userid=localStorage.getItem('logichron_userid');
    $scope.denied_domain.userid=localStorage.getItem('logichron_userid');

	$scope.apiURL = $rootScope.baseURL+'/campaign/add';
    

    $scope.url = 'Tried to enter campaign create Page';

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
    // var value = '#/campaign/create';
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

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.campaign.cm_date = (parseInt(mm)+parseInt(1)) + "/"+ dd +"/"+ yyyy;

    
    $('#cm_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        autoclose: true,
        orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.campaign.cm_date = $('#cm_date').val();
          }
    }).datepicker('setDate', 'today');

    $('#cm_first_dely').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: true,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.campaign.cm_first_dely = $('#cm_first_dely').val();
          }
    }).datepicker('setDate', 'today');

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
    }).datepicker('setDate', 'today');

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

    $('#cm_country').keydown(function(){
      $scope.location.state = "";
      $scope.location.city = "";
    });
    $('#cm_state').keydown(function(){
      $scope.location.city = "";
    });

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
        if($('#cm_country').val() == undefined || $('#cm_country').val() == "" || $scope.location.country.id == undefined ){
            var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Select Country!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_country').focus();
                    $scope.location.state = '';
                }, 1500);
        }
        else{
          var searchTerms = {search: vals, c_id : $scope.location.country.id};
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

        if($('#cm_country').val() == undefined || $('#cm_country').val() == "" || $scope.location.country.id == undefined ){
              var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Select Country!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#cm_country').focus();
                $scope.location.state = '';
                $scope.location.city = '';
                }, 1500);
        }
        else if($('#cm_state').val() == undefined || $('#cm_state').val() == "" || $scope.location.state.id == undefined ){
            var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Select State!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#cm_state').focus();                
                $scope.location.city = '';
                }, 1500);
        }
        else{
            var searchTerms = {search: vals, s_id : $scope.location.state.id};
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
    $scope.addLocationList = function(){
        if($('#cm_country').val() == undefined || $('#cm_country').val() == "" || $scope.location.country.id == undefined ){
              var dialog = bootbox.dialog({
                message: "<p class='text-center'>Please Select Country!</p>",
                    closeButton: false
                }); 
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                $('#cm_country').focus();
                $scope.location.state = '';
                $scope.location.city = '';
                }, 1500);
        }
        else{
            if($scope.location.state == undefined ){
                $scope.location.s_state = undefined;
            }
            else
            {
                $scope.location.s_state = $scope.location.state.id;
            }

            if($scope.location.city == undefined ){
                $scope.location.c_city = undefined;
            }
            else{
                $scope.location.c_city = $scope.location.city.id;
            }

            $scope.locationList.push($scope.location);
            $scope.location = '';
            $('#cm_country').focus();
        }

        
    };
    $scope.removeLocationList = function(index){
        $scope.locationList.splice(index,1);
    };

    $scope.loadFile = function (files) {
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    }  
  
    $scope.handleFile = function () {
        if($('#fileimport').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select Campaign File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_date').val() == undefined || $('#cm_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cm_date').focus(); 
            }, 1500);
        }
        else if($('#cm_first_dely').val() == undefined || $('#cm_first_dely').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The First Delivery Date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cm_first_dely').focus(); 
            }, 1500);
        }
        else if($('#cm_end_date').val() == undefined || $('#cm_end_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter End Delivery Date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#cm_end_date').focus(); 
            }, 1500);
        }
        else{
            var file = $scope.selectedFile;  
    
            if (file) {  
                var reader = new FileReader();  
                reader.onload = function (e) {  
    
                    var data = e.target.result;                
                    var workbook = XLSX.read(data, { type: 'binary' });                
                    // var first_sheet_name = workbook.SheetNames[0];  
                    var data_campaign = XLSX.utils.sheet_to_json(workbook.Sheets['campaign']);  
                    var data_restriction = XLSX.utils.sheet_to_json(workbook.Sheets['restriction']);
                    var data_account_list = XLSX.utils.sheet_to_json(workbook.Sheets['account_list']);  
                    var data_supression_file = XLSX.utils.sheet_to_json(workbook.Sheets['supression_file']); 
                    var data_domain_limit = XLSX.utils.sheet_to_json(workbook.Sheets['domain_limit']);
                    var data_employee_size = XLSX.utils.sheet_to_json(workbook.Sheets['employee_size']);
                    var data_job_title = XLSX.utils.sheet_to_json(workbook.Sheets['job_title']);
                    var data_vertical = XLSX.utils.sheet_to_json(workbook.Sheets['vertical']);
                    // var data_geo = XLSX.utils.sheet_to_json(workbook.Sheets['geo']);
                    var data_allow_domain = XLSX.utils.sheet_to_json(workbook.Sheets['allow_domain']);
                    var data_revenue = XLSX.utils.sheet_to_json(workbook.Sheets['revenue']);
                    var data_custom_question = XLSX.utils.sheet_to_json(workbook.Sheets['custom_question']);
                    var data_denied_domain = XLSX.utils.sheet_to_json(workbook.Sheets['denied_domain']);
          
                    var data_campaign_asset = XLSX.utils.sheet_to_json(workbook.Sheets['campaign_asset']);
                    var data_industry = XLSX.utils.sheet_to_json(workbook.Sheets['industry']);
                    var data_department = XLSX.utils.sheet_to_json(workbook.Sheets['department']);
                    // var data_method = XLSX.utils.sheet_to_json(workbook.Sheets['method']);
                    var data_job_function_level = XLSX.utils.sheet_to_json(workbook.Sheets['job_function_level']);

                    var data_contact_name = XLSX.utils.sheet_to_json(workbook.Sheets['contact_name']);
                    var data_email = XLSX.utils.sheet_to_json(workbook.Sheets['email']);
                    var data_contact_number = XLSX.utils.sheet_to_json(workbook.Sheets['contact_number']);

                    var data_keyword_allow = XLSX.utils.sheet_to_json(workbook.Sheets['keyword_allow']);
                    // var data_keyword_disallow = XLSX.utils.sheet_to_json(workbook.Sheets['keyword_disallow']);


                    // $scope.campaign.cm_date = $scope.campaign.cm_date;
                    if (data_campaign[0].cm_campaign_name == undefined) {
                           
                            var dialog = bootbox.dialog({
                            message: '<p class="text-center">Excel Sheet is Empty.</p>',
                                closeButton: false
                            });
                            dialog.find('.modal-body').addClass("btn-danger");
                            setTimeout(function(){
                                    $('#fileimport').val('');
                                    $scope.selectedFile = ''; 
                                dialog.modal('hide'); 
                            }, 1500);
                    } 
                    else{
                        $scope.campaign = data_campaign[0];

                            if (data_contact_name.length > 0) {
                                $scope.campaign.cm_contact_name = "Yes";
                                data_contact_name.forEach(function(value,key){
                                    $scope.oldcontactnameList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_contact_name = "No";
                            }


                            if (data_restriction.length > 0) {
                                $scope.campaign.cm_restriction = "Yes";
                                data_restriction.forEach(function(value,key){
                                    $scope.oldrestrictList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_restriction = "No";
                            }


                            if (data_account_list.length > 0) {
                                $scope.campaign.cm_account_list = "Yes";
                                data_account_list.forEach(function(value,key){
                                    $scope.oldaccountList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_account_list = "No";
                            }


                            if (data_supression_file.length > 0) {
                                $scope.campaign.cm_supression_file = "Yes";
                                data_supression_file.forEach(function(value,key){
                                    $scope.oldsupressionList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_supression_file = "No";
                            }


                            if (data_domain_limit.length > 0) {
                                $scope.campaign.cm_domain_limit = "Yes";
                                data_domain_limit.forEach(function(value,key){
                                    $scope.olddomainList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_domain_limit = "No";
                            }


                            if (data_employee_size.length > 0) {
                                $scope.campaign.cm_emp_size = "Yes";
                                data_employee_size.forEach(function(value,key){
                                    $scope.oldempsizeList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_emp_size = "No";
                            }


                            if (data_job_title.length > 0) {
                                $scope.campaign.cm_title = "Yes";
                                data_job_title.forEach(function(value,key){
                                    $scope.oldtitleList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_title = "No";
                            }


                            if (data_vertical.length > 0) {
                                $scope.campaign.cm_vertical = "Yes";
                                data_vertical.forEach(function(value,key){
                                    $scope.oldverticalList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_vertical = "No";
                            }

                            if (data_allow_domain.length > 0) {
                                $scope.campaign.cm_allow_domain = "Yes";
                                data_allow_domain.forEach(function(value,key){
                                    $scope.oldallowDomainList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_allow_domain = "No";
                            }


                            if (data_revenue.length > 0) {
                                $scope.campaign.cm_revenue = "Yes";
                                data_revenue.forEach(function(value,key){
                                    $scope.oldrevenueList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_revenue = "No";
                            }


                            if (data_custom_question.length > 0) {
                                $scope.campaign.cm_custom_question = "Yes";
                                data_custom_question.forEach(function(value,key){
                                    $scope.oldcustomQuestionList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_custom_question = "No";
                            }


                            if (data_denied_domain.length > 0) {
                                $scope.campaign.cm_denied_domain = "Yes";
                                data_denied_domain.forEach(function(value,key){
                                    $scope.olddeniedDomainList.push(value);

                                });
                            }
                            else{
                                $scope.campaign.cm_denied_domain = "No";
                            }


                            if (data_campaign_asset.length > 0) {
                                $scope.campaign.cm_campaign_asset = "Yes";
                                data_campaign_asset.forEach(function(value,key){
                                    $scope.oldcampAssetList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_campaign_asset = "No";
                            }


                            if (data_industry.length > 0) {
                                $scope.campaign.cm_industry = "Yes";
                                data_industry.forEach(function(value,key){
                                    $scope.oldindustryList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_industry = "No";
                            }


                            if (data_department.length > 0) {
                                $scope.campaign.cm_dept = "Yes";
                                data_department.forEach(function(value,key){
                                    $scope.olddepartmentList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_dept = "No";
                            }

                            if (data_job_function_level.length > 0) {
                                $scope.campaign.cm_job = "Yes";
                                data_job_function_level.forEach(function(value,key){
                                    $scope.oldlevelList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_job = "No";
                            }


                            if (data_email.length > 0) {
                                $scope.campaign.cm_email = "Yes";
                                data_email.forEach(function(value,key){
                                    $scope.oldemailList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_email = "No";
                            }
                            if (data_contact_number.length > 0) {
                                $scope.campaign.cm_contact_number = "Yes";
                                data_contact_number.forEach(function(value,key){
                                    $scope.oldcontactnumberList.push(value);
                                });
                            }
                            else{
                                $scope.campaign.cm_contact_number = "No";
                            }

                            if ($scope.locationList.length > 0) {
                                $scope.campaign.cm_location = "Yes";
                            }
                            else{
                                $scope.campaign.cm_location = "No"; 
                            }

                            // if (data_keyword_allow.length > 0) {
                            //     $scope.campaign.cm_keyword_allow = "Yes";
                            //     data_keyword_allow.forEach(function(value,key){
                            //         $scope.oldkeyword_allowList.push(value);
                            //     });
                            // }
                            // else{
                            //     $scope.campaign.cm_keyword_allow = "No";
                            // }
                            // if (data_keyword_disallow.length > 0) {
                            //     $scope.campaign.cm_keyword_disallow = "Yes";
                            //     data_keyword_disallow.forEach(function(value,key){
                            //         $scope.oldkeyword_disallowList.push(value);
                            //     });
                            // }
                            // else{
                            //     $scope.campaign.cm_keyword_disallow = "No";
                            // }



                        $scope.save(); 
                    }
                }  
                reader.onerror = function (ex) {  
                }  
                reader.readAsBinaryString(file);  
            }  
      }
        
    };  
  
    $scope.save = function () {        
        $scope.campaign.cm_date = $('#cm_date').val();
        $scope.campaign.cm_first_dely = $('#cm_first_dely').val();
        $scope.campaign.cm_end_date = $('#cm_end_date').val();
        $scope.obj={
            userid : $rootScope.userid,
            campaign : $scope.campaign,
            restrictList : $scope.oldrestrictList,
            accountList : $scope.oldaccountList,
            supressionList : $scope.oldsupressionList,
            domainList : $scope.olddomainList,
            empsizeList : $scope.oldempsizeList,
            titleList : $scope.oldtitleList,
            verticalList : $scope.oldverticalList,
            // geoList : $scope.oldgeoList,
            allowDomainList:$scope.oldallowDomainList,
            revenueList : $scope.oldrevenueList,
            customQuestionList:$scope.oldcustomQuestionList,
            deniedDomainList:$scope.olddeniedDomainList,
            campAssetList : $scope.oldcampAssetList,
            industryList : $scope.oldindustryList,
            departmentList : $scope.olddepartmentList,
            // methodList : $scope.oldmethodList,
            levelList : $scope.oldlevelList,

            contactnameList : $scope.oldcontactnameList,
            emailList : $scope.oldemailList,
            contactnumberList : $scope.oldcontactnumberList,

            locationList : $scope.locationList,

            keyword_allowList : $scope.oldkeyword_allowList,
            keyword_disallowList : $scope.oldkeyword_disallowList
        }
// console.log($scope.olddeniedDomainList);
        $http({  
            method: "POST",  
            // url: $rootScope.baseURL+'/contact/import',  
            url: $scope.apiURL,
            data: $scope.obj,
            headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function (data) { 
                console.log(data);
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Data Inserted!!!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-success");
                setTimeout(function(){

                    $('#fileimport').val('');
                    $scope.selectedFile = ''; 
                    $scope.campaign.cm_first_dely = '';
                    $scope.campaign.cm_end_date = '';
                    $scope.locationList = [];
                    dialog.modal('hide'); 
                }, 1500); 
            })
            .error(function(data){  
                console.log(data); 
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
                });
                setTimeout(function(){
                    dialog.modal('hide'); 
                }, 3001);             
            });
  
    };

});