var navh = $(".navbar").innerHeight();
var a = null;
$(document).ready(function () {
  // set margin-top of the height of navigation bar
  // so that the navigation bar opacity will not be affected by different opacities of the headline section
  $(".headline").css("margin-top", navh);
  $(".connect").css("margin-top", navh);
  // in mobile view, no above issue
  $(".mobileView .connect").css("margin-top", 0);
  // smooth scrolling
  $(".navbar a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {
        window.location.hash = hash;
      });
    }
  });
});

angular.module('teamform-index-app', ['firebase', 'ionic', 'ionic.cloud'])
  .config(function ($ionicCloudProvider) {
    $ionicCloudProvider.init({
      "core": {
        "app_id": "41813e6e"
      },
      "push": {
        "sender_id": "622320647090",
        "pluginConfig": {
          "ios": {
            "badge": true,
            "sound": true
          },
          "android": {
            "iconColor": "#00ff00"
          }
        }
      }
    });
  })
  .controller('IndexCtrl', ['$scope', '$ionicPush', '$firebaseObject', '$firebaseArray', '$interval', '$timeout', '$http',
    function ($scope, $ionicPush, $firebaseObject, $firebaseArray, $interval, $timeout, $http) {
      $scope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + '\n' + msg.text);
      });
      //initializeFirebase();
      var user;
      $scope.username = "";
      $scope.email = "";
      $scope.photoUrl = "";
      $scope.uid = "";
      $scope.authenticate = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        document.cookie = "authAttempt=1";
        firebase.auth().signInWithRedirect(provider);
      }
      $scope.getInfo = function () {
        firebase.auth().getRedirectResult().then(function (result) {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
          }
          // The signed-in user info.
          user = result.user;
          if (user != null) {
            $scope.username = user.displayName;
            $scope.email = user.email;
            $scope.photoUrl = user.photoURL;
            $scope.uid = user.uid;
            document.cookie = "uid=" + user.uid;
          }
          $scope.saveFunc();
        }).catch(function (error) {
          //TODO: Handel Errors
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      }
      $scope.saveFunc = function () {
        var userName = $.trim($scope.username);
        var Email = $.trim($scope.email);
        var PhotoUrl = $.trim($scope.photoUrl);
        if (userName !== '') {
          var newData = {
            'name': userName,
            'email': Email,
            'photoUrl': PhotoUrl
          };
          var refPath = "Users/" + getURLParameter("q") + $scope.uid;
          var ref = firebase.database().ref(refPath);
          ref.set(newData, function () {
            // complete call back
            //alert("data pushed...");
            // Finally, go back to the front-end
            window.location.href = "profile.html";
          });
        }
      }
      if (getCookie("authAttempt") != "") {
        $interval($scope.getInfo(), 1000, 4);
        $scope.saveFunc();
      }
      // Code that if a path on Firebase is updated, a push notification will be sent automatically
      // TODO change the database path
      var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZTZiNmVkNC0xM2UxLTRlZDEtYWQxZi02OWYxODhmZWE5MGMifQ.4rO2w0H6xHgPnb5FK6yD4TWyZHFe3r45CR-WeT-t-ik'
      var starCountRef = firebase.database().ref('Users');
      starCountRef.on('value', function (snapshot) {
        console.log(snapshot);
        console.log(a);
        if (a != null) {
          var options = {
            method: 'POST',
            url: 'https://api.ionic.io/push/notifications',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
            data: {
              "tokens": [a],
              "profile": "dev",
              "notification": {
                "message": "Firebase updated, Please check"
              }
            }
          };
          console.log(options);
          $http(options).then(function (response) {
            console.log(response);
          }, function (response) {
            console.error(response);
          });
        }
      });
    }])
  .run(function ($ionicPlatform, $ionicPush) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      $ionicPush.register().then(function (t) {
        return $ionicPush.saveToken(t);
      }).then(function (t) {
        console.log('Token saved:', t.token);
        a = t.token;
      });
    });
  });