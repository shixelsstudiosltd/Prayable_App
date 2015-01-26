sampleApp.controller('feed',function($rootScope,$scope,$location,$http){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    $scope.isLogged = false
    $scope.isFeeds = false


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
               if(feeds.length > 0){
                   $scope.feeds = feeds

               }else{
                   $scope.isFeeds = true;
               }


        }).error(function(err,data){
            $scope.isFeeds = true;

        })

        $scope.createStar = function(payerID){
            var data ={prayerID:payerID, userID:userData._id}
            $http({
                method:"POST",
                //contentType: 'application/json',
                url:"http://localhost:3000/saveLike",
                //url:"http://prayable-21641.onmodulus.net/saveLike",
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
                    var feedsTemp = $scope.feeds
                    var feedTemp = feedsTemp.filter(function(feed) {
                        if(prayerIDTemp === feed.prayerInfo._id){
                            feed.likeCount --;
                        }  // filter out appropriate one

                    });
                    if((feedTemp)&&(feedTemp.length > 0) ){
                        $scope.feeds = feedsTemp
                    }

                }else{//data.status == 200
                    var prayerIDTemp = data.data.prayerID
                    var feedsTemp = $scope.feeds
                    var feedTemp = feedsTemp.filter(function(feed) {
                        if(prayerIDTemp === feed.prayerInfo._id){
                            feed.likeCount ++;
                        }  // filter out appropriate one

                    });
                    if((feedTemp)&&(feedTemp.length > 0) ){
                        $scope.feeds = feedsTemp
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

        $scope.goToPrayer = function(payerID){
            //console.log(payerID)
            $scope.go('/prayer/'+payerID);
            if(!$scope.$$phase) $scope.$apply();
        }

    }else{
        $location.path('/login')
        if(!$scope.$$phase) $scope.$apply();
    }
})
