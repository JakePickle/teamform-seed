initializeFirebase();
var eventApp = angular.module("teamform-event-app", ["firebase"]);

eventApp.controller("event-display-ctrl", function($scope, $firebaseArray) {
	var ref = firebase.database().ref("Events");
	$scope.events = $firebaseArray(ref);
	
});

eventApp.controller("teamform-create-event-ctrl", function($scope, $firebaseArray) {
	$scope.createNewEvent = function() {
		var ref = firebase.database().ref().child("Events");
		var list = $firebaseArray(ref);
		var eventID;

		var eventObj = {};
		eventObj.Type = "Event";
		eventObj.Name = $scope.eventName;
		eventObj.Time = combineDateTime($scope.date, $scope.time).getTime();
		eventObj.Location = {
			"Country": $scope.country,
			"City": $scope.city
		}
		eventObj.Status = "open";
		eventObj.Requirements = {
			"maxTeamNumber": $scope.maxTeamNumber,
			"maxTeamSize": $scope.maxTeamSize,
			"minTeamSize": $scope.minTeamSize
		};
		eventObj.Keywords = search.extractWord($scope.keywords);
		eventObj.Introduction = $scope.introduction;

		list.$add(eventObj).then(function(eventRef) {
			search.indexNewEvent(eventObj, eventRef);
  		});
	};

}); 

function combineDateTime(date, time) {
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	return new Date(year, month, day, hour, minute);
}

var eventManageApp = angular.module("teamform-event-manage-app", ["firebase"]);

//For current testing only
//
var EventId = "evtID1";
eventManageApp.controller("team-valid-team-ctrl", function($scope, $firebaseArray) {
	var ref = firebase.database().ref("Events").child(EventId).child("Participants");

	$scope.validTeams = $firebaseArray(ref);

	
});

eventManageApp.controller("team-pending-team-ctrl", function($scope, $firebaseArray) {
	var ref = firebase.database().ref("Events").child(EventId).child("WaitingParticipants");

	$scope.pendingTeams = $firebaseArray(ref);

	
});








