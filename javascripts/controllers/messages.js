sampleApp.controller('messages',function($rootScope,$scope,$location,$http,socketTest){

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var userIDTo = Url.substr(15,Url.length);
    var data = {key:'ten',data:{memberOne:userData,memberTwo:userIDTo}}
    $scope.isAnyMessage = false;
    $scope.userID=userData._id;
    $scope.messages='';
    $scope.userTowInfo= '';
    $scope.replyData = {text:''}
    $scope.err = ''
    $scope.isAnyErr = false;
    var rooms = [];
    $http({
        method:"POST",
        //contentType: 'application/json',
        //url:"http://localhost:3000/getMessage",
        url:"http://prayable-21641.onmodulus.net/getMessage",
        data:data,
        crossDomain: true,
        dataType: "json"
    }).success(function(msg, textstatus) {
            $scope.messages =msg;

            $http({
                method:"GET",
                //contentType: 'application/json',
                //url:"http://localhost:3000/user/"+userIDTo,
                url:"http://prayable-21641.onmodulus.net/user/"+userIDTo,
                crossDomain: true,
                dataType: "json"
            }).success(function(userTowInfo, textstatus) {
                    $scope.isAnyMessage = true;
                    $scope.userTowInfo = userTowInfo.data
                })
        })

    $scope.sendMessage = function(){
        var currentdate = new Date();
        var time = currentdate.getHours()+':'+currentdate.getMinutes();
        var date = currentdate.getDay()+'/'+currentdate.getMonth()+'/'+currentdate.getFullYear();
        var data ={messageData:{text:$scope.replyData.text},memberID:{memberOne:userData._id,memberTwo:userIDTo},timeDate:[time,date]}
        socketTest.emit('hostSendMsg',data)
        $scope.replyData.text = '';

    }

    socketTest.on('offLineMessageSend',function(msg){
        console.log(msg)
        addMessage(msg)
    })

    function addMessage(msgData){
       var TempData = {message:msgData.data.message,timeDate:msgData.data.timeDate,from:userData._id}
        var tempmsges =$scope.messages
        tempmsges.push(TempData)
        $scope.messages = tempmsges

    }

    $scope.checkMessageStatus = function(){
        var tempmsges =$scope.messages
        if(tempmsges.length > 0 ){
        var data = {id:''}
        if(tempmsges[tempmsges.length-1].from != userData._id){
        if(tempmsges[tempmsges.length-1].is_read == false){
            tempmsges[tempmsges.length-1].is_read = true
           data.id = tempmsges[tempmsges.length-1]._id
            $http({
                method:"POST",
                //contentType: 'application/json',
               // url:"http://localhost:3000/changeMessageStatus",
                url:"http://prayable-21641.onmodulus.net/changeMessageStatus",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(msg, textstatus) {
console.log(textstatus)


                })

        }

        $scope.messages = tempmsges
        console.log($scope.messages);
        }
        }
    }

    socketTest.on('newRoomCreated',function(msg){
        console.log('newRoomCreated')
        var roomCheck = rooms.filter(function(room) {
            return room.roomID === roomInfo.roomID; // filter out appropriate one
        });
        if((roomCheck.length == 0) || (roomCheck == undefined)){
            rooms.push(roomInfo)
        }
    })
    socketTest.on('RoomResumed',function(roomInfo){
        console.log("RoomResumed")

        var roomCheck = rooms.filter(function(room) {
            return room.roomID === roomInfo.roomID; // filter out appropriate one
        });
        if((roomCheck.length == 0) || (roomCheck == undefined)){
            rooms.push(roomInfo)
        }


    })

    socketTest.on('messageDelivered',function(msg){
        console.log('messageDelivered')
        var TempData = {message:msg.data.messageData.text,timeDate:msg.data.timeDate,from:userData._id}
        var tempmsges =$scope.messages
        tempmsges.push(TempData)
        $scope.messages = tempmsges
    })

    socketTest.on('message',function(msg){
        console.log('message2');
          if(userIDTo == msg.data.memberID.memberOne){
              var TempData = {message:msg.data.messageData.text,timeDate:msg.data.timeDate,from:msg.data.memberID.memberTwo}
              var tempmsges =$scope.messages
              tempmsges.push(TempData)
              $scope.messages = tempmsges}
    })

    socketTest.on('roomIsBlockedByUser',function(msg){
        $scope.err = msg
        $scope.isAnyErr = true;
    })


    $scope.go = function (path){
        $location.path(path);
    }

})
