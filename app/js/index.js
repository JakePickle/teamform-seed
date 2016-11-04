$(document).ready(function(){
  var w = screen.availWidth;
  var h = screen.availHeight;
  var ww = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  var wh = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  var h1h = $(".headline h1").outerHeight(true);
  var ph = $(".headline p").outerHeight(true);
  var navh = $(".navbar").innerHeight();
  //$(".carousel img").css("height", h);
  //$(".carousel img").css("width", w);
  $(".headline h1").css("padding-top", wh/2-h1h-navh/2-ph);
  $(".headline").css("margin-top", navh).css("height", h-navh);
  $(".buttonline").css("margin-top", navh).css("height", h-navh);
  //$(".transparent").css("height", navh);
  $(window).scroll(function() {
    if ($(document).scrollTop() > wh/2-h1h-navh/2-ph) {
      $(".navbar").css("background","black");
     // $(".navbar li:hover").css("background", "#333");
      //$(".navbar-nav li.active").css("background", "#333");
    }
    else {
      $(".navbar").css("background","rgba(0, 0, 0, 0.2)");
      //$(".navbar li:hover").css("background", "rgba(0, 0, 0, 0.4)");
      //$(".navbar-nav li.active").css("background", "rgba(0, 0, 0, 0.4)");
    }
  });
  $(".buttonblock").css("padding-top", wh/2-h1h-navh/2-ph);
  var tw = $(".tuto").width();
  var th = $(".tuto").height();
  $("iframe").attr("width", 0.8*tw).attr("height", 0.45*tw);
  $(".fill").css("height", $(".tuto").outerHeight());
/*    $("#btn_admin").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "admin.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_leader").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "team.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_member").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "member.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });
*/

});
