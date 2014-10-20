sampleApp.controller('messages',function($rootScope,$scope,$location,$http){

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var userIDTo = Url.substr(15,Url.length);
    var data = {key:'ten',data:{memberOne:userData,memberTwo:userIDTo}}
    $scope.isAnyMessage = false;
    $scope.userID=userData._id;
    $scope.messages='';
    $scope.userTowInfo= '';
    $http({
        method:"POST",
        //contentType: 'application/json',
        url:"http://localhost:3000/getMessage",
        //url:"http://prayable-21641.onmodulus.net/getMessage",
        data:data,
        crossDomain: true,
        dataType: "json"
    }).success(function(msg, textstatus) {
            $scope.messages =msg;
            $http({
                method:"GET",
                //contentType: 'application/json',
                url:"http://localhost:3000/user/"+userIDTo,
                //url:"http://prayable-21641.onmodulus.net/user/"+userIDTo,
                crossDomain: true,
                dataType: "json"
            }).success(function(userTowInfo, textstatus) {
                    $scope.isAnyMessage = true;
                    $scope.userTowInfo = userTowInfo

                })
        })

    $scope.go = function (path){
        $location.path(path);
    }

})
