$(document).ready(function(){
  var query = "https://query.yahooapis.com/v1/public/yql?q=select%20title%2C%20link%2C%20description%2C%20pubDate%20from%20rss%20where%20url%20%3D%20'http%3A%2F%2Fwww.lianatech.com%2Fnews%2Fall-news.rss'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

  $.getJSON(query, function(res) {
        $("#news a").each(function(i){
          var time = new Date(res.query.results.item[i].pubDate);
          var date = time.getDate()+"."+(time.getMonth()+1)+"."+time.getFullYear();
          $(this).attr("href",res.query.results.item[i].link);
          $(this).find(".time").html(date);
          $(this).find(".text").html(res.query.results.item[i].title);
        });
    }, "jsonp");
  $(".menubutton").click(function(){
    $(this).toggleClass("active");
    $(".menucontent").toggleClass("menuactive");
  });
  $(window).scroll(function(){
    if ($("body").scrollTop()>=$(".header").offset().top+$(".header").height()){
      $("nav").addClass("fixnav");
    }
    else{
      $("nav").removeClass("fixnav");
    }
    var position = (50 - ($("body").scrollTop()/6))+"%"
    $("#welcome").css({
      backgroundPositionY: position
    })
  });
  $("#more").click(function(e){
    e.preventDefault();
    $("html,body").animate({
      scrollTop: $($(this).attr("href")).offset().top
    });
  });
  $("#subscription").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
			$.ajax({
				url: "filethathandlesuseradding.php",
				type: 'POST',
				data: formData,
				contentType: false,
				cache: false,
				processData:false
			});
    $(".thankyou").slideDown(300).delay(2000).slideUp(300);
  });
  increaseNumbers($("#clients div h2"), 500, 3000);
  increaseNumbers($("#employees div h2"), 500, 180);
  increaseNumbers($("#users div h2"), 500, 10000);
});

function increaseNumbers(el, time, val){
  var count = 0;
  var jump = 5;
  var digits = val.toString().length;
  var increase = Math.round(val/(time/5));
  if (!increase){
    increase = 1;
    jump = val/time;
  }
  var inter=setInterval(function(){
    el.html(addZeros(count, digits));
    count+=increase;
    if(count>=val){
      count=val;
      el.html(count);
      clearInterval(inter);
    }
  },jump);
}
function addZeros(num, digits){
  if (num.toString().length>=digits){
    return num;
  }
  else{
    var res = num.toString();
    while (res.length<digits){
      res="0"+res;
    }
    return res;
  }
}
