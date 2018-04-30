function clearAll(){
  var max = setTimeout(function(){},1);
  for (var i = 1; i <= max ; i++) {
      window.clearInterval(i);
      window.clearTimeout(i);
      if(window.mozCancelAnimationFrame)window.mozCancelAnimationFrame(i); // Firefox
  }
}

var todayThemeUrl = 'http://13.125.147.26/phps/todayThemeJ';

$(document).ready(function(){
  clearAll();

  $.getJSON(todayThemeUrl, function(data){
    $('#index-theme-list').empty();

    var json_data = '';
    var valueRate = '';

    $.each(data, function(key, value){

      if (parseFloat(value.rate) > 0) {
        valueRate = '<font class="text-danger">' + value.rate + 'P</font>';
      }
      else if (parseFloat(value.rate) < 0) {
        valueRate = '<font class="text-primary">' + value.rate + 'P</font>';
      }
      else {
        valueRate = '<font>' + value.rate + '</font>';
      }

      json_data += '<a class="list-group-item list-group-item-action" href="/home/theme?theme=' + value.theme + '">';
      json_data += '<div class="float-right">';
      json_data += valueRate;
      json_data += '</div>';
      json_data += '<div>';
      json_data += value.theme;
      json_data += '</div>';
      json_data += '</a>';

      return key < 4;
    });
    $('#index-theme-list').append(json_data);
  });
});
