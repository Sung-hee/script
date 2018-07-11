var _chart;
var selected = "http://www.roooot.info/attn/maker.php";

var getParam = function(key) {
  var _parammap = {};
  document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
    function decode(s) {
      return decodeURIComponent(s.split("+").join(" "));
    }

    _parammap[decode(arguments[1])] = decode(arguments[2]);
  });

  return _parammap[key];
};

var companycode = getParam("name");

$.getJSON("http://www.roooot.info/phps/now.php?name=" + companycode, function(data) {
  var json_data = "";

  $.each(data, function(key, value) {
    json_data += value.code;
  });
  var test;

  $(function stock() {
    Highcharts.setOptions({
      global: {
        useUTC: false
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
      }
      _chart = new Highcharts.StockChart({
        chart: {
          resetZoomButton: {
            theme: {
              display: 'none'
            }
          },
          zoomType: null,
          // panning을 지워야 웹에서 드래그가 됨 !
          panning: false,
          followTouchMove: false,
          renderTo: 'container',
          events: {
            redraw: redraw,
            load: function requestData(event) {
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
                  var color = '#8ADAA2';
                  if (candle.close > candle.open) {
                    color = '#8ADAA2';
                  } else if (candle.close < candle.open) {
                    color = '#8ADAA2';
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
        title: {},
        rangeSelector: {
          selected: 0,
          inputEnabled: false,
          labelStyle: {
            display: 'none'
          },
          buttonTheme: {
            display: 'none'
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
        scrollbar: {
          enabled: false
        },
        navigator: {
          height: 30,
          series: {
            color: 'blue',
            fillColor: 'white'
          },
        },
        tooltip: {
          followPointer: false,
          followTouchMove: false,
        },
        xAxis: {
          type: 'datetime',
          height: '100%',
          tickPixelInterval: 150,
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%m월 %e일',
            week: '%m월 %e일',
            month: '%y년 %m월',
            year: '%Y년'
          }
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
            color: 'blue',
            upLineColor: 'black',
            dataGrouping: {
              dateTimeLabelFormats: {
                millisecond: ['%m월 %e일, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'],
                second: ['%m월 %e일, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
                minute: ['%m월 %e일, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                hour: ['%m월 %e일, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                day: ['%Y년 %m월 %e일', '%A, %b %e', '-%Y년 %m월 %e일'],
                week: ['%Y년 %m월 %e일', '%A, %b %e', '-%Y년 %m월 %e일'],
                month: ['%Y년 %m월', '%B', '-%B %Y'],
                year: ['%Y년', '%Y', '-%Y']
              }
            },
            tooltip: {
              pointFormat: '\x3cspan style\x3d"color:{point.color}"/span\x3e \x3c/b\x3e\x3cbr/\x3e시가: \x3cb\x3e{point.open}\x3cbr/\x3e고가: \x3cb\x3e{point.high}\x3cbr/\x3e저가: \x3cb\x3e{point.low}\x3cbr/\x3e종가: \x3cb\x3e{point.close}\x3cbr/\x3e'
            }
          },
          series: {
            animation: false,
            dataGrouping: {
              units: [
                ['day', [1]]
              ]
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
    });
  });

  function ftest() {
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
        }
        _chart.series[0].setData(ohlc);
        _chart.series[1].setData(volume);
      },
      cache: false
    });
  }
  $(document).ready(function() {
    $('input[name=buttons]').change(function() {
      clearInterval(test);
    });
  });
});
