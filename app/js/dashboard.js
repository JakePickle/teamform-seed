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
