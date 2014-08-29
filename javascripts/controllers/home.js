sampleApp.controller('home',function($rootScope,$scope,$location){



        $scope.go = function (path){
            $location.path(path);
        }




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