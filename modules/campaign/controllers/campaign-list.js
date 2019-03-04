// import admin
angular.module('campaign').controller('campaignListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
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
    $scope.contactNameList=[];
    $scope.contactNumberList=[];
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
    });

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
    });
    
    

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
            //  $http({
            //   method: 'GET',
            //   url: $rootScope.baseURL+'/campaign/contact/goal/'+value.cm_id,
            //   headers: {'Content-Type': 'application/json',
            //             'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            // })
            // .success(function(campaign)
            // {
            //    value.targetcount=campaign[0].total;
            // })
            // .error(function(data) 
            // {   
            //   toastr.error('Oops, Something Went Wrong.', 'Error', {
            //         closeButton: true,
            //         progressBar: true,
            //       positionClass: "toast-top-center",
            //       timeOut: "500",
            //       extendedTimeOut: "500",
            //     });
            // });
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
    // $scope.gettable();

    

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

  $scope.titleView = function(index){
      $scope.titleList=[];
      if($scope.filteredTodos[index].cm_title == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/titleview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.titleList.push(value);
            });
            $("#title_list").modal("show");
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

  // $scope.dlimitView = function(index){
  //   $scope.dlimitList=[];
  //     if($scope.filteredTodos[index].cm_domain_limit == 'Yes'){
  //       $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/campaign/dlimitview/'+$scope.filteredTodos[index].cm_id,
  //         //data: $scope.data,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //       })
  //       .success(function(obj)
  //       {
  //           obj.forEach(function(value, key){
  //             $scope.dlimitList.push(value);
  //           });
  //           $("#domain_limit").modal("show");
  //       })
  //       .error(function(data) 
  //       {   
  //           toastr.error('Oops, Something Went Wrong.', 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //           });  
  //       });
  //     }
  // };

  $scope.empsizeView = function(index){
    $scope.empsizeList=[];
      if($scope.filteredTodos[index].cm_emp_size == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/empsizeview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.empsizeList.push(value);
            });
            $("#emp_size").modal("show");
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

    // $scope.verticalView = function(index){
    // $scope.verticalList=[];
    //   if($scope.filteredTodos[index].cm_vertical == 'Yes'){
    //     $http({
    //       method: 'GET',
    //       url: $rootScope.baseURL+'/campaign/verticalview/'+$scope.filteredTodos[index].cm_id,
    //       //data: $scope.data,
    //       headers: {'Content-Type': 'application/json',
    //               'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
    //     })
    //     .success(function(obj)
    //     {
    //         obj.forEach(function(value, key){
    //           $scope.verticalList.push(value);
    //         });
    //         $("#vertical").modal("show");
    //     })
    //     .error(function(data) 
    //     {   
    //         toastr.error('Oops, Something Went Wrong.', 'Error', {
    //             closeButton: true,
    //             progressBar: true,
    //             positionClass: "toast-top-center",
    //             timeOut: "500",
    //             extendedTimeOut: "500",
    //         });  
    //     });
    //   }
    // };

  

    // $scope.methodView = function(index){
    // $scope.methodList=[];
    //   if($scope.filteredTodos[index].cm_method == 'Yes'){
    //     $http({
    //       method: 'GET',
    //       url: $rootScope.baseURL+'/campaign/methodview/'+$scope.filteredTodos[index].cm_id,
    //       //data: $scope.data,
    //       headers: {'Content-Type': 'application/json',
    //               'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
    //     })
    //     .success(function(obj)
    //     {
    //         obj.forEach(function(value, key){
    //           $scope.methodList.push(value);
    //         });
    //         $("#method").modal("show");
    //     })
    //     .error(function(data) 
    //     {   
    //         toastr.error('Oops, Something Went Wrong.', 'Error', {
    //             closeButton: true,
    //             progressBar: true,
    //             positionClass: "toast-top-center",
    //             timeOut: "500",
    //             extendedTimeOut: "500",
    //         });  
    //     });
    //   }
    // };

  $scope.revenueView = function(index){
    $scope.revenueList=[];
      if($scope.filteredTodos[index].cm_revenue == 'Yes'){
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/campaign/revenueview/'+$scope.filteredTodos[index].cm_id,
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(obj)
        {
            obj.forEach(function(value, key){
              $scope.revenueList.push(value);
            });
            $("#revenue").modal("show");
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

    
  // // Modal Views

// Restriction Modal ============
//   $scope.restView = function(index){
//     $scope.restList=[];
//       if($scope.filteredTodos[index].cm_restrict == 'Yes'){
//         $http({
//           method: 'GET',
//           url: $rootScope.baseURL+'/campaign/restview/total/'+$scope.filteredTodos[index].cm_id,
//           //data: $scope.data,
//           headers: {'Content-Type': 'application/json',
//                   'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
//         })
//         .success(function(obj)
//         {
//             obj.forEach(function(value, key){
//               $scope.restList.push(value);
//             });
//             $("#restriction").modal("show");
//         })
//         .error(function(data) 
//         {   
//             toastr.error('Oops, Something Went Wrong.', 'Error', {
//                 closeButton: true,
//                 progressBar: true,
//                 positionClass: "toast-top-center",
//                 timeOut: "500",
//                 extendedTimeOut: "500",
//             });  
//         });
//       }
//   };
  $scope.restView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchrestrictiontext = "";
    $scope.getAllRestriction();
    $("#restriction").modal("show");
  };
  $scope.getAllRestriction = function () {
    console.log($('#searchtextrest').val());
    $scope.limitRestriction = {};
     $scope.restrictionListcount=0;
    $scope.currentPageRestriction = 1;
    $scope.numPerPageRestriction = 10;
     $scope.restList = [];
        if ($('#searchtextrest').val() == undefined || $('#searchtextrest').val() == "") {
        $scope.limitRestriction.search = "";
      }
      else{
        $scope.limitRestriction.search = $scope.searchrestrictiontext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/restview/total/' +$scope.cm_id,
        data:$scope.limitRestriction,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
        campaign.forEach(function (value, key) {
                  $scope.restrictionListcount=value.total;
              });

              $scope.$watch("currentPageRestriction + numPerPageRestriction",
                  function () {
                    $scope.resetpaginationRestriction();
                  }); 
      })
      .error(function(data) 
      {   
              // $scope.loading1 = 1;
            toastr.error('Oops, Something Went Wrong.', 'Error', {
              closeButton: true,
              progressBar: true,
            positionClass: "toast-top-center",
            timeOut: "500",
            extendedTimeOut: "500",
          });              
      });
    };
    $scope.resetpaginationRestriction = function () {
        $scope.filterUser_Restriction = 0;
        $scope.filterUserend_Restriction = 1;
        var begin = (($scope.currentPageRestriction - 1) * $scope.numPerPageRestriction);
        var end = begin + $scope.numPerPageRestriction;
        $scope.filterUserend_Restriction = begin + 1;
        $scope.filterUser_Restriction = end;
        if ($scope.filterUser_Restriction >= $scope.restrictionListcount)
            $scope.filterUser_Restriction = $scope.restrictionListcount;

              $scope.restList = [];
              $scope.limitRestriction.number = $scope.numPerPageRestriction;
              $scope.limitRestriction.begin = begin;
              $scope.limitRestriction.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/restview/limit/' +$scope.cm_id,
                data: $scope.limitRestriction,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.restList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.restList.push(value);
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
                    }, 3001);             
              });
      };
      $scope.getSearchRestriction = function () {
         $scope.getAllRestriction();
      };
// End Restriction Modal ==========

// Denied Domain Modal ===========
// $scope.deniedView = function(index){
//     $scope.deniedDomainList=[];
//       if($scope.filteredTodos[index].cm_denied_domain == 'Yes'){
//         $http({
//           method: 'GET',
//           url: $rootScope.baseURL+'/campaign/Denyview/'+$scope.filteredTodos[index].cm_id,
//           //data: $scope.data,
//           headers: {'Content-Type': 'application/json',
//                   'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
//         })
//         .success(function(obj)
//         {
//             obj.forEach(function(value, key){
//               $scope.deniedDomainList.push(value);
//             });
//             $("#denied_domain").modal("show");
//         })
//         .error(function(data) 
//         {   
//             toastr.error('Oops, Something Went Wrong.', 'Error', {
//                 closeButton: true,
//                 progressBar: true,
//                 positionClass: "toast-top-center",
//                 timeOut: "500",
//                 extendedTimeOut: "500",
//             });  
//         });
//       }
//     };
  
  $scope.deniedView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchdenieddomaintext = "";
    $scope.getAllDeniedDomain();
    $("#denied_domain").modal("show");
  };
  $scope.getAllDeniedDomain = function () {
    $scope.limitDeniedDomain = {};
    $scope.DeniedDomainListcount=0;
    $scope.currentPageDeniedDomain = 1;
    $scope.numPerPageDeniedDomain = 10;
    $scope.deniedDomainList = [];
    $scope.filterUser_DeniedDomain = 0;
    $scope.filterUserend_DeniedDomain = 1;
      if ($('#searchtextdenieddomain').val() == undefined || $('#searchtextdenieddomain').val() == "") {
        $scope.limitDeniedDomain.search = "";
      }
      else{
        $scope.limitDeniedDomain.search = $scope.searchdenieddomaintext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/deniedomain/total/' +$scope.cm_id,
        data:$scope.limitDeniedDomain,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.DeniedDomainListcount=value.total;
          });

          $scope.$watch("currentPageDeniedDomain + numPerPageDeniedDomain",
              function () {
                $scope.resetpaginationDeniedDomain();
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
    $scope.resetpaginationDeniedDomain = function () {
        var begin = (($scope.currentPageDeniedDomain - 1) * $scope.numPerPageDeniedDomain);
        var end = begin + $scope.numPerPageDeniedDomain;
        $scope.filterUserend_DeniedDomain = begin + 1;
        $scope.filterUser_DeniedDomain = end;
        if ($scope.filterUser_DeniedDomain >= $scope.DeniedDomainListcount)
            $scope.filterUser_DeniedDomain = $scope.DeniedDomainListcount;

              $scope.deniedDomainList = [];
              $scope.limitDeniedDomain.number = $scope.numPerPageDeniedDomain;
              $scope.limitDeniedDomain.begin = begin;
              $scope.limitDeniedDomain.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/deniedomain/limit/' +$scope.cm_id,
                data: $scope.limitDeniedDomain,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.deniedDomainList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.deniedDomainList.push(value);
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
                    }, 3001);             
              });
      };
      $scope.getSearchDeniedDomain = function () {
         $scope.getAllDeniedDomain();
      };
// End Denied Domain Modal =============

// Contact Name Modal ============
  // $scope.contactNameView = function(index){
  //      $scope.contactNameList=[];
  //     if($scope.filteredTodos[index].cm_contact_name == 'Yes'){
  //       $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/campaign/contactnameview/'+$scope.filteredTodos[index].cm_id,
  //         //data: $scope.data,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //       })
  //       .success(function(obj)
  //       {
  //           obj.forEach(function(value, key){
  //             $scope.contactNameList.push(value);
  //           });
  //           $("#contact_name").modal("show");
  //       })
  //       .error(function(data) 
  //       {   
  //           toastr.error('Oops, Something Went Wrong.', 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //           });  
  //       });
  //     }
  //   };
  $scope.contactNameView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchcontactnametext = "";
    $scope.getAllContactName();
    $("#contact_name").modal("show");
  };
  $scope.getAllContactName = function () {
    $scope.limitContactName= {};
    $scope.ContactNameListcount=0;
    $scope.currentPageContactName = 1;
    $scope.numPerPageContactName = 10;
    $scope.contactNameList = [];
    $scope.filterUser_ContactName = 0;
    $scope.filterUserend_ContactName = 1;
      if ($('#searchtextcontactname').val() == undefined || $('#searchtextcontactname').val() == "") {
        $scope.limitContactName.search = "";
      }
      else{
        $scope.limitContactName.search = $scope.searchcontactnametext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/contactname/total/' +$scope.cm_id,
        data:$scope.limitContactName,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.ContactNameListcount=value.total;
          });
          $scope.$watch("currentPageContactName + numPerPageContactName",
              function () {
                $scope.resetpaginationContactName();
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
    $scope.resetpaginationContactName = function () {
        var begin = (($scope.currentPageContactName - 1) * $scope.numPerPageContactName);
        var end = begin + $scope.numPerPageContactName;
        $scope.filterUserend_ContactName = begin + 1;
        $scope.filterUser_ContactName = end;
        if ($scope.filterUser_ContactName >= $scope.ContactNameListcount)
            $scope.filterUser_ContactName = $scope.ContactNameListcount;

              $scope.contactNameList = [];
              $scope.limitContactName.number = $scope.numPerPageContactName;
              $scope.limitContactName.begin = begin;
              $scope.limitContactName.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/contactname/limit/' +$scope.cm_id,
                data: $scope.limitContactName,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.contactNameList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.contactNameList.push(value);
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
                    }, 3001);             
              });
      };
      $scope.getSearchContactName = function () {
         $scope.getAllContactName();
      };
  // Contact Name Modal =============


  // Contact Number Modal =============
    $scope.contactNumberView = function(index){
      $scope.cm_id = $scope.filteredTodos[index].cm_id;
      $scope.searchcontactnumbertext = "";
      $scope.getAllContactNumber();
      $("#contact_number").modal("show");
    };
    $scope.getSearchContactNumber = function () {
       $scope.getAllContactNumber();
    };
    $scope.getAllContactNumber = function () {
      $scope.limitContactNumber = {};
      $scope.contactNumberListcount=0;
      $scope.currentPageContactNumber = 1;
      $scope.numPerPageContactNumber = 10;
      $scope.contactNumberList = [];
      $scope.filterUser_ContactNumber = 0;
      $scope.filterUserend_ContactNumber = 1;

        if ($('#searchtextcontactnumber').val() == undefined || $('#searchtextcontactnumber').val() == "") {
          $scope.limitContactNumber.search = "";
        }
        else{
          $scope.limitContactNumber.search = $scope.searchcontactnumbertext;
        }
        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/campaign/contactnumber/total/' +$scope.cm_id,
          data:$scope.limitContactNumber,
          headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
        })
        .success(function(campaign)
        {
            campaign.forEach(function (value, key) {
                $scope.contactNumberListcount=value.total;
            });

            $scope.$watch("currentPageContactNumber + numPerPageContactNumber",
                function () {
                  $scope.resetpaginationContactNumber();
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
      $scope.resetpaginationContactNumber = function () {
          var begin = (($scope.currentPageContactNumber - 1) * $scope.numPerPageContactNumber);
          var end = begin + $scope.numPerPageContactNumber;
          $scope.filterUserend_ContactNumber = begin + 1;
          $scope.filterUser_ContactNumber = end;
          if ($scope.filterUser_ContactNumber >= $scope.contactNumberListcount)
              $scope.filterUser_ContactNumber = $scope.contactNumberListcount;

                $scope.contactNumberList = [];
                $scope.limitContactNumber.number = $scope.numPerPageContactNumber;
                $scope.limitContactNumber.begin = begin;
                $scope.limitContactNumber.end = end;
                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/campaign/contactnumber/limit/' +$scope.cm_id,
                  data: $scope.limitContactNumber,
                  headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                })
                .success(function(data)
                {
                  $scope.contactNumberList = [];
                  if (data.length > 0) {
                   
                    data.forEach(function (value, key) {
                      $scope.contactNumberList.push(value);
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
                      }, 3001);             
                });
      };
// End Contact Number Modal =============

// Account List Modal ===============
  // $scope.accntView = function(index){
  //     $scope.accountList=[];
  //       if($scope.filteredTodos[index].cm_account_list == 'Yes'){
  //         $http({
  //           method: 'GET',
  //           url: $rootScope.baseURL+'/campaign/Accview/'+$scope.filteredTodos[index].cm_id,
  //           //data: $scope.data,
  //           headers: {'Content-Type': 'application/json',
  //                   'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //         })
  //         .success(function(obj)
  //         {
  //             obj.forEach(function(value, key){
  //               $scope.accountList.push(value);
  //             });
  //             $("#account_list").modal("show");

  //         })
  //         .error(function(data) 
  //         {   
  //             toastr.error('Oops, Something Went Wrong.', 'Error', {
  //                 closeButton: true,
  //                 progressBar: true,
  //                 positionClass: "toast-top-center",
  //                 timeOut: "500",
  //                 extendedTimeOut: "500",
  //             });  
  //         });
  //       }
  //   };  
  $scope.accntView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchaccnttext = "";
    $scope.getAllAccnt();
    $("#account_list").modal("show");
  };
  $scope.getSearchAccnt = function () {
     $scope.getAllAccnt();
  };
  $scope.getAllAccnt = function () {
    $scope.limitAccnt = {};
    $scope.accntListcount=0;
    $scope.currentPageAccnt = 1;
    $scope.numPerPageAccnt = 10;
    $scope.accountList = [];
    $scope.filterUser_accnt = 0;
    $scope.filterUserend_accnt = 1;
      if ($('#searchtextaccnt').val() == undefined || $('#searchtextaccnt').val() == "") {
        $scope.limitAccnt.search = "";
      }
      else{
        $scope.limitAccnt.search = $scope.searchaccnttext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/accountlist/total/' +$scope.cm_id,
        data:$scope.limitAccnt,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.accntListcount=value.total;
          });

          $scope.$watch("currentPageAccnt + numPerPageAccnt",
              function () {
                $scope.resetpaginationAccnt();
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
    $scope.resetpaginationAccnt = function () {
        var begin = (($scope.currentPageAccnt - 1) * $scope.numPerPageAccnt);
        var end = begin + $scope.numPerPageAccnt;
        $scope.filterUserend_accnt = begin + 1;
        $scope.filterUser_accnt = end;
        if ($scope.filterUser_accnt >= $scope.accntListcount)
            $scope.filterUser_accnt = $scope.accntListcount;

              $scope.accountList = [];
              $scope.limitAccnt.number = $scope.numPerPageAccnt;
              $scope.limitAccnt.begin = begin;
              $scope.limitAccnt.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/accountlist/limit/' +$scope.cm_id,
                data: $scope.limitAccnt,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.accountList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.accountList.push(value);
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
                    }, 3001);             
              });
    };
// END Account List Modal=========

//  Suppression Modal =============
  // $scope.supressionView = function(index){
  //   $scope.supressionList=[];
  //     if($scope.filteredTodos[index].cm_supression_file == 'Yes'){
  //       $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/campaign/Suppview/'+$scope.filteredTodos[index].cm_id,
  //         //data: $scope.data,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //       })
  //       .success(function(obj)
  //       {
  //           obj.forEach(function(value, key){
  //             $scope.supressionList.push(value);
  //           });
  //           $("#supression_file").modal("show");
  //       })
  //       .error(function(data) 
  //       {   
  //           toastr.error('Oops, Something Went Wrong.', 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //           });  
  //       });
  //     }
  //   };
  $scope.supressionView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchsupptext = "";
    $scope.getAllSupression();
    $("#supression_file").modal("show");
  };
  $scope.getSearchSupression = function () {
     $scope.getAllSupression();
  };
  $scope.getAllSupression = function () {
    $scope.limitSupression = {};
    $scope.supressionListcount=0;
    $scope.currentPageSupression = 1;
    $scope.numPerPageSupression = 10;
    $scope.supressionList = [];
    $scope.filterUser_supp = 0;
    $scope.filterUserend_supp = 1;
      if ($('#searchtextsupp').val() == undefined || $('#searchtextsupp').val() == "") {
        $scope.limitSupression.search = "";
      }
      else{
        $scope.limitSupression.search = $scope.searchsupptext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/supression/total/' +$scope.cm_id,
        data:$scope.limitSupression,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.supressionListcount=value.total;
          });

          $scope.$watch("currentPageSupression + numPerPageSupression",
              function () {
                $scope.resetpaginationSupression();
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
    $scope.resetpaginationSupression = function () {
        var begin = (($scope.currentPageSupression - 1) * $scope.numPerPageSupression);
        var end = begin + $scope.numPerPageSupression;
        $scope.filterUserend_supp = begin + 1;
        $scope.filterUser_supp = end;
        if ($scope.filterUser_supp >= $scope.supressionListcount)
            $scope.filterUser_supp = $scope.supressionListcount;

              $scope.supressionList = [];
              $scope.limitSupression.number = $scope.numPerPageSupression;
              $scope.limitSupression.begin = begin;
              $scope.limitSupression.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/supression/limit/' +$scope.cm_id,
                data: $scope.limitSupression,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.supressionList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.supressionList.push(value);
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
                    }, 3001);             
              });
      };

// End Suppression Modal =============

// Allow Domain Modal =============
  // $scope.allowView = function(index){
  //   $scope.allowDomainList=[];
  //     if($scope.filteredTodos[index].cm_allow_domain == 'Yes'){
  //       $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/campaign/Allowview/'+$scope.filteredTodos[index].cm_id,
  //         //data: $scope.data,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //       })
  //       .success(function(obj)
  //       {
  //           obj.forEach(function(value, key){
  //             $scope.allowDomainList.push(value);
  //           });
  //           $("#allow_Domain").modal("show");
  //       })
  //       .error(function(data) 
  //       {   
  //           toastr.error('Oops, Something Went Wrong.', 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //           });  
  //       });
  //     }
  // };
  $scope.allowView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchallowdomaintext = "";
    $scope.getAllAllow_Domain();
    $("#allow_Domain").modal("show");
  };
  $scope.getSearchAllow_Domain = function () {
     $scope.getAllAllow_Domain();
  };
  $scope.getAllAllow_Domain = function () {
    $scope.limitAllow_Domain = {};
    $scope.allowDomainListcount=0;
    $scope.currentPageAllowDomain = 1;
    $scope.numPerPageAllowDomain = 10;
    $scope.allowDomainList = [];
    $scope.filterUser_allowDomain = 0;
    $scope.filterUserend_allowDomain = 1;
      if ($('#searchtextallowdomain').val() == undefined || $('#searchtextallowdomain').val() == "") {
        $scope.limitAllow_Domain.search = "";
      }
      else{
        $scope.limitAllow_Domain.search = $scope.searchallowdomaintext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/allowdomain/total/' +$scope.cm_id,
        data:$scope.limitAllow_Domain,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.allowDomainListcount=value.total;
          });

          $scope.$watch("currentPageAllowDomain + numPerPageAllowDomain",
              function () {
                $scope.resetpaginationAllow_Domain();
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
    $scope.resetpaginationAllow_Domain = function () {
        var begin = (($scope.currentPageAllowDomain - 1) * $scope.numPerPageAllowDomain);
        var end = begin + $scope.numPerPageAllowDomain;
        $scope.filterUserend_allowDomain = begin + 1;
        $scope.filterUser_allowDomain = end;
        if ($scope.filterUser_allowDomain >= $scope.allowDomainListcount)
            $scope.filterUser_allowDomain = $scope.allowDomainListcount;

              $scope.allowDomainList = [];
              $scope.limitAllow_Domain.number = $scope.numPerPageAllowDomain;
              $scope.limitAllow_Domain.begin = begin;
              $scope.limitAllow_Domain.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/allowdomain/limit/' +$scope.cm_id,
                data: $scope.limitAllow_Domain,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                console.log(data);
                $scope.allowDomainList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.allowDomainList.push(value);
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
                    }, 3001);             
              });
      };
// End Allow Domain Modal =============

// Campaign Asset Modal ===========
  $scope.assetView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchassettext = "";
    $scope.getAllAsset();
    $("#asset").modal("show");
  };
  $scope.getSearchAsset = function () {
     $scope.getAllAsset();
  };
  $scope.getAllAsset = function () {
    $scope.limitAsset = {};
    $scope.assetListcount=0;
    $scope.currentPageAsset = 1;
    $scope.numPerPageAsset = 10;
    $scope.assetList = [];
    $scope.filterUser_asset = 0;
    $scope.filterUserend_asset = 1;
      if ($('#searchtextasset').val() == undefined || $('#searchtextasset').val() == "") {
        $scope.limitAsset.search = "";
      }
      else{
        $scope.limitAsset.search = $scope.searchassettext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/asset/total/' +$scope.cm_id,
        data:$scope.limitAsset,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.assetListcount=value.total;
          });

          $scope.$watch("currentPageAsset + numPerPageAsset",
              function () {
                $scope.resetpaginationAsset();
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
    $scope.resetpaginationAsset = function () {
        var begin = (($scope.currentPageAsset - 1) * $scope.numPerPageAsset);
        var end = begin + $scope.numPerPageAsset;
        $scope.filterUserend_asset = begin + 1;
        $scope.filterUser_asset = end;
        if ($scope.filterUser_asset >= $scope.assetListcount)
            $scope.filterUser_asset = $scope.assetListcount;

              $scope.assetList = [];
              $scope.limitAsset.number = $scope.numPerPageAsset;
              $scope.limitAsset.begin = begin;
              $scope.limitAsset.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/asset/limit/' +$scope.cm_id,
                data: $scope.limitAsset,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.assetList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.assetList.push(value);
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
                    }, 3001);             
              });
      };
// End Campaign Asset Modal =============


// Industry Modal =============
  // $scope.industryView = function(index){
  //   $scope.industryList=[];
  //     if($scope.filteredTodos[index].cm_industry == 'Yes'){
  //       $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/campaign/industryview/'+$scope.filteredTodos[index].cm_id,
  //         //data: $scope.data,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //       })
  //       .success(function(obj)
  //       {
  //           obj.forEach(function(value, key){
  //             $scope.industryList.push(value);
  //           });
  //           $("#industry_list").modal("show");
  //       })
  //       .error(function(data) 
  //       {   
  //           toastr.error('Oops, Something Went Wrong.', 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //           });  
  //       });
  //     }
  // };
  $scope.industryView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchindustrytext = "";
    $scope.getAllIndustry();
    $("#industry_list").modal("show");
  };
  $scope.getSearchIndustry = function () {
     $scope.getAllIndustry();
  };
  $scope.getAllIndustry = function () {
    $scope.limitIndustry = {};
    $scope.industryListcount=0;
    $scope.currentPageIndustry = 1;
    $scope.numPerPageIndustry = 10;
    $scope.industryList = [];
    $scope.filterUser_industry = 0;
    $scope.filterUserend_industry = 1;
      if ($('#searchtextindustry').val() == undefined || $('#searchtextindustry').val() == "") {
        $scope.limitIndustry.search = "";
      }
      else{
        $scope.limitIndustry.search = $scope.searchindustrytext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/industry/total/' +$scope.cm_id,
        data:$scope.limitIndustry,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.industryListcount=value.total;
          });

          $scope.$watch("currentPageIndustry + numPerPageIndustry",
              function () {
                $scope.resetpaginationIndustry();
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
    $scope.resetpaginationIndustry = function () {
        var begin = (($scope.currentPageIndustry - 1) * $scope.numPerPageIndustry);
        var end = begin + $scope.numPerPageIndustry;
        $scope.filterUserend_industry = begin + 1;
        $scope.filterUser_industry = end;
        if ($scope.filterUser_industry >= $scope.industryListcount)
            $scope.filterUser_industry = $scope.industryListcount;

              $scope.industryList = [];
              $scope.limitIndustry.number = $scope.numPerPageIndustry;
              $scope.limitIndustry.begin = begin;
              $scope.limitIndustry.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/industry/limit/' +$scope.cm_id,
                data: $scope.limitIndustry,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.industryList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.industryList.push(value);
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
                    }, 3001);             
              });
      };
// End Industry Modal =============

// Department Modal =============
  // $scope.deptView = function(index){
  //   $scope.deptList=[];
  //     if($scope.filteredTodos[index].cm_dept == 'Yes'){
  //       $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/campaign/deptview/'+$scope.filteredTodos[index].cm_id,
  //         //data: $scope.data,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //       })
  //       .success(function(obj)
  //       {
  //           obj.forEach(function(value, key){
  //             $scope.deptList.push(value);
  //           });
  //           $("#department").modal("show");
  //       })
  //       .error(function(data) 
  //       {   
  //           toastr.error('Oops, Something Went Wrong.', 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //           });  
  //       });
  //     }
  // };
  $scope.deptView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchdepttext = "";
    $scope.getAllDepartment();
    $("#department").modal("show");
  };
  $scope.getSearchDepartment = function () {
     $scope.getAllDepartment();
  };
  $scope.getAllDepartment = function () {
    $scope.limitDepartment = {};
    $scope.deptListcount=0;
    $scope.currentPageDept = 1;
    $scope.numPerPageDept = 10;
    $scope.deptList = [];
    $scope.filterUser_dept = 0;
    $scope.filterUserend_dept = 1;
      if ($('#searchtextdept').val() == undefined || $('#searchtextdept').val() == "") {
        $scope.limitDepartment.search = "";
      }
      else{
        $scope.limitDepartment.search = $scope.searchdepttext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/department/total/' +$scope.cm_id,
        data:$scope.limitDepartment,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.deptListcount=value.total;
          });

          $scope.$watch("currentPageDept + numPerPageDept",
              function () {
                $scope.resetpaginationDepartment();
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
    $scope.resetpaginationDepartment = function () {
        var begin = (($scope.currentPageDept - 1) * $scope.numPerPageDept);
        var end = begin + $scope.numPerPageDept;
        $scope.filterUserend_dept = begin + 1;
        $scope.filterUser_dept = end;
        if ($scope.filterUser_dept >= $scope.deptListcount)
            $scope.filterUser_dept = $scope.deptListcount;

              $scope.deptList = [];
              $scope.limitDepartment.number = $scope.numPerPageDept;
              $scope.limitDepartment.begin = begin;
              $scope.limitDepartment.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/department/limit/' +$scope.cm_id,
                data: $scope.limitDepartment,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.deptList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.deptList.push(value);
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
                    }, 3001);             
              });
      };

// End Department Modal =============

// Job Level Modal =============
  // $scope.levelView = function(index){
  //     $scope.levelList=[];
  //     if($scope.filteredTodos[index].cm_job == 'Yes'){
  //       $http({
  //         method: 'GET',
  //         url: $rootScope.baseURL+'/campaign/levelview/'+$scope.filteredTodos[index].cm_id,
  //         //data: $scope.data,
  //         headers: {'Content-Type': 'application/json',
  //                 'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
  //       })
  //       .success(function(obj)
  //       {
  //           obj.forEach(function(value, key){
  //             $scope.levelList.push(value);
  //           });
  //           $("#level").modal("show");
  //       })
  //       .error(function(data) 
  //       {   
  //           toastr.error('Oops, Something Went Wrong.', 'Error', {
  //               closeButton: true,
  //               progressBar: true,
  //               positionClass: "toast-top-center",
  //               timeOut: "500",
  //               extendedTimeOut: "500",
  //           });  
  //       });
  //     }
  // };
  $scope.levelView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchleveltext = "";
    $scope.getAllLevel();
    $("#level").modal("show");
  };
  $scope.getSearchLevel = function () {
     $scope.getAllLevel();
  };
  $scope.getAllLevel = function () {
    $scope.limitLevel = {};
    $scope.levelListcount=0;
    $scope.currentPageLevel = 1;
    $scope.numPerPageLevel = 10;
    $scope.levelList = [];
    $scope.filterUser_level = 0;
    $scope.filterUserend_level = 1;
      if ($('#searchtextlevel').val() == undefined || $('#searchtextlevel').val() == "") {
        $scope.limitLevel.search = "";
      }
      else{
        $scope.limitLevel.search = $scope.searchleveltext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/level/total/' +$scope.cm_id,
        data:$scope.limitLevel,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.levelListcount=value.total;
          });

          $scope.$watch("currentPageLevel + numPerPageLevel",
              function () {
                $scope.resetpaginationLevel();
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
    $scope.resetpaginationLevel = function () {
        var begin = (($scope.currentPageLevel - 1) * $scope.numPerPageLevel);
        var end = begin + $scope.numPerPageLevel;
        $scope.filterUserend_level = begin + 1;
        $scope.filterUser_level = end;
        if ($scope.filterUser_level >= $scope.levelListcount)
            $scope.filterUser_level = $scope.levelListcount;

              $scope.levelList = [];
              $scope.limitLevel.number = $scope.numPerPageLevel;
              $scope.limitLevel.begin = begin;
              $scope.limitLevel.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/level/limit/' +$scope.cm_id,
                data: $scope.limitLevel,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.levelList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.levelList.push(value);
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
                    }, 3001);             
              });
      };
// End Job Level Modal =============


// Email Modal ===========
  $scope.contactEmailView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchemailtext = "";
    $scope.getAllEmail();
    $("#email").modal("show");
  };
  $scope.getSearchEmail = function () {
     $scope.getAllEmail();
  };
  $scope.getAllEmail = function () {
    $scope.limitEmail = {};
    $scope.emailListcount=0;
    $scope.currentPageEmail = 1;
    $scope.numPerPageEmail = 10;
    $scope.emailList = [];
    $scope.filterUser_email = 0;
    $scope.filterUserend_email = 1;
      if ($('#searchtextemail').val() == undefined || $('#searchtextemail').val() == "") {
        $scope.limitEmail.search = "";
      }
      else{
        $scope.limitEmail.search = $scope.searchemailtext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/email/total/' +$scope.cm_id,
        data:$scope.limitEmail,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.emailListcount=value.total;
          });

          $scope.$watch("currentPageEmail + numPerPageEmail",
              function () {
                $scope.resetpaginationEmail();
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
    $scope.resetpaginationEmail = function () {
        var begin = (($scope.currentPageEmail - 1) * $scope.numPerPageEmail);
        var end = begin + $scope.numPerPageEmail;
        $scope.filterUserend_email = begin + 1;
        $scope.filterUser_email = end;
        if ($scope.filterUser_email >= $scope.emailListcount)
            $scope.filterUser_email = $scope.emailListcount;

              $scope.emailList = [];
              $scope.limitEmail.number = $scope.numPerPageEmail;
              $scope.limitEmail.begin = begin;
              $scope.limitEmail.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/email/limit/' +$scope.cm_id,
                data: $scope.limitEmail,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.emailList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.emailList.push(value);
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
                    }, 3001);             
              });
      };
// End Email Modal =============

// Geo Modal =============
  $scope.locationView = function(index){
    $scope.cm_id = $scope.filteredTodos[index].cm_id;
    $scope.searchgeotext = "";
    $scope.getAllGeo();
    $("#geo_location").modal("show");
  };
  $scope.getSearchGeo = function () {
     $scope.getAllGeo();
  };
  $scope.getAllGeo = function () {
    $scope.limitGeo = {};
    $scope.geoListcount=0;
    $scope.currentPageGeo = 1;
    $scope.numPerPageGeo = 10;
    $scope.geoList = [];
    $scope.filterUser_geo = 0;
    $scope.filterUserend_geo = 1;
      if ($('#searchtextgeo').val() == undefined || $('#searchtextgeo').val() == "") {
        $scope.limitGeo.search = "";
      }
      else{
        $scope.limitGeo.search = $scope.searchgeotext;
      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/campaign/geo_location/total/' +$scope.cm_id,
        data:$scope.limitGeo,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(campaign)
      {
          campaign.forEach(function (value, key) {
              $scope.geoListcount=value.total;
          });

          $scope.$watch("currentPageGeo + numPerPageGeo",
              function () {
                $scope.resetpaginationGeo();
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
    $scope.resetpaginationGeo = function () {
        var begin = (($scope.currentPageGeo - 1) * $scope.numPerPageGeo);
        var end = begin + $scope.numPerPageGeo;
        $scope.filterUserend_geo = begin + 1;
        $scope.filterUser_geo = end;
        if ($scope.filterUser_geo >= $scope.geoListcount)
            $scope.filterUser_geo = $scope.geoListcount;

              $scope.geoList = [];
              $scope.limitGeo.number = $scope.numPerPageGeo;
              $scope.limitGeo.begin = begin;
              $scope.limitGeo.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/campaign/geo_location/limit/' +$scope.cm_id,
                data: $scope.limitGeo,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(data)
              {
                $scope.geoList = [];
                if (data.length > 0) {
                 
                  data.forEach(function (value, key) {
                    $scope.geoList.push(value);
        console.log( $scope.geoList);
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
                    }, 3001);             
              });
      };
// END Geo Modal =============

});