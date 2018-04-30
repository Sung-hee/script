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

var goldS = getParams('goldS');
var goldE = getParams('goldE');
var power = getParams('power');
var supply = getParams('supply');
var value = getParams('value');
var perfomance = getParams('performance');
var url = 'http://13.125.147.26/phps/stock_table';
var height = ($(window).height()*0.888)-280;

$(document).ready(function(){
  clearAll();

  $.getJSON(url + "?goldS=" + goldS + "&goldE="+ goldE +"&power=" + power + "&supply=" + supply + "&performance=" + perfomance + "&value=" + value, function(data){
    var company = '';
    var json_data = '';
    json_data += '<tbody>'
    $.each(data, function(key, value){
      if (value.companycode.includes(" ")) {
        company = value.companycode.replace(" ", "+");
      }
      else {
        company = value.companycode;
      }
      json_data += '<tr>';
      json_data += '<td><a href="/home/charts?name=' + company + '" style="color: black;">'+value.companycode+'</a></td>';
      // if(parseInt(value.goldagg) >= 85){
      //   json_data += '<td style="color:red">' + '<label style="margin: 0rem 1rem">' + value.goldagg + '</label>' + '</td>';
      // }
      // else if(parseInt(value.goldagg) >= 50){
        json_data += '<td>' + '<label style="margin: 0rem 1rem">' + value.goldagg + '</label>' + '</td>';
      // }
      // else {
      //   json_data += '<td style="color:blue">' + '<label style="margin: 0rem 1rem">' + value.goldagg + '</label>' + '</td>';
      // }

      // if(value.powerrating == "1 등급" || value.powerrating == "2 등급"){
      //   json_data += '<td style="color:red">' + '<label style="margin: 0rem 1rem">' + value.powerrating + '</label>' + '</td>';
      // }
      // else if(value.powerrating == "3 등급"){
        json_data += '<td>' + '<label style="margin: 0rem 1rem">' + value.powerrating + '</label>' + '</td>';
      // }
      // else {
      //   json_data += '<td style="color:blue">' + '<label style="margin: 0rem 1rem">' + value.powerrating + '</label>' + '</td>';
      // }

      // if(value.demandrating == "1 등급" || value.demandrating == "2 등급"){
      //   json_data += '<td style="color:red">' + '<label style="margin: 0rem 1rem">' + value.demandrating + '</label>' + '</td>';
      // }
      // else if(value.demandrating == "3 등급"){
        json_data += '<td>' + '<label style="margin: 0rem 1rem">' + value.demandrating + '</td>';
      // }
      // else {
      //   json_data += '<td style="color:blue">' + '<label style="margin: 0rem 1rem">' + value.demandrating + '</td>';
      // }

      // if(value.performancegrade == "1 등급" || value.performancegrade == "2 등급"){
      //   json_data += '<td style="color:red">' + '<label style="margin: 0rem 1rem">' + value.performancegrade + '</td>';
      // }
      // else if(value.performancegrade == "3 등급"){
        json_data += '<td>' + '<label style="margin: 0rem 1rem">' + value.performancegrade + '</td>';
      // }
      // else {
      //   json_data += '<td style="color:blue">' + '<label style="margin: 0rem 1rem">' + value.performancegrade + '</td>';
      // }

      // if(value.currentvalue.includes("저평가")){
      //   json_data += '<td style="color:red">' + '<label style="margin: 0rem 1rem">' + value.currentvalue + '</td>';
      // }
      // else if(value.currentvalue.includes("보통이상") || value.currentvalue.includes("보통이하")){
        json_data += '<td>' + '<label style="margin: 0rem 1rem">' + value.currentvalue + '</td>';
      // }
      // else {
      //   json_data += '<td style="color:blue">' + '<label style="margin: 0rem 1rem">' + value.currentvalue + '</td>';
      // }
      json_data += '</tr>';
    });
    json_data += '</tbody>'
    $('#stock_table').append(json_data);
    $('#stock_table').DataTable({
      "paging": false,
      "scrollY": height,
      "scrollX": true,
      "scrollCollapse": true,
      "columnDefs": [
          { width: '20%', targets: 0 }
      ],
      // "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
       // "sinfo": false,
       "bFilter": false
    });
  });
});
