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
            .when('/profile',{
                templateUrl:'partials/profile.html',
                controller:'profile'
            })
            .when('/profile/edit',{
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
            .when('/prayer/:prayerID',{
                templateUrl:'partials/prayer.html',
                controller:'prayer'
            })
            .when('/prayers',{
                templateUrl:'partials/prayers.html',
                controller:'prayers'
            })
            .when('/prayers/category/:catID',{
                templateUrl:'partials/prayerCategory.html',
                controller:'prayerCat'
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
            .when('/friends/:userID',{
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
        share: "Share",
        prayersFor: "Prayer's for",
        prayer: "Prayer",
        prayNowTitle: "Pray Now",
        when: "when",
        searchCats: "Search Categories...",
        myAccount: "My Profile",
        inbox: "Chat",
        prayerFeed: "Prayer Feed",
        myPrayers: "Prayers",
        prayers: "Prayers",
        friends: "Friends",
        prayerCircles: "Prayer Circles",
        myJournal: "Journal",
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
        hare: "Share InGerman",
        prayersFor: "Prayer's for InGerman",
        prayer: "Prayer InGerman",
        prayNowTitle: "Pray Now InGerman",
        when: "when InGerman",
        searchCats: "Search Categories... InGerman",
        myAccount: "My Profile InGerman",
        inbox: "Chat InGerman",
        prayerFeed: "Prayer Feed InGerman",
        myPrayers: "My Prayers InGerman",
        prayers: "Prayers InGerman",
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
    var socketID = sessionStorage.getItem('sessionID');
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(socketID && (userData && (Object.keys(userData).length > 0))){
      // console.log("exist")
        console.log(socketID)
        //var socket =io.connect("http://localhost:3000")
        var socket =io.connect("https://prayable-21641.onmodulus.net");
        socket.emit('checkSocketConnetion',{socketID:socketID,userID:userData._id})
    }else{
        console.log("not--exist")
        //var socket =io.connect("http://localhost:3000");
        var socket =io.connect("https://prayable-21641.onmodulus.net");
    }

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
    socketTest.on('connected',function(msg){
        var socket= socketTest.socket()
        sessionStorage.setItem('sessionID',socket.socket.sessionid);
    })
     socketTest.on('RequestForNewChat',function(msg){
        console.log(msg)
    })
    socketTest.on('RequestForResumeChat',function(msg){
        console.log('RequestForResumeChat')
        socketTest.emit('joinTheRoom',msg)

    })
    socketTest.on('message',function(msg){
        console.log('mg1')
        var Url = $location.$$path;
        if(Url == '/inbox/message/'+msg.data.memberID.memberOne)
        {}else{
            $location.path('/inbox/message/'+msg.data.memberID.memberOne)
            if(!$scope.$$phase) $scope.$apply();
        }
    })

    socketTest.on('update',function(msg){
        console.log(msg)
    })

    socketTest.on('error',function(msg){
        console.log(msg)
    })

    socketTest.on('reconnectSocket',function(msg){

        var userData =  JSON.parse(sessionStorage.getItem('userData'));
        if(userData && (Object.keys(userData).length > 0)){
            var socket= socketTest.socket()
            socketTest.emit('addMeToSocket',{userID:userID._id,socketID:socket.socket.sessionid})
        }

    })

    socketTest.on('listOfOnlineUser',function(clients){
        console.log(clients)
        var userData =  JSON.parse(sessionStorage.getItem('userData'));
        if(userData && (Object.keys(userData).length > 0)){
         var userFriendList = userData.friendList[0]
            var userListTemp1;
            var userListTemp2;
              if((userFriendList.msg) && (userFriendList.msg == 'no Member Add'))
              {}else{
             userListTemp1 = userFriendList.filter(function(user) {
                 userListTemp2 = clients.filter(function(client) {
                    return user.id === client.userID; // filter out appropriate one
                });
                //return user.userID === data.userID; // filter out appropriate one
            });
              }
              }
        if((userListTemp2)&&(userListTemp2.length > 0)){
            //console.log(userListTemp2+'aaa')
            sessionStorage.setItem('onlineUser',JSON.stringify(userListTemp2));


        }else{
            sessionStorage.setItem('onlineUser',JSON.stringify(userListTemp2));
        }

    })

    socketTest.on('notificationCreated',function(msg){
        var userData =  JSON.parse(sessionStorage.getItem('userData'));
        var userData =  JSON.parse(sessionStorage.getItem('userData')); if(userData && (Object.keys(userData).length > 0)){
         userData.notificationCount++;
            sessionStorage.setItem('userData',JSON.stringify(userData));
        }
    })


});


