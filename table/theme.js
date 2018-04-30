function clearAll(){
  var max = setTimeout(function(){},1);
  for (var i = 1; i <= max ; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
    if(window.mozCancelAnimationFrame)window.mozCancelAnimationFrame(i); // Firefox
  }
}

function getParams(paramUrl){
  var _tempUrl = window.location.search.substring(1);
  var _tempArray = _tempUrl.split('&');

  for(var i = 0; i < _tempArray.length; i++){
    var _keyValuePair = _tempArray[i].split('=');

    if(_keyValuePair[0] == paramUrl){
      return _keyValuePair[1];
    }
  }
}

function pxToRem(px){
  return px / 16;
}

var theme = getParams('theme');
var stock = getParams('stock');
var todayThemeUrl = 'http://13.125.147.26/phps/todayThemeJ';
var themeUrl = 'http://13.125.147.26/phps/themeNowJ';
var stockUrl = 'http://13.125.147.26/phps/elementNowJ';
var re = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\(\=]/gi;
var deTheme = decodeURIComponent(theme);
var deStock = decodeURIComponent(stock);
var deThemeStr = deTheme.replace(re, "");
var deStockStr = deStock.replace(re, "");

$(document).ready(function(){
  $.ajax({
    url: todayThemeUrl,
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data){
      $('#today-theme-list').empty();

      var json_data = '';
      var valueRate = '';
  
      $.each(data, function(key, value){
        var valueThemeStr = value.theme.replace(re, "");
        
        if (parseFloat(value.rate) > 0) {
          valueRate = '<font class="text-danger">' + value.rate + '</font>';
        }
        else if (parseFloat(value.rate) < 0) {
          valueRate = '<font class="text-primary">' + value.rate + '</font>';
        }
        else {
          valueRate = '<font>' + value.rate + '</font>';
        }
  
        if (deThemeStr == valueThemeStr){
          json_data += '<a class="list-group-item list-group-item-action active" href="/home/themeStock?theme=' + value.theme + '">';
        }
        else {
          json_data += '<a class="list-group-item list-group-item-action" href="/home/themeStock?theme=' + value.theme + '">';
        }
  
        json_data += '<div class="float-right">';
        json_data += valueRate;
        json_data += '</div>';
        json_data += '<div>';
        json_data += value.theme;
        json_data += '</div>';
        json_data += '</a>';
  
        return key < 4;
      });
      $('#today-theme-list').append(json_data);
      var themeListHeight = pxToRem($(document).height() - $('#hot-theme').height() - $('#mainNav').height() - 100);
      $('#theme-list').css('height', themeListHeight + "rem");
    }
  });

  $.ajax({
    url: themeUrl,
    type: "GET",
    dataType: "json",
    async: false,
    success: function(data){
      $('#theme-list').empty();
      
      var json_data = '';
      $.each(data, function(key, value){
        var valueThemeStr = value.theme.replace(re, "");
        
        if (deThemeStr == valueThemeStr){
          json_data += '<a class="list-group-item list-group-item-action active" href="/home/themeStock?theme=' + value.theme + '">' + value.theme + '</a>';
        }
        else {
          json_data += '<a class="list-group-item list-group-item-action" href="/home/themeStock?theme=' + value.theme + '">' + value.theme + '</a>';
        }
      });
      $('#theme-list').append(json_data);
    }
  });
});

$('#theme-list').ready(function(){
  clearAll();
  var moveScroll = setTimeout(function () {
    var $container = $('#theme-list');
    var $scrollTo = $('#theme-list a.active');
    $container.scrollTop(
        $scrollTo.offset().top - $container.offset().top
    );
  }, 300);
});
