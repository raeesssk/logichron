// import admin
angular.module('contactdiscovery').controller('contactimportCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

   $scope.selectedFile = null;  
    $scope.msg = "";  
    
    $scope.url = 'Tried to enter contact import Page';

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
  var value = '#/contactdiscovery/import';
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
  
  
    $scope.loadFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
  
        })  
  
    }  
  
        $scope.handleFile = function () {  
      console.log('test');
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
  
      
    $scope.save = function (data) {  
      data.forEach(function(value,key){
       value.mobile_number = value.Mobile_Number;
       value.no = value.mobile_number.toString();
       value.post = value.Postal_Code;
       value.postal_code = value.post.toString();
       console.log(value.postal_code);
      });

        $http({  
            method: "POST",  
            url: $rootScope.baseURL+'/contact/import',  
            data: JSON.stringify(data),  
            headers: {  
                'Content-Type': 'application/json'  
            }  
  
        })
        .success(function (data) {  
            if (data.length>0) {  
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Data Inserted!!!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-success");
                setTimeout(function(){
                    dialog.modal('hide'); 
                }, 1500); 
            }  
            else {  
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Something Wrong with the Data!!!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                }, 1500); 
            }  
        })
        .error(function(data){   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 3001);             
        });
  
    };
  

    

});