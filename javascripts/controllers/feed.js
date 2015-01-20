sampleApp.controller('feed',function($rootScope,$scope,$location,$http){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    $scope.isLogged = false


    if(userData && (Object.keys(userData).length > 0)){
        $scope.isLogged = true;
        $scope.feeds = [];

        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/getAllFeeds",
            url:"http://prayable-21641.onmodulus.net/getAllFeeds",
            data:{userID:userData._id},
            crossDomain: true,
            dataType: "json"
        }).success(function(feeds, textstatus) {
            console.log(feeds)




            $scope.feeds = feeds

        }).error(function(err,data){


        })

    }else{
        $location.path('/login')
        if(!$scope.$$phase) $scope.$apply();
    }
})
