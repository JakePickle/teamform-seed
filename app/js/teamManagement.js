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

var teamID = getTeamID();
function getTeamID() {
    var path = window.location.href;
    console.log(path);
    var param = path.substr(path.search("#"));
    
    if(param.startsWith("#team/")){
        return param.substr(1 + path.indexOf("/"));
    }
    else return 404;
    
}



var teamInfoApp = angular.module("team-info-app", ["firebase"]);

teamInfoApp.controller("team-info-ctrl", function($scope, $firebaseObject){
                       var ref = firebase.database().ref().child("Teams").child(teamID);
                       $scope.data = $firebaseObject(ref);
                       $scope.members = {};
                       console.log(teamID);
                       ref.child("Members").on("child_added", function(data) {
                            firebase.database().ref().child("Users").child(data.val()).once("value").then(function(snapshot){
                                $scope.members[snapshot.val().ID] = snapshot.val();
                                
                                ref.child("Leader").once("value").then(function(snapShot){
                                                                  $scope.members[snapshot.val().ID]["isLeader"] = (snapshot.val().ID == snapShot.val());
                                                                       $scope.$apply();
                                                                                                                });
                                                                                            console.log($scope.members);
                                                                                    $scope.$apply();
                                                                                                                           });
                                             });
                       
                       // To check whether a user could join a team
                       $scope.canJoin = function() {
                       console.log($scope.data.Event);
                       var num = $firebaseObject(firebase.database().ref().child("Events").child($scope.data.Event));
                       console.log(num);
                       if(num.Status != "open")
                       return false;
                       
                       if($scope.data.Members.length >= num.Requirements.maxTeamSize)
                            return false;
                       if($scope.data.Status == "terminated")
                            return false;
                       return true;
                       };
                       
                       $scope.joinTeam = function() {
                       firebase.database().ref().child("Events").child($scope.data.Event).once("value").then(function(snapshot){
                                                                                                             console.log(snapshot.val().Status == "open");
                                                                                                             console.log(snapshot.val().Requirements.maxTeamSize);
                                                                                                             console.log($scope.data.Members.length);
                                                                                                             console.log($scope.data.Status != "terminated");
                                if(snapshot.val().Status == "open" && ($scope.data.Status != "terminated")){
                                        firebase.database().ref().child("Teams").child(teamID).once("value").then(function(value){
                                                                                                                  console.log(value.val().Count);
                                                    if(snapshot.val().Requirements.maxTeamSize > value.val().Count ){
                                                                    ref.child("Members").push().set(userID);
                                                                                                                              var count = {};
                                                                                                                              count["Count"] = 1 + value.val().Count;
                                                                                                                              ref.update(count);
                                                                    firebase.database().ref().child("Users").child(userID).child("Teams").push().set($scope.data.Event);
                                                                                                                  if(snapshot.val().Requirements.maxTeamSize <= value.val().Count - 1)
                                                                                                                                                                                       firebase.database().ref().child("Events").child($scope.data.Event).update({"Status":"terminated"});
                                                                                                                                                                                       
                                                                                                                                                                                       
                                                                                                                                                                                       
                                                                                                                  }
                                                                                                                  else if(snapshot.val().Requirements.minTeamSize > value.val().Count){
                                                                                                                   firebase.database().ref().child("Events").child($scope.data.Event).update({"Status":"pending"});
                                                                                                                  }
                                                                                                                  else  firebase.database().ref().child("Events").child($scope.data.Event).update({"Status":"vallid"});
                                                                                                                                                                                       
                                                                                                                                                                                       });
                                    
                                }
                                else alert("Fail to join the team. Please retry or try another team");
                                                                            
                                                                                                             
                            });
                       
                       
                       };
                       
                       
                       
                       
});