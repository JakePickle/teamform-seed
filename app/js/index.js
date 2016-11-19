// variable declaration
var navh = $(".navbar").innerHeight();

$(document).ready(function(){
  // set margin-top of the height of navigation bar
  // so that the navigation bar opacity will not be affected by different
  // opacities of the headline section
  $(".headline").css("margin-top", navh);
  $(".connect").css("margin-top", navh);
});

angular.module('teamform-index-app', ['firebase'])
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$interval', '$timeout', function($scope, $firebaseObject, $firebaseArray, $interval, $timeout) {

    initializeFirebase();

    var user;
    $scope.username = "";
    $scope.email = "";
    $scope.photoUrl = "";
    $scope.uid = "";

    $scope.authenticate = function()
    {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        document.cookie = "authAttempt=1";
        firebase.auth().signInWithRedirect(provider);
    }

    $scope.getInfo = function()
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
                $scope.username = user.displayName;
                $scope.email = user.email;
                $scope.photoUrl = user.photoURL;
                $scope.uid = user.uid;
                document.cookie = "uid="+user.uid;
            }



        }).catch(function(error) {
            //TODO: Handel Errors
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });     
    }

    $scope.saveFunc = function() {
        
        var userName = $.trim( $scope.username );
        var Email = $.trim( $scope.email );
        var PhotoUrl = $.trim( $scope.photoUrl );
        
        if (userName !== '') {
                                    
            var newData = {             
                'name': userName,
                'email': Email,
                'photoUrl': PhotoUrl
            };
            
            var refPath = "Users/" + getURLParameter("q") + $scope.uid;  
            var ref = firebase.database().ref(refPath);
            
            ref.set(newData, function(){
                // complete call back
                //alert("data pushed...");
                
                // Finally, go back to the front-end
                window.location.href= "profile.html";
            });

        }
    }

    $scope.asyncHelper = async function() {
        $interval($scope.getInfo(), 1000, 4);
        await sleep(5000);
        $scope.saveFunc();
    }

    if(getCookie("authAttempt")!="")
    {
        asyncHelper();
    }

}]);