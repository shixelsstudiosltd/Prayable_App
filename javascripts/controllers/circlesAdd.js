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
        $scope.groupData = {userID:userData._id,title:'',description:'',picData:'',membersID:[],is_gps:true,is_fb:false,is_twit:false,is_private:false}

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


                    if((data[0].msg) && (data[0].msg == 'no Member Add')){
                    $scope.isMember = false
                    }else{
                        $scope.isMember = true
                        $scope.friendsList = data[0];
                    }
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
        var getFileReader = function( $scope ) {

            var fileReader = new FileReader();

            fileReader.onloadend = function() {

                $scope.groupData.picData = fileReader.result;

            }

            return fileReader;
        };
        $scope.saveImage = function(flow){

            if(flow){
            var abc = !!{png:1,gif:1,jpg:1,jpeg:1}[flow.files[0].getExtension()]
            if(abc == true){

                var fileReader = getFileReader( $scope ),
                    file = flow.files[0].file;

                fileReader.readAsDataURL(file);

                $scope.$apply();

            }else{
                flow.cancel()
            }
            }
        }


        $scope.test = function(key){
            //e.preventDefault
            console.log(key)
        }

        $scope.saveGroup =function(){
            if($scope.groupData.title.length > 5){
                if($scope.groupData.description.length > 10){
var data ={groupData:$scope.groupData}
                    $.ajax({
                        method:"POST",
                        //contentType: 'application/json',
                        //url:"http://localhost:3000/group",
                        url:"http://prayable-21641.onmodulus.net/group",
                        data:data,
                        crossDomain: true,
                        dataType: "json"
                    }).success(function(data, textstatus) {
                            // this callback will be called asynchronously
                            // when the response is available
                            if(data.code == 400){
                                alert(data.msg)
                            }else{
                                console.log(data.id)
                                alert('Circle is Created')
                                 $scope.go('/circles');
                                 if(!$scope.$$phase) $scope.$apply();
                            }

                            //console.log(data)
                            //console.log(textstatus)
                        }).error(function(data, textstatus) {

                            console.log(data)
                            console.log(textstatus)
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });

                }else{
                    console.log('Description Should be greater than 10 characters')
                }
            }else{
                console.log('Title Should be greater than 5 characters')
            }
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
