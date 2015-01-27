sampleApp.controller('journal',function($rootScope,$scope,$location,$http){
    $scope.back = function (path){
        history.back();
        $scope.$apply();
    };

    $scope.isLogged = true
    $scope.isJournal = false
    $scope.showSearch = false;
    $scope.error = '';

    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        var date = new Date()
        var year = parseInt(date.getFullYear())
        $scope.year = []
        for(var i=0; i<5; i++){
            $scope.year.push(year++)
        }
        $scope.journalData = {userID:userData._id,day:'1',month:'January',year: date.getFullYear(),fileData:[]}
        $scope.journalList = '';
        $http({
            method:"POST",
            //contentType: 'application/json',
            //url:"http://localhost:3000/allJournal",
            url:"http://prayable-21641.onmodulus.net/allJournal",
            data:{userID:userData._id},
            crossDomain: true,
            dataType: "json"
        }).success(function(data, textstatus) {
                // this callback will be called asynchronously
                // when the response is available
            if(data.length > 0){
                $scope.journalList = data
                scope.isLogged = true;
                scope.showSearch = true;
                $scope.isJournal = true;
            }else{
                $scope.isJournal = false;
                scope.showSearch = false;
            }


            }).error(function(data, textstatus) {
            $scope.isJournal = false;
                //console.log(data)
                console.log(textstatus)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


        //$scope.journalEventDate = {time:'',month:'',year:''}


        $scope.saveJournal = function(){
            if($scope.journalData.text){
                if($scope.journalData.title){
                    if($scope.journalData.tag){
                        $scope.journalData.tag = $scope.journalData.tag.split(',')
                    }

                    $http({
                        method:"POST",
                        //contentType: 'application/json',
                        //url:"http://localhost:3000/createJournal",
                        url:"http://prayable-21641.onmodulus.net/createJournal",
                        data:{journalData:$scope.journalData},
                        crossDomain: true,
                        dataType: "json"
                    }).success(function(data, textstatus) {
                            // this callback will be called asynchronously
                            // when the response is available

                            console.log(data)
                        }).error(function(data, textstatus) {

                            //console.log(data)
                            console.log(textstatus)
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });


                }else {
                    $scope.error = 'Please Add Title for the Journal';
                }
            }else {
                $scope.error = 'Please Add Text for the Journal';
            }
        }

        var getFileReader = function( $scope ) {

            var fileReader = new FileReader();

            fileReader.onloadend = function() {

               //console.log(fileReader.result);
                $scope.journalData.fileData.push(fileReader.result)
            }

            return fileReader;
        };
        $scope.saveImage = function(flow){

            if(flow){
                for(var i=0; i < flow.files.length;i++){
                    var abc = !!{png:1,gif:1,jpg:1,jpeg:1}[flow.files[i].getExtension()]
                    if(abc == true){

                        var fileReader = getFileReader( $scope ),
                            file = flow.files[i].file;

                        fileReader.readAsDataURL(file);

                        $scope.$apply();

                    }else{
                        flow.cancel()
                    }
                }

            }
        }

$scope.deletePic = function(flow,imgIndex){
    flow.files.splice(imgIndex, 1);
        }


    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }





        $scope.go = function (path){
            $location.path(path);
        };

$('.journal-toggle > div').click(function(){
        $('.journal-toggle > div').removeClass('active');
        $(this).addClass('active');
        });

$('.journal-list').click(function(){
	$('.journals-main-container').css('display','block');
	$('.journals-create-main-container').css('display','none');
});

$('.journal-create').click(function(){
	$('.journals-main-container').css('display','none');
	$('.journals-create-main-container').css('display','block');
});

$('.create-text').click(function(){
	$('.text-content').css("display","block");
	$('.photo-content').css("display","none");
	$('.tag-content').css("display","none");
	$('.text-content-text-add').css("display","block");
});

$('.create-photo').click(function(){
	$('.text-content').css("display","none");
	$('.photo-content').css("display","block");
	$('.tag-content').css("display","none");
	$('.text-content-text-add').css("display","none");
});

$('.create-tag').click(function(){
	$('.text-content').css("display","none");
	$('.photo-content').css("display","none");
	$('.tag-content').css("display","block");
	$('.text-content-text-add').css("display","none");
});
        


});