sampleApp.controller('friends',function($rootScope,$scope,$location,$http){
    $scope.isLogged = false
    $scope.showList = false;
    $scope.noMemberer = false;
    $scope.showSearch = false;
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isLogged = true;

        $scope.getAllFriends = function(key){
            if(key == 'user'){
                var data = {userID:userData._id}
            }else{
                var data = {key:'A'}
            }
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
    $scope.showList = false;
    $scope.noMemberer = true;

}else{
    $scope.noMemberer = false;
    $scope.showSearch = true;
    $scope.showList = true;
                $scope.friendsList = data[0];
                $scope.friendsSearchList = data[0];
                console.log(data)
                $scope.searchQuery=''
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
}


                // console.log(textstatus)
            }).error(function(data, textstatus) {

                //console.log(data)
                console.log(textstatus)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }


        $scope.getAllFriends('user')


        $scope.goToFriendProfile = function(userId){
            $location.path('/profile/'+userId)
            if(!$scope.$$phase) $scope.$apply();
        }

        function filterResult(str){
            $scope.friendsSearchList = [];
            // if(str.length){
            $.each( $scope.friendsList,function(index,data){
                var title= (data.title).toLowerCase();
                if((title).indexOf(str.toLowerCase()) > -1 ){
                    $scope.friendsSearchList.push(data)
                }else{
                    //    console.log(data)
                }
            })

            //}




        }
    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }


        $scope.go = function (path){
            $location.path(path);
        }

})