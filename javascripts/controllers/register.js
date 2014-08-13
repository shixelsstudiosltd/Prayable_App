sampleApp.controller('register',function($scope,$rootScope,$location,$http){

    $scope.userData = {email:'',password:''};
    $scope.rePass = ''
    $scope.errorMsg = ''
    $scope.regUser = function(){
        if(($scope.userData.email) && (validateEmail($scope.userData.email))){
            if(($scope.userData.password) && ($scope.userData.password.length > 5 && $scope.userData.password.length < 15)){
                if(($scope.rePass) && ($scope.rePass == $scope.userData.password)){
                $scope.errorMsg = "";
                console.log('Register Function Called '+' email: '+$scope.userData.email+' Password: '+$scope.userData.password)
                }else{
                    $scope.errorMsg = "*Both Password Doesn't match"
                }
            }else{
                $scope.errorMsg = "*Mistake in password"
            }
        }else{
            $scope.errorMsg = "*Mistake in email"
        }

    }
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    $scope.go = function (path){
        $location.path(path);
    }


});
