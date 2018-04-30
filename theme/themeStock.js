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
var stockUrl = 'http://61.72.187.6/phps/elementNowJ';
var re = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\(\=]/gi;
var deTheme = decodeURIComponent(theme);
var deStock = decodeURIComponent(stock);
var deThemeStr = deTheme.replace(re, "");
var deStockStr = deStock.replace(re, "");

$(document).ready(function(){
  $.ajax({
    url: stockUrl + "?theme=" + deTheme,
    type: "GET",
    dataType: "json",
    async: true,
    success: function(data){
      var json_data1 = '';
      var valueComent = '';
      $.each(data, function(key, value){
        var valueStockStr = value.stock.replace(re, "");
        valueComent = value.comment;

        var valueRate = '';
        if (parseFloat(value.rate) > 0) {
          valueRate = '<font class="text-danger">' + value.rate + '%</font>';
        }
        else if (parseFloat(value.rate) < 0) {
          valueRate = '<font class="text-primary">' + value.rate + '%</font>';
        }
        else {
          valueRate = '<font>' + value.rate + '%</font>';
        }

        if (deStockStr == valueStockStr){
          json_data1 += '<a class="list-group-item list-group-item-action active" href="/home/charts?name=' + value.stock + '">';
        }
        else {
          json_data1 += '<a class="list-group-item list-group-item-action" href="/home/charts?name=' + value.stock + '">';
        }

        json_data1 += '<div class="float-right">';
        json_data1 += valueRate;
        json_data1 += '</div>';
        json_data1 += '<div>';
        json_data1 += value.stock;
        json_data1 += '</div>';
        json_data1 += '</a>';
      });

      $('#div-comment').empty();
      var json_data2 = '';
      json_data2 += '<div class="card border-dark mb-3" style="max-width: 100%;">';
      json_data2 += '<div class="card-header" align="center">테마 소개</div>';
      json_data2 += '<div id="card" class="card card-body" style="height: 5rem; overflow:hidden; overflow-y:scroll;"">';
      json_data2 += valueComent;
      json_data2 += '</div>';
      json_data2 += '</div>';
      json_data2 += '';
      $('#div-comment').append(json_data2);

      var stockListHeight = pxToRem($(document).height() - $('#div-comment').height() - $('#mainNav').height() - $('#footer-container').height() - 50);
      $('#stock-list').css('height', stockListHeight + "rem");

      $('#stock-list').append(json_data1);

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
