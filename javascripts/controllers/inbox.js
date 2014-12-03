sampleApp.controller('inbox',function($rootScope,$scope,$location,$http,ngDialog,socketTest){


    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var onlineFriend =  JSON.parse(sessionStorage.getItem('onlineUser'));
    $scope.isLogged = false
    if(userData && (Object.keys(userData).length > 0)){
        $scope.noRooms = false;
        $scope.isLogged = true;
        $scope.room = '';
        $scope.msgStatus = '';
        $scope.roomSelected=[];
        $scope.friendsList = '';
        var roomTemp;
        var data = {userID:userData._id}
        $scope.openRoom = function(userID){
            ngDialog.closeAll()
            $location.path('/inbox/message/'+userID)
              if(!$scope.$$phase) $scope.$apply();
        }

        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/getRoom",
            url:"http://prayable-21641.onmodulus.net/getRoom",
            data:data,
            crossDomain: true,
            dataType: "json"
        }).success(function(room, textstatus) {
                $scope.rooms = room
                roomTemp = room
                for(var i =0; i < room.length; i++  ){
                   if($scope.rooms[i].latestMessage.is_read == false){$scope.rooms[i].status = 'new'}else{$scope.rooms[i].status = ''}
                   var userOnlineTemp =  onlineFriend;
                    if((userOnlineTemp)&&(userOnlineTemp.length > 0)){
                    userListTemp1 = userOnlineTemp.filter(function(onlineUser) {
                          var UIndex =  $scope.rooms[i].room.membersID.indexOf(onlineUser.userID)

                        if(UIndex > 0){

                            $scope.rooms[i].userStatus = 'online';
                        }else{

                            $scope.rooms[i].userStatus = 'offline';
                        }
                    })
                    }
                }
                    //console.log(room)
        })

        $scope.toggleSelection = function toggleSelection(selectionID) {

            var idx = $scope.roomSelected.indexOf(selectionID);

            // is currently selected
            if (idx > -1) {
                $scope.roomSelected.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.roomSelected.push(selectionID);
            }
            console.log($scope.roomSelected)

        };

        $scope.closeChatRoom = function(){

            if($scope.roomSelected.length > 0){
                var data ={ roomID : $scope.roomSelected}
                $http({
                    method:"POST",
                    //contentType: 'application/json',
                    //url:"http://localhost:3000/deleteRoom",
                    url:"http://prayable-21641.onmodulus.net/deleteRoom",
                    data:data,
                    crossDomain: true,
                    dataType: "json"
                }).success(function(room1, textstatus) {
                        $http({
                            method:"POST",
                            //contentType: 'application/json',
                            //url:"http://localhost:3000/getRoom",
                            url:"http://prayable-21641.onmodulus.net/getRoom",
                            data:{userID:userData._id},
                            crossDomain: true,
                            dataType: "json"
                        }).success(function(room, textstatus) {
                                $scope.rooms = room
                                for(var i =0; i < room.length; i++  ){
                                    if($scope.rooms[i].latestMessage.is_read == false){$scope.rooms[i].status = 'new'}else{$scope.rooms[i].status = ''}
                                }
                                console.log(room)
                            })
                    })
            }

        }


        $scope.blockthatRoom = function(){
            var data ={ roomID : $scope.roomSelected}
            if($scope.roomSelected.length > 0){
                $http({
                    method:"POST",
                    //contentType: 'application/json',
                    //url:"http://localhost:3000/blockRoom",
                    url:"http://prayable-21641.onmodulus.net/blockRoom",
                    data:data,
                    crossDomain: true,
                    dataType: "json"
                }).success(function(room1, textstatus) {


                 })
            }
        }

        $scope.selectFriendForNewMessage =function(){
            var data = {userID:userData._id}
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
                    $scope.friendsList = data[0];
                    //console.log(data)
                    ngDialog.open({
                        template: './partials/friends_popup.html',
                        className: 'friends_popup',
                        scope: $scope
                    });

                    // console.log(textstatus)
                }).error(function(data, textstatus) {

                    //console.log(data)
                    console.log(textstatus)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

        socketTest.on('listOfOnlineUser',function(clients){
            //console.log('inbox page')

            var userFriendList = userData.friendList[0]
                var userListTemp1;
                var userListTemp2;
                userListTemp1 = userFriendList.filter(function(user) {
                    userListTemp2 = clients.filter(function(client) {
                        return user.id === client.userID; // filter out appropriate one
                    });
                    //return user.userID === data.userID; // filter out appropriate one
                });
            if((userListTemp2)&&(userListTemp2.length > 0)){
                //console.log(userListTemp2+'aaa')
                var userOnlineTemp = userListTemp2
                for(var i =0; i < $scope.rooms.length; i++  ){
                        userListTemp1 = userOnlineTemp.filter(function(onlineUser) {
                            var UIndex =  $scope.rooms[i].room.membersID.indexOf(onlineUser.userID)

                            if(UIndex > 0){

                                $scope.rooms[i].userStatus = 'online';
                            }else{

                                $scope.rooms[i].userStatus = 'offline';
                            }
                        })
                }

            }else{
                if((roomTemp)&&(roomTemp.length > 0)){
                    for(var i =0; i <roomTemp.length; i++  ){
                        $scope.rooms[i].userStatus = 'offline';
                    }
                }
            }


        })

    }else{
        $location.path('/login')
        if(!$scope.$$phase) $scope.$apply();
    }




        $scope.go = function (path){
            $location.path(path);
        }

})