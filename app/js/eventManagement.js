initializeFirebase();
// The angular app for event.html
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

// The angular app for eventmanage.html
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

// Frontend Validation Functions
eventApp.directive('eventnameDirective', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function eventnameValidation(value) {
				if (value.length >= 5 && value.length <= 50 && /^[a-zA-Z0-9-_ ]*$/.test(value)) {
					mCtrl.$setValidity('charE', true);
				} else {
					mCtrl.$setValidity('charE', false);
				}
				return value;
			}
			mCtrl.$parsers.push(eventnameValidation);
		}
	};
});
eventApp.directive('cityDirective', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function cityValidation(value) {
				if (value.length > 1 && /^[a-zA-Z ]*$/.test(value)) {
					mCtrl.$setValidity('charE', true);
				} else {
					mCtrl.$setValidity('charE', false);
				}
				return value;
			}
			mCtrl.$parsers.push(cityValidation);
		}
	};
});
eventApp.directive('introductionDirective', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function introductionValidation(value) {
				if (value.length <= 200) {
					mCtrl.$setValidity('charE', true);
				} else {
					mCtrl.$setValidity('charE', false);
				}
				return value;
			}
			mCtrl.$parsers.push(introductionValidation);
		}
	};
});
eventApp.directive('maxDirective', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function maxValidation(value) {
				var mts = parseInt(angular.element("#minTeamSize").val());
				if (parseInt(value) >= mts) {
					mCtrl.$setValidity('charE', true);
				} else {
					mCtrl.$setValidity('charE', false);
				}
				return value;
			}
			mCtrl.$parsers.push(maxValidation);
		}
	};
});
