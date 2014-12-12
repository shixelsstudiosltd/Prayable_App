sampleApp.controller('prayer',function($rootScope,$scope,$location,$http){

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var prayerID = Url.substr(8,Url.length);
    $scope.isLogged = false;
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isprayer = false;
        $scope.isLogged = true;
        var data = {prayerID:prayerID}
        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/getOnPrayer",
            url:"http://prayable-21641.onmodulus.net/getOnPrayer",
            data:data,
            crossDomain: true,
            dataType: "json"
        }).success(function(data, textstatus) {
//console.log(data)
                // this callback will be called asynchronously
                // when the response is available
                if(data){
                    $scope.isprayer = true
                    $scope.prayerData = data;
                }

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