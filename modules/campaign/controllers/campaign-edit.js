// import admin
angular.module('campaign').controller('campaignEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    $scope.campaign={};

    $scope.account={};
    $scope.accountList=[];
    $scope.oldaccountList=[];
    $scope.removeAccount=[];
    $scope.supression={};
    $scope.oldsupressionList=[];
    $scope.removesuppressionList=[];
    $scope.supressionList=[];
    $scope.allow_domain={};
    $scope.allowDomainList=[];
    $scope.oldallowDomainList=[];
    $scope.removeAllowedDomain=[];
    $scope.custom_question={};
    $scope.customQuestionList=[];
    $scope.oldcustomQuestionList=[];
    $scope.removecustomQuestion=[];
    $scope.denied_domain={};
    $scope.deniedDomainList=[];
    $scope.olddeniedDomainList=[];
    $scope.removeDeniedDomain=[];
    $scope.titled={};
    $scope.titleList=[];
    $scope.oldtitleList=[];
    $scope.removetitle=[];
    $scope.industry={};
    $scope.industryList=[];
    $scope.oldindustryList=[];
    $scope.removeindustry=[];
    $scope.restrict={};
    $scope.restrictList=[];
    $scope.oldrestrictList=[];
    $scope.removerestrict=[];
    $scope.domain_limit={};
    $scope.domainList=[];
    $scope.olddlimitList=[];
    $scope.removedlimit=[];
    $scope.Employee_sizes={};
    $scope.empsizeList=[];
    $scope.oldempsizeList=[];
    $scope.removeempsize=[];
    $scope.Vertical = {};
    $scope.VerticalList=[];
    $scope.oldverticalList=[];
    $scope.removevertical=[];
    $scope.geos = {};
    $scope.geoList=[];
    $scope.oldgeoList=[];
    $scope.removegeo=[];
    $scope.campAsset={};
    $scope.campAssetList=[];
    $scope.oldassetList=[];
    $scope.removeasset=[];
    $scope.departments={};
    $scope.departmentList=[];
    $scope.olddeptList=[];
    $scope.removdept=[];
    $scope.methods={};
    $scope.methodList=[];
    $scope.oldmethodList=[];
    $scope.removemethod=[];
    $scope.Revenue={};
    $scope.revenueList=[];
    $scope.oldrevenueList=[];
    $scope.removerevenue=[];
    $scope.JobLevel={};
    $scope.levelList=[];
    $scope.oldlevelList=[];
    $scope.removelevel=[];

    $scope.campaign.userid=localStorage.getItem('logichron_userid');

	$scope.campaignId = $routeParams.campaignId;
    $scope.apiURL = $rootScope.baseURL+'/campaign/edit/'+$scope.campaignId;

    $scope.getcampaignpermission=function(){
      if(localStorage.getItem('logichron_campaignedit_permission') == 0){
        console.log(localStorage.getItem('logichron_campaignedit_permission'));
        var dialog = bootbox.dialog({
        message: '<p class="text-center">You Are Not Authorized</p>',
            closeButton: false
        });
        dialog.find('.modal-body').addClass("btn-danger");
        setTimeout(function(){
            dialog.modal('hide'); 
        }, 1500);
        window.history.back();
      }
    };
    $scope.getcampaignpermission();

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

    $('#cm_first_dely').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
        next:   'xdsoft_next',
        prev : 'xdsoft_prev',
          onChangeDateTime: function (dp, $input) {
              $scope.campaign.cm_first_dely = $('#cm_first_dely').val();
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
    
  $scope.getCampaign = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/campaign/'+$scope.campaignId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(campaignObj)
	    {

	    	campaignObj.forEach(function (value, key) {

                value.cm_date=$filter('date')(value.cm_date,"mediumDate");

                value.cm_end_date=$filter('date')(value.cm_end_date,"mediumDate");

                value.cm_first_dely=$filter('date')(value.cm_first_dely,"mediumDate");
                $scope.campaign = value;
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
    
    $scope.getaccount = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/account/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldaccountList.push(value);
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
    $scope.getaccount();

    $scope.deleteoldAccntList = function(index){
      $scope.removeAccount.push($scope.oldaccountList[index]);
      $scope.oldaccountList.splice(index,1);
    };

    $scope.getsupp = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/supression/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldsupressionList.push(value);
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
    $scope.getsupp();

    $scope.deleteOldSupression = function(index){
      $scope.removesuppressionList.push($scope.oldsupressionList[index]);
      $scope.oldsupressionList.splice(index,1);
    };

    $scope.getallow = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/allowdomain/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldallowDomainList.push(value);
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
    $scope.getallow();

    $scope.deleteAllowDomain = function(index){
      $scope.removeAllowedDomain.push($scope.oldallowDomainList[index]);
      $scope.oldallowDomainList.splice(index,1);
    };

    $scope.getcustom = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/question/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldcustomQuestionList.push(value);
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
    $scope.getcustom();

    $scope.deleteCustomQuestion = function(index){
      $scope.removecustomQuestion.push($scope.oldcustomQuestionList[index]);
      $scope.oldcustomQuestionList.splice(index,1);
    };

    $scope.getdenied = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/deniedomain/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.olddeniedDomainList.push(value);
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
    $scope.getdenied();

    $scope.deleteOldDeniedDomain = function(index){
      $scope.removeDeniedDomain.push($scope.olddeniedDomainList[index]);
      $scope.olddeniedDomainList.splice(index,1);
    };

    $scope.getTitle = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/titles/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldtitleList.push(value);
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
    $scope.getTitle();

    $scope.deleteOldTitle = function(index){
      $scope.removetitle.push($scope.oldtitleList[index]);
      $scope.oldtitleList.splice(index,1);
    };

    $scope.getIndustry = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/industries/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldindustryList.push(value);
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
    $scope.getIndustry();

    $scope.deleteOldIndustry = function(index){
      $scope.removeindustry.push($scope.oldindustryList[index]);
      $scope.oldindustryList.splice(index,1);
    };

    $scope.getrest = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/restrict/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldrestrictList.push(value);
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
    $scope.getrest();

    $scope.deleteoldrest = function(index){
      $scope.removerestrict.push($scope.oldrestrictList[index]);
      $scope.oldrestrictList.splice(index,1);
    };

    $scope.getdlimit = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/dlimit/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.olddlimitList.push(value);
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
    $scope.getdlimit();

    $scope.deleteolddlimit= function(index){
      $scope.removedlimit.push($scope.olddlimitList[index]);
      $scope.olddlimitList.splice(index,1);
    };

    $scope.getempsize = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/empsize/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldempsizeList.push(value);
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
    $scope.getempsize();

    $scope.deleteoldempsize = function(index){
      $scope.removeempsize.push($scope.oldempsizeList[index]);
      $scope.oldempsizeList.splice(index,1);
    };

    $scope.getvertical = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/vertical/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldverticalList.push(value);
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
    $scope.getvertical();

    $scope.deleteoldvertical = function(index){
      $scope.removevertical.push($scope.oldverticalList[index]);
      $scope.oldverticalList.splice(index,1);
    };


    $scope.getgeo = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/geo/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldgeoList.push(value);
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
    $scope.getgeo();

    $scope.deleteOldgeo = function(index){
      $scope.removegeo.push($scope.oldgeoList[index]);
      $scope.oldgeoList.splice(index,1);
    };

    $scope.getasset = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/asset/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldassetList.push(value);
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
    $scope.getasset();

    $scope.deleteOldasset = function(index){
      $scope.removeasset.push($scope.oldassetList[index]);
      $scope.oldassetList.splice(index,1);
    };

    $scope.getdept = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/dept/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.olddeptList.push(value);
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
    $scope.getdept();

    $scope.deleteOlddept = function(index){
      $scope.removdept.push($scope.olddeptList[index]);
      $scope.olddeptList.splice(index,1);
    };

    $scope.getmethod = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/method/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldmethodList.push(value);
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
    $scope.getmethod();

    $scope.deleteOldmethod = function(index){
      $scope.removemethod.push($scope.oldmethodList[index]);
      $scope.oldmethodList.splice(index,1);
    };


    $scope.getrevenue = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/revenue/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldrevenueList.push(value);
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
    $scope.getrevenue();

    $scope.deleteOldrevenue = function(index){
      $scope.removerevenue.push($scope.oldrevenueList[index]);
      $scope.oldrevenueList.splice(index,1);
    };

    $scope.getlevel = function () {
         $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/level/'+$scope.campaignId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaignObj)
        {
            campaignObj.forEach(function (value, key) {
                $scope.oldlevelList.push(value);
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
    $scope.getlevel();

    $scope.deleteOldlevel = function(index){
      $scope.removelevel.push($scope.oldlevelList[index]);
      $scope.oldlevelList.splice(index,1);
    };



    // Show Modal on click of yes
    $('#cm_account_list').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#account_list').modal({backdrop: 'static', keyboard: false});
            $('#account_list').modal("show"); //Open Modal
        }
        else {
            if($scope.accountList.length > 0 || $scope.oldaccountList.length > 0){
                $('#accnt_delete').modal({backdrop: 'static', keyboard: false});
                $('#accnt_delete').modal("show");
                
            }
        } 
    });
    $('#cm_supression_file').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#supression_file').modal({backdrop: 'static', keyboard: false});
            $('#supression_file').modal("show"); //Open Modal
        }
        else {
            if($scope.supressionList.length > 0 || $scope.oldsupressionList.length > 0){
                $('#supression_delete').modal({backdrop: 'static', keyboard: false});
                $('#supression_delete').modal("show");
            }
        } 
    });
    $('#cm_allow_domain').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#allow_Domain').modal({backdrop: 'static', keyboard: false});
            $('#allow_Domain').modal("show"); //Open Modal
        }
        else {
            if($scope.allowDomainList.length > 0 || $scope.oldallowDomainList.length > 0){
                $('#allowed_delete').modal({backdrop: 'static', keyboard: false});
                $('#allowed_delete').modal("show");
            }
        } 
    });
    $('#cm_custom_question').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#custom_question').modal({backdrop: 'static', keyboard: false});
            $('#custom_question').modal("show"); //Open Modal
        }
        else {
            if($scope.customQuestionList.length > 0 || $scope.oldcustomQuestionList.length > 0){
                $('#custom_delete').modal({backdrop: 'static', keyboard: false});
                $('#custom_delete').modal("show");
            }
        } 
    });
    $('#cm_denied_domain').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#denied_domain').modal({backdrop: 'static', keyboard: false});
            $('#denied_domain').modal("show"); //Open Modal
        }
        else {
            if($scope.deniedDomainList.length > 0 || $scope.olddeniedDomainList.length > 0){
                $('#denied_delete').modal({backdrop: 'static', keyboard: false});
                $('#denied_delete').modal("show");
            }   
        } 
    });
    $('#cim_industry').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#industry_list').modal({backdrop: 'static', keyboard: false});
            $('#industry_list').modal("show"); //Open Modal
        }
        else {
            if($scope.industryList.length > 0){
                $('#industry_delete').modal("show");
                $('#industry_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });$('#ctm_title').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#title_list').modal({backdrop: 'static', keyboard: false});
            $('#title_list').modal("show"); //Open Modal
        }
        else {
            if($scope.titleList.length > 0){
                $('#title_delete').modal("show");
                $('#title_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_restrict').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#restriction_list').modal({backdrop: 'static', keyboard: false});
            $('#restriction_list').modal("show"); //Open Modal
        }
        else {
            if($scope.restrictList.length > 0){
                $('#restrict_delete').modal("show");
                $('#restrict_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_domain_limit').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#domain_limit').modal({backdrop: 'static', keyboard: false});
            $('#domain_limit').modal("show"); //Open Modal
        }
        else {
            if($scope.domainList.length > 0){
                $('#domain_limit_delete').modal("show");
                $('#domain_limit_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_emp_size').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#employee_size').modal({backdrop: 'static', keyboard: false});
            $('#employee_size').modal("show"); //Open Modal
        }
        else {
            if($scope.empsizeList.length > 0){
                $('#employee_size_delete').modal("show");
                $('#employee_size_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_vertical').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#vertical').modal({backdrop: 'static', keyboard: false});
            $('#vertical').modal("show"); //Open Modal
        }
        else {
            if($scope.VerticalList.length > 0){
                $('#vertical_delete').modal("show");
                $('#vertical_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_geo').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#geo').modal({backdrop: 'static', keyboard: false});
            $('#geo').modal("show"); //Open Modal
        }
        else {
            if($scope.geoList.length > 0){
                $('#geo_delete').modal("show");
                $('#geo_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_campaign_asset').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#asset').modal({backdrop: 'static', keyboard: false});
            $('#asset').modal("show"); //Open Modal
        }
        else {
            if($scope.campAssetList.length > 0){
                $('#asset_delete').modal("show");
                $('#asset_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_dept').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#department').modal({backdrop: 'static', keyboard: false});
            $('#department').modal("show"); //Open Modal
        }
        else {
            if($scope.departmentList.length > 0){
                $('#department_delete').modal("show");
                $('#department_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_method').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#method').modal({backdrop: 'static', keyboard: false});
            $('#method').modal("show"); //Open Modal
        }
        else {
            if($scope.methodList.length > 0){
                $('#method_delete').modal("show");
                $('#method_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_revenue').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#revenue').modal({backdrop: 'static', keyboard: false});
            $('#revenue').modal("show"); //Open Modal
        }
        else {
            if($scope.revenueList.length > 0){
                $('#revenue_delete').modal("show");
                $('#revenue_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });
    $('#cm_job').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#level').modal({backdrop: 'static', keyboard: false});
            $('#level').modal("show"); //Open Modal
        }
        else {
            if($scope.levelList.length > 0){
                $('#level_delete').modal("show");
                $('#level_delete').modal({backdrop: 'static', keyboard: false});
                
            }
        }  
    });

//Modal data Show
// 1
$scope.loadrestFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handlerestFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.saverest(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.saverest = function(data){
        data.forEach(function(value,key){
         $scope.restrictList.push(value);
        })
    };
    $scope.restrictAdd=function(){
        if($('#crm_restriction').val() == undefined || $('#crm_restriction').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Restrictions.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#crm_restriction').focus(); 
            }, 1500);
        }
        else{
        $scope.restrictList.push($scope.restrict);
        $scope.restrict="";
        }
    }; 
    $scope.deleteRestrictList=function(index){
        $scope.restrictList.splice(index,1);
    };
    $scope.addrestrictList=function(){
        if ($scope.restrictList.length > 0){
            $('#restriction_list').modal("hide");
            $scope.restrict="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closerestrictList=function(){
         if ($scope.restrictList.length == 0){
            
            $('#restriction_list').modal("hide");
            $scope.campaign.cm_restrict="No";
            $scope.restrict="";
        }
        else if ($scope.restrictList.length > 0 || $scope.oldrestrictList.length > 0){
            $('#restrict_delete').modal("show");
            $scope.campaign.cm_restrict="No";
        }
    };
    $scope.restDelConfirm=function(){
        $scope.restrictList=[];
        $scope.campaign.cm_restrict="No";
        $('#restrict_delete').modal("hide");
        $('#restriction_list').modal("hide");
    };
    $scope.restNoChange=function(){
        $scope.campaign.cm_restrict="Yes";
    };
    $scope.updaterestrictList=function(){
       $('#restriction_list').modal("show");
    };



$scope.loadomainLimitFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handleDomainlimitFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savedlimit(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savedlimit = function(data){
        data.forEach(function(value,key){
         $scope.domainList.push(value);
        })
    };
    $scope.domainlimitAdd=function(){
        if($('#cdlm_domainlimit').val() == undefined || $('#cdlm_domainlimit').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Restrictions.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cdlm_domainlimit').focus(); 
            }, 1500);
        }
        else{
        $scope.domainList.push($scope.domain_limit);
        $scope.domain_limit="";
        }
    }; 
    $scope.deletedomainLimitList=function(index){
        $scope.domainList.splice(index,1);
    };
    $scope.adddomainlimitList=function(){
        if ($scope.domainList.length > 0){
            $('#domain_limit').modal("hide");
            $scope.domain_limit="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closedomainLimitList=function(){
         if ($scope.domainList.length == 0){
            
            $('#domain_limit').modal("hide");
            $scope.campaign.cm_domain_limit="No";
            $scope.domain_limit="";
        }
        else if ($scope.domainList.length > 0 || $scope.olddlimitList.length > 0){
            $('#domain_limit_delete').modal("show");
            $scope.campaign.cm_domain_limit="No";
        }
    };
    $scope.DomainlimitDelConfirm=function(){
        $scope.domainList=[];
        $scope.campaign.cm_domain_limit="No";
        $('#domain_limit_delete').modal("hide");
        $('#domain_limit').modal("hide");
    };
    $scope.DomainlimitNoChange=function(){
        $scope.campaign.cm_domain_limit="Yes";
    };
    $scope.updatedomainlimitList=function(){
       $('#domain_limit').modal("show");
    };


$scope.loadempSizeFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handleempSizeFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savempsize(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savempsize = function(data){
        data.forEach(function(value,key){
         $scope.empsizeList.push(value);
        })
    };
    $scope.empSizeAdd=function(){
        if($('#cesm_employee_size').val() == undefined || $('#cesm_employee_size').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Employee sizes.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cesm_employee_size').focus(); 
            }, 1500);
        }
        else{
        $scope.empsizeList.push($scope.Employee_sizes);
        $scope.Employee_sizes="";
        }
    }; 
    $scope.deleteEmpSize=function(index){
        $scope.empsizeList.splice(index,1);
    };
    $scope.addEmpSize=function(){
        if ($scope.empsizeList.length > 0){
            $('#employee_size').modal("hide");
            $scope.Employee_sizes="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeEmpSize=function(){
         if ($scope.empsizeList.length == 0){
            
            $('#employee_size').modal("hide");
            $scope.campaign.cm_emp_size="No";
            $scope.Employee_sizes="";
        }
        else if ($scope.empsizeList.length > 0){
            $('#employee_size_delete').modal("show");
            $scope.campaign.cm_emp_size="No";
        }
        else if($scope.oldempsizeList.length > 0){

            $('#employee_size_delete').modal("show");
            $scope.campaign.cm_emp_size="No";
        }
    };
    $scope.empsizeDelConfirm=function(){
        $scope.empsizeList=[];
        $scope.campaign.cm_emp_size="No";
        $('#employee_size_delete').modal("hide");
        $('#employee_size').modal("hide");
    };
    $scope.EmpsizeNoChange=function(){
        $scope.campaign.cm_emp_size="Yes";
    };
    $scope.updateempsizeList=function(){
       $('#employee_size').modal("show");
    };



$scope.loadFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handleFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.save(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.save = function(data){
        data.forEach(function(value,key){
         $scope.accountList.push(value);
        })
    };
    $scope.accntAdd=function(){
        if($('#amcm_company').val() == undefined || $('#amcm_company').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Company.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#amcm_company').focus(); 
            }, 1500);
        }
        else if($('#amcm_website').val() == undefined || $('#amcm_website').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Website.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#amcm_website').focus(); 
            }, 1500);
        }
        else{
        $scope.accountList.push($scope.account);
        $scope.account="";
        }
    }; 
    $scope.deleteAccntList=function(index){
        $scope.accountList.splice(index,1);
    };
    $scope.addAccntList=function(){
        if ($scope.accountList.length > 0 || $scope.oldaccountList.length > 0){
            $('#account_list').modal("hide");
            $scope.account="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeAccntList=function(){
         if ($scope.accountList.length == 0 && $scope.oldaccountList.length == 0){
            
            $('#account_list').modal("hide");
            $scope.campaign.cm_account_list="No";
            $scope.account="";
        }
        else if ($scope.accountList.length > 0 || $scope.oldaccountList.length > 0){
            $('#accnt_delete').modal("show");
            $scope.campaign.cm_account_list="No";
        }
    };
    $scope.accntDelConfirm=function(){
        $scope.oldaccountList=[];
        $scope.accountList=[];

        $scope.campaign.cm_account_list="No";
        $('#accnt_delete').modal("hide");
        $('#account_list').modal("hide");
    };
    $scope.accntNoChange=function(){
        $scope.campaign.cm_account_list="Yes";
    };
    $scope.updateAccntList=function(){
        $('#account_list').modal({backdrop: 'static', keyboard: false});
        $('#account_list').modal("show");

    };

// 2
 $scope.loadSuppFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handleSuppFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.saveSupp(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.saveSupp = function(data){
        data.forEach(function(value,key){
         $scope.supressionList.push(value);
        })
    };
    $scope.supressionAdd=function(){
        if($('#scm_company').val() == undefined || $('#scm_company').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Company.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#scm_company').focus(); 
            }, 1500);
        }
        else if($('#scm_website').val() == undefined || $('#scm_website').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Website.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#scm_website').focus(); 
            }, 1500);
        }
        else{
        $scope.supressionList.push($scope.supression);
        $scope.supression="";
        }
    };
    $scope.deleteSupression=function(index){
        $scope.supressionList.splice(index,1);
    };
    $scope.addSupression=function(){
        if ($scope.supressionList.length > 0 || $scope.oldsupressionList.length > 0){
            $('#supression_file').modal("hide");
            $scope.supression="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeSupression=function(){
         if ($scope.supressionList.length == 0 && $scope.oldsupressionList.length == 0){
           
            $('#supression_file').modal("hide");
            $scope.campaign.cm_supression_file="No";
            $scope.supression="";
        }
        else if ($scope.supressionList.length > 0 || $scope.oldsupressionList.length > 0){
            $('#supression_delete').modal("show");
            $scope.campaign.cm_supression_file="No";
        }
    };
    $scope.supresDelConfirm=function(){
        $scope.supressionList=[];
        $scope.campaign.cm_supression_file="No";
        $('#supression_delete').modal("hide");
        $('#supression_file').modal("hide");
    };
    $scope.supresNoChange=function(){
        $scope.campaign.cm_supression_file="Yes";
    };

    $scope.updateSupression=function(){
        $('#supression_file').modal({backdrop: 'static', keyboard: false});
        $('#supression_file').modal("show");
    };


// 3
$scope.loadomainFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handledomainFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savedomain(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savedomain = function(data){
        data.forEach(function(value,key){
         $scope.allowDomainList.push(value);
        })
    };
    $scope.allowDomainAdd=function(){
        if($('#adcm_website').val() == undefined || $('#adcm_website').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Website.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#adcm_website').focus(); 
            }, 1500);
        }
        else{
        $scope.allowDomainList.push($scope.allow_domain);
        $scope.allow_domain="";
        }
    };
    $scope.deleteAllowDomain=function(index){
        $scope.allowDomainList.splice(index,1);
    };
    $scope.addAllowDomain=function(){
        if ($scope.allowDomainList.length > 0 || $scope.oldallowDomainList.length > 0){
            $('#allow_Domain').modal("hide");
            $scope.allow_domain="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeAllowDomain=function(){
         if ($scope.allowDomainList.length == 0 && $scope.oldallowDomainList.length == 0){
           
            $('#allow_Domain').modal("hide");
            $scope.campaign.cm_allow_domain="No";
            $scope.allow_domain="";
        }
        else if ($scope.allowDomainList.length > 0 || $scope.oldallowDomainList.length > 0){
            $('#allowed_delete').modal("show");
            $scope.campaign.cm_allow_domain="No";
        }
    };
    $scope.allowDelConfirm=function(){
        $scope.allowDomainList=[];
        $scope.campaign.cm_allow_domain="No";
        $('#allowed_delete').modal("hide");
        $('#allow_Domain').modal("hide");
    };
    $scope.allowNoChange=function(){
        $scope.campaign.cm_allow_domain="Yes";
    };

    $scope.updateAllowDomain=function(){
        $('#allow_Domain').modal({backdrop: 'static', keyboard: false});
        $('#allow_Domain').modal("show");
    };


// 4
$scope.loadquestFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handlequestFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savequest(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savequest = function(data){
        data.forEach(function(value,key){
         $scope.customQuestionList.push(value);
        })
    };
    $scope.customQuestionAdd=function(){
        if($('#cmcm_question').val() == undefined || $('#cmcm_question').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Question.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cmcm_question').focus(); 
            }, 1500);
        }
        else{
        $scope.customQuestionList.push($scope.custom_question);
        $scope.custom_question=""; 
        }
    };
    $scope.deleteCustomQuestion=function(index){
        $scope.customQuestionList.splice(index,1);
    };
    $scope.addCustomQuestion=function(){
        if ($scope.customQuestionList.length > 0 || $scope.oldcustomQuestionList.length > 0){
            $('#custom_question').modal("hide");
            $scope.custom_question=""; 
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeCustomQuestion=function(){
         if ($scope.customQuestionList.length == 0 && $scope.oldcustomQuestionList.length == 0){
            
            $('#custom_question').modal("hide");
            $scope.campaign.cm_custom_question="No";
            $scope.custom_question="";
        }
        else if ($scope.customQuestionList.length > 0 || $scope.oldcustomQuestionList.length > 0){
            $('#custom_delete').modal("show");
            $scope.campaign.cm_custom_question="No";
        }
    };
    $scope.customDelConfirm=function(){
        $scope.customQuestionList=[];
        $scope.campaign.cm_custom_question="No";
        $('#custom_delete').modal("hide");
        $('#custom_question').modal("hide");
    };
    $scope.customNoChange=function(){
        $scope.campaign.cm_custom_question="Yes";
    };

    $scope.updateCustomQuestion=function(){
        $('#custom_question').modal({backdrop: 'static', keyboard: false});
        $('#custom_question').modal("show");
    };



// 5
$scope.loadenydomainFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handledenydomainFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savedeny(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savedeny = function(data){
        data.forEach(function(value,key){
         $scope.deniedDomainList.push(value);
        })
    };
    $scope.deniedDomainAdd=function(){
        if($('#ddcm_website').val() == undefined || $('#ddcm_website').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Website.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#ddcm_website').focus(); 
            }, 1500);
        }
        else{
        $scope.deniedDomainList.push($scope.denied_domain);
        $scope.denied_domain="";
        }
         
    };
    $scope.deleteDeniedDomain=function(index){
        $scope.deniedDomainList.splice(index,1);
    };
    $scope.addDeniedDomain=function(){
        if ($scope.deniedDomainList.length > 0 || $scope.olddeniedDomainList.length > 0){
            $('#denied_domain').modal("hide");
            $scope.denied_domain="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeDeniedDomain=function(){
         if ($scope.deniedDomainList.length == 0 && $scope.olddeniedDomainList.length == 0){
           
            $('#denied_domain').modal("hide");
            $scope.campaign.cm_denied_domain="No";
            $scope.denied_domain="";
        }
        else if ($scope.deniedDomainList.length > 0 || $scope.olddeniedDomainList.length > 0){
            $('#denied_delete').modal("show");
            $scope.campaign.cm_denied_domain="No";
        }
    };
    $scope.deniedDelConfirm=function(){
        $scope.deniedDomainList=[];
        $scope.campaign.cm_denied_domain="No";
        $('#denied_delete').modal("hide");
        $('#denied_domain').modal("hide");
    };
    $scope.deniedNoChange=function(){
        $scope.campaign.cm_denied_domain="Yes";
    };
    $scope.updateDeniedDomain=function(){
        $('#denied_domain').modal({backdrop: 'static', keyboard: false});
        $('#denied_domain').modal("show");
    };
     $scope.loadtitleFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handletitleFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savetitle(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savetitle = function(data){
        data.forEach(function(value,key){
         $scope.titleList.push(value);
        })
    };
    $scope.titleAdd=function(){
        if($('#ctm_title').val() == undefined || $('#ctm_title').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Company.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#amcm_company').focus(); 
            }, 1500);
        }
        else{
        $scope.titleList.push($scope.titled);
        $scope.titled="";
        }
    }; 
    $scope.deleteTitleList=function(index){
        $scope.titleList.splice(index,1);
    };
    $scope.addtitleList=function(){
        if ($scope.titleList.length > 0){
            $('#title_list').modal("hide");
            $scope.titled="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closetitleList=function(){
         if ($scope.titleList.length == 0){
            
            $('#title_list').modal("hide");
            $scope.campaign.cm_title="No";
            $scope.titled="";
        }
        else if ($scope.titleList.length > 0 || $scope.oldtitleList.length > 0){
            $('#title_delete').modal("show");
            $scope.campaign.cm_title="No";
        }
    };
    $scope.titleDelConfirm=function(){
        $scope.titleList=[];
        $scope.campaign.cm_title="No";
        $('#title_delete').modal("hide");
        $('#title_list').modal("hide");
    };
    $scope.titleNoChange=function(){
        $scope.campaign.cm_title="Yes";
    };
    $scope.updateTitleList=function(){
       $('#title_list').modal("show");
    };

    $scope.loadindustryFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handleindustryFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.saveindustry(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.saveindustry = function(data){
        data.forEach(function(value,key){
         $scope.industryList.push(value);
        })
    };
    $scope.industryAdd=function(){
        if($('#cim_industry').val() == undefined || $('#cim_industry').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Company.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cim_industry').focus(); 
            }, 1500);
        }
        else{
        $scope.industryList.push($scope.industry);
        $scope.industry="";
        }
    }; 
    $scope.deleteindustryList=function(index){
        $scope.industryList.splice(index,1);
    };
    $scope.addindustryList=function(){
        if ($scope.industryList.length > 0){
            $('#industry_list').modal("hide");
            $scope.industry="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeindustryList=function(){
         if ($scope.industryList.length == 0){
            
            $('#industry_list').modal("hide");
            $scope.campaign.cm_industry="No";
            $scope.industry="";
        }
        else if ($scope.industryList.length > 0 || $scope.oldindustryList.length > 0){
            $('#industry_delete').modal("show");
            $scope.campaign.cm_industry="No";
        }
    };
    $scope.industryDelConfirm=function(){
        $scope.industryList=[];
        $scope.campaign.cm_industry="No";
        $('#industry_delete').modal("hide");
        $('#industry_list').modal("hide");
    };
    $scope.industryNoChange=function(){
        $scope.campaign.cm_industry="Yes";
    };
    $scope.updateIndustryList=function(){
       $('#industry_list').modal("show");
    };
   

    $scope.loadverticalFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handleverticalFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savevertical(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savevertical = function(data){
        data.forEach(function(value,key){
         $scope.VerticalList.push(value);
        })
    };
    $scope.verticalAdd=function(){
        if($('#cvm_vertical').val() == undefined || $('#cvm_vertical').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Verticals.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cvm_vertical').focus(); 
            }, 1500);
        }
        else{
        $scope.VerticalList.push($scope.Vertical);
        $scope.Vertical="";
        }
    }; 
    $scope.deleteverticalList=function(index){
        $scope.VerticalList.splice(index,1);
    };
    $scope.addverticalList=function(){
        if ($scope.VerticalList.length > 0){
            $('#vertical').modal("hide");
            $scope.Vertical="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeverticalList=function(){
         if ($scope.VerticalList.length == 0){
            
            $('#vertical').modal("hide");
            $scope.campaign.cm_vertical="No";
            $scope.Vertical="";
        }
        else if ($scope.VerticalList.length > 0 || $scope.oldverticalList.length > 0){
            $('#vertical_delete').modal("show");
            $scope.campaign.cm_vertical="No";
        }
    };
    $scope.verticalDelConfirm=function(){
        $scope.VerticalList=[];
        $scope.campaign.cm_vertical="No";
        $('#vertical_delete').modal("hide");
        $('#vertical').modal("hide");
    };
    $scope.verticalNoChange=function(){
        $scope.campaign.cm_vertical="Yes";
    };
    $scope.updateVerticalList=function(){
       $('#vertical').modal("show");
    };


    $scope.loadgeoFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handlegeoFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savegeo(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savegeo = function(data){
        data.forEach(function(value,key){
         $scope.geoList.push(value);
        })
    };
    $scope.geoAdd=function(){
        if($('#cgm_geo').val() == undefined || $('#cgm_geo').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Geo.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cgm_geo').focus(); 
            }, 1500);
        }
        else{
        $scope.geoList.push($scope.geos);
        $scope.geos="";
        }
    }; 
    $scope.deletegeoList=function(index){
        $scope.geoList.splice(index,1);
    };
    $scope.addgeoList=function(){
        if ($scope.geoList.length > 0){
            $('#geo').modal("hide");
            $scope.geos="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closegeoList=function(){
         if ($scope.geoList.length == 0){
            
            $('#geo').modal("hide");
            $scope.campaign.cm_geo="No";
            $scope.geos="";
        }
        else if ($scope.geoList.length > 0 || $scope.oldgeoList.length > 0){
            $('#geo_delete').modal("show");
            $scope.campaign.cm_geo="No";
        }
    };
    $scope.geoDelConfirm=function(){
        $scope.geoList=[];
        $scope.campaign.cm_geo="No";
        $('#geo_delete').modal("hide");
        $('#geo').modal("hide");
    };
    $scope.geoNoChange=function(){
        $scope.campaign.cm_geo="Yes";
    };
    $scope.updateGeoList=function(){
       $('#geo').modal("show");
    };


    $scope.loadassetFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handleassetFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.saveasset(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.saveasset = function(data){
        data.forEach(function(value,key){
         $scope.campAssetList.push(value);
        })
    };
    $scope.assetAdd=function(){
        if($('#cam_campaign_asset').val() == undefined || $('#cam_campaign_asset').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Campaign Assets.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cam_campaign_asset').focus(); 
            }, 1500);
        }
        else{
        $scope.campAssetList.push($scope.campAsset);
        $scope.campAsset="";
        }
    }; 
    $scope.deleteassetList=function(index){
        $scope.campAssetList.splice(index,1);
    };
    $scope.addassetList=function(){
        if ($scope.campAssetList.length > 0){
            $('#asset').modal("hide");
            $scope.campAsset="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closeassetList=function(){
         if ($scope.campAssetList.length == 0){
            
            $('#asset').modal("hide");
            $scope.campaign.cm_campaign_asset="No";
            $scope.campAsset="";
        }
        else if ($scope.campAssetList.length > 0 || $scope.oldassetList.length > 0){
            $('#asset_delete').modal("show");
            $scope.campaign.cm_campaign_asset="No";
        }
    };
    $scope.assetDelConfirm=function(){
        $scope.campAssetList=[];
        $scope.campaign.cm_campaign_asset="No";
        $('#asset_delete').modal("hide");
        $('#asset').modal("hide");
    };
    $scope.assetNoChange=function(){
        $scope.campaign.cm_campaign_asset="Yes";
    };
    $scope.updateAsset=function(){
       $('#asset').modal("show");
    };


    $scope.loaddepartmentFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handledepartmentFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savedepartment(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savedepartment = function(data){
        data.forEach(function(value,key){
         $scope.departmentList.push(value);
        })
    };
    $scope.departmentAdd=function(){
        if($('#cdm_department').val() == undefined || $('#cdm_department').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Department.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cdm_department').focus(); 
            }, 1500);
        }
        else{
        $scope.departmentList.push($scope.departments);
        $scope.departments="";
        }
    }; 
    $scope.deletedepartmentList=function(index){
        $scope.departmentList.splice(index,1);
    };
    $scope.adddepartmentList=function(){
        if ($scope.departmentList.length > 0){
            $('#department').modal("hide");
            $scope.departments="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closedepartmentList=function(){
         if ($scope.departmentList.length == 0){
            
            $('#department').modal("hide");
            $scope.campaign.cm_dept="No";
            $scope.departments="";
        }
        else if ($scope.departmentList.length > 0 || $scope.olddeptList.length > 0){
            $('#department_delete').modal("show");
            $scope.campaign.cm_dept="No";
        }
    };
    $scope.deptDelConfirm=function(){
        $scope.departmentList=[];
        $scope.campaign.cm_dept="No";
        $('#department_delete').modal("hide");
        $('#department').modal("hide");
    };
    $scope.deptNoChange=function(){
        $scope.campaign.cm_dept="Yes";
    };
    $scope.updateDepartment=function(){
       $('#department').modal("show");
    };


    $scope.loadmethodFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handlemethodFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savemethod(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savemethod = function(data){
        data.forEach(function(value,key){
         $scope.methodList.push(value);
        })
    };
    $scope.methodAdd=function(){
        if($('#cmm_method').val() == undefined || $('#cmm_method').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Method.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cmm_method').focus(); 
            }, 1500);
        }
        else{
        $scope.methodList.push($scope.methods);
        $scope.methods="";
        }
    }; 
    $scope.deletemethodList=function(index){
        $scope.methodList.splice(index,1);
    };
    $scope.addmethodList=function(){
        if ($scope.methodList.length > 0){
            $('#method').modal("hide");
            $scope.methods="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closemethodList=function(){
         if ($scope.methodList.length == 0){
            
            $('#method').modal("hide");
            $scope.campaign.cm_method="No";
            $scope.methods="";
        }
        else if ($scope.methodList.length > 0 || $scope.oldmethodList.length > 0){
            $('#method_delete').modal("show");
            $scope.campaign.cm_method="No";
        }
    };
    $scope.methodDelConfirm=function(){
        console.log('test');
        $scope.methodList=[];
        $scope.campaign.cm_method="No";
        $('#method_delete').modal("hide");
        $('#method').modal("hide");
    };
    $scope.methodNoChange=function(){
        $scope.campaign.cm_method="Yes";
    };
    $scope.updateMethod=function(){
       $('#method').modal("show");
    };


    $scope.loadlevelFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handlelevelFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.savelevel(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.savelevel = function(data){
        data.forEach(function(value,key){
         $scope.levelList.push(value);
        })
    };
    $scope.levelAdd=function(){
        if($('#cjlm_job_level').val() == undefined || $('#cjlm_job_level').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Job Level.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cjlm_job_level').focus(); 
            }, 1500);
        }
        else{
        $scope.levelList.push($scope.JobLevel);
        $scope.JobLevel="";
        }
    }; 
    $scope.deletelevelList=function(index){
        $scope.levelList.splice(index,1);
    };
    $scope.addlevelList=function(){
        if ($scope.levelList.length > 0){
            $('#level').modal("hide");
            $scope.JobLevel="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closelevelList=function(){
         if ($scope.levelList.length == 0){
            
            $('#level').modal("hide");
            $scope.campaign.cm_job="No";
            $scope.JobLevel="";
        }
        else if ($scope.levelList.length > 0 || $scope.oldlevelList.length > 0){
            $('#level_delete').modal("show");
            $scope.campaign.cm_job="No";
        }
    };
    $scope.levelDelConfirm=function(){
        $scope.levelList=[];
        $scope.campaign.cm_job="No";
        $('#level_delete').modal("hide");
        $('#level').modal("hide");
    };
    $scope.levelNoChange=function(){
        $scope.campaign.cm_job="Yes";
    };
    $scope.updatelevel=function(){
       $('#level').modal("show");
    };


    $scope.loadrevenueFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
      $scope.handlerevenueFile = function () {
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
                
                var workbook = XLSX.read(data, { type: 'binary' });  
                
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                
                if (dataObjects.length > 0) {  
  
                      
                    $scope.saverevenue(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
    }  

    $scope.saverevenue = function(data){
        data.forEach(function(value,key){
         $scope.revenueList.push(value);
        })
    };
    $scope.revenueAdd=function(){
        if($('#crem_revenue').val() == undefined || $('#crem_revenue').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Revenue.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#crem_revenue').focus(); 
            }, 1500);
        }
        else{
        $scope.revenueList.push($scope.Revenue);
        $scope.Revenue="";
        }
    }; 
    $scope.deleterevenueList=function(index){
        $scope.revenueList.splice(index,1);
    };
    $scope.addrevenueList=function(){
        if ($scope.revenueList.length > 0){
            $('#revenue').modal("hide");
            $scope.Revenue="";
        }
        else{
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Fields Cannot Be Empty.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
    };
    $scope.closerevenueList=function(){
         if ($scope.revenueList.length == 0){
            
            $('#revenue').modal("hide");
            $scope.campaign.cm_revenue="No";
            $scope.Revenue="";
        }
        else if ($scope.revenueList.length > 0 || $scope.oldrevenueList.length > 0){
            $('#revenue_delete').modal("show");
            $scope.campaign.cm_revenue="No";
        }
    };
    $scope.revenueDelConfirm=function(){
        $scope.revenueList=[];
        $scope.campaign.cm_revenue="No";
        $('#revenue_delete').modal("hide");
        $('#revenue').modal("hide");
    };
    $scope.revenueNoChange=function(){
        $scope.campaign.cm_revenue="Yes";
    };
    $scope.updateRevenue=function(){
       $('#revenue').modal("show");
    };

   
  $scope.updateCampaign = function () {

  		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if($('#cm_first_dely').val() == undefined || $('#cm_first_dely').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The First Name.</p>',
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
            message: '<p class="text-center">Please Enter End Date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#cm_end_date').focus(); 
            }, 1500);
        }
        else if($('#cm_dely_frequency').val() == undefined || $('#cm_dely_frequency').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Delivery Frequency.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_dely_frequency').focus();
                }, 1500);
        }
        else if($('#cm_campaign_name').val() == undefined || $('#cm_campaign_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Campaign Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cm_campaign_name').focus(); 
            }, 1500);
        }
        else if($('#cm_restrict').val() == undefined || $('#cm_restrict').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Restriction.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_restrict').focus();
                }, 1500);
        }
        else if($('#cm_account_list').val() == undefined || $('#cm_account_list').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Account List.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_account_list').focus();
                }, 1500);
        }
        else if($('#cm_supression_file').val() == undefined || $('#cm_supression_file').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Supression File.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_supression_file').focus();
                }, 1500);
        }
        else if($('#cm_domain_limit').val() == undefined || $('#cm_domain_limit').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Domain Limit.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_domain_limit').focus();
                }, 1500);
        }
        else if($('#cm_emp_size').val() == undefined || $('#cm_emp_size').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Employee Size.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_emp_size').focus();
                }, 1500);
        }
        else if($('#cm_disqualifies').val() == undefined || $('#cm_disqualifies').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Disqualifies.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_disqualifies').focus();
                }, 1500);
        }
        else if($('#ctm_title').val() == undefined || $('#ctm_title').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Title.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#ctm_title').focus();
                }, 1500);
        }
        else if($('#cm_lead_count').val() == undefined || $('#cm_lead_count').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Lead Count.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_lead_count').focus();
                }, 1500);
        }
        else if($('#cm_vertical').val() == undefined || $('#cm_vertical').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Vertical.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_vertical').focus();
                }, 1500);
        }
        else if($('#cm_geo').val() == undefined || $('#cm_geo').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter GEO.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_geo').focus();
                }, 1500);
        }
        else if($('#cm_allow_domain').val() == undefined || $('#cm_allow_domain').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Allowed Domain.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_allow_domain').focus();
                }, 1500);
        }
        else if($('#cm_revenue').val() == undefined || $('#cm_revenue').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Revenue.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_revenue').focus();
                }, 1500);
        }
        else if($('#cm_custom_question').val() == undefined || $('#cm_custom_question').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Custom Question.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_custom_question').focus();
                }, 1500);
        }
        else if($('#cm_denied_domain').val() == undefined || $('#cm_denied_domain').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Denied Domain.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_denied_domain').focus();
                }, 1500);
        }
        else if($('#cm_campaign_asset').val() == undefined || $('#cm_campaign_asset').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Campaign Asset.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_campaign_asset').focus();
                }, 1500);
        }
        else if($('#cim_industry').val() == undefined || $('#cim_industry').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Industry.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cim_industry').focus();
                }, 1500);
        }
        else if($('#cm_dept').val() == undefined || $('#cm_dept').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Department.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_dept').focus();
                }, 1500);
        }
        else if($('#cm_method').val() == undefined || $('#cm_method').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Method.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_method').focus();
                }, 1500);
        }
        else if($('#cm_job').val() == undefined || $('#cm_job').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Job Function / Level.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_job').focus();
                }, 1500);
        }
	    else{
                $scope.objects={
                    campaign:$scope.campaign,
                    accountList:$scope.accountList,
                    supressionList:$scope.supressionList,
                    allowDomainList:$scope.allowDomainList,
                    customQuestionList:$scope.customQuestionList,
                    deniedDomainList:$scope.deniedDomainList,
                    titleList : $scope.titleList,
                    industryList : $scope.industryList,
                    restrictList : $scope.restrictList,
                    domainList : $scope.domainList,
                    empsizeList : $scope.empsizeList,
                    VerticalList : $scope.VerticalList,
                    geoList : $scope.geoList,
                    campAssetList : $scope.campAssetList,
                    departmentList : $scope.departmentList,
                    methodList : $scope.methodList,
                    revenueList : $scope.revenueList,
                    levelList : $scope.levelList,
                    oldaccountList: $scope.oldaccountList,
                    oldsupressionList: $scope.oldsupressionList,
                    oldallowDomainList : $scope.oldallowDomainList,
                    oldcustomQuestionList : $scope.oldcustomQuestionList,
                    olddeniedDomainList : $scope.olddeniedDomainList,
                    oldtitleList : $scope.oldtitleList,
                    oldindustryList : $scope.oldindustryList,
                    oldrestrictList : $scope.oldrestrictList,
                    olddlimitList : $scope.olddlimitList,
                    oldempsizeList : $scope.oldempsizeList,
                    oldverticalList : $scope.oldverticalList,
                    oldgeoList : $scope.oldgeoList,
                    oldassetList : $scope.oldassetList,
                    olddeptList : $scope.olddeptList,
                    oldmethodList : $scope.oldmethodList,
                    oldrevenueList : $scope.oldrevenueList,
                    oldlevelList : $scope.oldlevelList,
                    removeAccount : $scope.removeAccount,
                    removesuppressionList : $scope.removesuppressionList,
                    removeAllowedDomain : $scope.removeAllowedDomain,
                    removecustomQuestion : $scope.removecustomQuestion,
                    removeDeniedDomain : $scope.removeDeniedDomain,
                    removetitle : $scope.removetitle,
                    removeindustry : $scope.removeindustry,
                    removerestrict : $scope.removerestrict,
                    removedlimit : $scope.removedlimit,
                    removeempsize : $scope.removeempsize,
                    removevertical : $scope.removevertical,
                    removegeo : $scope.removegeo,
                    removeasset : $scope.removeasset,
                    removdept : $scope.removdept,
                    removemethod : $scope.removemethod,
                    removerevenue : $scope.removerevenue,
                    removelevel : $scope.removelevel


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
    		       window.location.href = '#/campaign/';  
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