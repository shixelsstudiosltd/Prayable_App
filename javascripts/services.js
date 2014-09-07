angular.module('facebook.services', []).factory('facebookService', function($q) {



    var authorizationResult = false;



    return {

            initialize: function() {

        //initialize OAuth.io with public key of the application
// sVYJ90HeITnebmV3FSoGa9wIKYM
                //vjzlCOE4LT2dE5eSVWZ8Wk6IhN4 public
                //e6u0TKccWPGCnAqheXQYg76Vf2M  example

                //s7uVvkzp5f3iygVIc6MkhTKQf
        OAuth.initialize('fyPxHEyYc7kOjHPRDio-4NWGyBk', {cache:true});

        //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again

        authorizationResult = OAuth.create('twitter');

    },

    isReady: function() {

        return (authorizationResult);

    },

    connectFacebook: function(a) {
          var key ;

        var deferred = $q.defer();

        OAuth.popup('facebook', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present

            if (!error) {

                //console.log(result)
                result.me().done(function(data) {
                    console.log(data);
                    authorizationResult = data;
                    var userData = {firstName:data.firstname,lastName:data.lastname,pictureUrl:data.avatar,fbId:data.id}
                    var data ={key:'fb',userData:userData}
                    var link;
                    if(a == 'R'){
                        link= 'user'
                    }else{
                        link = 'loginUser';
                    }
                    $.ajax({
                        method:"POST",
                        //contentType: 'application/json',
                        //url:"http://localhost:3000/"+link,
                        url:"http://prayable-21641.onmodulus.net/"+link,
                        data:data,
                        crossDomain: true,
                        dataType: "json"
                    }).success(function(data, textstatus) {
                            // this callback will be called asynchronously
                            // when the response is available

                            console.log(data)
                            console.log(textstatus)
                        }).error(function(data, textstatus) {

                            console.log(data)
                            console.log(textstatus)
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });

                    deferred.resolve();

                })


            } else {

                //do something if there's an error

            }

        });

        return deferred.promise;

    },

    clearCache: function() {

        OAuth.clearCache('facebook');

        authorizationResult = false;

    },

    getLatestInfo: function () {

        //create a deferred object using Angular's $q service

        var deferred = $q.defer();

        var promise = authorizationResult.get('/me').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline

            //when the data is retrieved resolved the deferred object

            deferred.resolve(data)

        });

        //return the promise of the deferred object

        return deferred.promise;

    }

}



});

