sampleApp.controller('prayer',function($rootScope,$scope,$location,$http){

   var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var prayerID = Url.substr(8,Url.length);
    $scope.isLogged = false;
    $scope.showComments = false;
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isprayer = false;
        $scope.isLogged = true;
        var dataID = {prayerID:prayerID}
        $scope.commentData = {};
        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/getOnPrayer",
            url:"http://prayable-21641.onmodulus.net/getOnPrayer",
            data:dataID,
            crossDomain: true,
            dataType: "json"
        }).success(function(data, textstatus) {
console.log(data)
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

        $scope.createStar = function(ID,key,commenterID){
            var comData
            if(key == 'C'){
                 comData = {prayerID:prayerID,commentID:ID,userID:userData._id,key:key,commenterID:commenterID}
            }else{
                comData ={prayerID:ID, userID:userData._id,key:key}
            }


            $http({
                method:"POST",
                //contentType: 'application/json',
                //url:"http://localhost:3000/saveLike",
                url:"http://prayable-21641.onmodulus.net/saveLike",
                data:comData,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {

               // if(key == 'C'){
                    console.log(data)
                //}else{

                    if(data.status == 400){
                        //console.log('some error in server please retry')
                    }else if(data.status == 201){
                        //console.log('This prayer is already liked by you')
                        if(key == 'C'){
                            var commentIDTemp = data.data.commentID
                            var commentListTemp = $scope.prayerData.comments
                            var commentTemp = commentListTemp.filter(function(comment) {
                                if(commentIDTemp === comment.commentInfo._id){
                                    comment.LikeCount --;
                                }  // filter out appropriate one

                            });
                            if((commentTemp)&&(commentTemp.length > 0) ){
                                $scope.prayerData.comments = commentListTemp
                            }
                        }else {
                            var prayerIDTemp = data.data.prayerID
                            if (prayerIDTemp === $scope.prayerData.prayerInfo._id) {
                                $scope.prayerData.likeCount--;
                            }  // filter out appropriate one
                        }

                    }else{//data.status == 200
                        if(key == 'C'){
                            var commentIDTemp = data.data.commentID
                            var commentListTemp = $scope.prayerData.comments
                            var commentTemp = commentListTemp.filter(function(comment) {
                                if(commentIDTemp === comment.commentInfo._id){
                                    comment.LikeCount ++;
                                }  // filter out appropriate one

                            });
                            if((commentTemp)&&(commentTemp.length > 0) ){
                                $scope.prayerData.comments = commentListTemp
                            }
                        }else{
                            var prayerIDTemp = data.data.prayerID
                            if(prayerIDTemp === $scope.prayerData.prayerInfo._id){
                                $scope.prayerData.likeCount ++;
                            }  // filter out appropriate one
                        }

                    }
               // }



                    // $scope.prayerSerachList = data;
                }).error(function(data, textstatus) {

                    //console.log(data)
                    // console.log(textstatus)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }


        $scope.showComment = function(){
            $scope.showComments = true
        }

        $scope.makeComment = function(){
           if($scope.commentData.commentText){
            $scope.commentData.userID = userData._id
            $scope.commentData.prayerID =  $scope.prayerData.prayerInfo._id

            $http({
                method:"POST",
                //contentType: 'application/json',
                //url:"http://localhost:3000/saveComment",
                url:"http://prayable-21641.onmodulus.net/saveComment",
                data: {commentData:$scope.commentData},
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {

                if(data.status == 400){
                    console.log(data.msg)
                }else if(data.status == 200){
                    $scope.prayerData.comments.push({commentInfo:data.data.commentInfo,userInfo:{_id:userData._id,firstName:userData.firstName,lastName:userData.lastName}})
                }


            }).error(function(data, textstatus) {

                //console.log(data)

            });
           }else{
alert('Please Add some text ')
           }
        }
        $scope.clearComment = function(){
            $('.commentBox').val('')
        }

        $scope.goToProfile = function(profID){

            $location.path('/profile/'+profID)
            if(!$scope.$$phase) $scope.$apply();
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