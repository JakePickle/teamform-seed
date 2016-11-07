var navh = $(".navbar").innerHeight();
var sh = screen.availHeight;
var sideNavh = (sh-navh)/5;
var sideNavAh = $(".sideNav a:last").height();

$(document).ready(function(){
    //Formatting with jQuery
    $(".setMargin").css("margin-top", navh);
    $(".setMargin").css("height", sh-navh);
    $(".sideNav").css("height", sideNavh);
    $(".sideNav a").css("padding-top", (sideNavh-sideNavAh)/2);
});
