// variable declaration
var navh = $(".navbar").innerHeight();

$(document).ready(function(){
  // set margin-top of the height of navigation bar
  // so that the navigation bar opacity will not be affected by different
  // opacities of the headline section
  $(".headline").css("margin-top", navh);
  $(".connect").css("margin-top", navh);
});
