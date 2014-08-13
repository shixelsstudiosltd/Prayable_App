sampleApp.controller('sign_in',function($rootScope,$scope,$location,$http){
    $scope.signIn = function(){

        var email = $('.email1').val()
        var password = $('.password1').val()


        if((email) && (validateEmail(email))){
            if((password) && (password.length > 5 && password.length<15)){

                $.ajax({
                    url:"/loginUser",
                    data:{email:email,password:password},
                    method:"POST"
                }).success( function(res,textStatus){
                        if(!(res == 'error')){
                            $('.err2').text("")
                            sessionStorage.setItem('userData',JSON.stringify(res));

                            $scope.fbloginbox = false;
                            $('.profName').text(res.firstName)
                            $scope.fbuserbox = false;
                             $scope.go('/profURL/'+res._id)
                            //if(!$scope.$$phase) $scope.$apply()


                        }else{
                            $('.err2').text("Email Address or Password is wrong")
                        }
                    })

            }else{
                $('.err2').text("Mistake in password")
            }
        }else{
            $('.err2').text("Mistake in email")
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
