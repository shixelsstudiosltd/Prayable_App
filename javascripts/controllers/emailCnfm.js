sampleApp.controller('emailCnfm',function($rootScope,$scope,$location,$http){
    var Url = $location.$$path;
    $scope.name = "";

    var userData;
    var verificationCode = Url.substr(11,Url.length)

    $http({
        url:"http://localhost:3000/emailCnfm/"+verificationCode,
        //url:"http://prayable-21641.onmodulus.net/emailCnfm/"+verificationCode,
        method:"POST"
    }).success( function(res,textStatus){
if(res == 'error'){
console.log('error')
}else{
    console.log('success Code verified'+res.userProbfile)
    userProbfile =res.userProbfile
    $scope.go('/profile/'+userProbfile)
    if(!$scope.$$phase) $scope.$apply();

}

        })


    $scope.go = function (path){
        $location.path(path);
    }


})