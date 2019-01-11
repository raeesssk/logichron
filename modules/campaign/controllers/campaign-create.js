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

    $scope.geos = {};
    $scope.oldgeoList=[];
    $scope.geoList=[];

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

    $scope.methods={};
    $scope.oldmethodList=[];
    $scope.methodList=[];

    $scope.JobLevel={};
    $scope.oldlevelList=[];
    $scope.levelList=[];

    $scope.campaign.userid=localStorage.getItem('logichron_userid');
    $scope.account.userid=localStorage.getItem('logichron_userid');
    $scope.supression.userid=localStorage.getItem('logichron_userid');
    $scope.allow_domain.userid=localStorage.getItem('logichron_userid');
    $scope.custom_question.userid=localStorage.getItem('logichron_userid');
    $scope.denied_domain.userid=localStorage.getItem('logichron_userid');

	$scope.apiURL = $rootScope.baseURL+'/campaign/add';
    

    $scope.url = 'Tried to enter campaign create Page';

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
    var value = '#/campaign/create';
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

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.campaign.cm_date = yyyy +"/"+ (parseInt(mm)+parseInt(1)) +"/"+ dd;

    
    $('#cm_first_dely').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
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

// Show Modal on click of yes
    $('#cm_restriction').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#restriction_list').modal({backdrop: 'static', keyboard: false});
            $('#restriction_list').modal("show"); //Open Modal
        }
        else {
            if($scope.oldrestrictList.length > 0){
                $('#no_restrict_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_restrict_delete').modal("show");
                
            }
        }  
    });
    $('#cm_account_list').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#account_list').modal({backdrop: 'static', keyboard: false});
            $('#account_list').modal("show"); //Open Modal
        }
        else {
            if($scope.oldaccountList.length > 0){
                $('#no_accnt_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_accnt_delete').modal("show");
                
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
            if($scope.oldsupressionList.length > 0){
                $('#no_supp_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_supp_delete').modal("show");
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
            if($scope.olddomainList.length > 0){
                $('#no_domain_limit_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_domain_limit_delete').modal("show");
                
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
            if($scope.oldempsizeList.length > 0){
                $('#no_emp_size_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_emp_size_delete').modal("show");
                
            }
        }  
    });
    $('#ctm_title').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#title_list').modal({backdrop: 'static', keyboard: false});
            $('#title_list').modal("show"); //Open Modal
        }
        else {
            if($scope.oldtitleList.length > 0){
                $('#no_title_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_title_delete').modal("show");
                
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
            if($scope.oldverticalList.length > 0){
                $('#no_vertical_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_vertical_delete').modal("show");
                
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
            if($scope.oldgeoList.length > 0){
                $('#no_geo_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_geo_delete').modal("show");
                
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
            if($scope.oldallowDomainList.length > 0){
                $('#no_allowed_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_allowed_delete').modal("show");
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
            if($scope.oldrevenueList.length > 0){
                $('#no_revenue_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_revenue_delete').modal("show");
                
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
            if($scope.oldcustomQuestionList.length > 0){
                $('#no_custom_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_custom_delete').modal("show");
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
            if($scope.olddeniedDomainList.length > 0 ){
                $('#no_denied_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_denied_delete').modal("show");
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
            if($scope.oldcampAssetList.length > 0){
                $('#no_asset_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_asset_delete').modal("show");
                
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
            if($scope.oldindustryList.length > 0){
                $('#no_industry_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_industry_delete').modal("show");
                
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
            if($scope.olddepartmentList.length > 0){
                $('#no_department_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_department_delete').modal("show");
                
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
            if($scope.oldmethodList.length > 0){
                $('#no_method_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_method_delete').modal("show");
                
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
            if($scope.oldlevelList.length > 0){
                $('#no_level_delete').modal({backdrop: 'static', keyboard: false});
                $('#no_level_delete').modal("show");
                
            }
        }  
    });

//1. Modal Campaign Restriction List
    $scope.loadrestFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handlerestFile = function () {
        if($('#filerest').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                // $('#filerest').val("");
                // $('#blah').attr('src', "resources/default-image.png");
            }, 1500);
        }
        else{
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

                          $('#filerest').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.restrict=null;
        }
    }; 
    $scope.deleteRestrictList=function(index){
        $scope.restrictList.splice(index,1);
    };
    $scope.deletedoldRestrictList=function(index){
        $scope.oldrestrictList.splice(index,1);
    };
    $scope.addrestrictList=function(){
        if ($scope.restrictList.length > 0){
            angular.forEach($scope.restrictList, function(value,key) {
                $scope.oldrestrictList.push(value);
            })
            $scope.restrictList=[];
            $('#restriction_list').modal("hide");
            $scope.restrict=null;
        }
        else if ($scope.oldrestrictList.length > 0){
            $scope.restrictList=[];
            $('#restriction_list').modal("hide");
            $scope.restrict=null;
        }
        else if ($scope.restrictList.length == 0 && $scope.oldrestrictList.length == 0 ){
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
        if ($scope.restrictList.length == 0 && $scope.oldrestrictList.length == 0){
            $('#restriction_list').modal("hide");
            $scope.campaign.cm_restriction="No";
            $scope.restrict="";
        }
        else if ($scope.restrictList.length == 0 && $scope.oldrestrictList.length != 0){
            $('#restriction_list').modal("hide");
            $scope.campaign.cm_restriction="Yes";
            $scope.restrict="";
        }
        else if ($scope.restrictList.length > 0){
            $('#restrict_delete').modal("show");
            // $scope.campaign.cm_restriction="No";
        }
    };
    $scope.restDelConfirm=function(){
        $scope.restrictList=[];
        if($scope.oldrestrictList.length != 0)
            $scope.campaign.cm_restriction="Yes";
        else
            $scope.campaign.cm_restriction="No";
        $('#restrict_delete').modal("hide");
        $('#restriction_list').modal("hide");
    };
    $scope.restNoChange=function(){
        $('#restrict_delete').modal("hide");
    };
    $scope.updaterestrictList=function(){
       $('#restriction_list').modal("show");
    };

    $scope.no_restrictDelConfirm=function(){
        $scope.oldrestrictList=[];
        $scope.campaign.cm_restriction="No";
        $('#no_restrict_delete').modal("hide");
    };
    $scope.no_restrictNoChange=function(){
        $('#no_restrict_delete').modal("hide");
        $scope.campaign.cm_restriction="Yes";
    };

//1. END Modal Campaign Restriction List


//2. Modal Accout List
    $scope.loadFile = function (files) {  
        $scope.$apply(function () {    
            $scope.selectedFile = files[0];    
        })   
    }   
    $scope.handleFile = function () {
        if($('#fileacclist').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            var file = $scope.selectedFile;  
  
            if (file) {  
      
                var reader = new FileReader();  
      
                reader.onload = function (e) {  
      
                    var data = e.target.result;  
                    
                    var workbook = XLSX.read(data, { type: 'binary' });  
                    
                    var first_sheet_name = workbook.SheetNames[0];  
      
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                    
                    if (dataObjects.length > 0) {  
                        $scope.saveacclist(dataObjects);  
                        
                        $('#fileacclist').val('');
                        $scope.selectedFile = '';      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }       
                }       
                reader.onerror = function (ex) {  
      
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    }; 
    $scope.saveacclist = function(data){
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
    $scope.deleteoldAccntList=function(index){
        $scope.oldaccountList.splice(index,1);
    };
    $scope.addAccntList=function(){
        if ($scope.accountList.length > 0){
            angular.forEach($scope.accountList, function(value,key) {
                $scope.oldaccountList.push(value);
            })
            $scope.accountList=[];
            $('#account_list').modal("hide");
            $scope.account=null;
        }
        else if ($scope.oldaccountList.length > 0){
            $scope.accountList=[];
            $('#account_list').modal("hide");
            $scope.account=null;
        }
        else if ($scope.accountList.length == 0 && $scope.oldaccountList.length == 0 ){
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
        else if ($scope.accountList.length == 0 && $scope.oldaccountList.length != 0){
            $('#account_list').modal("hide");
            $scope.campaign.cm_account_list="Yes";
            $scope.account="";
        }
        else if ($scope.accountList.length > 0){
            $('#accnt_delete').modal("show");
            // $scope.campaign.cm_account_list="No";
        }
    };
    $scope.accntDelConfirm=function(){
        $scope.accountList=[];
        if($scope.oldaccountList.length != 0)
            $scope.campaign.cm_account_list="Yes";
        else
            $scope.campaign.cm_account_list="No";
        $('#accnt_delete').modal("hide");
        $('#account_list').modal("hide");
    };
    $scope.accntNoChange=function(){
        $('#accnt_delete').modal("hide");
    };
    $scope.updateAccntList=function(){
       $('#account_list').modal("show");
    };

    $scope.no_accntDelConfirm=function(){
        $scope.oldaccountList=[];
        $scope.campaign.cm_account_list="No";
        $('#no_accnt_delete').modal("hide");
    };
    $scope.no_accntNoChange=function(){
        $('#no_accnt_delete').modal("hide");
        $scope.campaign.cm_account_list="Yes";
    };
//2. END Modal Accout List


//3. Modal Supression File List
    $scope.loadSuppFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handleSuppFile = function () {
        if($('#filesupplist').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filesupplist').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.supression=null;
        }
    }; 
    $scope.deleteSupression=function(index){
        $scope.supressionList.splice(index,1);
    };
    $scope.deleteoldSupression=function(index){
        $scope.oldsupressionList.splice(index,1);
    };
    $scope.addSupression=function(){
        if ($scope.supressionList.length > 0){
            angular.forEach($scope.supressionList, function(value,key) {
                $scope.oldsupressionList.push(value);
            })
            $scope.supressionList=[];
            $('#supression_file').modal("hide");
            $scope.supression=null;
        }
        else if ($scope.oldsupressionList.length > 0){
            $scope.supressionList=[];
            $('#supression_file').modal("hide");
            $scope.supression=null;
        }
        else if ($scope.supressionList.length == 0 && $scope.oldsupressionList.length == 0 ){
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
        else if ($scope.supressionList.length == 0 && $scope.oldsupressionList.length != 0){
            $('#supression_file').modal("hide");
            $scope.campaign.cm_supression_file="Yes";
            $scope.supression="";
        }
        else if ($scope.supressionList.length > 0){
            $('#supression_delete').modal("show");
            // $scope.campaign.cm_supression_file="No";
        }
    };
    $scope.supresDelConfirm=function(){
        $scope.supressionList=[];
        if($scope.oldsupressionList.length != 0)
            $scope.campaign.cm_supression_file="Yes";
        else
            $scope.campaign.cm_supression_file="No";
        $('#supression_delete').modal("hide");
        $('#supression_file').modal("hide");
    };
    $scope.supresNoChange=function(){
        $('#supression_delete').modal("hide");
    };
    $scope.updateSupression=function(){
       $('#supression_file').modal("show");
    };

    $scope.no_suppDelConfirm=function(){
        $scope.oldsupressionList=[];
        $scope.campaign.cm_supression_file="No";
        $('#no_supp_delete').modal("hide");
    };
    $scope.no_suppNoChange=function(){
        $('#no_supp_delete').modal("hide");
        $scope.campaign.cm_supression_file="Yes";
    };
//3. END Modal Supression File List


//4. Modal domain limit List
    $scope.loadomainLimitFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handleDomainlimitFile = function () {
        if($('#filedomainlimit').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            var file = $scope.selectedFile;  
  
            if (file) {  
      
                var reader = new FileReader();  
      
                reader.onload = function (e) {  
      
                    var data = e.target.result;  
                    
                    var workbook = XLSX.read(data, { type: 'binary' });  
                    
                    var first_sheet_name = workbook.SheetNames[0];  
      
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
                    
                    if (dataObjects.length > 0) {  
      
                        $scope.savedDomainlimit(dataObjects); 

                          $('#filedomainlimit').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
    $scope.savedDomainlimit = function(data){
        data.forEach(function(value,key){
         $scope.domainList.push(value);
        })
    };
    $scope.domainlimitAdd=function(){
        if($('#cdlm_domainlimit').val() == undefined || $('#cdlm_domainlimit').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Domain Limit.</p>',
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
        $scope.domain_limit=null;
        }
    }; 
    $scope.deletedomainLimitList=function(index){
        $scope.domainList.splice(index,1);
    };
    $scope.deleteolddomainLimitList=function(index){
        $scope.olddomainList.splice(index,1);
    };
    $scope.adddomainlimitList=function(){
        if ($scope.domainList.length > 0){
            angular.forEach($scope.domainList, function(value,key) {
                $scope.olddomainList.push(value);
            })
            $scope.domainList=[];
            $('#domain_limit').modal("hide");
            $scope.domain_limit=null;
        }
        else if ($scope.olddomainList.length > 0){
            $scope.domainList=[];
            $('#domain_limit').modal("hide");
            $scope.domain_limit=null;
        }
        else if ($scope.domainList.length == 0 && $scope.olddomainList.length == 0 ){
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
        if ($scope.domainList.length == 0 && $scope.olddomainList.length == 0){
            $('#domain_limit').modal("hide");
            $scope.campaign.cm_domain_limit="No";
            $scope.domain_limit="";
        }
        else if ($scope.domainList.length == 0 && $scope.olddomainList.length != 0){
            $('#domain_limit').modal("hide");
            $scope.campaign.cm_domain_limit="Yes";
            $scope.domain_limit="";
        }
        else if ($scope.domainList.length > 0){
            $('#domain_limit_delete').modal("show");
            // $scope.campaign.cm_domain_limit="No";
        }
    };
    $scope.DomainlimitDelConfirm=function(){
        $scope.domainList=[];
        if($scope.olddomainList.length != 0)
            $scope.campaign.cm_domain_limit="Yes";
        else
            $scope.campaign.cm_domain_limit="No";
        $('#domain_limit_delete').modal("hide");
        $('#domain_limit').modal("hide");
    };
    $scope.DomainlimitNoChange=function(){
        $('#domain_limit_delete').modal("hide");
    };
    $scope.updatedomainlimitList=function(){
       $('#domain_limit').modal("show");
    };

    $scope.no_domain_limit_DelConfirm=function(){
        $scope.olddomainList=[];
        $scope.campaign.cm_domain_limit="No";
        $('#no_domain_limit_delete').modal("hide");
    };
    $scope.no_domain_limit_NoChange=function(){
        $('#no_domain_limit_delete').modal("hide");
        $scope.campaign.cm_domain_limit="Yes";
    };
//4. END Modal domain limit List


//5. Modal Employee Size List
    $scope.loadempSizeFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handleempSizeFile = function () {
        if($('#fileempsize').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#fileempsize').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.Employee_sizes=null;
        }
    }; 
    $scope.deleteEmpSize=function(index){
        $scope.empsizeList.splice(index,1);
    };
    $scope.deleteoldEmpSize=function(index){
        $scope.oldempsizeList.splice(index,1);
    };
    $scope.addEmpSize=function(){
        if ($scope.empsizeList.length > 0){
            angular.forEach($scope.empsizeList, function(value,key) {
                $scope.oldempsizeList.push(value);
            })
            $scope.empsizeList=[];
            $('#employee_size').modal("hide");
            $scope.Employee_sizes=null;
        }
        else if ($scope.oldempsizeList.length > 0){
            $scope.empsizeList=[];
            $('#employee_size').modal("hide");
            $scope.Employee_sizes=null;
        }
        else if ($scope.empsizeList.length == 0 && $scope.oldempsizeList.length == 0 ){
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
        if ($scope.empsizeList.length == 0 && $scope.oldempsizeList.length == 0){
            $('#employee_size').modal("hide");
            $scope.campaign.cm_emp_size="No";
            $scope.Employee_sizes="";
        }
        else if ($scope.empsizeList.length == 0 && $scope.oldempsizeList.length != 0){
            $('#employee_size').modal("hide");
            $scope.campaign.cm_emp_size="Yes";
            $scope.Employee_sizes="";
        }
        else if ($scope.empsizeList.length > 0){
            $('#employee_size_delete').modal("show");
        }
    };
    $scope.empsizeDelConfirm=function(){
        $scope.empsizeList=[];
        if($scope.oldempsizeList.length != 0)
            $scope.campaign.cm_emp_size="Yes";
        else
            $scope.campaign.cm_emp_size="No";
        $('#employee_size_delete').modal("hide");
        $('#employee_size').modal("hide");
    };
    $scope.EmpsizeNoChange=function(){
        $('#employee_size_delete').modal("hide");
    };
    $scope.updateempsizeList=function(){
       $('#employee_size').modal("show");
    };

    $scope.no_emp_size_DelConfirm=function(){
        $scope.oldempsizeList=[];
        $scope.campaign.cm_emp_size="No";
        $('#no_emp_size_delete').modal("hide");
    };
    $scope.no_emp_size_NoChange=function(){
        $('#no_emp_size_delete').modal("hide");
        $scope.campaign.cm_emp_size="Yes";
    };
//5. END Modal Employee Size List

//6. Modal Job Title List
    $scope.loadtitleFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handletitleFile = function () {
        if($('#filejobtitle').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filejobtitle').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
    $scope.savetitle = function(data){
        data.forEach(function(value,key){
         $scope.titleList.push(value);
        })
    };
    $scope.titleAdd=function(){
        if($('#ctm_title1').val() == undefined || $('#ctm_title1').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Title.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#ctm_title1').focus(); 
            }, 1500);
        }
        else{
        $scope.titleList.push($scope.titled);
        $scope.titled=null;
        }
    }; 
    $scope.deleteTitleList=function(index){
        $scope.titleList.splice(index,1);
    };
    $scope.deleteoldTitleList=function(index){
        $scope.oldtitleList.splice(index,1);
    };
    $scope.addtitleList=function(){
        if ($scope.titleList.length > 0){
            angular.forEach($scope.titleList, function(value,key) {
                $scope.oldtitleList.push(value);
            })
            $scope.titleList=[];
            $('#title_list').modal("hide");
            $scope.titled=null;
        }
        else if ($scope.oldtitleList.length > 0){
            $scope.titleList=[];
            $('#title_list').modal("hide");
            $scope.titled=null;
        }
        else if ($scope.titleList.length == 0 && $scope.oldtitleList.length == 0 ){
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
        if ($scope.titleList.length == 0 && $scope.oldtitleList.length == 0){
            $('#title_list').modal("hide");
            $scope.campaign.cm_title="No";
            $scope.titled="";
        }
        else if ($scope.titleList.length == 0 && $scope.oldtitleList.length != 0){
            $('#title_list').modal("hide");
            $scope.campaign.cm_title="Yes";
            $scope.titled="";
        }
        else if ($scope.titleList.length > 0){
            $('#title_delete').modal("show");
        }
    };
    $scope.titleDelConfirm=function(){
        $scope.titleList=[];
        if($scope.oldtitleList.length != 0)
            $scope.campaign.cm_title="Yes";
        else
            $scope.campaign.cm_title="No";
        $('#title_delete').modal("hide");
        $('#title_list').modal("hide");
    };
    $scope.titleNoChange=function(){
        $('#title_delete').modal("hide");
    };
    $scope.updateTitleList=function(){
       $('#title_list').modal("show");
    };

    $scope.no_title_DelConfirm=function(){
        $scope.oldtitleList=[];
        $scope.campaign.cm_title="No";
        $('#no_title_delete').modal("hide");
    };
    $scope.no_title_NoChange=function(){
        $('#no_title_delete').modal("hide");
        $scope.campaign.cm_title="Yes";
    };
//6. END Modal Job Title List

//7. Modal Verticals List
    $scope.loadverticalFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handleverticalFile = function () {
        if($('#fileverticallist').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#fileverticallist').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
    $scope.savevertical = function(data){
        data.forEach(function(value,key){
         $scope.verticalList.push(value);
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
        $scope.verticalList.push($scope.Vertical);
        $scope.Vertical=null;
        }

    }; 
    $scope.deleteverticalList=function(index){
        $scope.verticalList.splice(index,1);
    };
    $scope.deleteoldverticalList=function(index){
        $scope.oldverticalList.splice(index,1);
    };
    $scope.addverticalList=function(){
        if ($scope.verticalList.length > 0){
            angular.forEach($scope.verticalList, function(value,key) {                
                $scope.oldverticalList.push(value);
            })
            $scope.verticalList=[];
            $('#vertical').modal("hide");
            $scope.Vertical=null;
        }
        else if ($scope.oldverticalList.length > 0){
            $scope.verticalList=[];
            $('#vertical').modal("hide");
            $scope.Vertical=null;
        }
        else if ($scope.verticalList.length == 0 && $scope.oldverticalList.length == 0 ){
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
        if ($scope.verticalList.length == 0 && $scope.oldverticalList.length == 0){
            $('#vertical').modal("hide");
            $scope.campaign.cm_vertical="No";
            $scope.Vertical="";
        }
        else if ($scope.verticalList.length == 0 && $scope.oldverticalList.length != 0){
            $('#vertical').modal("hide");
            $scope.campaign.cm_vertical="Yes";
            $scope.Vertical="";
        }
        else if ($scope.verticalList.length > 0){
            $('#vertical_delete').modal("show");
        }
    };
    $scope.verticalDelConfirm=function(){
        $scope.verticalList=[];
        if($scope.oldverticalList.length != 0)
            $scope.campaign.cm_vertical="Yes";
        else
            $scope.campaign.cm_vertical="No";
        $('#vertical_delete').modal("hide");
        $('#vertical').modal("hide");
    };
    $scope.verticalNoChange=function(){
        $('#vertical_delete').modal("hide");
    };
    $scope.updateVerticalList=function(){
       $('#vertical').modal("show");
    };

    $scope.no_vertical_DelConfirm=function(){
        $scope.oldverticalList=[];
        $scope.campaign.cm_vertical="No";
        $('#no_vertical_delete').modal("hide");
    };
    $scope.no_vertical_NoChange=function(){
        $('#no_vertical_delete').modal("hide");
        $scope.campaign.cm_vertical="Yes";
    };
//7. END Modal Verticals List


//8. Modal Geo List
    $scope.loadgeoFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handlegeoFile = function () {
        if($('#filegeo').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filegeo').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.geos=null;
        }
    }; 
    $scope.deletegeoList=function(index){
        $scope.geoList.splice(index,1);
    };
    $scope.deleteoldgeoList=function(index){
        $scope.oldgeoList.splice(index,1);
    };
    $scope.addgeoList=function(){
        if ($scope.geoList.length > 0){
            angular.forEach($scope.geoList, function(value,key) {
                $scope.oldgeoList.push(value);
            })
            $scope.geoList=[];
            $('#geo').modal("hide");
            $scope.geos=null;
        }
        else if ($scope.oldgeoList.length > 0){
            $scope.geoList=[];
            $('#geo').modal("hide");
            $scope.geos=null;
        }
        else if ($scope.geoList.length == 0 && $scope.oldgeoList.length == 0 ){
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
        if ($scope.geoList.length == 0 && $scope.oldgeoList.length == 0){
            $('#geo').modal("hide");
            $scope.campaign.cm_geo="No";
            $scope.geos="";
        }
        else if ($scope.geoList.length == 0 && $scope.oldgeoList.length != 0){
            $('#geo').modal("hide");
            $scope.campaign.cm_geo="Yes";
            $scope.geos="";
        }
        else if ($scope.geoList.length > 0){
            $('#geo_delete').modal("show");
        }
    };
    $scope.geoDelConfirm=function(){
        $scope.geoList=[];
        if($scope.oldgeoList.length != 0)
            $scope.campaign.cm_geo="Yes";
        else
            $scope.campaign.cm_geo="No";
        $('#geo_delete').modal("hide");
        $('#geo').modal("hide");
    };
    $scope.geoNoChange=function(){
        $('#geo_delete').modal("hide");
    };
    $scope.updateGeoList=function(){
       $('#geo').modal("show");
    };

    $scope.no_geo_DelConfirm=function(){
        $scope.oldgeoList=[];
        $scope.campaign.cm_geo="No";
        $('#no_geo_delete').modal("hide");
    };
    $scope.no_geo_NoChange=function(){
        $('#no_geo_delete').modal("hide");
        $scope.campaign.cm_geo="Yes";
    };
//8. END Modal Geo List


//9. Modal Allow Domain List
    $scope.loadomainFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handledomainFile = function () {
        if($('#fileallowdomain').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#fileallowdomain').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.allow_domain=null;
        }
    }; 
    $scope.deleteAllowDomain=function(index){
        $scope.allowDomainList.splice(index,1);
    };
    $scope.deleteoldAllowDomain=function(index){
        $scope.oldallowDomainList.splice(index,1);
    };
    $scope.addAllowDomain=function(){
        if ($scope.allowDomainList.length > 0){
            angular.forEach($scope.allowDomainList, function(value,key) {
                $scope.oldallowDomainList.push(value);
            })
            $scope.allowDomainList=[];
            $('#allow_Domain').modal("hide");
            $scope.allow_domain=null;
        }
        else if ($scope.oldallowDomainList.length > 0){
            $scope.allowDomainList=[];
            $('#allow_Domain').modal("hide");
            $scope.allow_domain=null;
        }
        else if ($scope.allowDomainList.length == 0 && $scope.oldallowDomainList.length == 0 ){
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
        else if ($scope.allowDomainList.length == 0 && $scope.oldallowDomainList.length != 0){
            $('#allow_Domain').modal("hide");
            $scope.campaign.cm_allow_domain="Yes";
            $scope.allow_domain="";
        }
        else if ($scope.allowDomainList.length > 0){
            $('#allowed_delete').modal("show");
        }
    };
    $scope.allowDelConfirm=function(){
        $scope.allowDomainList=[];
        if($scope.oldallowDomainList.length != 0)
            $scope.campaign.cm_allow_domain="Yes";
        else
            $scope.campaign.cm_allow_domain="No";
        $('#allowed_delete').modal("hide");
        $('#allow_Domain').modal("hide");
    };
    $scope.allowNoChange=function(){
        $('#allowed_delete').modal("hide");
    };
    $scope.updateAllowDomain=function(){
       $('#allow_Domain').modal("show");
    };

    $scope.no_allowed_DelConfirm=function(){
        $scope.oldallowDomainList=[];
        $scope.campaign.cm_allow_domain="No";
        $('#no_allowed_delete').modal("hide");
    };
    $scope.no_allowed_NoChange=function(){
        $('#no_allowed_delete').modal("hide");
        $scope.campaign.cm_allow_domain="Yes";
    };
//9. END Modal Allow Domain List

//10. Modal Revenue List
    $scope.loadrevenueFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handlerevenueFile = function () {
        if($('#filerevenue').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filerevenue').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.Revenue=null;
        }
    }; 
    $scope.deleterevenueList=function(index){
        $scope.revenueList.splice(index,1);
    };
    $scope.deleteoldrevenueList=function(index){
        $scope.oldrevenueList.splice(index,1);
    };
    $scope.addrevenueList=function(){
        if ($scope.revenueList.length > 0){
            angular.forEach($scope.revenueList, function(value,key) {
                $scope.oldrevenueList.push(value);
            })
            $scope.revenueList=[];
            $('#revenue').modal("hide");
            $scope.Revenue=null;
        }
        else if ($scope.oldrevenueList.length > 0){
            $scope.revenueList=[];
            $('#revenue').modal("hide");
            $scope.Revenue=null;
        }
        else if ($scope.revenueList.length == 0 && $scope.oldrevenueList.length == 0 ){
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
        if ($scope.revenueList.length == 0 && $scope.oldrevenueList.length == 0){
            $('#revenue').modal("hide");
            $scope.campaign.cm_revenue="No";
            $scope.Revenue="";
        }
        else if ($scope.revenueList.length == 0 && $scope.oldrevenueList.length != 0){
            $('#revenue').modal("hide");
            $scope.campaign.cm_revenue="Yes";
            $scope.Revenue="";
        }
        else if ($scope.revenueList.length > 0){
            $('#revenue_delete').modal("show");
        }
    };
    $scope.revenueDelConfirm=function(){
        $scope.revenueList=[];
        if($scope.oldrevenueList.length != 0)
            $scope.campaign.cm_revenue="Yes";
        else
            $scope.campaign.cm_revenue="No";
        $('#revenue_delete').modal("hide");
        $('#revenue').modal("hide");
    };
    $scope.revenueNoChange=function(){
        $('#revenue_delete').modal("hide");
    };
    $scope.updateRevenue=function(){
       $('#revenue').modal("show");
    };

    $scope.no_revenue_DelConfirm=function(){
        $scope.oldrevenueList=[];
        $scope.campaign.cm_revenue="No";
        $('#no_revenue_delete').modal("hide");
    };
    $scope.no_revenue_NoChange=function(){
        $('#no_revenue_delete').modal("hide");
        $scope.campaign.cm_revenue="Yes";
    };
//10. END Modal Revenue List


//11. Modal Custom Question List
    $scope.loadquestFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handlequestFile = function () {
        if($('#filecustomquestion').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filecustomquestion').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        else if($('#cmcm_answer').val() == undefined || $('#cmcm_answer').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Answers.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cmcm_answer').focus(); 
            }, 1500);
        }
        else{
        $scope.customQuestionList.push($scope.custom_question);
        $scope.custom_question=null;
        }
    }; 
    $scope.deleteCustomQuestion=function(index){
        $scope.customQuestionList.splice(index,1);
    };
    $scope.deleteoldCustomQuestion=function(index){
        $scope.oldcustomQuestionList.splice(index,1);
    };
    $scope.addCustomQuestion=function(){
        if ($scope.customQuestionList.length > 0){
            angular.forEach($scope.customQuestionList, function(value,key) {
                $scope.oldcustomQuestionList.push(value);
            })
            $scope.customQuestionList=[];
            $('#custom_question').modal("hide");
            $scope.custom_question=null;
        }
        else if ($scope.oldcustomQuestionList.length > 0){
            $scope.customQuestionList=[];
            $('#custom_question').modal("hide");
            $scope.custom_question=null;
        }
        else if ($scope.customQuestionList.length == 0 && $scope.oldcustomQuestionList.length == 0 ){
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
        else if ($scope.customQuestionList.length == 0 && $scope.oldcustomQuestionList.length != 0){
            $('#custom_question').modal("hide");
            $scope.campaign.cm_custom_question="Yes";
            $scope.custom_question="";
        }
        else if ($scope.customQuestionList.length > 0){
            $('#custom_delete').modal("show");
        }
    };
    $scope.customDelConfirm=function(){
        $scope.customQuestionList=[];
        if($scope.oldcustomQuestionList.length != 0)
            $scope.campaign.cm_custom_question="Yes";
        else
            $scope.campaign.cm_custom_question="No";
        $('#custom_delete').modal("hide");
        $('#custom_question').modal("hide");
    };
    $scope.customNoChange=function(){
        $('#custom_delete').modal("hide");
    };
    $scope.updateCustomQuestion=function(){
       $('#custom_question').modal("show");
    };

    $scope.no_custom_DelConfirm=function(){
        $scope.oldcustomQuestionList=[];
        $scope.campaign.cm_custom_question="No";
        $('#no_custom_delete').modal("hide");
    };
    $scope.no_custom_NoChange=function(){
        $('#no_custom_delete').modal("hide");
        $scope.campaign.cm_custom_question="Yes";
    };
//11. END Modal Custom Question List


//12. Modal Denied Domain List
    $scope.loadenydomainFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handledenydomainFile = function () {
        if($('#filedenieddomain').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filedenieddomain').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.denied_domain=null;
        }
    }; 
    $scope.deleteDeniedDomain=function(index){
        $scope.deniedDomainList.splice(index,1);
    };
    $scope.deleteoldDeniedDomain=function(index){
        $scope.olddeniedDomainList.splice(index,1);
    };
    $scope.addDeniedDomain=function(){
        if ($scope.deniedDomainList.length > 0){
            angular.forEach($scope.deniedDomainList, function(value,key) {
                $scope.olddeniedDomainList.push(value);
            })
            $scope.deniedDomainList=[];
            $('#denied_domain').modal("hide");
            $scope.denied_domain=null;
        }
        else if ($scope.olddeniedDomainList.length > 0){
            $scope.deniedDomainList=[];
            $('#denied_domain').modal("hide");
            $scope.denied_domain=null;
        }
        else if ($scope.deniedDomainList.length == 0 && $scope.olddeniedDomainList.length == 0 ){
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
        else if ($scope.deniedDomainList.length == 0 && $scope.olddeniedDomainList.length != 0){
            $('#denied_domain').modal("hide");
            $scope.campaign.cm_denied_domain="Yes";
            $scope.denied_domain="";
        }
        else if ($scope.deniedDomainList.length > 0){
            $('#denied_delete').modal("show");
        }
    };
    $scope.deniedDelConfirm=function(){
        $scope.deniedDomainList=[];
        if($scope.olddeniedDomainList.length != 0)
            $scope.campaign.cm_denied_domain="Yes";
        else
            $scope.campaign.cm_denied_domain="No";
        $('#denied_delete').modal("hide");
        $('#denied_domain').modal("hide");
    };
    $scope.deniedNoChange=function(){
        $('#denied_delete').modal("hide");
    };
    $scope.updateDeniedDomain=function(){
       $('#denied_domain').modal("show");
    };

    $scope.no_denied_DelConfirm=function(){
        $scope.olddeniedDomainList=[];
        $scope.campaign.cm_denied_domain="No";
        $('#no_denied_delete').modal("hide");
    };
    $scope.no_denied_NoChange=function(){
        $('#no_denied_delete').modal("hide");
        $scope.campaign.cm_denied_domain="Yes";
    };
//12. END Modal Denied Domain List


//13. Modal Campaign Assets List
    $scope.loadassetFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handleassetFile = function () {
        if($('#fileasset').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#fileasset').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.campAsset=null;
        }
    }; 
    $scope.deleteassetList=function(index){
        $scope.campAssetList.splice(index,1);
    };
    $scope.deleteoldassetList=function(index){
        $scope.oldcampAssetList.splice(index,1);
    };
    $scope.addassetList=function(){
        if ($scope.campAssetList.length > 0){
            angular.forEach($scope.campAssetList, function(value,key) {
                $scope.oldcampAssetList.push(value);
            })
            $scope.campAssetList=[];
            $('#asset').modal("hide");
            $scope.campAsset=null;
        }
        else if ($scope.oldcampAssetList.length > 0){
            $scope.campAssetList=[];
            $('#asset').modal("hide");
            $scope.campAsset=null;
        }
        else if ($scope.campAssetList.length == 0 && $scope.oldcampAssetList.length == 0 ){
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
        if ($scope.campAssetList.length == 0 && $scope.oldcampAssetList.length == 0){
            $('#asset').modal("hide");
            $scope.campaign.cm_campaign_asset="No";
            $scope.campAsset="";
        }
        else if ($scope.campAssetList.length == 0 && $scope.oldcampAssetList.length != 0){
            $('#asset').modal("hide");
            $scope.campaign.cm_campaign_asset="Yes";
            $scope.campAsset="";
        }
        else if ($scope.campAssetList.length > 0){
            $('#asset_delete').modal("show");
        }
    };
    $scope.assetDelConfirm=function(){
        $scope.campAssetList=[];
        if($scope.oldcampAssetList.length != 0)
            $scope.campaign.cm_campaign_asset="Yes";
        else
            $scope.campaign.cm_campaign_asset="No";
        $('#asset_delete').modal("hide");
        $('#asset').modal("hide");
    };
    $scope.assetNoChange=function(){
        $('#asset_delete').modal("hide");
    };
    $scope.updateAsset=function(){
       $('#asset').modal("show");
    };

    $scope.no_asset_DelConfirm=function(){
        $scope.oldcampAssetList=[];
        $scope.campaign.cm_campaign_asset="No";
        $('#no_asset_delete').modal("hide");
    };
    $scope.no_asset_NoChange=function(){
        $('#no_asset_delete').modal("hide");
        $scope.campaign.cm_campaign_asset="Yes";
    };
//13. END Modal Campaign Assets List


//14. Modal Industry  List
    $scope.loadindustryFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handleindustryFile = function () {
        if($('#fileindustry').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#fileindustry').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
    $scope.saveindustry = function(data){
        data.forEach(function(value,key){
         $scope.industryList.push(value);
        })
    };
    $scope.industryAdd=function(){
        if($('#cim_industries').val() == undefined || $('#cim_industries').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter The Industry.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $('#cim_industries').focus(); 
            }, 1500);
        }
        else{
        $scope.industryList.push($scope.industry);
        $scope.industry=null;
        }
    }; 
    $scope.deleteindustryList=function(index){
        $scope.industryList.splice(index,1);
    };
    $scope.deleteoldindustryList=function(index){
        $scope.oldindustryList.splice(index,1);
    };
    $scope.addindustryList=function(){
        if ($scope.industryList.length > 0){
            angular.forEach($scope.industryList, function(value,key) {
                $scope.oldindustryList.push(value);
            })
            $scope.industryList=[];
            $('#industry_list').modal("hide");
            $scope.industry=null;
        }
        else if ($scope.oldindustryList.length > 0){
            $scope.industryList=[];
            $('#industry_list').modal("hide");
            $scope.industry=null;
        }
        else if ($scope.industryList.length == 0 && $scope.oldindustryList.length == 0 ){
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
        if ($scope.industryList.length == 0 && $scope.oldindustryList.length == 0){
            $('#industry_list').modal("hide");
            $scope.campaign.cm_industry="No";
            $scope.industry="";
        }
        else if ($scope.industryList.length == 0 && $scope.oldindustryList.length != 0){
            $('#industry_list').modal("hide");
            $scope.campaign.cm_industry="Yes";
            $scope.industry="";
        }
        else if ($scope.industryList.length > 0){
            $('#industry_delete').modal("show");
        }
    };
    $scope.industryDelConfirm=function(){
        $scope.industryList=[];
        if($scope.oldindustryList.length != 0)
            $scope.campaign.cm_industry="Yes";
        else
            $scope.campaign.cm_industry="No";
        $('#industry_delete').modal("hide");
        $('#industry_list').modal("hide");
    };
    $scope.industryNoChange=function(){
        $('#industry_delete').modal("hide");
    };
    $scope.updateIndustryList=function(){
       $('#industry_list').modal("show");
    };

    $scope.no_industry_DelConfirm=function(){
        $scope.oldindustryList=[];
        $scope.campaign.cm_industry="No";
        $('#no_industry_delete').modal("hide");
    };
    $scope.no_industry_NoChange=function(){
        $('#no_industry_delete').modal("hide");
        $scope.campaign.cm_industry="Yes";
    };
//14. END Modal Industry  List



//15. Modal Department List
    $scope.loaddepartmentFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handledepartmentFile = function () {
        if($('#filedepartment').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filedepartment').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.departments=null;
        }
    }; 
    $scope.deletedepartmentList=function(index){
        $scope.departmentList.splice(index,1);
    };
    $scope.deleteolddepartmentList=function(index){
        $scope.olddepartmentList.splice(index,1);
    };
    $scope.adddepartmentList=function(){
        if ($scope.departmentList.length > 0){
            angular.forEach($scope.departmentList, function(value,key) {
                $scope.olddepartmentList.push(value);
            })
            $scope.departmentList=[];
            $('#department').modal("hide");
            $scope.departments=null;
        }
        else if ($scope.olddepartmentList.length > 0){
            $scope.departmentList=[];
            $('#department').modal("hide");
            $scope.departments=null;
        }
        else if ($scope.departmentList.length == 0 && $scope.olddepartmentList.length == 0 ){
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
        if ($scope.departmentList.length == 0 && $scope.olddepartmentList.length == 0){
            $('#department').modal("hide");
            $scope.campaign.cm_dept="No";
            $scope.departments="";
        }
        else if ($scope.departmentList.length == 0 && $scope.olddepartmentList.length != 0){
            $('#department').modal("hide");
            $scope.campaign.cm_dept="Yes";
            $scope.departments="";
        }
        else if ($scope.departmentList.length > 0){
            $('#department_delete').modal("show");
        }
    };
    $scope.deptDelConfirm=function(){
        $scope.departmentList=[];
        if($scope.olddepartmentList.length != 0)
            $scope.campaign.cm_dept="Yes";
        else
            $scope.campaign.cm_dept="No";
        $('#department_delete').modal("hide");
        $('#department').modal("hide");
    };
    $scope.deptNoChange=function(){
        $('#department_delete').modal("hide");
    };
    $scope.updateDepartment=function(){
       $('#department').modal("show");
    };

    $scope.no_department_DelConfirm=function(){
        $scope.olddepartmentList=[];
        $scope.campaign.cm_dept="No";
        $('#no_department_delete').modal("hide");
    };
    $scope.no_department_NoChange=function(){
        $('#no_department_delete').modal("hide");
        $scope.campaign.cm_dept="Yes";
    };
//15. END Modal Department List


//16. Modal Method List
    $scope.loadmethodFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handlemethodFile = function () {
        if($('#filemethod').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filemethod').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.methods=null;
        }
    }; 
    $scope.deletemethodList=function(index){
        $scope.methodList.splice(index,1);
    };
    $scope.deleteoldmethodList=function(index){
        $scope.oldmethodList.splice(index,1);
    };
    $scope.addmethodList=function(){
        if ($scope.methodList.length > 0){
            angular.forEach($scope.methodList, function(value,key) {
                $scope.oldmethodList.push(value);
            })
            $scope.methodList=[];
            $('#method').modal("hide");
            $scope.methods=null;
        }
        else if ($scope.oldmethodList.length > 0){
            $scope.methodList=[];
            $('#method').modal("hide");
            $scope.methods=null;
        }
        else if ($scope.methodList.length == 0 && $scope.oldmethodList.length == 0 ){
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
        if ($scope.methodList.length == 0 && $scope.oldmethodList.length == 0){
            $('#method').modal("hide");
            $scope.campaign.cm_method="No";
            $scope.methods="";
        }
        else if ($scope.methodList.length == 0 && $scope.oldmethodList.length != 0){
            $('#method').modal("hide");
            $scope.campaign.cm_method="Yes";
            $scope.methods="";
        }
        else if ($scope.methodList.length > 0){
            $('#method_delete').modal("show");
        }
    };
    $scope.methodDelConfirm=function(){
        $scope.methodList=[];
        if($scope.oldmethodList.length != 0)
            $scope.campaign.cm_method="Yes";
        else
            $scope.campaign.cm_method="No";
        $('#method_delete').modal("hide");
        $('#method').modal("hide");
    };
    $scope.methodNoChange=function(){
        $('#method_delete').modal("hide");
    };
    $scope.updateMethod=function(){
       $('#method').modal("show");
    };

    $scope.no_method_DelConfirm=function(){
        $scope.oldmethodList=[];
        $scope.campaign.cm_method="No";
        $('#no_method_delete').modal("hide");
    };
    $scope.no_method_NoChange=function(){
        $('#no_method_delete').modal("hide");
        $scope.campaign.cm_method="Yes";
    };
//16. END Modal Method List


//17. Modal Job Function/Level List
    $scope.loadlevelFile = function (files) { 
        $scope.$apply(function () {  
            $scope.selectedFile = files[0];  
        })  
    };
    $scope.handlelevelFile = function () {
        if($('#filejoblevel').val() == "" ){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Select File.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
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

                          $('#filejoblevel').val('');
                          $scope.selectedFile = '';
      
                    } else {  
                        $scope.msg = "Error : Something Wrong !";  
                    }        
                }       
                reader.onerror = function (ex) {       
                }  
                reader.readAsBinaryString(file);  
            }  
        }        
    };
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
        $scope.JobLevel=null;
        }
    }; 
    $scope.deletelevelList=function(index){
        $scope.levelList.splice(index,1);
    };
    $scope.deleteoldlevelList=function(index){
        $scope.oldlevelList.splice(index,1);
    };
    $scope.addlevelList=function(){
        if ($scope.levelList.length > 0){
            angular.forEach($scope.levelList, function(value,key) {
                $scope.oldlevelList.push(value);
            })
            $scope.levelList=[];
            $('#level').modal("hide");
            $scope.JobLevel=null;
        }
        else if ($scope.oldlevelList.length > 0){
            $scope.levelList=[];
            $('#level').modal("hide");
            $scope.JobLevel=null;
        }
        else if ($scope.levelList.length == 0 && $scope.oldlevelList.length == 0 ){
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
        if ($scope.levelList.length == 0 && $scope.oldlevelList.length == 0){
            $('#level').modal("hide");
            $scope.campaign.cm_job="No";
            $scope.JobLevel="";
        }
        else if ($scope.levelList.length == 0 && $scope.oldlevelList.length != 0){
            $('#level').modal("hide");
            $scope.campaign.cm_job="Yes";
            $scope.JobLevel="";
        }
        else if ($scope.levelList.length > 0){
            $('#level_delete').modal("show");
        }
    };
    $scope.levelDelConfirm=function(){
        $scope.levelList=[];
        if($scope.oldlevelList.length != 0)
            $scope.campaign.cm_job="Yes";
        else
            $scope.campaign.cm_job="No";
        $('#level_delete').modal("hide");
        $('#level').modal("hide");
    };
    $scope.levelNoChange=function(){
        $('#level_delete').modal("hide");
    };
    $scope.updatelevel=function(){
       $('#level').modal("show");
    };

    $scope.no_level_DelConfirm=function(){
        $scope.oldlevelList=[];
        $scope.campaign.cm_job="No";
        $('#no_level_delete').modal("hide");
    };
    $scope.no_level_NoChange=function(){
        $('#no_level_delete').modal("hide");
        $scope.campaign.cm_job="Yes";
    };
//17. END Modal Job Function/Level List



 
    // $('#cm_first_dely').focus();
    $scope.addEntry = function () { 
		var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
        
        if($('#cm_first_dely').val() == undefined || $('#cm_first_dely').val() == ""){
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
        else if($('#cm_restriction').val() == undefined || $('#cm_restriction').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Restriction.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_restriction').focus();
                }, 1500);
        }
        else if($('#cm_account_list').val() == undefined || $('#cm_account_list').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Select Account List.</p>',
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
                message: '<p class="text-center">Please Select Supression File.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_supression_file').focus();
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
        else if($('#ctm_title').val() == undefined || $('#ctm_title').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter The Job Title.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#cm_title').focus();
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
        else if(!numRegex.test($scope.campaign.cm_lead_count)){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">Please Enter Correct Lead Count.</p>',
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
                message: '<p class="text-center">Please Select Allowed Domain.</p>',
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
                message: '<p class="text-center">Please Select Custom Question.</p>',
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
                message: '<p class="text-center">Please Select Denied Domain.</p>',
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

                $scope.objs={
                    campaign:$scope.campaign,
                    accountList:$scope.oldaccountList,
                    supressionList:$scope.oldsupressionList,
                    allowDomainList:$scope.oldallowDomainList,
                    customQuestionList:$scope.oldcustomQuestionList,
                    deniedDomainList:$scope.olddeniedDomainList,
                    titleList : $scope.oldtitleList,
                    industryList : $scope.oldindustryList,
                    restrictList : $scope.oldrestrictList,
                    domainList : $scope.olddomainList,
                    empsizeList : $scope.oldempsizeList,
                    verticalList : $scope.oldverticalList,
                    geoList : $scope.oldgeoList,
                    campAssetList : $scope.oldcampAssetList,
                    departmentList : $scope.olddepartmentList,
                    methodList : $scope.oldmethodList,
                    revenueList : $scope.oldrevenueList,
                    levelList : $scope.oldlevelList
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
                        message: '<p class="text-center">Campaign Saved!</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-success");
                        setTimeout(function(){
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            window.location.href = '#/campaign/'; 
                            dialog.modal('hide');  
                        }, 1500);
                        
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