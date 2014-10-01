sampleApp.controller('chat',function($rootScope,$scope,$location,socketTest){

    socketTest.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
    });


        $scope.go = function (path){
            $location.path(path);
        }

})