sampleApp.controller('login',function($rootScope,$scope,$location,$http,$translate,$q, twitterService){


    $scope.userData = {email:'',password:''};
    $scope.errorMsg = ''
    $scope.loginUser = function(){
        if(($scope.userData.email) && (validateEmail($scope.userData.email))){
            if(($scope.userData.password) && ($scope.userData.password.length > 5 && $scope.userData.password.length < 15)){
                $scope.errorMsg = "";
                console.log('login Function Called '+' email: '+$scope.userData.email+' Password: '+$scope.userData.password)
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

                        console.log(data)
                        console.log(textstatus)
                    }).error(function(data, textstatus) {

                        console.log(data)
                        console.log(textstatus)
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
    $scope.fbLogin = function(){
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

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
    function userLogin(){
        FB.login(function(response) {
            // handle the response
            //console.log(response)
            FB.api('/me', function(userData) {
                console.log( userData);

                FB.api('/me/picture?redirect=false', function(pic) {
                    console.log(pic);

                ////Here the API will be CAlled



                });//me/picture
            });//me





        }, {scope: 'public_profile,email,user_birthday,user_friends,user_hometown,religion'});
    };
    $scope.tweets; //array of tweets

    twitterService.initialize();
    $scope.twitterLogin = function(){
    twitterService.connectTwitter().then(function(data) {
        if (twitterService.isReady()) {

            twitterService.getLatestTweets().then(function(data) {
                $scope.tweets = data;
            });

        }
    });
    }
    if (twitterService.isReady()) {
       // $('#connectButton').hide();
        //$('#getTimelineButton, #signOut').show();
        //$scope.refreshTimeline();
        twitterService.clearCache();
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
