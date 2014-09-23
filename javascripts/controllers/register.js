sampleApp.controller('register',function($scope,$rootScope,$location,$http,$translate,$q, facebookService){

    $scope.userData = {email:'',password:'',firstName:'',lastName:''};
    $scope.rePass = ''
    $scope.errorMsg = ''
    $scope.regUser = function(){
        if(($scope.userData.firstName) && ($scope.userData.firstName.length > 3)){
            if(($scope.userData.lastName) && ($scope.userData.lastName.length > 3)){


        if(($scope.userData.email) && (validateEmail($scope.userData.email))){
            if(($scope.userData.password) && ($scope.userData.password.length > 5 && $scope.userData.password.length < 15)){
                if(($scope.rePass) && ($scope.rePass == $scope.userData.password)){
                $scope.errorMsg = "";
                //console.log('Register Function Called '+' email: '+$scope.userData.email+' Password: '+$scope.userData.password)
                    var data ={key:'web',userData:$scope.userData}
                    //var data ='{"key":"web"}'
                    $.ajax({
                        method:"POST",
                        //contentType: 'application/json',
                        //url:"http://localhost:3000/user",
                        url:"http://prayable-21641.onmodulus.net/user",
                        data:data,
                        crossDomain: true,
                        dataType: "json"
                    }).success(function(data, textstatus) {
                            // this callback will be called asynchronously
                            // when the response is available
                            $.ajax({
                                url:"http://prayable-21641.onmodulus.net/sendVerfMail",
                              //  url:"http://prayable-21641.onmodulus.net/sendVerfMail",
                                data:{email:data.data.email,key:"verify",userID:data.data._id},
                                method:"POST"
                            }).success( function(res,textStatus){

                                    $.ajax({
                                        //url:"http://localhost:3000/friendList",
                                          url:"http://prayable-21641.onmodulus.net/friendList",
                                        data:{userID:data.data._id},
                                        method:"POST"
                                    }).success( function(res,textStatus){
                                            $scope.go('/login');
                                            if(!$scope.$$phase) $scope.$apply();
                                        }).error(function(data, textstatus) {

                                            console.log(data)
                                            console.log(textstatus)
                                            // called asynchronously if an error occurs
                                            // or server returns response with an error status.
                                        });

                                }).error(function(data, textstatus) {

                                    console.log(data)
                                    console.log(textstatus)
                                    // called asynchronously if an error occurs
                                    // or server returns response with an error status.
                                });
                        }).error(function(data, textstatus) {

                            console.log(data)
                            console.log(textstatus)
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });
                }else{
                    $scope.errorMsg = "*Both Password Doesn't match"
                }
            }else{
                $scope.errorMsg = "*Mistake in password"
            }
        }else{
            $scope.errorMsg = "*Mistake in email"
        }
            }else{
                $scope.errorMsg = "*Last Name should be greater than 3 characteres"
            }

        }else{
            $scope.errorMsg = "*First Name should be greater than 3 characteres"
        }
    }



    facebookService.initialize();
    $scope.fbLogin = function(){

        facebookService.connectFacebook('R',$scope).then(function(data) {
            if (facebookService.isReady()) {

                facebookService.getLatestInfo().then(function(data) {
                    sessionStorage.setItem('userData',JSON.stringify(data.data));
                });

            }
        });

    }
    if (facebookService.isReady()) {
        // $('#connectButton').hide();
        //$('#getTimelineButton, #signOut').show();
        //$scope.refreshTimeline();
        facebookService.clearCache();
        console.log("isReady")
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    $scope.go = function (path){
        $location.path(path);
    }


});
