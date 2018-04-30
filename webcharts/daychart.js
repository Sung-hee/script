var _chart;
var selected = "http://13.125.147.26/attn/maker.php";

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

$.getJSON("http://13.125.147.26/phps/now?name=" + companycode, function(data){
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
        zoomType: null,
        // panning을 지워야 웹에서 드래그가 됨 !
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
        buttonTheme: {
          width: 60
        },
        buttons: [{
            type: 'month',
            count: 3,
            text: '3개월'
        }, {
            type: 'month',
            count: 6,
            text: '6개월'
        }, {
            type: 'year',
            count: 1,
            text: '1년'
        }],
      },
      // scrollbar : {
      //   enabled: false
    	// },
      // navigator: {
      //   enabled: false
      // },
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
        labels: {
          align: 'left',
          x: 5,
          // format:'{value} %'
        },
        height: '80%',
        lineWidth: 2,
        resize: {
          enabled: true
        },
      }, {
        labels: {
        align: 'left',
        x: 5
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
        type: 'sma20',
        name: '이평선 (20)',
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
      }, {
        type: 'sma120',
        name: '이평선 (120)',
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
  $(document).ready(function(){
    $('input[name=buttons]').change(function() {
      clearInterval(test);
    });
  });
});
