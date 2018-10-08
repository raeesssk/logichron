angular.module('contactdiscovery').controller('unsortedContactCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
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
    $scope.limit.userid=localStorage.getItem('logichron_userid');
$scope.apiURL = $rootScope.baseURL+'/contact/assignCampaign/total';
    
    
    $('#assign_to').attr('disabled',true);
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
                url: $rootScope.baseURL+'/contact/assignCampaign/limit',
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

      var searchTerms = {search: vals,userid:$scope.limit.userid};
        const httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("logichron_admin_access_token")
            }
        };
        return $http.post($rootScope.baseURL+'/campaign/typeahead/search', searchTerms, httpOptions).then((result) => {
            return result.data;
        });
    };
    $scope.contactCampaigned=[];
    $scope.checkAll=function(contact){
    	if(contact.cdm_select){
    		$('#assign_to').removeAttr('disabled');
			$scope.contactCampaigned.push(contact);
    	}
    	else
    	{
    		$('#assign_to').attr('disabled',true);
    		$scope.contactCampaigned.splice(contact);
    	}
    };

    $scope.updateAssign = function(){
    	if($('#cdm_campaign_name').val() == undefined || $('#cdm_campaign_name').val() == "" || $scope.contactdiscovery.cdm_cm_id.cm_id == undefined){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">Please Enter Campaign Name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else
	    {
	    	$http({
                method: 'POST',
                url: $rootScope.baseURL+'/contact/assign/'+$scope.contactdiscovery.cdm_cm_id.cm_id,
                data: $scope.contactCampaigned,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
              })
              .success(function(obj)
              {
                  var dialog = bootbox.dialog({
                  message: '<p class="text-center">Campaign Assigned!!!</p>',
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
                  message: '<p class="text-center">Campaign Can not be Assigned!!!</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-danger");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                  }, 1500); 
              });
	    }    	
	    
    };

});