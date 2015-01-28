sampleApp.controller('prayerShare',function($rootScope,$scope,$location,ngDialog,$http){
    $scope.isLogged = true;
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        $scope.isLogged = true;
        $scope.prayerInfo = {
            userID:userData._id,
            prayer_text:'',
            group_id:[],
            journal_id :[],
            is_notPrivate:true,
            gps_enabled:true,
            gps_location:'',
            newsFeed:false,
            fbShare:false,
            twitShare:false
        };

        $scope.savePrayer =function(){
            //console.log('clicked')
            console.log($scope.prayerInfo)
            var data = {key:'R',prayerData:$scope.prayerInfo}
            if($scope.prayerInfo.prayer_text.length > 10){
                $.ajax({
                    method:"POST",
                    //contentType: 'application/json',
                    //url:"http://localhost:3000/prayer",
                    url:"http://prayable-21641.onmodulus.net/prayer",
                    data:data,
                    crossDomain: true,
                    dataType: "json"
                }).success(function(data, textstatus) {
                        // this callback will be called asynchronously
                        // when the response is available
                        if(data.code == 400){
                            alert(data.msg)
                        }else{
                            console.log(data.id)
                            alert('Prayer is Created')
                           /* $scope.go('/');
                            if(!$scope.$$phase) $scope.$apply();*/
                        }

                        //console.log(data)
                        //console.log(textstatus)
                    }).error(function(data, textstatus) {

                        console.log(data)
                        console.log(textstatus)
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });

            }else{
                console.log('Prayer Should be greater than 10 characters')
            }

        }
        $scope.selectGrp =function(){
            var data = {userID:userData._id}
            $http({
                method:"POST",
                //contentType: 'application/json',
                //url:"http://localhost:3000/allGroup",
                url:"http://prayable-21641.onmodulus.net/allGroup",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.groupList = data;
                    //console.log(data)
                    ngDialog.open({
                        template: './partials/groups_popup.html',
                        className: 'group_popup',
                        scope: $scope
                    });

                    // console.log(textstatus)
                }).error(function(data, textstatus) {

                    //console.log(data)
                    console.log(textstatus)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
        $scope.gselection = [];
        $scope.jselection= []
        $scope.toggleSelection = function toggleSelection(selectionID,key) {
            var tempData;
            if(key == 'g'){
                tempData = $scope.gselection
            }else if(key == 'j'){
                tempData=$scope.jselection
            }
            var idx = tempData.indexOf(selectionID);

            // is currently selected
            if (idx > -1) {
                tempData.splice(idx, 1);
                trasferData(tempData,key)
            }

            // is newly selected
            else {
                tempData.push(selectionID);
                trasferData(tempData,key)
            }

        };

        function trasferData(tempData,key){
            if(key =='g'){
                $scope.gselection = tempData
            }else if(key == 'j'){
                $scope.jselection= tempData
            }
        }

        $scope.saveSelection = function(key){
            if(key == 'g'){
                $scope.prayerInfo.group_id = $scope.gselection
            }else if(key == 'j'){
                $scope.prayerInfo.journal_id = $scope.jselection
            }
            //console.log($scope.prayerInfo)
        }


        $scope.selectjrl =function(){
            var data = {userID:userData._id}
            $http({
                method:"POST",
                //contentType: 'application/json',
                //url:"http://localhost:3000/allJournal",
                url:"http://prayable-21641.onmodulus.net/allJournal",
                data:data,
                crossDomain: true,
                dataType: "json"
            }).success(function(data, textstatus) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.journalList = data;
                    //console.log(data)
                    ngDialog.open({
                        template: './partials/journal_popup.html',
                        className: 'journal_popup',
                        scope: $scope
                    });

                    // console.log(textstatus)
                }).error(function(data, textstatus) {

                    //console.log(data)
                    console.log(textstatus)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
        $scope.selectmsg =function(){
            ngDialog.open({
                template: './partials/message_popup.html',
                className: 'message_popup',
                scope: $scope
            });
        }
        $scope.selectfeed =function(){
            $scope.prayerInfo.newsFeed = true;

        }
        $scope.fbShare =function(){
            $scope.prayerInfo.fbShare = true;
        }
        $scope.twitShare =function(){
            $scope.prayerInfo.twitShare = true;
        }
        $scope.tabs = [{
                title: 'To Followers',
                url: 'followers.tpl.html'
            }, {
                title: 'Direct',
                url: 'direct.tpl.html'
            }
        ];
        $scope.currentTab = 'followers.tpl.html';
        $scope.onClickTab = function(tab){
            $scope.currentTab = tab.url;
        }
        $scope.isActiveTab = function(tabUrl){
            return tabUrl == $scope.currentTab;
        }
    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }



    $scope.back = function (path){
        history.back();
        $scope.$apply();
    };




    $scope.go = function (path){
        $location.path(path);
    }

})