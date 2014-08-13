sampleApp.controller('fasts',function($rootScope,$scope,$location){



        $scope.go = function (path){
            $location.path(path);
        }

})