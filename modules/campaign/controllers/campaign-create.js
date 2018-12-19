// import admin
angular.module('campaign').controller('campaignAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {

  
    $scope.campaign = {};
    $scope.obj={};
    $scope.titled={};
    $scope.titleList=[];
    $scope.industry={};
    $scope.industryList=[];
    $scope.account={};
    $scope.accountList=[];
    $scope.supression={};
    $scope.supressionList=[];
    $scope.allow_domain={};
    $scope.allowDomainList=[];
    $scope.custom_question={};
    $scope.customQuestionList=[];
    $scope.denied_domain={};
    $scope.deniedDomainList=[];
    $scope.restrict={};
    $scope.restrictList=[];
    $scope.domain_limit={};
    $scope.domainList=[];
    $scope.Employee_sizes={};
    $scope.empsizeList=[];
    $scope.Vertical = {};
    $scope.VerticalList=[];
    $scope.geos = {};
    $scope.geoList=[];
    $scope.campAsset={};
    $scope.campAssetList=[];
    $scope.departments={};
    $scope.departmentList=[];
    $scope.methods={};
    $scope.methodList=[];
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
    $scope.campaign.cm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    
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
    $('#cm_account_list').change(function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="Yes"){ //Compare it and if true
            $('#account_list').modal({backdrop: 'static', keyboard: false});
            $('#account_list').modal("show"); //Open Modal
        }
        else {
            if($scope.accountList.length > 0){
                $('#accnt_delete').modal("show");
                $('#accnt_delete').modal({backdrop: 'static', keyboard: false});
                
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
            if($scope.supressionList.length > 0){
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
            if($scope.allowDomainList.length > 0){
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
            if($scope.customQuestionList.length > 0){
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
            if($scope.deniedDomainList.length > 0 ){
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
    });
    $('#ctm_title').change(function() { //jQuery Change Function
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
    $('#cm_restriction').change(function() { //jQuery Change Function
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
            $scope.campaign.cm_restriction="No";
            $scope.restrict="";
        }
        else if ($scope.restrictList.length > 0){
            $('#restrict_delete').modal("show");
            $scope.campaign.cm_restriction="No";
        }
    };
    $scope.restDelConfirm=function(){
        $scope.restrictList=[];
        $scope.campaign.cm_restriction="No";
        $('#restrict_delete').modal("hide");
        $('#restriction_list').modal("hide");
    };
    $scope.restNoChange=function(){
        $scope.campaign.cm_restriction="Yes";
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
        else if ($scope.domainList.length > 0){
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
        if ($scope.accountList.length > 0){
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
         if ($scope.accountList.length == 0){
            
            $('#account_list').modal("hide");
            $scope.campaign.cm_account_list="No";
            $scope.account="";
        }
        else if ($scope.accountList.length > 0){
            $('#accnt_delete').modal("show");
            $scope.campaign.cm_account_list="No";
        }
    };
    $scope.accntDelConfirm=function(){
        $scope.accountList=[];
        $scope.campaign.cm_account_list="No";
        $('#accnt_delete').modal("hide");
        $('#account_list').modal("hide");
    };
    $scope.accntNoChange=function(){
        $scope.campaign.cm_account_list="Yes";
    };
    $scope.updateAccntList=function(){
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
        if ($scope.supressionList.length > 0){
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
         if ($scope.supressionList.length == 0){
            
            $('#supression_file').modal("hide");
            $scope.campaign.cm_supression_file="No";
            $scope.supression="";
        }
        else if ($scope.supressionList.length > 0){
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
        if ($scope.allowDomainList.length > 0){
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
         if ($scope.allowDomainList.length == 0){
            
            $('#allow_Domain').modal("hide");
            $scope.campaign.cm_allow_domain="No";
            $scope.allow_domain="";
        }
        else if ($scope.allowDomainList.length > 0){
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
        $scope.custom_question=""; 
        }
    };
    $scope.deleteCustomQuestion=function(index){
        $scope.customQuestionList.splice(index,1);
    };
    $scope.addCustomQuestion=function(){
        if ($scope.customQuestionList.length > 0){
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
         if ($scope.customQuestionList.length == 0){
            
            $('#custom_question').modal("hide");
            $scope.campaign.cm_custom_question="No";
            $scope.custom_question="";
        }
        else if ($scope.customQuestionList.length > 0){
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
        if ($scope.deniedDomainList.length > 0){
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
         if ($scope.deniedDomainList.length == 0){
           
            $('#denied_domain').modal("hide");
            $scope.campaign.cm_denied_domain="No";
            $scope.denied_domain="";
        }
        else if ($scope.deniedDomainList.length > 0){
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
       $('#denied_domain').modal("show");
    };
   
    //title
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
        else if ($scope.titleList.length > 0){
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
        else if ($scope.industryList.length > 0){
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
        else if ($scope.VerticalList.length > 0){
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
        else if ($scope.geoList.length > 0){
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
        else if ($scope.campAssetList.length > 0){
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
        else if ($scope.departmentList.length > 0){
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
        else if ($scope.methodList.length > 0){
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
    // $('#cm_first_dely').focus();
    $scope.addEntry = function () { 
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
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
                    $('#cm_industry').focus();
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
                    methodList : $scope.methodList
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
                       window.location.href = '#/campaign/';  
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