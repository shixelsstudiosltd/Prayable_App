sampleApp.controller('prayer',function($rootScope,$scope,$location,$http){

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var prayerID = Url.substr(8,Url.length);
    $scope.isLogged = false;
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isprayer = false;
        $scope.isLogged = true;
        var dataID = {prayerID:prayerID}



        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/getOnPrayer",
            url:"http://prayable-21641.onmodulus.net/getOnPrayer",
            data:dataID,
            crossDomain: true,
            dataType: "json"
        }).success(function(data, textstatus) {
//console.log(data)
                // this callback will be called asynchronously
                // when the response is available
                if(data){
                    $scope.isprayer = true
                    $scope.prayerData = data;
                    $http({
                        method:"POST",
                        //contentType: 'application/json',
                        //url:"http://localhost:3000/seenPrayer",
                        url:"http://prayable-21641.onmodulus.net/seenPrayer",
                        data:dataID,
                        crossDomain: true,
                        dataType: "json"
                    }).success(function(data2, textstatus2) {
                            //console.log(data2)
                            var tempSeen  =   parseInt($scope.prayerData.prayerInfo.prayerSeen)+1;
                            $scope.prayerData.prayerInfo.prayerSeen = tempSeen;
                            // $scope.prayerSerachList = data;
                        }).error(function(data2, textstatus2) {

                            //console.log(data)
                            // console.log(textstatus)
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });

                }

                // $scope.prayerSerachList = data;
            }).error(function(data, textstatus) {

                //console.log(data)
                // console.log(textstatus)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        $scope.createStar = function(payerID){
            var data ={prayerID:payerID, userID:userData._id}
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
                            if(prayerIDTemp === $scope.prayerData.prayerInfo._id){
                                $scope.prayerData.likeCount --;
                            }  // filter out appropriate one

                    }else{//data.status == 200
                        var prayerIDTemp = data.data.prayerID

                            if(prayerIDTemp === $scope.prayerData.prayerInfo._id){
                                $scope.prayerData.likeCount ++;
                            }  // filter out appropriate one

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


    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }


        $scope.go = function (path){
            $location.path(path);
        }

    $scope.back = function (path){
        history.back();
        $scope.$apply();
    };

})