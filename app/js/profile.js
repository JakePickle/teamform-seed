angular.module('teamform-profile-app', ['firebase'])
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

    initalizeFirebase();

    $scope.uid = "";
    $scope.username = "";
    $scope.email = "";

    $scope.loadFunc = function() {
        if($scope.uid != "")
        {
            var refPath = "Users/" + getURLParameter("q") + $scope.uid;
            retrieveOnceFirebase(firebase, refPath, function(data) {
                                
                if ( data.child("name").val() != null ) {
                    $scope.username = data.child("name").val();
                } else {
                    $scope.username = "";
                }

                if ( data.child("email").val() != null ) {
                    $scope.email = data.child("email").val();
                } else {
                    $scope.email = "";
                }

                $scope.$apply();
            });
        }  
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

    $scope.uid = getCookie("uid");
    $scope.loadFunc();
}]);