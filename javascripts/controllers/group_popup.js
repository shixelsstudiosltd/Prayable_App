sampleApp.controller('group_popup',function($rootScope,$scope,$location,ngDialog){



    $scope.go = function (path){
            $location.path(path);
        }

})