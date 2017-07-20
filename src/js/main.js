var reloaded = angular.module( "reloaded", [] );
reloaded.controller( "hello", ['$scope', '$http',
    function($scope, $http){
    $scope.name = "Jeffrey";
        
    $scope.users = [];
    $http.get( 'json/user.json' )
        .then( function(serverData) {
            $scope.users = serverData.data;
        });
        
}]);