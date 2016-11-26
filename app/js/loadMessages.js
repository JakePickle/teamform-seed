 /*// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGA1xMB_cjAf1pEKyROtcMkLjtTbpjxis",
    authDomain: "comp3111hproj.firebaseapp.com",
    databaseURL: "https://comp3111hproj.firebaseio.com",
    storageBucket: "comp3111hproj.appspot.com",
    messagingSenderId: "622320647090"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


  //Test. To be modified later.
  var UserID = "nullUPfkVFjyZCfZQjJhsJkc2GD9z1N2";
  var mesRef = getDatabaseMessages(UserID);
  var app = angular.module("teamform-messages-app", ["firebase"]);

 // To find the location of messages.
  function getDatabaseMessages(User_id) {
	return database.ref().child("Users").child(UserID);
  }	*/

/*app.controller("teamform-messages-ctrl", function($scope, $firebaseArray) {
	//var ref = 0;//new firebase.database().ref("https://comp3111hproj.firebaseio.com/Users/" + UserID +"/Inbox");


	$scope.inbox = $firebaseArray(mesRef.child("Inbox"));


	//var refer = 0;//new Firebase("https://comp3111hproj.firebaseio.com/Users/" + UserID +"/Outbox");
	$scope.outbox = $firebaseArray(mesRef.child("Outbox"));


});*/

angular.module('teamform-message-app', ['firebase'])
.controller('MessageCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

  initializeFirebase();

  uid = getCookie("uid");

  $scope.inbox;
  $scope.outbox;

  $scope.currentTime;
  $scope.currentFrom;
  $scope.currentTo;
  $scope.currentTitle;
  $scope.currentContent;

  $scope.loadFunc = function() {
        if($scope.uid != "")
        {
            var refPath = "Users/" + getURLParameter("q") + uid;
            retrieveOnceFirebase(firebase, refPath, function(data) {

                if ( data.child("Inbox").val() != null ) {
                    $scope.inbox = data.child("Inbox").val();
                } else {
                    $scope.inbox = "";
                }

                if ( data.child("Outbox").val() != null ) {
                    $scope.outbox = data.child("Outbox").val();
                } else {
                    $scope.outbox = "";
                }

                $scope.$apply();
            });
        }
    }

    $scope.displayMessage = function(id){
      var message;

      if($scope.uid != "")
      {
        var refPath = "Users/" + getURLParameter("q") + uid;
        retrieveOnceFirebase(firebase, refPath, function(data) {
          if ( data.child("Inbox").val() != null ) {
            message = data.child("Inbox").child(id).val();
          } else {
            message = "";
          }
          $scope.$apply();
        });
      }

      $scope.currentTime = id;
      $scope.currentFrom = "test";
      $scope.currentTo = "test";
      $scope.currentTitle = message.Title;
      $scope.currentContent = $scope.inbox;
    }

    $scope.loadFunc();


}]);
