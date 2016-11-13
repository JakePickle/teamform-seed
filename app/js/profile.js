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

    $scope.loadFuncHelper2 = function() {
        $scope.getUID();
        var userID = $scope.uid;
        if ( userID !== '' ) {
            
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

    $scope.loadFuncHelper1 = function() {
        if($scope.uid == "")
        {      
            $timeout($scope.authenticate(), 11000);
            $interval($scope.loadFuncHelper2(), 1000, 10);
        }  
    }

    $scope.loadFunc = function() {
        $interval($scope.loadFuncHelper2(), 1000, 10);
        $setTimeout($scope.loadFuncHelper1(), 11000);
    }

    //$timeout($scope.loadFunc, 12000);

}]);