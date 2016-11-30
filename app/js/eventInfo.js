var eventID = getEventID();


// !!!!!!!!!!!
// For current testing only!
var userID = "nullUPfkVFjyZCfZQjJhsJkc2GD9z1N2";


function getEventID() {
	var path = window.location.href;
	console.log(path);
	var param = path.substr(path.search("#"));

	if (param.startsWith("#event/")) {
		return param.substr(2 + path.indexOf("/"));
	}
	else return "-KXo6G-hNB0lnl3N8uBf";

}

var eventInfoApp = angular.module("eventInfo-app", ["firebase"]);

eventInfoApp.filter("keywordString", function () {
	return function (k) {
		if (k) {
			var ans = "";
			for (var i = 0; i < k.length; i++) {
				if (i > 0) ans += " ";
				ans += k[i];
				if (i != k.length - 1) ans += ',';

			}
			return ans;
		}
		else return "";
	};
});

var Team, TeamRef;
eventInfoApp.controller("eventInfo-ctrl", function ($scope, $firebaseObject, $firebaseArray) {

	var ref = firebase.database().ref().child("Events").child(eventID);
	$scope.data = $firebaseObject(ref);
	$scope.createTeam = function () {
		firebase.database().ref(`/Events/${eventID}`).once("value").then(function(evtSnapShot) {
            var eventValue = evtSnapShot.val();
            if(eventValue.Participants && eventValue.maxTeamNumber <= eventValue.Participants.length) {
				alert("The event is full!");
				return;
			}

			var teamRef = firebase.database().ref("Teams").push();
			var team = {
				Name: $scope.teamName,
				ID: teamRef.key,
				Type: "Team",
				Event: evtSnapShot.ref.key,
				EventName: eventValue.Name,
				Leader: userID,
				Members: [userID]
			};
			evtSnapShot.ref.child("Participants").push(teamRef.key);
			teamRef.set(team);
			var search = new Search();
			search.indexNewTeam(team, teamRef);
			Team = team;
			TeamRef = teamRef;
        });
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

