var teamApp = angular.module("team-app", ["firebase"]);
var userID = getCurrentUserID();




// For local tests only!!!!!!!!!!!!!
function getCurrentUserID() {
    return "user_1";
}

teamApp.controller("team-ctrl", function($scope) {
                   $scope.teams = {};
                   $scope.isLeader = function(str) {
                   return userID == str;
                   };
                   var user = firebase.database().ref().child("Users").child(userID).child("Teams");
                   user.on("child_added", function(data) {
                           console.log(data.val());
                           firebase.database().ref("Teams").child(data.val()).once("value").then(function(snapshot) {
                                                                                            
                                                                                                 $scope.teams[snapshot.val().ID] = snapshot.val();
                                                                                                
                                                                                                 $scope.$apply();
                                                                                                 });
                           });
                   
                   user.on("child_changed", function(data) {
                           console.log(data.val());
                           firebase.database().ref("Teams").child(data.val()).once("value").then(function(snapshot) {
                                                                                         
                                                                                                 $scope.teams[snapshot.val().ID] = snapshot.val();
                                                                                              
                                                                                                 $scope.$apply();
                                                                                                 });
                           });
                   
                   user.on("child_removed", function(data) {
                           console.log(data.val());
                           firebase.database().ref("Teams").child(data.val()).once("value").then(function(snapshot) {
                                                                                                 delete $scope.teams[snapshot.val().ID] //= undefined;
                                                                                                 console.log($scope.teams);
                                                                                                 $scope.$apply();
                                                                                                 });
                           });


});