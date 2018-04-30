$(function stock(){
  var test;
  Highcharts.setOptions({
    global : {
      useUTC : false
    }
  });
  function ftest(){
    $.ajax({
      url: 'http://13.125.147.26/phps/marketPower',
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data){
        _chart.series[0].setData(data);
      },
      cache: false
    });
    console.log("ajax 호출");
  }
  $.getJSON('http://13.125.147.26/phps/marketPower' , function (data) {

      _chart = new Highcharts.stockChart('container', {

          chart: {
            renderTo: 'container',
            type: 'arearange',
            // marginTop: 20,
            events: {
              load: function requestData(event){
                test= setInterval(ftest, 5000);
              }
            }
          },
          yAxis: [{
            labels: {
              align: 'left',
              x: 5,
              // format:'{value} %'
            },
          }, {
            labels: {
            align: 'left',
            x: 5
            }
          }],
          scrollbar : {
            enabled: false
          },
          navigator: {
            enabled: false
          },
          rangeSelector: {
            inputEnabled: false,
            labelStyle: {
                visibility: 'hidden'
            },
            buttonTheme: {
              visibility: 'hidden'
            },
            selected: 1
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          // tooltip: {
          //     valueSuffix: '°C'
          // },
          series: [{
              name: 'MaketPower',
              data: data
          }]
      });
  });
  $(document).ready(function(){
    $('input[name=buttons]').change(function() {
      clearInterval(test);
    });
  });
});
