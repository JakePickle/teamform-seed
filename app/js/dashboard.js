var navh, sh, sideNavh, sideNavAh;
//Formatting with jQuery
$(window).resize(function() {
    navh = $(".navbar").innerHeight();
    sh = $(window).height();
    sideNavh = (sh - navh) / 5;
    sideNavAh = $(".sideNav a:last").height();
    $(".setMargin").css("margin-top", navh);
    $(".setMargin").css("height", sh - navh);
    $(".sideNav").css("height", sideNavh);
    $("#profilePic a").css("height", sideNavh);
    $(".sideNav a").css("padding-top", (sideNavh - sideNavAh) / 2);
});
$(window).trigger('resize');
var app = angular.module("teamform", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "dashboard.html"
        })
        .when("/team", {
            templateUrl: "team.html"
        })
        .when("/event", {
            templateUrl: "event.html"
        })
        .when("/explore", {
            templateUrl: "explore.html"
        })
        .when("/message", {
            templateUrl: "message.html"
        })
        .when("/editProfile", {
            templateUrl: "profileForm.html",
            controller: "updateButtonCtrl"
        })
        .when("/createProfile", {
            templateUrl: "profileForm.html",
            controller: "startCtrl"
        })
});
app.controller("updateButtonCtrl", function($scope) {
    $scope.text = "updateProfileView!";
});
app.controller("startCtrl", function($scope) {
    $scope.text = "Let's start!";
});
function switchPage(page) {
    $("#main .sideNav").removeClass("active");
    switch (page) {
        case "team.html":
            $("#team").addClass("active");
            break;
        case "event.html":
            $("#event").addClass("active");
            break;
        case "explore.html":
            $("#explore").addClass("active");
            break;
        case "message.html":
            $("#message").addClass("active");
            break;
    }
};
function getQueryVariable(param) {
    console.log(window.location.search);
    var params = window.location.search.substring(1).split("&");
    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split("=");
        if (pair[0] == param) return pair[1];
    }
    return false; // Not found
}