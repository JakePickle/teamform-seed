angular.module('teamform-profile-app', ['firebase'])
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$interval' ,'$timeout', function($scope, $firebaseObject, $firebaseArray, $interval, $timeout) {

    initalizeFirebase();

    $scope.uid = "";
    $scope.username = "";

    $scope.authenticate = function()
    {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    }

    $scope.getUID = function()
    {
        firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
            // ...
            }
            // The signed-in user info.
            user = result.user;
            if (user != null) {
                $scope.uid = user.uid;
            }



        }).catch(function(error) {
            //TODO: Handel Errors
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        }); 
    }

    $scope.loadFuncHelper = function() {
        //$scope.getUID();
        if($scope.uid == "")
        {      
            //$scope.authenticate();
        }else{
            
            var refPath = "Users/" + getURLParameter("q") + $scope.uid;
            retrieveOnceFirebase(firebase, refPath, function(data) {
                                
                if ( data.child("name").val() != null ) {
                    $scope.username = data.child("name").val();
                } else {
                    $scope.username = "";
                }
                $scope.$apply();
            });
        }  
    }

    $scope.loadFunc = function() {
        //$interval($scope.loadFuncHelper(), 2000, 10);
        //$timeout($scope.loadFuncHelper(), 11000);
        $scope.uid = getCookie(uid);
    }

    function getCookie(cname) { //Copied from w3schools.com
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
}]);