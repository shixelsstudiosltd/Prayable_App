sampleApp.controller('journal',function($rootScope,$scope,$location,$http){
    $scope.back = function (path){
        history.back();
        $scope.$apply();
    };

    $scope.isLogged = false
    $scope.showSearch = false;
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){

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
                $scope.isLogged = true;
                $scope.showSearch = true;
                $scope.journalList = data;

                 console.log(data)
            }).error(function(data, textstatus) {

                //console.log(data)
                console.log(textstatus)
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


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