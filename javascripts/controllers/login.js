sampleApp.controller('login',function($rootScope,$scope,$location,$http){
    $scope.userData = {email:'',password:''};
    

    $scope.go = function (path){
        $location.path(path);
    }

});
