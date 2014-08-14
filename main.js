var sampleApp = angular.module("myApp",['ngCookies','pascalprecht.translate'])
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
            .when('/profile',{
                templateUrl:'partials/profile.html',
                controller:'profile'
            })
            .when('/inbox',{
                templateUrl:'partials/inbox.html',
                controller:'inbox'
            })
            .when('/requests',{
                templateUrl:'partials/requests.html',
                controller:'requests'
            })
            .when('/prayers',{
                templateUrl:'partials/prayers.html',
                controller:'prayers'
            })
            .when('/circles',{
                templateUrl:'partials/circles.html',
                controller:'circles'
            })
            .when('/friends',{
                templateUrl:'partials/friends.html',
                controller:'friends'
            })
            .when('/activities',{
                templateUrl:'partials/activities.html',
                controller:'activities'
            })
            .when('/fasts',{
                templateUrl:'partials/fasts.html',
                controller:'fasts'
            })
            .when('/notification',{
                templateUrl:'partials/notification.html',
                controller:'notification'
            })
            .when('/journal',{
                templateUrl:'partials/journal.html',
                controller:'journal'
            })
/*
            .when('/error',{
                templateUrl:'views/error.html'
            })*/
            .otherwise({
                redirectTo:"/"
            })

    }]);//Config

sampleApp.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        email: 'Email',
        password: 'Password.',
        login: 'LOG IN',
        signup: 'SIGN UP',
        register:'Register',
        needaccount:'Need an account?',
        or:'OR',
        alreadyhaveaccount:'Already have an account',
        signupwith:'Sign up with',
        loginwith:"Login with"
    });
    $translateProvider.translations('de', {
        email: 'Email InGerman',
        password: 'Password.InGerman',
        login: 'LOG IN InGerman',
        signup: 'SIGN UP InGerman',
        register:'Register InGerman',
        needaccount:'Need an account? InGerman',
        or:'OR InGerman',
        alreadyhaveaccount:'Already have an account InGerman',
        signupwith:'Sign up with InGerman',
        loginwith:"Login with InGerman"

    });
    $translateProvider.preferredLanguage('en');
});

/*sampleApp.controller('navController',function($rootScope,$scope,$location,$http,$cookies,$translate){
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };

});*/
