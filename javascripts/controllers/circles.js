sampleApp.controller('circles',function($rootScope,$scope,$location,$http){

   $scope.back = function (path){
        history.back();
    };

    $scope.go = function (path){
        $location.path(path);
    };

    $scope.isLogged = false
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isLogged = true;
        FB.ui({
            method: 'share',
            href: 'https://developers.facebook.com/docs/'
        }, function(response){});
        //var data = {userid:userData._id}

        $scope.getallGruops =function(){
            var data = {key:'A'}
            $http({
                method:"POST",
                //contentType: 'application/json',
                url:"http://localhost:3000/allGroup",
                //url:"http://prayable-21641.onmodulus.net/allGroup",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {
                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.groupList = data;
                    $scope.groupSearchList = data;
                    console.log(data)
                    $scope.searchQuery=''
                    $scope.change = function(){
                        var str = $(".circleSearchField").val();

                        switch (event.keyCode){
                            case 32:{
                                if(str.length > 1 ){
                                    filterResult(str)
                                }else{

                                }
                                break;
                            };
                            default :{
                                filterResult(str);
                                break;
                            };

                        };

                    };



                    // console.log(textstatus)
                }).error(function(data, textstatus) {

                    //console.log(data)
                    console.log(textstatus)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

        $scope.getallGruops();


        function filterResult(str){
            $scope.groupSearchList = [];
            // if(str.length){
            $.each( $scope.groupList,function(index,data){
                var title= (data.title).toLowerCase();
                if((title).indexOf(str.toLowerCase()) > -1 ){
                    $scope.groupSearchList.push(data)
                }else{
                    //    console.log(data)
                }
            })

            //}




        }

        $scope.userGroup = function(){
            var data = {userid:userData._id}

            $http({
                method:"POST",
                //contentType: 'application/json',
                url:"http://localhost:3000/allGroup",
                //url:"http://prayable-21641.onmodulus.net/allGroup",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {
                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.groupList = data;
                    $scope.groupSearchList = data;
                    console.log(data)
                    $scope.searchQuery=''
                    $scope.change = function(){
                        var str = $(".circleSearchField").val();

                        switch (event.keyCode){
                            case 32:{
                                if(str.length > 1 ){
                                    filterResult(str)
                                }else{

                                }
                                break;
                            };
                            default :{
                                filterResult(str);
                                break;
                            };

                        };

                    };



                    // console.log(textstatus)
                }).error(function(data, textstatus) {

                    //console.log(data)
                    console.log(textstatus)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }

        $scope.getallGruops =function(){
            var data = {key:'A'}
            $http({
                method:"POST",
                //contentType: 'application/json',
                url:"http://localhost:3000/allGroup",
                //url:"http://prayable-21641.onmodulus.net/allGroup",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {
                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.groupList = data;
                    $scope.groupSearchList = data;
                    console.log(data)
                    $scope.searchQuery=''
                    $scope.change = function(){
                        var str = $(".circleSearchField").val();

                        switch (event.keyCode){
                            case 32:{
                                if(str.length > 1 ){
                                    filterResult(str)
                                }else{

                                }
                                break;
                            };
                            default :{
                                filterResult(str);
                                break;
                            };

                        };

                    };



                    // console.log(textstatus)
                }).error(function(data, textstatus) {

                    //console.log(data)
                    console.log(textstatus)
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


        
            $('.photo-container').mouseenter(function(){
                $('.photo-upload-container').css("display","table");
                }) .mouseout(function(){
                $('.photo-upload-container').css("display","none");
            });
            
});
    
