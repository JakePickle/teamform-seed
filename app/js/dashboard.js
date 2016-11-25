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

angular.module('teamform-dashboard-app', ['firebase'])
.controller('DashboardCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

    initializeFirebase();

    //////////////////////////////////////////////////////////////SCOPE FUNCTIONS

    $scope.loadFunc = function() {
        if($scope.uid != "")
        {
            var refPath = "Users/" + getURLParameter("q") + $scope.uid;
            retrieveOnceFirebase(firebase, refPath, function(data) {
                                
                if ( data.child("name").val() != null ) {
                    $scope.username = data.child("name").val();
                } else {
                    $scope.username = "";
                }

                if ( data.child("email").val() != null ) {
                    $scope.email = data.child("email").val();
                } else {
                    $scope.email = "";
                }

                if ( data.child("gender").val() != null ) {
                    $scope.gender = data.child("gender").val();
                } else {
                    $scope.gender = "";
                }

                if ( data.child("birthday").val() != null ) {
                    $scope.birthday = data.child("birthday").val();
                } else {
                    $scope.birthday = "";
                }

                if ( data.child("languages").val() != null ) {
                    $scope.languages = data.child("languages").val();
                } else {
                    $scope.languages = "";
                }

                if ( data.child("country").val() != null ) {
                    $scope.country = data.child("country").val();
                } else {
                    $scope.country = "";
                }

                if ( data.child("city").val() != null ) {
                    $scope.city = data.child("city").val();
                } else {
                    $scope.city = "";
                }

                if ( data.child("education").val() != null ) {
                    $scope.education = data.child("education").val();
                } else {
                    $scope.education = "";
                }

                if ( data.child("skills").val() != null ) {
                    $scope.skills = data.child("skills").val();
                } else {
                    $scope.skills = "";
                }

                if ( data.child("introduction").val() != null ) {
                    $scope.introduction = data.child("introduction").val();
                } else {
                    $scope.introduction = "";
                }

                $scope.$apply();
            });
        }  
    }

    $scope.UpdateUser = function()
    {
        var userInfo;
        userInfo.Name = username;
        userInfo.Email = email;
        userInfo.Gender = gender;
        userInfo.Birthday = birthday;
        userInfo.Languages = languages;
        userInfo.Country = country;
        userInfo.City = city;
        userInfo.Education = education;
        userInfo.Skills = skills;
        userInfo.Introduction = introduction;
            
        var refPath = "Users/" + getURLParameter("q") + $scope.uid;  
        var ref = firebase.database().ref(refPath);
        
        ref.set(userInfo, function(){
            window.location.href= "dashboard.html";
        }).catch(function(error) {
            console.log(error);
        });
    }

    //////////////////////////////////////////////////END FUNCTIONS

    uid = getCookie("uid");

    $scope.username;
    $scope.email;
    $scope.photoUrl;
    $scope.gender;
    $scope.birthday;
    $scope.languages;
    $scope.education;
    $scope.skills
    $scope.intoduction;

    $scope.loadFunc();


}]);

