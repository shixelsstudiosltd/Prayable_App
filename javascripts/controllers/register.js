sampleApp.controller('register',function($scope,$rootScope,$location,$http){
    $scope.message = "Register";
    var userInfo ={
        firstName:"",
        password:"",
        email:""

    }

$scope.checkForm = function(){
var name = $('.name').val()
    var email = $('.email').val()
    var password = $('.password').val()

    if((name) && (name.length > 3 && name.length<30)){
        if((email) && (validateEmail(email))){
            if((password) && (password.length > 5 && password.length<15)){
                userInfo.firstName =name;
                userInfo.email =email;
                userInfo.password = password;
  console.log(userInfo)

                $.ajax({
                    url:"/checkUser",
                    data:{email:userInfo.email,mode:"reg"},
                    method:"POST"
                }).success( function(res,textStatus){
                        if(!(res == 'error')){
                            alert("You email already registered on this site");
                            $('.err3').text("")
                            $('.password').val('')
                           // $location.path('/signIn')

                        }else{
                            $.ajax({
                                url:"/saveUserData",
                                data:{userInfo:userInfo,key:"new"},
                                method:"POST"
                            }).success( function(res2,textStatus){
                                    $('.name').val('')
                                     $('.email').val('')
                                    $('.password').val('')

                                    //$rootScope.userProbfile = res2.userProbfile
                                    $scope.go('/signin');
                                    if(!$scope.$$phase) $scope.$apply();
                                    //window.location = 'http://localhost:3000/profURL/'+res.userProbfile
                               /*     $.ajax({
                                        url:"/sendVerfMail",
                                        data:{email:res2.useremail,key:"verify",verificationCode:res2.verificationCode},
                                        method:"POST"
                                    }).success( function(res2,textStatus){
                                            $scope.go('/emailSent');
                                            if(!$scope.$$phase) $scope.$apply();
                                        })*/

                                   // $scope.go('/profURL/'+res2.userProbfile)
                                    //if(!$scope.$$phase) $scope.$apply()


                                })
                        }
                    })


            }else{
                $('.err3').text("Mistake in password")
            }
        }else{
            $('.err3').text("Mistake in email")
        }
    }else{
        $('.err3').text("Mistake in Name")
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
