sampleApp.controller('home',function($rootScope,$scope,$location){



        $scope.go = function (path){
            $location.path(path);
        }

$slideMobile = 0;

$('.prayable-nav-icon').click(function(){
    if ($slideMobile === 0) {
            $('.body-container').animate({top:'-446px'});
            $('.prayable-nav-container').animate({bottom:'-10px'});
            $slideMobile = 1;
            console.log("test");
        }  else if ($slideMobile === 1) {
            $('.body-container').animate({top:'0px'});
            $('.prayable-nav-container').animate({bottom:'-446px'});
            $slideMobile = 0;
      }
});

/*
toggleMenu: function(e) {
	var navButton = document.getElementsByClassName('prayable-nav-icon'),
		navContainer = document.getElementsByClassName('prayable-nav-container'),
     	slideMobile = 0;
    
    navButton.click(function(){
	if (slideMobile === 0) {
		navContainer.animate({bottom:'0px'});
console.log("test");
slideMobile = 1;
} else if (slideMobile === 1) {
snavContainer.animate({top:'-530px'});
slideMobile = 0;
    }
});
return toggleMenu;
        } */

})