var _chart;
var selected = "http://61.72.187.6/attn/maker";

function clearAll(){
  var max = setTimeout(function(){},1);
  for (var i = 1; i <= max ; i++) {
      window.clearInterval(i);
      window.clearTimeout(i);
      if(window.mozCancelAnimationFrame)window.mozCancelAnimationFrame(i); // Firefox
  }
}

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

$.getJSON("http://61.72.187.6/phps/now?name=" + companycode, function(data){
  var json_data = "";

  $.each(data, function(key, value){
    json_data += value.code;
  });
  console.log(json_data);
  var test;

  $(function stock(){
    Highcharts.setOptions({
      global : {
          useUTC : false
        }
    });
    const redraw = (event) => {
      const chartTarget = event.target;

      if (chartTarget.series[0].hasGroupedData) {

        // Get all the candlesticks that are shown
        const candlesticks = chartTarget.series[0].points;

        // Get all the volume bards that are shown
        const volumeBars = chartTarget.series[1].points;

        // Go through the candle chart and volume points and update the colors
        for (let i = 0; i < candlesticks.length; i++) {
          const candle = candlesticks[i];
          const volumeBar = volumeBars[i];

          if (candle.close > candle.open) {
            const color = 'red';
            volumeBar.color = color;
            candle.color = color;
          } else if (candle.close < candle.open) {
            const color = 'blue';
            candle.color = color;
            volumeBar.color = color;
          }
        }
      }
    };
    $.getJSON(selected + "?companycode=" + json_data, function(data) {

      // split the data set into ohlc and volume
      var volumeColor = '';
      var ohlc = [],
          volume = [],
          dataLength = data.length;

      for (i = 0; i < dataLength; i++) {
        ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
        ]);
        volume.push([
          data[i][0], // the date
          data[i][5] // the volume
        ]);
        // console.log(volume);
    }
    console.log("차트 데이터 저장");
    _chart = new Highcharts.StockChart({
      chart: {
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        },
        // zoomType: null,
        // panning을 지워야 웹에서 드래그가 됨 !
        panning: false,
        renderTo: 'container',
        events: {
          redraw: redraw,
          load: function requestData(event){
            // Get the volume series by id.
            var volSeries = this.series.find(function(s) {
              return s.userOptions.id === 'volume';
            });
            // Override the poitAttribs function on the volume series.
            volSeries.pointAttribs = (function(original) {
              return function(point, state) {
                // Call the original pointAttribs function.
                var attribs = original.apply(this, arguments);

                // Get the price series using the id.
                var priceSeries = point.series.chart.series.find(function(s) {
                  return s.userOptions.id === 'price';
                });

                // Find the candle corresponding to the current volume point.
                var candle;
                if (point.series.hasGroupedData) {
                  // With grouped data, we need to find the candle from the grouped data.
                  var datagroup = point.dataGroup;
                  var groupIdx = point.series.groupMap.indexOf(datagroup);

                  candle = priceSeries.groupedData[groupIdx];
                } else {
                  // Non-grouped data, we can just use the normal data.
                  candle = priceSeries.data[point.index];
                }

                // Choose the color for the volume point based on the candle properties.
                var color = 'blue';
                if (candle.close > candle.open) {
                  color = 'red';
                } else if (candle.close < candle.open) {
                  color = 'blue';
                }
                // Set the volume point's attribute(s) accordingly.
                attribs.fill = color;
                // Return the updated attributes.
                return attribs;
              };
            })(volSeries.pointAttribs);
            // Need to call update so the changes get taken into account on first draw.
            this.update({});
            test = setInterval(ftest, 5000);
          },
        }
      },
      title: {
      },
      rangeSelector: {
        selected: 0,
        // enabled: false,
        inputEnabled: false,
        labelStyle: {
            display:'none'
        },
        buttonTheme: {
          display:'none'
        },
      },
      scrollbar : {
        enabled: false
    	},
      navigator: {
        enabled: false
      },
      tooltip: {
        followPointer: false,
        followTouchMove: false,
      },
      xAxis: {
        type: 'datetime',
        height: '100%',
        tickPixelInterval: 150
      },
      yAxis: [{
        height: '80%',
        lineWidth: 2,
        resize: {
          enabled: true
        },
      }, {
        labels: {
        align: 'right',
        x: -3
        },
        top: '80%',
        height: '20%',
        offset: 0,
        lineWidth: 2
      }],
        legend: {
        enabled: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        plotOptions: {
          candlestick: {
          lineColor: 'black',
          upColor: 'red',
          upLineColor: 'black'
          },
        series: {
          animation: false,
          dataGrouping: {
            units: [ ['day', [1]] ]
          },
        }
      },
      series: [{
        type: 'candlestick',
        name: 'AAPL',
        id: 'price',
        zIndex: 2,
        data: ohlc
      }, {
        type: 'column',
        name: '거래량',
        id: 'volume',
        data: volume,
        yAxis: 1,
        turboThreshold: Number.MAX_VALUE
      }, {
        type: 'sma',
        name: '이평선 (5)',
        linkedTo: 'price',
        zIndex: 1,
        marker: {
            enabled: false
        },
        dataGrouping: {
          groupPixelWidth: 500
        },
      }, {
        type: 'sma10',
        name: '이평선 (10)',
        linkedTo: 'price',
        zIndex: 1,
        marker: {
            enabled: false
        },
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'sma15',
        name: '이평선 (15)',
        linkedTo: 'price',
        zIndex: 1,
        marker: {
            enabled: false
        },
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'sma30',
        name: '이평선 (30)',
        linkedTo: 'price',
        zIndex: 1,
        marker: {
            enabled: false
        },
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'sma60',
        name: '이평선 (60)',
        linkedTo: 'price',
        zIndex: 1,
        marker: {
            enabled: false
        },
        dataGrouping: {
          groupPixelWidth: 500
        }
      }]
    });
      // console.log(volume);
      console.log("차트그리기");
    });
  });
  function ftest(){
    $.ajax({
        url: selected + "?companycode=" + json_data,
        type: "GET",
        dataType: "json",
        async: true,
        success: function(data) {
          // split the data set into ohlc and volume
          var volumeColor = '';
          var ohlc = [],
              volume = [],
              dataLength = data.length;

          for (i = 0; i < dataLength; i++) {
            ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4] // close
            ]);
            volume.push([
              data[i][0], // the date
              data[i][5] // the volume
            ]);
            // console.log(volume);
          }
          _chart.series[0].setData(ohlc);
          _chart.series[1].setData(volume);
          // console.log(data);
          // console.log(selected+"?companycode="+companycode);
        },
        cache: false
    });
    console.log("ajax 호출");
  }
  $.getJSON('http://61.72.187.6/phps/now?name=' + companycode, function(data){
    var json_data = '';
    var split_data = '';

    $.each(data, function(key, value){
      split_data = value.info.split("\r\n");
      for(var i = 0; i < split_data.length; i++){
        if(i == 0){
          json_data += split_data[i]+'</br>';
        }
        else {
          json_data += split_data[i]+'</br>';
        }
      }
      console.log(split_data);
    });

    $('#company_data').append(json_data);
  });

  $.getJSON('https://charttest-sungheeek.c9users.io/goldscore.json', function(data){
    var json_data = '';

    $.each(data, function(key, value){
        const ratings = {
          hotel_a : value.goldscore,
        };
        const starTotal = 100;

        for(const rating in ratings) {
        // 2
        const starPercentage = (ratings[rating] / starTotal) * 100;
        // 3
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        // 4
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
        }
    });
    $('#company_score').append(json_data);
  });

  $.getJSON('http://61.72.187.6/phps/newsNowJ?name=' + companycode, function(data){
    var json_data = '';

    json_data += '<tbody>'
    $.each(data, function(key, value){
      json_data += "<tr>";
      json_data += "<td id='create_frame'><a href='http://m.stock.naver.com/item/main.nhn#/stocks/"+value.code+"/news/"+value.article_id+"/office/"+value.office_id+"' style='color: black' target='test' onclick='hideiframe()'>"+value.title+"</a></td>";
      json_data += '<td>'+value.press+'</td>';
      json_data += '<td>'+value.wdate+'</td>';
      json_data += '</tr>';
    });
    json_data += '</tbody>'
    $('#news_table').append(json_data);
  });

  $(document).ready(function(){
    clearAll();
    test = setInterval(ftest, 5000);
  });
});
