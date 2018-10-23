// import admin
angular.module('campaign').controller('campaignListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.campaignList = [];
    $scope.campaignListcount=0;
    $scope.loading1 = 1;
    $scope.limit={};
    $scope.accountList=[];
    $scope.supressionList=[];
    $scope.allowDomainList=[];
    $scope.customQuestionList=[];
    $scope.deniedDomainList=[];
    $scope.leadgoal=0;
    $scope.campaign={};
    $scope.apiURL = $rootScope.baseURL+'/campaign/campaign/total';
    
    
    $scope.url = 'Tried to enter campaign Page';

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
    var value = '#/campaign';
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

    var supermission=JSON.parse(localStorage.getItem('supermission'));
    var editValue = 7;
    var deleteValue = 8;
    var exportvalue=9;
    var checkedit = supermission.includes(editValue);
    var checkdelete = supermission.includes(deleteValue);
    var checkexport = supermission.includes(exportvalue);
    $scope.getsupermission=function(){
          if(checkedit == false)
          {
            $scope.edithide=0;
          }
          if(checkdelete == false)
          {
            $scope.deletehide=0;
          }
          if(checkexport == false)
          {
            $('#btnExport').removeAttr('onclick');
            $('#modalExport').removeAttr('onclick');
            $scope.exporthide=0;
          }
          else
          {
             $('#btnExport').attr('onclick','exportXlslist()');
             $('#modalExport').attr('onclick','exportfn()');
          }
          if($scope.deletehide == 0 && $scope.edithide == 0)
          {
            $scope.theadhide = 0;
          }

      };
      $scope.getsupermission();


    exportXlslist = function(){
      $("#export").table2excel({
        exclude: ".excludeThisClass",
        name: "Campaign list",
        filename: "Campaign list" //do not include extension
      });
    };

    $('#cm_from_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.limit.cm_from_date = $('#cm_from_date').val();
          }
    }).datepicker('setDate', 'today');

    $('#cm_to_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.limit.cm_to_date = $('#cm_to_date').val();
          }
    }).datepicker('setDate', 'today');
    
    

      $('#table').hide();    
     $scope.gettable=function(){
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/campaign',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaignObj)
      {
            campaignObj.forEach(function(value,key){
             $http({
              method: 'GET',
              url: $rootScope.baseURL+'/campaign/contact/goal/'+value.cm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function(campaign)
            {
               value.targetcount=campaign[0].total;
            })
            .error(function(data) 
            {   
              toastr.error('Oops, Something Went Wrong.', 'Error', {
                    closeButton: true,
                    progressBar: true,
                  positionClass: "toast-top-center",
                  timeOut: "500",
                  extendedTimeOut: "500",
                });
            });
            $scope.campaignList.push(value);
          });   
            
      })
      .error(function(data) 
      {   
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
      });
    };
    $scope.gettable();

    

   $scope.getAll = function () {
        if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }

      $scope.limit.cm_from_date = $('#cm_from_date').val();
      $scope.limit.cm_to_date = $('#cm_to_date').val();
    $scope.limit.userid=localStorage.getItem('logichron_userid');
      $http({
        method: 'POST',
        url: $scope.apiURL,
        data:$scope.limit,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
        campaign.forEach(function (value, key) {
                  $scope.campaignListcount=value.total;
              });

              $scope.$watch("currentPage + numPerPage",
                  function () {
                    $scope.resetpagination();
                  });
              // $scope.$apply(); 
      })
      .error(function(data) 
      {   
              $scope.loading1 = 1;
        toastr.error('Oops, Something Went Wrong.', 'Error', {
              closeButton: true,
              progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });              
      });
    };

   //Pagination Function
  
      $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.campaignListcount)
            $scope.filterUser = $scope.campaignListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/campaign/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.filteredTodos = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $http({
                            method: 'GET',
                            url: $rootScope.baseURL+'/campaign/contact/goal/'+value.cm_id,
                            headers: {'Content-Type': 'application/json',
                                      'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                          })
                          .success(function(campaign)
                          {
                             value.targetcount=campaign[0].total;
                          })
                          .error(function(data) 
                          {   
                            toastr.error('Oops, Something Went Wrong.', 'Error', {
                                  closeButton: true,
                                  progressBar: true,
                                positionClass: "toast-top-center",
                                timeOut: "500",
                                extendedTimeOut: "500",
                              });
                          });
                    $scope.filteredTodos.push(value);
                    
                  });


                }
                
                      // $scope.obj_Main = $scope.vendorList;
                      $scope.loading1 = 1;

                       
                      // $scope.$apply(); 
              })
              .error(function(data) 
              {   
                  $scope.loading1 = 1;
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 3001);             
              });
    };
    //search Data
    $scope.getSearch = function () {
       $scope.getAll();
    };

    $scope.check=function(){
      $scope.toDate = $("#cm_to_date").val();
    $scope.fromDate = $("#cm_from_date").val();
    if(angular.isUndefined($scope.fromDate) || $scope.fromDate === null || $scope.fromDate == "")
      {
         var dialog = bootbox.dialog({
          message: '<p class="text-center">please select from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      if(angular.isUndefined($scope.toDate) || $scope.toDate === null || $scope.toDate == "")
      {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">please select to-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      $scope.dateFilter = '&startTime='+ $scope.fromDate + '&endTime=' + $scope.toDate;

      
      $scope.fDate = new Date($scope.fromDate);
      $scope.fDate.setHours(0,0,0,0);
      $scope.tDate = new Date($scope.toDate);
      $scope.tDate.setHours(0,0,0,0);
      if($scope.fDate > $scope.tDate)
      {
          var dialog = bootbox.dialog({
          message: '<p class="text-center">oops!!! to-date greater than from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }
      $scope.getAll();
      
    };

    Date.prototype.setFromDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     if(mm == 0){
      document.getElementById("cm_from_date").value = yyyy-1 +"-"+ ("12") +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
     else if(mm==2||mm==4||mm==6||mm==7||mm==9||mm==11){
      document.getElementById("cm_from_date").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd-1:"0"+dd[0]);
     }
     else{
      document.getElementById("cm_from_date").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
    };

    Date.prototype.setToDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     document.getElementById("cm_to_date").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     
    };

    d = new Date();
    d.setFromDate();
    d.setToDate();
   

    $scope.deleteCampaign = function (cm_id) {
      $scope.cm_id=cm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/campaign/delete/'+$scope.cm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(campaignObj)
	    {
        $('#del').text("Delete");
        $('#del').removeAttr('disabled');
        $scope.campaignList = [];
        $scope.getAll();
        $('#confirm-delete').modal('hide');	  
	    })
	    .error(function(data) 
	    {   
	      var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
	    });
	};
    
   $scope.QualifyContact = function(index){
    $scope.viewContact=[];
      if($scope.filteredTodos[index].targetcount > 0){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/telecaller/postque/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.viewContact.push(value);
            });
            $("#Qualified_list").modal("show");

        })
        .error(function(data) 
        {   
            toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });  
        });
      }
    }; 

    //exporting table
    exportfn = function(){
        $("#QualifyExport").table2excel({
        exclude: ".excludeThisClass",
        name: "Qualify_list",
        filename: "Qualify_list" //do not include extension
      });
    };
    /*end of export*/
// Modal Views
// 1
  $scope.accntView = function(index){
    $scope.accountList=[];
      if($scope.filteredTodos[index].cm_account_list == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/Accview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.accountList.push(value);
            });
            $("#account_list").modal("show");

        })
        .error(function(data) 
        {   
            toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });  
        });
      }
    };
// 2
  $scope.supressionView = function(index){
    $scope.supressionList=[];
      if($scope.filteredTodos[index].cm_supression_file == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/Suppview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.supressionList.push(value);
            });
            $("#supression_file").modal("show");
        })
        .error(function(data) 
        {   
            toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });  
        });
      }
    };
// 3
  $scope.allowView = function(index){
    $scope.allowDomainList=[];
      if($scope.filteredTodos[index].cm_allow_domain == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/Allowview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.allowDomainList.push(value);
            });
            $("#allow_Domain").modal("show");
        })
        .error(function(data) 
        {   
            toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });  
        });
      }
    };
// 4
  $scope.customView = function(index){
    $scope.customQuestionList=[];
      if($scope.filteredTodos[index].cm_custom_question == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/Custview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.customQuestionList.push(value);
            });
            $("#custom_question").modal("show");
        })
        .error(function(data) 
        {   
            toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });  
        });
      }
    };

// 5
  $scope.deniedView = function(index){
    $scope.deniedDomainList=[];
      if($scope.filteredTodos[index].cm_denied_domain == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/Denyview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.deniedDomainList.push(value);
            });
            $("#denied_domain").modal("show");
        })
        .error(function(data) 
        {   
            toastr.error('Oops, Something Went Wrong.', 'Error', {
                closeButton: true,
                progressBar: true,
                positionClass: "toast-top-center",
                timeOut: "500",
                extendedTimeOut: "500",
            });  
        });
      }
    };




});