sampleApp.controller('register',function($scope,$rootScope,$location,$http){

    $scope.go = function (path){
        $location.path(path);
    }

});
