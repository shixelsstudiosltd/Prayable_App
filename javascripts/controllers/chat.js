sampleApp.controller('chat',function($rootScope,$scope,$location,socketTest){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));


    socketTest.emit('hostStartChat',{userIDFrom:userData._id,userIDTo:'541ecd35f989781f38805d72'})
    socketTest.on('newRoomCreated',function(msg){
        console.log(msg)
        alert(msg)
    })
    socketTest.on('RoomResumed',function(msg){
        console.log(msg)
        alert(msg)
    })

        $scope.go = function (path){
            $location.path(path);
        }

})