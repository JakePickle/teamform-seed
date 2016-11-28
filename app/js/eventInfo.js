var eventID = getEventID();

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
                        if(ref.maxTeamNumber <= ref.Participants.length) {
                            alert("The event is full!");
                            return;
                        }
                        
                            // To generate a team id
                            var key = firebase.database().ref().child("Teams").push();
                        
                        
                        
                            // Append the team id to the Event
                            ref.child("Participants").push().set(key.key);
                            var team = {};
                            team.Name = $scope.teamName;
                        
                            // Create a team at the "Teams"
                            key.set(team);
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

