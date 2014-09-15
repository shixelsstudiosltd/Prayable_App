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
    $scope.selection = []
    $scope.toggleSelection = function toggleSelection(selectionID) {
        var idx = $scope.selection.indexOf(selectionID);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(selectionID);
        }

    };

    $scope.saveGroup = function(){
        $scope.prayerInfo.group_id = $scope.selection
    }


    $scope.selectjrl =function(){
        ngDialog.open({
            template: './partials/journal_popup.html',
            className: 'journal_popup',
            scope: $scope
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