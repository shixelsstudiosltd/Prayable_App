sampleApp.controller('prayers',function($rootScope,$scope,$location,$http){
    var data ={}
    $scope.prayerList=[]
    $http({
        method:"POST",
        //contentType: 'application/json',
        //url:"http://localhost:3000/getPrayerCat",
        url:"http://prayable-21641.onmodulus.net/getPrayerCat",
        data:data,
        crossDomain: true,
        dataType: "json"
    }).success(function(data, textstatus) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.prayerList = data;
            $scope.prayerSerachList = data;
            //console.log(data)
           // console.log(textstatus)
        }).error(function(data, textstatus) {

            //console.log(data)
            console.log(textstatus)
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    //$scope.prayerSerachList =  $scope.prayerList;
    $scope.searchQuery=''
    $scope.change = function(){
        var str = $(".searchField").val();

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


    function filterResult(str){
        $scope.prayerSerachList = [];
        // if(str.length){
        $.each( $scope.prayerList,function(index,data){
            var topic= (data.topic).toLowerCase();
            if((topic).indexOf(str.toLowerCase()) > -1 ){
                $scope.prayerSerachList.push(data)
            }else{
                //    console.log(data)
            }
        })

        //}

    }




		$scope.back = function (path){
			history.back();
		};

        $scope.go = function (path){
            $location.path(path);
        }
        
})