sampleApp.controller('input',function($rootScope,$scope,$location){



        $scope.go = function (path){
            $location.path(path);
        }

})