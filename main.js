var sampleApp = angular.module("myApp",['ngCookies','pascalprecht.translate','facebook.services','ngDialog','flow'])
    .config(['$routeProvider',function($routeProvider){

        $routeProvider
            .when('/',{
                templateUrl:'partials/login.html',
                controller:'login'
            })
            .when('/home',{
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
            .when('/profile/:userProbfileId',{
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
            .when('/prayer',{
                templateUrl:'partials/prayer.html',
                controller:'prayer'
            })
            .when('/prayers',{
                templateUrl:'partials/prayers.html',
                controller:'prayers'
            })
            .when('/circles',{
                templateUrl:'partials/circles.html',
                controller:'circles'
            })
            .when('/circles/add',{
                templateUrl:'partials/circle_add.html',
                controller:'circlesAdd'
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
            .when('/prayer_share',{
                templateUrl:'partials/prayer_share.html',
                controller:'prayerShare'
            })
            .when('/prayers/add',{
                templateUrl:'partials/prayer_share.html',
                controller:'prayerShare'
            })
            .when('/emailCnfm/:verificationCode',{
                templateUrl:'partials/emailCnfm.html',
                controller:'emailCnfm'
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
        addCircle: 'Add Prayer Circle',
        email: 'Email',
        password: 'Password.',
        login: ' LOG IN',
        signup: 'SIGN UP',
        register:' Register',
        needaccount:'Need an account?',
        or:'OR',
        alreadyhaveaccount:'Already have an account?',
        signupwith:'Sign up with',
        loginwith:"Login with",
        prayerShare: "Share a Prayer",
        prayersFor: "Prayer's for",
        prayer: "Prayer",
        prayNowTitle: "Pray Now",
        when: "when",
        searchCats: "Search Categories...",
        myAccount: "My Account",
        inbox: "Inbox",
        prayerFeed: "Prayer Feed",
        myPrayers: "My Prayers",
        friends: "Friends",
        prayerCircles: "Prayer Circles",
        myJournal: "My Journal",
        myActivities: "My Activities",
        settings: "Settings",
        addAPrayer: "add a prayer",
        newRequest: "New Prayer Request",
        profile: "Profile",
        facebookSignUp: "Sign up with Facebook",
        facebookLogIn: "Log In with Facebook",
        firstName: "First Name",
        lastName: "Last Name"
    });
    $translateProvider.translations('de', {
        addCircle: 'Add Prayer Circle InGerman',
        email: 'Email InGerman',
        password: 'Password.InGerman',
        login: ' LOG IN InGerman',
        signup: 'SIGN UP InGerman',
        register:' Register InGerman',
        needaccount:'Need an account? InGerman',
        or:'OR InGerman',
        alreadyhaveaccount:'Already have an account? InGerman',
        signupwith:'Sign up with InGerman',
        loginwith:"Login with InGerman",
        prayerShare: "Share a Prayer InGerman",
        prayersFor: "Prayer's for InGerman",
        prayer: "Prayer InGerman",
        prayNowTitle: "Pray Now InGerman",
        when: "when InGerman",
        searchCats: "Search Categories... InGerman",
        myAccount: "My Account InGerman",
        inbox: "Inbox InGerman",
        prayerFeed: "Prayer Feed InGerman",
        myPrayers: "My Prayers InGerman",
        friends: "Friends InGerman",
        prayerCircles: "Prayer Circles InGerman",
        myJournal: "My Journal InGerman",
        myActivities: "My Activities InGerman",
        settings: "Settings InGerman",
        addAPrayer: "add a prayer InGerman",
        newRequest: "New Prayer Request InGerman",
        profile: "Profile InGerman",
        facebookSignUp: "Sign up with Facebook InGerman",
        facebookLogIn: "Log In with Facebook InGerman",
        firstName: "First Name InGerman",
        lastName: "Last Name InGerman"

    });
    $translateProvider.preferredLanguage('en');
});

/*sampleApp.controller('navController',function($rootScope,$scope,$location,$http,$cookies,$translate){
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };

});*/
