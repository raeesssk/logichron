// import admin
angular.module('contactdiscovery').controller('contactdiscoveryListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

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
    $scope.limit={};
    $scope.limit.userid=localStorage.getItem('logichron_userid');
$scope.apiURL = $rootScope.baseURL+'/contact/contact/total';
    
    $scope.url = 'Tried to enter contact discovery list Page';
console.log( $rootScope.baseURL);
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
    // var value = '#/contactdiscovery/joblist';
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

    // var supermission=JSON.parse(localStorage.getItem('supermission'));
    // var editValue = 10;
    // var deleteValue = 11;
    // var exportvalue = 12;
    // var checkedit = supermission.includes(editValue);
    // var checkdelete = supermission.includes(deleteValue);
    // var checkexport = supermission.includes(exportvalue);
    // $scope.getsupermission=function(){
    //       if(checkedit == false)
    //       {
    //         $scope.edithide=0;
    //       }
    //       if(checkdelete == false)
    //       {
    //         $scope.deletehide=0;
    //       }
    //       if(checkexport == false)
    //       {
    //         $('#btnExport').removeAttr('onclick');
    //         $scope.exporthide=0;
    //       }
    //       else
    //       {
    //          $('#btnExport').attr('onclick','exportXlslist()');
    //       }
    //       if($scope.deletehide == 0 && $scope.edithide == 0)
    //       {
    //         $scope.theadhide = 0;
    //       }

    //   };
    //   $scope.getsupermission();
  

    $('#cdm_from_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.limit.cdm_from_date = $('#cdm_from_date').val();
          }
    }).datepicker('setDate', 'today');

    $('#cdm_to_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.limit.cdm_to_date = $('#cdm_to_date').val();
          }
    }).datepicker('setDate', 'today');

    exportXlslist = function(){

      console.log('test');
      $("#export").table2excel({
        exclude: ".excludeThisClass",
        name: "contact list",
        filename: "contact list" //do not include extension
      });
    };

    $('#table').hide();
   $scope.gettable=function(){
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/contact',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(contactobj)
      {
            contactobj.forEach(function(value,key){
                           
              $scope.contactdiscoveryList.push(value);
            })    
            
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

      $scope.limit.cdm_from_date = $('#cdm_from_date').val();
      $scope.limit.cdm_to_date = $('#cdm_to_date').val();
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
                url: $rootScope.baseURL+'/contact/contact/limit',
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

    $scope.check=function(){
      $scope.toDate = $("#cdm_to_date").val();
    $scope.fromDate = $("#cdm_from_date").val();
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
      document.getElementById("cdm_from_date").value = yyyy-1 +"-"+ ("12") +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
     else if(mm==2||mm==4||mm==6||mm==7||mm==9||mm==11){
      document.getElementById("cdm_from_date").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd-1:"0"+dd[0]);
     }
     else{
      document.getElementById("cdm_from_date").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     }
    };

    Date.prototype.setToDate = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     document.getElementById("cdm_to_date").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
     $scope.check();
    };

    d = new Date();
    d.setFromDate();
    d.setToDate();

    $scope.deleteEntry = function (cdm_id) {

      if(localStorage.getItem('logichron_contactdelete_permission') == 0)
      {
        $('#confirm-delete').modal('hide');
        console.log(localStorage.getItem('logichron_contactdelete_permission'));
          var dialog = bootbox.dialog({
          message: '<p class="text-center">You Are Not Authorized</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide');
          }, 1500);
        $('#trash').removeAttr('data-target');
        $('#trash').removeAttr('data-toggle');
        window.location.href = "#/contactdiscovery/joblist";
        
      }
      else
      {
        $('.modal').addClass('fade show');
        $scope.cdm_id=cdm_id;
      }
    }  

    $scope.deleteConfirm = function () {

        $('#del').attr('disabled','true');
        $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/contact/delete/'+$scope.cdm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
	    })
	    .success(function(contactdiscoveryObj)
	    {
                $('#del').text("Delete");
                $('#del').removeAttr('disabled');
                $scope.contactdiscoveryList = [];
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
          url: $rootScope.baseURL+'/question/view/'+$scope.filteredTodos[index].cdm_cm_id,
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
    
    $rootScope.socket.on('status',function(data){
          $scope.getAll();
      });
});