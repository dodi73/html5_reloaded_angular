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
        
}]);;// Login kezelése:
webapp.factory('userFactory', ['$q', '$http', function($q, $http) {
    // Objektummal tér vissza, amiben felsoroljuk, hogy mit csináljon ez a factory.
    // Back-end-et most nem írunk, front-end-be opldjuk meg, html tanfolyam.
    // Ez így nem biztonságos (a javascript könnyen manipulálható), csak szimuláljuk a // back-end-et, élőben soha így.
    return {
        // A checkLogin elem létrehozása, ami egy függvény, és ami megkapja a loginData
        // objektumot (felhasználó, jelszó).
        checkLogin: function(loginData) {
            var deferred = $q.defer();
            
            // Lekérjük a felhasználókat (Ennek a kódrészletnek a szerveren a //helye):
            // A then()-nek az első  
            this.getUsers().then( function(users) {
                   
                // Megkeressük az adott felhasználót.
                var loggedIn = false;
                for (var k in users) {
                    if (users[k].email === loginData.email && users[k].pass === loginData.pass) {
                        loggedIn = true;
                    }
                }
                deferred.resolve(loggedIn);
            
            }, function(err) {
                alert('Hiba a szerver kapcsolatban!');
                deferred.resolve(loggedIn);                
            });
            
            
            // A promise nem függvény, hanem objektum.
            return deferred.promise;
        },
        getUsers: function() {
          //A $q-val valósítjuk meg az asszinkron működést, ezzel viszgáljuk, hogy
          // megfelelő adattal tért vissza, vagy hibaüzenettel. Végül visszaadjuk return-al vagy az adatokat vagy a hibát.   
          var deferred = $q.defer();    
          $http.get( 'json/user.json' )
            .then( function(serverData) {
                deferred.resolve(serverData.data);
            }, function(err) {
                deferred.reject(err);    
            });  
        return deferred.promise;           
        }
    };
}]);;// Body controllere:
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