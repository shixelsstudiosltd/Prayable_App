sampleApp.controller("home",function(e,o,t){var a=JSON.parse(sessionStorage.getItem("userData"));a&&Object.keys(a).length>0?o.notificationCount=a.notificationCount:(t.path("/"),o.$$phase||o.$apply()),o.go=function(e){t.path(e)},$slideMobile=0,$(".prayable-nav-icon").click(function(){0===$slideMobile?($(".body-container").animate({top:"-346px"}),$(".prayable-nav-container").animate({bottom:"-10px"}),$slideMobile=1,console.log("test")):1===$slideMobile&&($(".body-container").animate({top:"0px"}),$(".prayable-nav-container").animate({bottom:"-346px"}),$slideMobile=0)})});