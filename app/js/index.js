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
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

    initalizeFirebase();

    var user;
    var name, email, photoUrl, uid;
    $scope.username = "";

    $scope.authenticate = function()
    {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    }

    $scope.getInfo = function()
    {
        while( user == null)
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
                    name = user.displayName;
                    $scope.username = user.displayName;
                    email = user.email;
                    photoUrl = user.photoURL;
                    uid = user.uid;  
                }



            }).catch(function(error) {
                //TODO: Handel Errors
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });

            sleep(30*1000);  
        }
        
    }

    $scope.saveFunc = function() {
        $scope.getInfo();
        
        var userName = $.trim( $scope.username );
        
        if (userName !== '') {
                                    
            var newData = {             
                'name': userName,
            };
            
            var refPath = "Users/" + getURLParameter("q") + uid;  
            var ref = firebase.database().ref(refPath);
            
            ref.set(newData, function(){
                // complete call back
                //alert("data pushed...");
                
                // Finally, go back to the front-end
                window.location.href= "profile.html";
            });

        }
    }
    

    

}]);

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}