sampleApp.controller('prayerCat',function($rootScope,$scope,$location,$http){

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var prayerCat = Url.substr(18,Url.length);
    $scope.isLogged = false;
    $scope.isPrayerCat = false;
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isprayer = false;
        //$scope.showSearch = false;
        $scope.isLogged = true;
        var data = {prayerCat:prayerCat}
        $scope.goToPrayer = function(payerID){
            //console.log(payerID)
            $scope.go('/prayer/'+payerID);
            if(!$scope.$$phase) $scope.$apply();
        }


        $scope.createStar = function(payerID){
          var data ={prayerID:payerID, userID:userData._id,key:'P'}
            $http({
                method:"POST",
                //contentType: 'application/json',
                //url:"http://localhost:3000/saveLike",
                url:"http://prayable-21641.onmodulus.net/saveLike",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {

                    // this callback will be called asynchronously
                    // when the response is available
                    //console.log(data)
                if(data.status == 400){
                    //console.log('some error in server please retry')
                }else if(data.status == 201){
                    //console.log('This prayer is already liked by you')

                    var prayerIDTemp = data.data.prayerID
                    var prayerListTemp = $scope.prayerList
                    var prayerTemp = prayerListTemp.filter(function(prayer) {
                        if(prayerIDTemp === prayer.prayerInfo._id){
                            prayer.likeCount --;
                        }  // filter out appropriate one

                    });
                    if((prayerTemp)&&(prayerTemp.length > 0) ){
                        $scope.prayerList = prayerListTemp
                    }

                    }else{//data.status == 200
                    var prayerIDTemp = data.data.prayerID
                    var prayerListTemp = $scope.prayerList
                    var prayerTemp = prayerListTemp.filter(function(prayer) {
                        if(prayerIDTemp === prayer.prayerInfo._id){
                            prayer.likeCount ++;
                        }  // filter out appropriate one

                    });
                    if((prayerTemp)&&(prayerTemp.length > 0) ){
                        $scope.prayerList = prayerListTemp
                    }
                    //$scope.prayerList.likeCount ++;
                    }
                    // $scope.prayerSerachList = data;
                }).error(function(data, textstatus) {

                    //console.log(data)
                    // console.log(textstatus)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

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
                if(data.length > 0 ){
                    $scope.isprayer = true
                    $scope.prayerList = data;
                }else{
                    $scope.isPrayerCat = true;
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

    $scope.back = function (path){
        history.back();
        $scope.$apply();
    };

    $scope.go = function (path){
            $location.path(path);
        }

})