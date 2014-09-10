sampleApp.controller('pray',function($rootScope,$scope,$location,ngDialog){
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
        ngDialog.open({
            template: './partials/groups_popup.html',
            className: 'group_popup',
            scope: $scope
        });
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