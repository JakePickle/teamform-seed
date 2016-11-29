var teamApp = angular.module("team-app", ["firebase"]);
var userID = "user_1";

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
                                                                                                                                                                                       ref.update({"Status":"terminated"});
                                                                                                                                                                                       
                                                                                                                                                                                       
                                                                                                                                                                                       
                                                                                                                  }
                                                                                                                  else if(snapshot.val().Requirements.minTeamSize > value.val().Count){
                                                                                                                   ref.update({"Status":"pending"});
                                                                                                                  }
                                                                                                                  else  ref.update({"Status":"valid"});
                                                                                                                                                                                       
                                                                                                                                                                                       });
                                    
                                }
                                else alert("Fail to join the team. Please retry or try another team");
                                                                            
                                                                                                             
                            });
                       
                       
                       };
                       
                       
                       
                       
});



var teamManagementApp = angular.module("team-manage-app", ["firebase"] );
teamManagementApp.controller("team-manage-ctrl", function($scope){
                             console.log(teamID);
                             $scope.member = {};
                             $scope.pending = {};
                             $scope.invitation = {};
                             $scope.updateTeam = function() {
                             var tmp = {};
                             tmp["Introduction"] = $scope.introduction;
                             firebase.database().ref().child("Teams").child(teamID).update(tmp);
                             console.log($scope.introduction);
                             window.location.reload();                             };
                             
                             var ref=firebase.database().ref().child("Teams").child(teamID);
                             ref.on("value", function(snapshot){
                                                  $scope.data = snapshot.val();
                                    $scope.$apply();
                                                  });
                         
                             ref.child("Members").on("child_added", function(data){
                                                     if(data) {
                                                      var user = firebase.database().ref().child("Users").child(data.val());
                                                      user.once("value").then(function(snapshot){
                                              //                                console.log(snapshot.val().Name);
                                                                              if(snapshot.val()){
                                                                              $scope.member[snapshot.val().ID] = snapshot.val();
                                                                        //      console.log($scope.member);
                                                                              $scope.$apply();

                                                                              }
                                                                                                                                                       });
                                                     }
                                                  
                                        });
                             ref.child("Pending").on("child_added", function(data){
                                                     if(data) {
                                                     var user = firebase.database().ref().child("Users").child(data.val());
                                                     user.once("value").then(function(snapshot){
                                                                             //                                console.log(snapshot.val().Name);
                                                                             if(snapshot.val()){
                                                                             $scope.pending[snapshot.val().ID] = snapshot.val();
                                                                             //      console.log($scope.member);
                                                                             $scope.$apply();

                                                                             }
                                                                                                                                                         });
                                                     }
                                                     
                                                     });

                             ref.child("Invitation").on("child_added", function(data){
                                                        if(data){
                                                     var user = firebase.database().ref().child("Users").child(data.val());
                                                     user.once("value").then(function(snapshot){
                                                                             //                                console.log(snapshot.val().Name);
                                                                             if(snapshot.val()){
                                                                             $scope.invitation[snapshot.val().ID] = snapshot.val();
                                                                             //      console.log($scope.member);
                                                                              $scope.$apply();
                                                                             }
                                                                            
                                                                             });
                                                     
                                                        }
                                                     });
                             ref.child("Members").on("child_removed", function(data){
                                                     if(data) {
                                                     var user = firebase.database().ref().child("Users").child(data.val());
                                                     user.once("value").then(function(snapshot){
                                                                             //                                console.log(snapshot.val().Name);
                                                                             if(snapshot.val()){
                                                                             delete $scope.member[snapshot.val().ID];
                                                                             //      console.log($scope.member);
                                                                             $scope.$apply()
                                                                             }
                                                                             ;
                                                                             });
                                                     }
                                                     
                                                     });

                             ref.child("Pending").on("child_removed", function(data){
                                                     if(data) {
                                                     var user = firebase.database().ref().child("Users").child(data.val());
                                                     user.once("value").then(function(snapshot){
                                                                             //                                console.log(snapshot.val().Name);
                                                                             if(snapshot.val()){
                                                                             delete $scope.pending[snapshot.val().ID];
                                                                             //      console.log($scope.member);
                                                                              $scope.$apply();
                                                                             }
                                                                            
                                                                             });
                                                     }
                                                     
                                                     });
                             
                             ref.child("Invitation").on("child_removed", function(data){
                                                     if(data) {
                                                     var user = firebase.database().ref().child("Users").child(data.val());
                                                     user.once("value").then(function(snapshot){
                                                                             //                                console.log(snapshot.val().Name);
                                                                             if(snapshot.val()){
                                                                             delete $scope.invitation[snapshot.val().ID];
                                                                             //      console.log($scope.member);
                                                                             $scope.$apply();
                                                                             }
                                                                             
                                                                             });
                                                     }
                                                     
                                                     });
                             
                             ref.child("Introduction").once("value").then(function(snapshot){
                                                                          if(snapshot) {
                                                                          $scope.introduction = snapshot.val(); }
                                                                           $scope.$apply();
                                                                          });
                             
                             
                             
                             
                             
                             
});












