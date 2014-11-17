sampleApp.controller('inbox',function($rootScope,$scope,$location,$http){


    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    $scope.isLogged = false
    if(userData && (Object.keys(userData).length > 0)){
        $scope.noRooms = false;
        $scope.isLogged = true;
        $scope.room = '';
        $scope.msgStatus = '';
        $scope.roomSelected=[];
        var data = {userID:userData._id}
        $scope.openRoom = function(userID){
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
                for(var i =0; i < room.length; i++  ){
                   if($scope.rooms[i].latestMessage.is_read == false){$scope.rooms[i].status = 'new'}else{$scope.rooms[i].status = ''}
                }
                    console.log(room)
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




    }else{
        $location.path('/login')
        if(!$scope.$$phase) $scope.$apply();
    }




        $scope.go = function (path){
            $location.path(path);
        }

})