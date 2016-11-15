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
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$interval', function($scope, $firebaseObject, $firebaseArray, $interval) {

    initalizeFirebase();

    $scope.authenticate = function()
    {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    }

}]);