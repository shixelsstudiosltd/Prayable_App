sampleApp.controller('prayers',function($rootScope,$scope,$location){

		$scope.back = function (path){
			history.back();
		};

        $scope.go = function (path){
            $location.path(path);
        }
        
})