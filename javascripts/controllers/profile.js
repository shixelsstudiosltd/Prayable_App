sampleApp.controller('profile',function($rootScope,$scope,$location,$http,ngDialog){

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var userID = (Url.substr(9,Url.length)).trim();
    $scope.profileInfo = '';
    $scope.prayers = '';
    $scope.isLogged = false
    $scope.ownUser = false





    $scope.changePage =function(key){
var ownUser = $scope.ownUser
       // console.log(key)
        switch (key){
            case 'inbox':
                if(ownUser == true){
                    $location.path('/inbox')
                }else{
                    $location.path('/inbox/message/'+userData._id)
                }
                if(!$scope.$$phase) $scope.$apply();
                break;

            case 'friend':
                if(ownUser == true){
                    $location.path('/friends')
                }else{
                    $location.path('/friends/'+userID)
                }

                if(!$scope.$$phase) $scope.$apply();
                break;

            case 'about':
                console.log('3');
                break;

            case 'prayer':
                if(ownUser == true){
                    $location.path('/prayers')
                }else{

                }

                if(!$scope.$$phase) $scope.$apply();
                break;

            case 'rss':
                console.log('5');
                break;

            case 'share':
                console.log('6');
                break;

            default :
                console.log('default');
                break;
        }
    }

    $scope.friendsOption =function(){

    ngDialog.open({
        template: './partials/friendOption.html',
        className: 'friendOption',
        scope: $scope
    });

    }



    if((userData._id == userID)||((userID == '')&&(userData && (Object.keys(userData).length > 0)))){
        //console.log('own profile')
        $scope.ownUser = true
        $scope.profileInfo ={_id:userData._id,email:userData.email}
        $scope.prayers = userData.prayerList;
        $scope.friends = userData.friendList;
        $scope.isLogged = true;
    }else if(userData._id != userID){

        $scope.ownUser = false
        $http({
            method:"GET",
            //contentType: 'application/json',
            url:"http://localhost:3000/user/"+userID,
            //url:"http://prayable-21641.onmodulus.net/user/"+userID,
            crossDomain: true,
            dataType: "json"
        }).success(function(profile, textstatus) {
                if((profile.status == -1) && (profile.status == -2)){
                    console.log(profile.error)
                }else{

                    $scope.profileInfo = profile.data
                    $scope.isLogged = true;

                    $http({
                        method:"POST",
                        //contentType: 'application/json',
                        // url:"http://localhost:3000/allRequestedPrayers",
                        url:"http://prayable-21641.onmodulus.net/allRequestedPrayers",
                        data:{userID:userID},
                        crossDomain: true,
                        dataType: "json"
                    }).success(function(prayers, textstatus) {
                            $scope.prayers = prayers
                            $http({
                                method:"POST",
                                //contentType: 'application/json',
                                //url:"http://localhost:3000/allFriends",
                                url:"http://prayable-21641.onmodulus.net/allFriends",
                                data:{userID:userID},
                                crossDomain: true,
                                dataType: "json"
                            }).success(function(friends, textstatus) {
                                    $scope.friends = friends

                                })

                        })
                }
            })
    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }




        $scope.go = function (path){
            $location.path(path);
        }

})