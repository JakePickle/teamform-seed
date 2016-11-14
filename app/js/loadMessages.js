var UserID="nullUPfkVFjyZCfZQjJhsJkc2GD9z1N2";

var app = angular.module("teamform-messages-app", ["firebase"]);

app.controller("teamform-messages-ctrl", function($scope, $firebaseArray) {
	var ref = new Firebase("https://comp3111hproj.firebaseio.com/Users/" + UserID +"/Inbox");

	$scope.inbox = $firebaseArray(ref);


	var refer = new Firebase("https://comp3111hproj.firebaseio.com/Users/" + UserID +"/Outbox");
	$scope.outbox = $firebaseArray(refer);


});