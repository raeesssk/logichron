// import admin
angular.module('dataentry').controller('dataentryListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {
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
    $scope.dataentryList = [];
    $scope.dataentryListcount=0;
    $scope.loading1 = 0;
    $scope.limit={};

$scope.apiURL = $rootScope.baseURL+'/job/job/total';
    
    
    
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
      .success(function(dataentry)
      {
        dataentry.forEach(function (value, key) {
                  $scope.dataentryListcount=value.total;
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
        if ($scope.filterUser >= $scope.dataentryListcount)
            $scope.filterUser = $scope.dataentryListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/job/job/limit',
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

    $scope.deleteEntry = function (dm_id) {
      $scope.dm_id=dm_id;
    }  

    $scope.deleteConfirm = function () {
                $('#del').attr('disabled','true');
                $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/job/delete/'+$scope.dm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(dataentryObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.dataentryList = [];
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

  $scope.view = function(index){

        $scope.answers=[];
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/question/view/'+$scope.filteredTodos[index].dm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.answers.push(value);
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
    

});