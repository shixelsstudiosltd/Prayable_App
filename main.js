var sampleApp = angular.module("myApp",[])
    .config(['$routeProvider',function($routeProvider){

        $routeProvider
            .when('/',{
                templateUrl:'partials/home.html',
                controller:'home'
            })
            .when('/login',{
                templateUrl:'partials/login.html',
                controller:'login'
            })
            .when('/register',{
                templateUrl:'partials/register.html',
                controller:'register'
            })
/*
            .when('/error',{
                templateUrl:'views/error.html'
            })*/
            .otherwise({
                redirectTo:"/"
            })

    }]);//Config

/*sampleApp.controller('navController',function($rootScope,$scope,$location,$http){

});*/
