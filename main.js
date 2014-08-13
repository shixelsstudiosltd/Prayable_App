var sampleApp = angular.module("myApp",['ngDialog','flow'])
    .config(['$routeProvider',function($routeProvider){

        $routeProvider
            .when('/',{
                templateUrl:'partials/home.html',
                controller:'home'
            })
            .when('/signin',{
                templateUrl:'partials/signin.html',
                controller:'sign_in'
            })
            .when('/register',{
                templateUrl:'partials/register.html',
                controller:'register'
            })


            .when('/contact',{
                templateUrl:'partials/contact.html',
                controller:'home'
            })
            .when('/chatPage',{
                templateUrl:'partials/chatPage.html',
                controller:'chatPage'
            })
            .when('/videoChat',{
                templateUrl:'partials/videoChat.html',
                controller:'videoChat'
            })
            .when('/profURL/:userProbfile',{
                templateUrl:'partials/profile.html',
                controller:'profile'
            })
            .when('/aboutUs',{
                templateUrl:'partials/aboutUs.html',
                controller:'aboutUs'
            })

            /*.when('/register',{
                templateUrl:'views/register.html',
                controller:'register'
            })
            .when('/signout',{
                templateUrl:'views/signout.html',
                controller:'signout'
            })
            .when('/profURL/:userProbfile',{
                templateUrl:'views/profile.html',
                controller:'profile'
            })
            .when('/forgotPass',{
                templateUrl:'views/forgotPass.html',
                controller:'forgotPass'
            })
            .when('/emailSent',{
                templateUrl:'views/emailSent.html',
                controller:'usereamil_pg'
            })

            .when('/emailCnfm/:verificationCode',{
                templateUrl:'views/emailCnfm.html',
                controller:'emailCnfm'
            })
            .when('/resetPass/:verificationCode',{
                templateUrl:'views/resetPass.html',
                controller:'resetPass'
            })
            .when('/resetPassSuccess',{
                templateUrl:'views/resetPassSuccess.html',
                controller:'register'
            })
            .when('/allConnections',{
                templateUrl:'views/allConnections.html',
                controller:'register'
            })
            .when('/mission',{
                templateUrl:'views/mission.html',
                controller:'register'
            })
            .when('/letsbrik',{
                templateUrl:'views/letsbrik.html',
                controller:'letsbrik'
            })

*/
            .when('/error',{
                templateUrl:'views/error.html'
            })
            .otherwise({
                redirectTo:"/"
            })

    }]);//Config

sampleApp.controller('navController',function($rootScope,$scope,$location,$http){
    var userData=  JSON.parse(sessionStorage.getItem('userData'));
    $scope.userData = JSON.parse(sessionStorage.getItem('userData'));
    var UUID= sessionStorage.getItem('UUID')
if(UUID){}else{
    var uuid= getUUID()
    sessionStorage.setItem("UUID",uuid)

}

    if((userData)){
        $scope.fbloginbox = false;
        $('.profName').text(userData.firstName+" "+userData.lastName)
        $('.profPic').attr('src',userData.pictureUrl)
       $scope.fbuserbox = false;
    }else{
       $scope.fbloginbox = true;
       $scope.fbuserbox = true;
    }

   var userInfo ={
        firstName:"",
        lastName:"",
        email:"",
        pictureUrl:"",
        fbId:"",
       gender:""
    }

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '262657187262594',
            xfbml      : true,
            version    : 'v2.0'
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=262657187262594&version=v2.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            console.log('already connect')
            fetchData();
        } else if (response.status === 'Facebook, but not your app.') {
            // The person is logged into Facebook, but not your app.
            userLogin();
            console.log('not_authorized')
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            userLogin();
            console.log('not_authorized')
        }

    }

    function fetchData(){
        FB.api('/me', function(userData) {
            console.log( userData);
            FB.api('/me/picture?redirect=false', function(pic) {


            });
        });
        


    }

    function userLogin(){
        FB.login(function(response) {
            // handle the response
            //console.log(response)
            FB.api('/me', function(userData) {
                console.log( userData);

                FB.api('/me/picture?redirect=false', function(pic) {
                    console.log(pic);



				    $.ajax({
                    url:"/checkUser",
                    data:{firstName:userData.first_name,fbId:userData.id,mode:"fb"},
                    method:"POST"
                }).success( function(res,textStatus){


                        if(!(res == 'error')){
                            console.log("Record found")
                            console.log(res)
                            sessionStorage.setItem('userData',JSON.stringify(res));

                            //window.location = 'http://localhost:3000/profURL/'+res.userProbfile
                            dispayUserInfo(res)
                            $scope.go('/profURL/'+res._id)
                            if(!$scope.$$phase) $scope.$apply()

                        }else{
                            console.log("member not found"+res);

                                            userInfo.firstName = userData.first_name;
                                            userInfo.lastName = userData.last_name;
                                            userInfo.email =userData.email;
                                            userInfo.fbId = userData.id;
                                            userInfo.pictureUrl = pic.data.url;
                                            userInfo.gender = userData.gender;
                                            console.log(userInfo)


                                            $.ajax({
                                                url:"/saveUserData",
                                                data:{userInfo:userInfo,key:"fb"},
                                                method:"POST"
                                            }).success( function(res2,textStatus){
                                                      console.log(res2)
                                                   dispayUserInfo(res2)
                                                    sessionStorage.setItem('userID',JSON.stringify(res2));
                                                    //window.location = 'http://localhost:3000/profURL/'+res.userProbfile
                                                    $scope.go('/profURL/'+res2._id)
                                                    if(!$scope.$$phase) $scope.$apply()
                                                })

                        }//if for checking member
                    })//ajax

                });//me/picture
            });//me


			
			

        }, {scope: 'public_profile,email,user_friends,user_hometown'});
    };

     function dispayUserInfo(res){
         console.log("dispayUserInfo called")
         $scope.fbloginbox = false;
         $('.profName').text(res.firstName+" "+res.lastName)
         $('.profPic').attr('src',res.pictureUrl)
        $scope.fbuserbox = false;
     }
    $scope.fbSign =function(){
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    };

    $scope.go = function (path){
        $location.path(path);
    }

    $scope.goToProfile = function(){
        $scope.go('/profURL/'+$scope._id);
        if(!$scope.$$phase) $scope.$apply()
    }

    function getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    /*$('#productRepeatMessage').bPopup({
        easing: 'easeOutBack', //uses jQuery easing plugin
        speed: 450,
        transition: 'slideDown'
    });*/
});

/*
 function myController($scope ){
 $scope.message="Hello Angular";
 };
 */