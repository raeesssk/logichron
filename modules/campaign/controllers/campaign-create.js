// import admin
angular.module('campaign').controller('campaignAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {

  
    $scope.campaign = {};
    $scope.obj={};

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


	$scope.apiURL = $rootScope.baseURL+'/campaign/add';
    
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

    //Modal data Show
// 1
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
   

    // $('#cm_first_dely').focus();
    $scope.addEntry = function () { 
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
        else if($('#cm_title').val() == undefined || $('#cm_title').val() == ""){
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
        else if($('#cm_industry').val() == undefined || $('#cm_industry').val() == ""){
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
                    deniedDomainList:$scope.deniedDomainList
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