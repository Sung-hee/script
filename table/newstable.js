var getParam = function(key){
    var _parammap = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        _parammap[decode(arguments[1])] = decode(arguments[2]);
    });

    return _parammap[key];
};

var companycode = getParam("name");


$(document).ready(function(){
  $.getJSON('http://13.125.147.26/phps/newsNowJ?name=' + companycode, function(data){
    var json_data = '';

    json_data += '<tbody>'
    $.each(data, function(key, value){
      json_data += "<tr>";
      json_data += "<td id='create_frame'><a href='http://m.stock.naver.com/item/main.nhn#/stocks/"+value.code+"/news/"+value.article_id+"/office/"+value.office_id+"' style='color: black' target='test' onclick='hideiframe()'>";
      json_data += "<div class='d-flex w-100 justify-content-between'>";
      json_data += "<p class='mb-1 text-truncate' style='letter-spacing: -0.3px; white-space: normal;'>" + value.title + "</p>";
      json_data += "</div>";
      json_data += "<small class='text-muted'>" + value.press + " / " + value.wdate + "</small>";
      json_data += '</td>';
      json_data += '</tr>';
    });
    json_data += '</tbody>'
    $('#news_table').append(json_data);
  });
});

function hideiframe(){
  document.querySelector('.newsIframe').style.display = "block";
  var $container = $('body');
  var $scrollTo = $('.newsIframe');
  $container.scrollTop(
      $scrollTo.offset().top
  );
  return false;
}
