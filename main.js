var sampleApp = angular.module("myApp",['ngCookies','pascalprecht.translate','facebook.services','ngDialog','flow','btford.socket-io'])
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
            .when('/profile/:userProbfileId/edit',{
                templateUrl:'partials/profile_edit.html',
                controller:'profile'
            })
            .when('/inbox',{
                templateUrl:'partials/inbox.html',
                controller:'inbox'
            })
            .when('/inbox/message/:userID',{
                templateUrl:'partials/message.html',
                controller:'messages'
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
            .when('/feed',{
                templateUrl:'partials/feed.html',
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
            .when('/chat',{
                templateUrl:'partials/chatExample.html',
                controller:'chat'
            })

            .when('/error',{
                templateUrl:'views/error.html'
            })
            .otherwise({
                redirectTo:"/"
            });

    }]);//Config

sampleApp.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        addCircle: 'Add Prayer Circle',
        email: 'Email',
        password: 'Password.',
        login: ' LOG IN',
        journals: 'Journals',
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
        profileEdit: "Edit Profile",
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
        journals: 'Journals InGerman',
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
        profileEdit: "Edit Profile InGerman",
        facebookSignUp: "Sign up with Facebook InGerman",
        facebookLogIn: "Log In with Facebook InGerman",
        firstName: "First Name InGerman",
        lastName: "Last Name InGerman"

    });
    $translateProvider.preferredLanguage('en');
});
sampleApp.factory('socketTest', function($rootScope) {
    //var socket =io.connect("http://localhost:8080");
    //var socket =io.connect("http://localhost:3000");
    var socket =io.connect("http://prayable-21641.onmodulus.net");
    $.support.cors=true
    //var socket =io.connect("http://prayable-21641.onmodulus.net");
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        socket:function(){
            return socket
        }
    };
});

/*sampleApp.factory('mySocket', function (socketFactory) {
    var socket =io.connect("http://localhost:3000/");
    mySocket = socketFactory({
        ioSocket: myIoSocket
    });

    return mySocket;
});
*/
sampleApp.controller('chatDiv',function($rootScope,$scope,$location,$http,$cookies,$translate,socketTest){
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
     socketTest.on('RequestForNewChat',function(msg){
        console.log(msg)
    })
    socketTest.on('RequestForResumeChat',function(msg){
        console.log('RequestForResumeChat')
        socketTest.emit('joinTheRoom',msg)
        console.log(msg)
    })
    socketTest.on('message',function(msg){
       console.log('message');
        console.log(msg)
    })

    socketTest.on('update',function(msg){
        console.log(msg)
    })

    socketTest.on('error',function(msg){
        console.log(msg)
    })







});


