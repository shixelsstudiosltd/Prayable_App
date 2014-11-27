sampleApp.controller('friends',function($rootScope,$scope,$location,$http){
    $scope.isLogged = false
    $scope.ownMemberer = false;
    $scope.allUser = false;
    $scope.noMember = false;
    $scope.showSearch = false;
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var userID = Url.substr(9,Url.length);



    $scope.change = function(){
        var str = $(".friendsSearchField").val();

        switch (event.keyCode){
            case 32:{
                if(str.length > 1 ){
                    filterResult(str)
                }else{

                }
                break;
            };
            default :{
                filterResult(str);
                break;
            };

        };

    };



    $scope.getAllFriends = function(key){
        if(key == 'user'){
            var data = {userID:userData._id}

            if(userData.friendList.length > 0){
                $scope.allUser = false;
                $scope.noMember = false;
                $scope.showSearch = true;
                $scope.ownMemberer = true;
                $scope.friendsList = userData.friendList[0];
                $scope.friendsSearchList = userData.friendList[0];
                $scope.searchQuery=''
            }else{
                $scope.ownMemberer = false;
                $scope.allUser = false;
                $scope.noMember = true;
            }
        }else if(key == 'other'){
            var data = {userID:userID}
            $http({
             method:"POST",
             //contentType: 'application/json',
             //url:"http://localhost:3000/allFriends",
             url:"http://prayable-21641.onmodulus.net/allFriends",
             data:data,
             crossDomain: true,
             dataType: "json"
             }).success(function(data, textstatus) {
             // this callback will be called asynchronously
             // when the response is available
             if((data[0].msg)&&(data[0].msg == "no Member Add")){
             $scope.ownMemberer = false;
             $scope.allUser = false;
             $scope.noMember = true;

             }else{
             $scope.allUser = false;
             $scope.noMember = false;
             $scope.showSearch = true;
             $scope.ownMemberer = true;
             $scope.friendsList = data[0];
             $scope.friendsSearchList = data[0];
             console.log(data)
             $scope.searchQuery=''

             }
             // console.log(textstatus)
             }).error(function(data, textstatus) {

             //console.log(data)
             console.log(textstatus)
             // called asynchronously if an error occurs
             // or server returns response with an error status.
             });
        }

    }

    $scope.getAllUsers = function(){
        var data = {key:'N'}

        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/allUser",
           url:"http://prayable-21641.onmodulus.net/allUser",
            data:data,
            crossDomain: true,
            dataType: "json"
        }).success(function(data, textstatus) {
                $scope.noMember = false;
                $scope.showSearch = true;
                $scope.ownMemberer = false;
                $scope.allUser = true;

                $scope.friendsList = data;
                $scope.friendsSearchList = data;
                console.log(data)
                $scope.searchQuery=''


            }).error(function(data, textstatus) {

                //console.log(data)
                console.log(textstatus)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }
    $scope.goToFriendProfile = function(userId){
        $location.path('/profile/'+userId)
        if(!$scope.$$phase) $scope.$apply();
    }

    function filterResult(str){
        console.log(str)
        $scope.friendsSearchList = [];
        // if(str.length){
        $.each( $scope.friendsList,function(index,data){
            var title= (data.userInfo[0].firstName).toLowerCase()+' '+(data.userInfo[0].lastName).toLowerCase();
            if((title).indexOf(str.toLowerCase()) > -1 ){
                $scope.friendsSearchList.push(data)
            }else{
                //    console.log(data)
            }
        })

        //}

    }


    if((userData._id == userID)||((userID == '')&&(userData && (Object.keys(userData).length > 0)))){
        //console.log('own profile')
        $scope.ownUser = true
        $scope.isLogged = true;
        $scope.getAllFriends('user')

    }else if(userData._id != userID){
        $scope.ownUser = false
        $scope.isLogged = true;
        $scope.getAllFriends('other')

    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }

})