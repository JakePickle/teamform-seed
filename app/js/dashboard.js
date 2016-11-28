var navh, sh, sideNavh, sideNavAh;
$(window).resize(function () {
    // Formatting with jQuery
    navh = $(".navbar").innerHeight();
    sh = $(window).height();
    var remainH = Math.max(sh - navh, 512);
    sideNavh = remainH / 5;
    sideNavAh = $(".sideNav a:last").height();
    $(".setMargin").css("margin-top", navh);
    $(".setMargin").css("height", remainH);
    $(".sideNav").css("height", sideNavh);
    $("#profilePic a").css("height", sideNavh);
    $(".sideNav a").css("padding-top", (sideNavh - sideNavAh) / 2);
});
$(window).trigger('resize');

$(document).ready(function () {
    // Default hidden classes
    $(".updateProfileView").hide();
    $(".searchResultView").hide();
    $(".outboxView").hide();
    $(".createEventView").hide();
    $(".updateTeamInfoView").hide();
    $(".updateEventInfoView").hide();

    // Formatting with jQuery
    $(window).trigger('resize');

    // click functions that toggle the view
    // toggle the dashboard view
    $("#updateProfile").click(function () {
        $(".profileView").hide();
        $(".updateProfileView").show();
    });
    // toggle the explore view
    $("#searchButton").click(function(){
        $(".recommendationView").hide();
        $(".searchResultView").show();
    });

    // toggle the message view
    $("#inboxButton").click(function(){
        $("#inboxButton").attr("class", "active");
        $("#outboxButton").attr("class", "");
        $(".outboxView").hide();
        $(".inboxView").show();
    });
    $("#outboxButton").click(function(){
        $("#inboxButton").attr("class", "");
        $("#outboxButton").attr("class", "active");
        $(".inboxView").hide();
        $(".outboxView").show();
    });
    $(".inboxView .messageBrief").click(function(){
        $(".inboxView .messageBrief.active").attr("class", "messageBrief");
        $(this).attr("class", "messageBrief active");
    });
    $(".outboxView .messageBrief").click(function(){
        $(".outboxView .messageBrief.active").attr("class", "messageBrief");
        $(this).attr("class", "messageBrief active");
    });
    // toggle the event view
    $("#createNewEvent").click(function(){
        $(".eventView").hide();
        $(".createEventView").show();
    });
    // toggle the team management view
    $("#updateTeamInfo").click(function() {
        $(".teamInfoView").hide();
        $(".updateTeamInfoView").show();
    });
    $("#updateEventInfo").click(function() {
        $(".eventInfoView").hide();
        $(".updateEventInfoView").show();
    });
    $(".fa-times").click(function() {
        $(this).parent().hide();
    });
});


var dashboardApp = angular.module('teamform-dashboard-app', ['firebase']);

dashboardApp.controller('DashboardCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

    initializeFirebase();
    uid = getCookie("uid");

    $scope.username;
    $scope.email;
    $scope.photoUrl;
    $scope.gender;
    $scope.birthday;
    $scope.birthdayString;
    $scope.languages;
    $scope.education;
    $scope.skills
    $scope.skillsRaw;
    $scope.intoduction;
    $scope.intoductionRaw;

    //////////////////////////////////////////////////////////////SCOPE FUNCTIONS

    $scope.loadFunc = function() {
        if(uid != "")
        {
            var refPath = "Users/" + getURLParameter("q") + uid;
            retrieveOnceFirebase(firebase, refPath, function(data) {

                if ( data.child("Name").val() != null ) {
                    $scope.username = data.child("Name").val();
                } else {
                    $scope.username = "";
                }

                if ( data.child("Email").val() != null ) {
                    $scope.email = data.child("Email").val();
                } else {
                    $scope.email = "";
                }

                if ( data.child("Gender").val() != null ) {
                    $scope.gender = data.child("Gender").val();
                } else {
                    $scope.gender = "";
                }

                if ( data.child("Birthday").val() != null ) {
                    $scope.birthday = data.child("Birthday").val();
                    birthDate = new Date($scope.birthday);
                    $scope.birthdayString = birthDate.toDateString();
                } else {
                    $scope.birthday = "";
                }

                if ( data.child("Languages").val() != null ) {
                    $scope.languagesRaw = data.child("Languages").val();
                    var temp = "";
                    temp += $scope.languagesRaw;
                    temp = temp.replace("[","");
                    temp = temp.replace(",",", ");
                    $scope.languages = temp.replace("\"","");
                } else {
                    $scope.languages = "";
                }

                if ( data.child("Country").val() != null ) {
                    $scope.country = data.child("Country").val();
                } else {
                    $scope.country = "";
                }

                if ( data.child("City").val() != null ) {
                    $scope.city = data.child("City").val();
                } else {
                    $scope.city = "";
                }

                if ( data.child("Education").val() != null ) {
                    $scope.education = data.child("Education").val();
                } else {
                    $scope.education = "";
                }

                if ( data.child("Skills").val() != null ) {
                    $scope.skillsRaw = data.child("Skills").val();
                    var temp = "";
                    temp += $scope.skillsRaw;
                    temp = temp.replace("[","");
                    temp = temp.replace(",",", ");
                    $scope.skills = temp.replace("\"","");
                } else {
                    $scope.skills = "";
                }

                if ( data.child("Introduction").val() != null ) {
                    $scope.introduction = data.child("Introduction").val();
                } else {
                    $scope.introduction = "";
                }

                $scope.$apply();
            });
        }
    }

    $scope.UpdateUser = function()
    {
        var userInfo = {};
        userInfo.Name = $scope.username;
        userInfo.Email = $scope.email;

        birthDate = new Date($scope.birthdayString);
        $scope.birthday = birthDate.getTime();
        userInfo.Birthday = $scope.birthday;

        userInfo.Languages = $scope.languages;
        userInfo.Country = $scope.country;
        userInfo.City = $scope.city;
        userInfo.Skills = $scope.skills;
        userInfo.Introduction = $scope.introduction;
        userInfo.Gender = $scope.gender;
        userInfo.Education = $scope.education;



        var refPath = "Users/" + getURLParameter("q") + uid;
        var ref = firebase.database().ref(refPath);

        ref.set(userInfo, function(){
            window.location.href= "dashboard.html";
        }).catch(function(error) {
            console.log(error);
        });
    }

    //////////////////////////////////////////////////END FUNCTIONS

    $scope.loadFunc();


}]);

// Frontend Validation Functions
// validate username
dashboardApp.directive('usernameDirective', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function usernameValidation(value) {
                if (value.length >= 5 && value.length <= 20 && /^[a-zA-Z0-9-_]*$/.test(value)) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(usernameValidation);
        }
    };
});
// validate city
dashboardApp.directive('cityDirective', function() {
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
// validate introduction
dashboardApp.directive('introductionDirective', function() {
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
