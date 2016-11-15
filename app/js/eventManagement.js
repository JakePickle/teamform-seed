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
		
		console.log(createEventJSON($scope));
		var json = createEventJSON($scope);
		//JSON.parse(json);
		//console.log(json.Name);
		list.$add(json).then(function(ref) {
  		var eventID = ref.key;
  		console.log("added record with id " + eventID);
  		//list.$indexFor(id); // returns location in the array 
  		});
	};

}); 

function createEventJSON($scope) {


	var event = {};
	event["Name"] = wrapJSON($scope.eventName);
	var time = {};
	time["Date"] = wrapJSON($scope.date.toString());
	time["Time"] = wrapJSON($scope.time.toString());
	event["Time"] = time;
	event["Type"] = wrapJSON("Event");

	var location = {};
	location["Country"] = wrapJSON($scope.country);
	location["City"] = wrapJSON($scope.city);
	event["Location"] = location;

	event["Status"] = "open";

	var requirements = {};
	requirements["maxTeamNumber"] = wrapJSON($scope.maxTeamNumber);
	requirements["maxTeamSize"] = wrapJSON($scope.maxTeamSize);
	requirements["minTeamSize"] = wrapJSON($scope.minTeamSize);
	event["Requirements"] = requirements;

	event["Keywords"] = getKeywords($scope.keywords);
	event["Introduction"] = wrapJSON($scope.introduction);

	
	return event;
}

function getKeywords(str) {
	return str.split(",");
}

function wrapJSON(str) {
	if(str)
		return str;
	else return '"' + '"';
}

var eventManageApp = angular.module("teamform-event-manage-app", ["firebase"]);

//For current testing only
//
var EventId = "evtID1";
eventManageApp.controller("team-valid-team-ctrl", function($scope, $firebaseArray) {
	var ref = firebase.database().ref("Events").child(EventId).child("Participants");

	$scope.validTeams = $firebaseArray(ref);

	
});
