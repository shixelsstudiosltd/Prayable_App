sampleApp.controller('emailCnfm',function($rootScope,$scope,$location,$http){
    var Url = $location.$$path;
    $scope.name = "";

    var userData;
    var verificationCode =     Url.substr(11,Url.length)
    $http({
        url:"http://prayable-21641.onmodulus.net/emailCnfm/"+verificationCode,
        method:"POST"
    }).success( function(res,textStatus){
if(res == 'errot'){
    $scope.status =false;
}else{
    $scope.status =true;
    $scope.go('/profURL/'+res.userProbfile)
    if(!$scope.$$phase) $scope.$apply();

}

        })


    $scope.go = function (path){
        $location.path(path);
    }


})