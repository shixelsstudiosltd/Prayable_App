sampleApp.controller('journal',function($rootScope,$scope,$location){
    $scope.back = function (path){
        history.back();
        $scope.$apply();
    };



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