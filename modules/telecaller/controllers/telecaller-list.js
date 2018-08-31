// import admin
angular.module('telecaller').controller('telecallerListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $scope.contactList=[];

   $scope.getAll = function () {
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/telecaller',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(contact)
      {
            contact.forEach(function(value,key){
              $scope.contactList.push(value);
              console.log($scope.contactList);
            });
            
      })
      .error(function(data) 
      {   
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);            
      });
    };


   

});