var navh, sh, sideNavh, sideNavAh;
$(window).resize(function () {
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
    //.updateProfileView class hidden at first
    $(".updateProfileView").hide();
    //Formatting with jQuery
    $(window).trigger('resize');
    //"Update Profile" button click event will toggle the view
    $("#updateProfile").click(function () {
        $(".profileView").hide();
        $(".updateProfileView").show();
    });
});
