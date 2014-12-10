sampleApp.controller('prayerCat',function($rootScope,$scope,$location,$http){

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var prayerCat = Url.substr(18,Url.length);
    $scope.isLogged = false;
    if(userData && (Object.keys(userData).length > 0)){
        $scope.Noprayer = true;
        //$scope.showSearch = false;
        $scope.isLogged = true;
        var data = {prayerCat:prayerCat}
        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/getPrayer",
            url:"http://prayable-21641.onmodulus.net/getPrayer",
            data:data,
            crossDomain: true,
            dataType: "json"
        }).success(function(data, textstatus) {

                // this callback will be called asynchronously
                // when the response is available
                $scope.prayerList = data;
               // $scope.prayerSerachList = data;
            }).error(function(data, textstatus) {

                //console.log(data)
               // console.log(textstatus)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }

        $scope.go = function (path){
            $location.path(path);
        }

})