var navh, sh, sideNavh, sideNavAh;
//Formatting with jQuery
$(window).resize(function() {
    navh = $(".navbar").innerHeight();
    sh = $(window).height();//screen.availHeight;
    sideNavh = (sh - navh) / 5;
    sideNavAh = $(".sideNav a:last").height();
    $(".setMargin").css("margin-top", navh);
    $(".setMargin").css("height", sh - navh);
    $(".sideNav").css("height", sideNavh);
    $("#profilePic a").css("height", sideNavh);
    $(".sideNav a").css("padding-top", (sideNavh - sideNavAh) / 2);
});
$(window).trigger('resize');