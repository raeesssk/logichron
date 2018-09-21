// import admin
angular.module('telecaller').controller('telecallerListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $scope.contactList=[];
  $scope.follow={};
  $scope.uploader={};
  $scope.followdetails=[];
  $scope.contacts={};
  $scope.next = 0;
  $scope.progress = 0;
  $('#fm_date').attr('readonly',true);
  $('#fm_comment').attr('readonly',true);
  $('#fd_btn').attr('disabled',true);
  const socket = io($rootScope.baseURL);
  const uploader = new SocketIOFileUpload(socket);
  var percent = 0;
   
// document.getElementById('next').addEventListener('click', uploader.prompt, false);
   $scope.getAll = function () {
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/telecaller',
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(contact)
      { 
         $scope.contactList.push(contact[0]);
         if(contact[0] == null || contact[0] == undefined)
         {
          var dialog = bootbox.dialog({
            message: '<p class="text-center">You Do Not Have Any Contact To Display!!!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                // $('#cdm_company_name').focus();
            }, 1500);
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
            }, 1500);            
      });
    };

    $scope.statuschange=function(contact){
      $scope.contacts = contact;
      if(contact.call_status == 'Follow Up')
      {
        $('#fm_comment').removeAttr('readonly');
        $('#fd_btn').removeAttr('disabled');
      }
      else
      {
        $('#fm_comment').attr('readonly',true);
        $('#fd_btn').attr('disabled',true);
      }
    };

    function readURL(input) {
    if (input.files && input.files[0]) {
          var reader = new FileReader();

          $scope.uploader.file = input.files[0];
          console.log($scope.uploader.file);
          reader.onload = function (e) {
            if(input.files[0].size > 15000000)
            {
              var dialog = bootbox.dialog({
              message: '<p class="text-center">File Size Too Big To Upload!!!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 2000);
              $('#next').attr('disabled',true);
            }
            else
            { 
              
              $('#blah').attr('src', e.target.result);
            }
          }
          reader.readAsDataURL(input.files[0]);
         
        }
      }

  $("#cdam_audio").change(function(){
      readURL(this);
  });
  uploader.listenOnSubmit(document.getElementById('next'),document.getElementById('cdam_audio'));
    uploader.addEventListener('start', (event)=> {
      
      console.log('test');
    });

    uploader.addEventListener("progress", function(event){
        $scope.progress = 1;
        percent = event.bytesLoaded / event.file.size * 100;
        $('#next').text(percent.toFixed(2)+'%');
        
        if(percent == 100){
          var dialog = bootbox.dialog({
          message: '<p class="text-center">Successfully Uploaded!!!</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-success");
          setTimeout(function(){
              dialog.modal('hide'); 
              // $('#cdm_company_name').focus();
          }, 1500);
        $('#next').text('Next');

        }
        console.log("File is", percent.toFixed(2), "percent loaded");
    });
 
    // Do something when a file is uploaded:
    uploader.addEventListener("complete", function(event){
         

        // console.log(event.file);
    });

    $scope.contactStatus=function(){
      
   
        $http({
              method: 'POST',
              url: $rootScope.baseURL+'/telecaller/status/'+$scope.contacts.cdm_id,
              data: $scope.contacts,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
            })
            .success(function(contact)
            {
                    if(contact[0].call_status == 'Follow Up')
                    {
                    $http({
                        method: 'GET',
                        url: $rootScope.baseURL+'/telecaller/'+$scope.contacts.cdm_id,
                        headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                      })
                      .success(function(contact)
                      {
                        contact.forEach(function(value,key){
                          $scope.followdetails.push(value)
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
                    }
                    else
                    {
                      $scope.followdetails=[];
                    }
                    socket.emit('status',{
                      obj:contact[0]
                    });

                  var fd = new FormData();
                  fd.append('audioUploader', $scope.uploader.file);

                    $http({
                        method: 'POST',
                        url: $rootScope.baseURL+'/telecaller/audio/'+$scope.contacts.cdm_id,
                        data: fd,
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined,
                                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
                      })
                      .success(function(contact)
                      {
                        console.log(contact[0]);
                        $scope.uploader=[];
                        
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

                  
                    $route.reload();
                  
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
    
    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.follow.fm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $('#fm_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
          onChangeDateTime: function (dp, $input) {
              $scope.follow.fm_date = $('#fm_date').val();
          }
    }).datepicker('setDate', 'today');
    


    $scope.updateFollowup=function(){
      $scope.obj = {
        contact : $scope.contactList,
        follow : $scope.follow

      }
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/telecaller/add',
        data:$scope.obj,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(contact)
      {
            $scope.contactList=[];
            contact[0].fm_date
            $scope.followdetails.push(contact[0]);
            $scope.follow=null;
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Follow-Ups Updated!!!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-success");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 2000);/*
           $scope.getAll();
           $scope.followdetails=[]*/
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