// import admin
angular.module('telecaller').controller('telecallerListCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $scope.contactList=[];
  $scope.follow={};
  $scope.uploader={};
  $scope.followdetails=[];
  $scope.contacts={};
  $scope.questionans=[];
  $scope.contacts.userid=localStorage.getItem('logichron_userid');
  $scope.follow.userid=localStorage.getItem('logichron_userid');
  $scope.next = 0;
  $scope.progress = 0;


    $scope.url = 'Tried to enter telecaller contact Page';

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
    var value = '#/contact';
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
  

  $('#fm_date').attr('readonly',true);
  $('#fm_comment').attr('readonly',true);
  $('#fd_btn').attr('disabled',true);
  const socket = io($rootScope.baseURL);
  const uploader = new SocketIOFileUpload(socket);
  var percent = 0;
   
// document.getElementById('next').addEventListener('click', uploader.prompt, false);
   $scope.getAll = function () {
    $scope.questionans=[];
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/telecaller',
        data: $scope.contacts,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
      })
      .success(function(contact)
      { 
         $scope.contactList.push(contact[0]);
         if(contact[0].cm_custom_question == "Yes"){
          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/contact/questionans/'+contact[0].cdm_cm_id,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("logichron_admin_access_token")}
          })
          .success(function(obj)
          {  
            obj.forEach(function(val,key){
              $scope.questionans.push(val);
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
         if(contact[0] == null || contact[0] == undefined || contact.lenght <= 0)
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
          reader.onload = function (e) {
            if(input.files[0].size > 2000000)
            {
              var dialog = bootbox.dialog({
              message: '<p class="text-center">File Size Too Big To Upload!!!</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 2000);
              $("#next").attr('disabled',true);
            }
            else
            { 
              $('#blah').attr('src', e.target.result);

              $("#next").removeAttr('disabled');
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
        $scope.contactStatus();
        }
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
                  fd.append('cdam_userid',$scope.contacts.userid);
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
    var hh = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sec = d.getSeconds().toString();
    $scope.follow.fm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd + " " + hh +":"+ min +":"+ sec;

    $('#fm_date').datetimepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: true,
        scrollInput: false,
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
            contact.forEach(function(value,key){

            });
            $scope.followdetails.push(contact[0]);
            $scope.follow=null;
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Follow-Ups Updated!!!</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-success");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 2000);
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