var url = "http://13.125.147.26/phps/indexNowJ"

$.getJSON(url, function(data){
  var korea = '';

  $.each(data[0]['001'], function(key, value){
       if(value.cuteTriangle.charAt(0) == '▲'){
         korea += "<span style='font-size:1.0em; color:black;'>코스피</span> <span style='font-size:1.3em; color:red;'>"+value.now+"</span> <span style='color:red; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else if(value.cuteTriangle.charAt(0) == '▼'){
         korea += "<span style='font-size:1.0em; color:black;'>코스피</span> <span style='font-size:1.3em; color:blue;'>"+value.now+"</span> <span style='color:blue; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else {
         korea += "<span style='font-size:1.0em; color:black;'>코스피</span> <span style='font-size:1.3em; color:black;'>"+value.now+"</span> <span style='color:black; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
     });

     $.each(data[29]['101'], function(key, value){
       if(value.cuteTriangle.charAt(0) == '▲'){
         korea += "<span style='font-size:1.0em; color:black;'>코스닥</span> <span style='font-size:1.3em; color:red;'>"+value.now+"</span> <span style='color:red; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else if(value.cuteTriangle.charAt(0) == '▼'){
         korea += "<span style='font-size:1.0em; color:black;'>코스닥</span> <span style='font-size:1.3em; color:blue;'>"+value.now+"</span> <span style='color:blue; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else {
         korea += "<span style='font-size:1.0em; color:black;'>코스닥</span> <span style='font-size:1.3em; color:black;'>"+value.now+"</span> <span style='color:black; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
     });
  $('#korea_data').html(korea);
});

$(document).ready(function(){
  var koreaInterval = setInterval(koreaAjax, 5000);
});

function koreaAjax(){
  $.ajax({
    url: 'http://13.125.147.26/phps/indexNowJ',
    type: "GET",
    dataType: "json",
    async: true,
    success: function(data){
      var korea ='';
      $.each(data[0]['001'], function(key, value){
       if(value.cuteTriangle.charAt(0) == '▲'){
         korea += "<span style='font-size:1.0em; color:black;'>코스피</span> <span style='font-size:1.3em; color:red;'>"+value.now+"</span> <span style='color:red; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else if(value.cuteTriangle.charAt(0) == '▼'){
         korea += "<span style='font-size:1.0em; color:black;'>코스피</span> <span style='font-size:1.3em; color:blue;'>"+value.now+"</span> <span style='color:blue; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else {
         korea += "<span style='font-size:1.0em; color:black;'>코스피</span> <span style='font-size:1.3em; color:black;'>"+value.now+"</span> <span style='color:black; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
     });

     $.each(data[29]['101'], function(key, value){
       if(value.cuteTriangle.charAt(0) == '▲'){
         korea += "<span style='font-size:1.0em; color:black;'>코스닥</span> <span style='font-size:1.3em; color:red;'>"+value.now+"</span> <span style='color:red; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else if(value.cuteTriangle.charAt(0) == '▼'){
         korea += "<span style='font-size:1.0em; color:black;'>코스닥</span> <span style='font-size:1.3em; color:blue;'>"+value.now+"</span> <span style='color:blue; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
       else {
         korea += "<span style='font-size:1.0em; color:black;'>코스닥</span> <span style='font-size:1.3em; color:black;'>"+value.now+"</span> <span style='color:black; font-size:0.8em;'> ( "+ value.pok + " " + value.cuteTriangle + " " + value.rate+" ) </span></br>";
       }
     });
      $('#korea_data').html(korea);
    }
  });
  console.log("ajax호출");
}
