var eventID = getEventID();


// !!!!!!!!!!!
// For current testing only!
var userID = "nullUPfkVFjyZCfZQjJhsJkc2GD9z1N2";


function getEventID() {
    var path = window.location.href;
    console.log(path);
    var param = path.substr(path.search("#"));
    
    if(param.startsWith("#event/")){
        return param.substr(2 + path.indexOf("/"));
    }
    else return 404;
    
}

var eventInfoApp = angular.module("eventInfo-app", ["firebase"]);

eventInfoApp.filter("keywordString", function() {
        return function(k) {
                    if(k) {
                            var ans = "";
                    for(var i = 0; i < k.length; i++) {
                        if(i > 0) ans +=" ";
                        ans += k[i];
                        if(i != k.length - 1) ans += ',';
                    
                    }
                    return ans;
                    }
                    else return "";
        };
});


eventInfoApp.controller("eventInfo-ctrl", function($scope, $firebaseObject, $firebaseArray) {
                        
                  var ref = firebase.database().ref().child("Events").child(eventID);
                        $scope.data = $firebaseObject(ref);
                        $scope.createTeam = function() {
                        
                        // To check if the event is full
                        if(ref.maxTeamNumber <= ref.child("Participants").length) {
                            alert("The event is full!");
                            return;
                        }
                        
                            // To generate a team id
                            var keys = firebase.database().ref().child("Teams").push();
                        
              
                        
                            // Append the team id to the Event
                            ref.child("Participants").push().set(keys.key.toString());
                            var team = {};
                            team.Name = $scope.teamName;
                            team.ID = keys.key;
                            team.Type = "Team";
                            team.Event = eventID;
                            team.EventName = ref.child("Name").toString();
                            team.Leader = userID;
                            team.Members = [];
                            team.Members.push(userID);
                            // Create a team at the "Teams"
                            keys.set(team);
                        };
                        
                        
                        
                        
                        
                               //console.log($scope.name);
                       // $scope.status = $firebaseObject(ref.child("Status"));
                             //  $scope.time = snapshot.val().Time;
                              // $scope.location = snapshot.val().Location;
                              // $scope.maxTeamNumber = snapshot.val().Requirements.maxTeamNumber;
                              // $scope.keywords = snapshot.val().Keywords;
                              // $scope.maxTeamSize = snapshot.val().Requirements.maxTeamSize;
                             //  $scope.minTeamSize = snapshot.val().Requirements.minTeamSize;
                              // $scope.introduction = snapshot.val().Introduction;
                        
                        
                        
                        
                        
});

