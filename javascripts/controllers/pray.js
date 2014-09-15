sampleApp.controller('pray',function($rootScope,$scope,$location,ngDialog,$http){
    $scope.prayerInfo = {
        user_id:'',
        prayer_text:'',
        group_id:[],
        journal_id :[],
        is_private:true,
        gps_enabled:true,
        gps_location:''
    };

$scope.savePrayer =function(){
    console.log('clicked')
    console.log($scope.prayerInfo)
}
    $scope.selectGrp =function(){
        var data = {userid:'540c61ca5b0845fb2a16bdd1'}
        $http({
            method:"POST",
            //contentType: 'application/json',
            url:"http://localhost:3000/allGroup",
            // url:"http://prayable-21641.onmodulus.net/allGroup",
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
        var data = {userid:'540c61ca5b0845fb2a16bdd1'}
        $http({
            method:"POST",
            //contentType: 'application/json',
            url:"http://localhost:3000/allJournal",
            // url:"http://prayable-21641.onmodulus.net/allJournal",
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
        ngDialog.open({
            template: './partials/feed_popup.html',
            className: 'feed_popup',
            scope: $scope
        });
    }






        $scope.go = function (path){
            $location.path(path);
        }

})