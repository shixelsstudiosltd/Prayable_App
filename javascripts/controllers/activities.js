sampleApp.controller('activities',function($rootScope,$scope,$location,$http){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    $scope.isLogged = false
    $scope.isActivity = false


    if(userData && (Object.keys(userData).length > 0)){
        $scope.isLogged = true;
        $scope.activities = '';

        $http({
            method:"POST",
            //contentType: 'application/json',
            ///url:"http://localhost:3000/getAllActivities",
            url:"http://prayable-21641.onmodulus.net/getAllActivities",
            data:{userID:userData._id},
            crossDomain: true,
            dataType: "json"
        }).success(function(activities, textstatus) {
                console.log(activities)
            if(activities.length > 0){
                $scope.activities = activities

            }else{
                $scope.isActivity = true;
            }


            }).error(function(err,data){

            $scope.isActivity = true;
            })

    }else{
        $location.path('/login')
        if(!$scope.$$phase) $scope.$apply();
    }
    $scope.go = function (path){
        $location.path(path);
    }
})