sampleApp.controller('home',function($rootScope,$scope,$location){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        $scope.notificationCount = userData.notificationCount

    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }

        $scope.go = function (path){
            $location.path(path);
        }

$slideMobile = 0;

$('.prayable-nav-icon').click(function(){
    if ($slideMobile === 0) {
            $('.body-container').animate({top:'-346px'});
            $('.prayable-nav-container').animate({bottom:'-10px'});
            $slideMobile = 1;
            console.log("test");
        }  else if ($slideMobile === 1) {
            $('.body-container').animate({top:'0px'});
            $('.prayable-nav-container').animate({bottom:'-346px'});
            $slideMobile = 0;
      }
});


});