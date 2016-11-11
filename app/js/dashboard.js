var navh = $(".navbar").innerHeight();
var sh = screen.availHeight;
var sideNavh = (sh-navh)/5;
var sideNavAh = $(".sideNav a:last").height();

$(document).ready(function(){
    //.updateProfileView class hidden at first
    $(".updateProfileView").hide();
    $(".searchResultView").hide();
    //Formatting with jQuery
    $(".setMargin").css("margin-top", navh);
    $(".setMargin").css("height", sh-navh);
    $(".sideNav").css("height", sideNavh);
    $("#profilePic a").css("height", sideNavh);
    $(".sideNav a").css("padding-top", (sideNavh-sideNavAh)/2);
    //"Update Profile" button click event will toggle the view
    $("#updateProfile").click(function(){
        $(".profileView").hide();
        $(".updateProfileView").show();
    });
    $("#searchButton").click(function(){
        $(".recommendationView").hide();
        $(".searchResultView").show();
    });
});
