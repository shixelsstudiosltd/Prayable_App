sampleApp.controller('chat',function($rootScope,$scope,$location,socketTest){

    socketTest.on('connected', function (data) {
        console.log(data)
    });


        $scope.go = function (path){
            $location.path(path);
        }

})