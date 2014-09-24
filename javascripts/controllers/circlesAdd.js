sampleApp.controller('circlesAdd',function($rootScope,$scope,$location,$http,ngDialog){

    $scope.back = function (path){
        history.back();
    };

    $scope.go = function (path){
        $location.path(path);
    };

    $scope.isLogged = false
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isLogged = true
        $scope.groupData = {title:'',description:'',picURL:'',membersID:[],is_gps:true,is_fb:false,is_twit:false,is_private:false}

        $scope.selectFriends =function(){
            var data = {userID:userData._id}
            $http({
                method:"POST",
                //contentType: 'application/json',
                //url:"http://localhost:3000/allGroup",
                url:"http://prayable-21641.onmodulus.net/allFriends",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.friendsList = data[0];
                    console.log(data[0])
                    //console.log(data)
                    ngDialog.open({
                        template: './partials/group_friendpoup.html',
                        className: 'group_friendpoup',
                        scope: $scope
                    });

                    // console.log(textstatus)
                }).error(function(data, textstatus) {

                    //console.log(data)
                    alert(data)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }



        $scope.fselection= [];
        $scope.toggleSelection = function toggleSelection(selectionID) {

            var idx =  $scope.fselection.indexOf(selectionID);

            // is currently selected
            if (idx > -1) {
                $scope.fselection.splice(idx, 1);

            }

            // is newly selected
            else {
                $scope.fselection.push(selectionID);

            }

        };



        $scope.saveSelection = function(){

                $scope.groupData.membersID = $scope.fselection

            //console.log($scope.prayerInfo)
        }



        $scope.saveGroup =function(){
            //console.log('clicked')
            console.log($scope.groupData)
        }


        $scope.selectfeed =function(){
            $scope.groupData.newsFeed = true;
        }
        $scope.fbShare =function(){
            $scope.groupData.is_fb = true;
        }
        $scope.twitShare =function(){
            $scope.groupData.is_twit = true;
        }
    }




    $('.photo-container').mouseenter(function(){
        $('.photo-upload-container').css("display","table");
    }) .mouseout(function(){
            $('.photo-upload-container').css("display","none");
        });

})
