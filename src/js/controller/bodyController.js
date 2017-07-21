// Body controllere:
webapp.controller( "bodyController", ['$scope', '$http', 'userFactory', 
    function($scope, $http, userFactory){
        
    $scope.isLoggedIn = false;
        
    $scope.name = "Jeffrey";
    
    // Az értékek a serverData objektum data változójában lesznek és
    // belekerülnek a $scope.users tömbbe.   
    $scope.users = [];
   
    // Bejelentkezés.
    $scope.doLogin = function() {
        if ( !$scope.loginData) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }
        if ( !$scope.loginData.email || !$scope.loginData.pass ) {
            alert('Kérjük töltse ki a mezőket!');
            return;
        }
        
        userFactory.checkLogin($scope.loginData)
            .then(function(loggedIn){
                $scope.isLoggedIn = loggedIn;
        });
    }
}]);