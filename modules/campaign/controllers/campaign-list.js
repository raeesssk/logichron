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
$scope.apiURL = $rootScope.baseURL+'/campaign/campaign/total';
    
    
      // $('#mouse_hover').mouseover(function(){
      //   alert("test");
      //   $("#mouse_hover").css("cursor", "pointer");
      // });
    
    // if(value.cm_account_list == 'Yes'){
    //   $('#mouse_hover').hover(function(){
    //     alert("test");
    //     $(this).css("cursor", "pointer");
    //   });
    // }
   
   
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