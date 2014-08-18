angular.module('twitterApp.services', []).factory('twitterService', function($q) {



    var authorizationResult = false;



    return {

            initialize: function() {

        //initialize OAuth.io with public key of the application
// sVYJ90HeITnebmV3FSoGa9wIKYM
                //vjzlCOE4LT2dE5eSVWZ8Wk6IhN4 public
                //e6u0TKccWPGCnAqheXQYg76Vf2M  example
        OAuth.initialize('s7uVvkzp5f3iygVIc6MkhTKQf', {cache:true});

        //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again

        authorizationResult = OAuth.create('twitter');

    },

    isReady: function() {

        return (authorizationResult);

    },

    connectTwitter: function() {

        var deferred = $q.defer();

        OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present

            if (!error) {


                //console.log(result)
                result.me().done(function(data) {
                   // console.log(data);
                    authorizationResult = data;
                    // do something with `data`, e.g. print data.name
                })
                deferred.resolve();

            } else {

                //do something if there's an error

            }

        });

        return deferred.promise;

    },

    clearCache: function() {

        OAuth.clearCache('twitter');

        authorizationResult = false;

    },

    getLatestTweets: function () {

        //create a deferred object using Angular's $q service

        var deferred = $q.defer();

        var promise = authorizationResult.get('/1.1//api/apps').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline

            //when the data is retrieved resolved the deferred object

            deferred.resolve(data)

        });

        //return the promise of the deferred object

        return deferred.promise;

    }

}



});

