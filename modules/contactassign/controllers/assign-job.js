// import admin
angular.module('contactassign').controller('assignJobCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
/*
  $('#dashboardindex').removeClass("active");
  $('#customeraddindex').removeClass("active");
  $('#productindex').removeClass("active");
  $('#productaddindex').removeClass("active");
  $('#productlsitindex').removeClass("active");
  $('#invoiceindex').removeClass("active");
  $('#invoiceaddindex').removeClass("active");
  $('#invoicelistindex').removeClass("active");
  $('#cashbookindex').removeClass("active");
  $('#cashbookaddindex').removeClass("active");
  $('#cashbooklistindex').removeClass("active");
  $('#reportindex').removeClass("active");
  $('#reportinvoiceindex').removeClass("active");
  $('#customerindex').addClass("active");
  $('#customerlsitindex').addClass("active");
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.customerList = [];
    $scope.loading1 = 0;

$('#user-datepicker-from').datepicker({
 timepicker:false,
 format:'yyyy-mm-dd',
 maxDate:'+1970/01/02',
 scrollInput:false,
  autoclose: true
});

$('#user-datepicker-to').datepicker({
 timepicker:false,
 format:'yyyy-mm-dd',
 maxDate:'+1970/01/02',
 scrollInput:false,
  autoclose: true

});

$scope.filter = function()
  {
    $scope.toDate = document.getElementById("user-datepicker-to").value;
    $scope.fromDate = document.getElementById("user-datepicker-from").value;
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
      $('#filter-user-btn').attr('disabled','true');
      $('#filter-user-btn').text("please wait...");
      $('#view-details').modal('show');
    $scope.viewCustomerDetails($scope.ind);*/
      // $scope.getUser();

      // $scope.draw();

  //};

  // Date.prototype.setFromDate = function() {
  //  var yyyy = this.getFullYear().toString();
  //  var mm = (this.getMonth()).toString(); // getMonth() is zero-based
  //  var dd  = this.getDate().toString();
  //  document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
  // };

  // Date.prototype.setToDate = function() {
  //  var yyyy = this.getFullYear().toString();
  //  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  //  var dd  = this.getDate().toString();
  //  document.getElementById("user-datepicker-to").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
  // $scope.filter();
  // };

  // d = new Date();
  // d.setFromDate();
  // d.setToDate();
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.contactdiscoveryList = [];
    $scope.contactdiscoveryListcount=0;
    $scope.loading1 = 0;
    $scope.count;
    $scope.limit={};
    $scope.assign={};
    $scope.newcontactdiscoveryList=[];
    $scope.removeContactList=[];

$scope.apiURL = $rootScope.baseURL+'/assign/contact/total';
    
     var permission=JSON.parse(localStorage.getItem('permission'));
  var value = '#/assign';
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
          $location.path('/')
        }
        /*
        break;
      }*/

    };
    $scope.getrolepermission();
    
   $scope.getAll = function () {
        if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }
      $http({
        method: 'POST',
        url: $scope.apiURL,
        data:$scope.limit,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(contactdiscovery)
      {
        contactdiscovery.forEach(function (value, key) {
                  $scope.contactdiscoveryListcount=value.total;
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
        if ($scope.filterUser >= $scope.contactdiscoveryListcount)
            $scope.filterUser = $scope.contactdiscoveryListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/assign/contact/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {

                $scope.filteredTodos = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    
                    $scope.filteredTodos.push(value);
                  });
                }
                else{
                  
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

    $scope.getSearchCampaign = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/telecaller/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };
    
    $scope.getCampaignDetails=function(index){
      $scope.contactdiscoveryList=[];
      $('#assign_to').removeAttr('disabled');
      
        $scope.filteredTodos.forEach(function(value,key){
          $http({
              method: 'GET',
              url: $rootScope.baseURL+'/assign/check/emp/'+value.cdm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function(campaign)
            {
              campaign.forEach(function(val,key){
                if(val.ecm_cdm_id == value.cdm_id){
                  value.cem_select=true;
                }
              });
                  
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
             if($scope.assign.cem_cm_id.cm_id == value.cdm_cm_id ){
                
                 $scope.contactdiscoveryList.push(value); 
                
              }

      });
       $http({
              method: 'GET',
              url: $rootScope.baseURL+'/campaign/contact/count/'+$scope.assign.cem_cm_id.cm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function(campaign)
            {
               $scope.count=campaign[0].total;
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
             

    };

    $scope.campaignChanges=function(){
      if($scope.assign.cem_cm_id.cm_id == null){
          $scope.count=null;
          $scope.filteredTodos.forEach(function(val,key){
            val.cem_select=false;
          });
          $('#assign_to').attr('disabled',true)
      }
    };

    $scope.checkAll=function(contact,index){
          if(contact.cem_select){
            $('#assign_to').removeAttr('disabled');
            $scope.newcontactdiscoveryList.push(contact);
            console.log($scope.newcontactdiscoveryList);
          }
          else
          {
            $('#assign_to').attr('disabled',true);
            contact.cem_select=false;
            $scope.removeContactList.push($scope.newcontactdiscoveryList[index]);
            $scope.newcontactdiscoveryList.splice(index,1);
             $http({
              method: 'POST',
              url: $rootScope.baseURL+'/assign/delete/'+contact.cdm_id,
              data:$scope.removeContactList,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function(campaign)
            {
                var dialog = bootbox.dialog({
              message: '<p class="text-center">Contact Unassigned!!!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-success");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);
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

    $scope.assign=function(index){
      $scope.empdetails=[];
      $http({
          method: 'GET',
          url: $rootScope.baseURL+'/assign/emp/view/'+$scope.assign.cem_cm_id.cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.empdetails.push(value);
            });
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
    };

     $scope.empAssign=function(emp){
      $scope.employee=emp;
      
      $http({
          method: 'POST',
          url: $rootScope.baseURL+'/assign/assign/'+$scope.employee.emp_id,
          data: $scope.newcontactdiscoveryList,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Contact Assigned!!!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-success");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
            $('#emp-details').modal('hide');
            $route.reload();
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Contact Can not be Assigned!!!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500); 
        });
    };
    
   
    
});