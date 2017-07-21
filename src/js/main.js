// Az angular főmodul létrehozása
var webapp = angular.module( "webapp", [] );

// Body controllere:
webapp.controller( "bodyController", ['$scope', '$http', 'loginFactory', 
    function($scope, $http, loginFactory){
        
    $scope.isLoggedIn = false;
        
    $scope.name = "Jeffrey";
    
    // Az értékek a serverData objektum data változójában lesznek és
    // belekerülnek a $scope.users tömbbe.   
    $scope.users = [];
        
    loginFactory.checkLogin()
        
}]);