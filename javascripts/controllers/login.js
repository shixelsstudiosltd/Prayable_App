sampleApp.controller('login',function($rootScope,$scope,$location,$http,$translate,$q, facebookService){


    $scope.userData = {email:'',password:''};
    $scope.errorMsg = ''
    $scope.loginUser = function(){
        if(($scope.userData.email) && (validateEmail($scope.userData.email))){
            if(($scope.userData.password) && ($scope.userData.password.length > 5 && $scope.userData.password.length < 15)){
                $scope.errorMsg = "";
                //console.log('login Function Called '+' email: '+$scope.userData.email+' Password: '+$scope.userData.password)
                var data ={key:'web',userData:$scope.userData}
                //var data ='{"key":"web"}'
                $.ajax({
                    method:"POST",
                    //contentType: 'application/json',
                    //url:"http://localhost:3000/loginUser",
                    url:"http://prayable-21641.onmodulus.net/loginUser",
                    data:data,
                    crossDomain: true,
                    dataType: "json"
                }).success(function(data, textstatus) {
                        // this callback will be called asynchronously
                        // when the response is available
                        if(data.code == 400){
                            alert(data.msg)
                        }else{
                            sessionStorage.setItem('userData',JSON.stringify(data.data));
                            $scope.go('/home');
                            if(!$scope.$$phase) $scope.$apply();
                        }

                        //console.log(data)
                        //console.log(textstatus)
                    }).error(function(data, textstatus) {
                        $scope.errorMsg = data
                        //console.log(data)
                        //console.log(textstatus)
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }else{
                $scope.errorMsg = "*Mistake in password"
            }
        }else{
            $scope.errorMsg = "*Mistake in email"
        }

    };

    facebookService.initialize();
    $scope.fbLogin = function(){

        facebookService.connectFacebook('L',$scope).then(function(data) {

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
