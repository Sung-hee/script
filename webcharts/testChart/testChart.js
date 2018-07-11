var _chart;
var selected = "http://www.roooot.info/attn/goldmaker.php";

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
  console.log(json_data);
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

          try {
            if (candle.close > candle.open) {
              const color = 'red';
              volumeBar.color = color;
              candle.color = color;
            } else if (candle.close < candle.open) {
              const color = 'blue';
              candle.color = color;
              volumeBar.color = color;
            }
          } catch (exception) {
            console.log("Error Message: " + exception.message);
          }
        }
      }
    };
    $.getJSON(selected + "?companycode=" + json_data, function(data) {

      // split the data set into ohlc and volume
      var ohlc = [],
        line1 = [],
        line2 = [],
        line3 = [],
        volume = [],
        volume2 = [],
        volume3 = [],
        volume4 = [],
        Hsma = [],
        HsmaSum = [],
        SsmaSum = [],
        Ssma = [],
        dataLength = data.length,
        // set the allowed units for data grouping
        groupingUnits = [
          [
            'week', // unit name
            [1] // allowed multiples
          ],
          [
            'month', [1, 2, 3, 4, 6]
          ]
        ];

      var sum = [0, 0, 0];
      var max = 0;
      min = 0;
      var avg = 0;
      for (var i = 0; i < dataLength; i++) {
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
        volume2.push([
          data[i][0], // the date
          data[i][6] // the volume
        ]);
        volume3.push([
          data[i][0], // the date
          data[i][7] // the volume
        ]);
        volume4.push([
          data[i][0], // the date
          data[i][8] // the volume
        ]);
        Hsma.push([
          data[i][0],
          data[i][2]
        ]);
        Ssma.push([
          data[i][0],
          data[i][3]
        ]);

        sum[0] += data[i][6];
        sum[1] += data[i][7];
        sum[2] += data[i][8];
        try {
          line1.push([
            data[i][0], // the date
            sum[0] // the volume
          ]);
          line2.push([
            data[i][0], // the date
            sum[1] // the volume
          ]);
          line3.push([
            data[i][0], // the date
            sum[2] // the volume
          ]);
        } catch (error) {
          console.error(i + " : " + error.message);
        }
      }

      var Hresult = 0;
      var Hcusma = 0;
      var Sresult = 0;
      var Scusma = 0;
      var index = 0;
      for (var i = Hsma.length - 1; i >= 12; i--) {
        for (var j = 1; j < 13; j++) {
          Hcusma += parseFloat(Hsma[i - j][1]);
          Scusma += parseFloat(Ssma[i - j][1]);
        }
        Hresult = (Hcusma / 12) * 1.0988;
        Hresult = (Math.ceil(Hresult));
        Hcusma = 0;
        Sresult = (Scusma / 12) * 0.891;
        Sresult = (Math.ceil(Sresult));
        Scusma = 0;
        HsmaSum.push([Hsma[i][0], Hresult]);
        SsmaSum.push([Ssma[i][0], Sresult]);
      }
      HsmaSum = HsmaSum.reverse();
      SsmaSum = SsmaSum.reverse();

      var series = [{
        type: 'candlestick',
        name: 'AAPL',
        id: 'price',
        data: ohlc,
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'column',
        name: '거래량',
        id: 'volume',
        data: volume,
        color: 'green',
        yAxis: 2,
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'line',
        name: '개인 누적',
        data: line1,
        color: '#0080FF',
        yAxis: 1,
        zIndex: 3,
        dataGrouping: {
          groupPixelWidth: 500
        },
      }, {
        type: 'line',
        name: '기관 누적',
        data: line2,
        color: '#000000',
        yAxis: 1,
        zIndex: 3,
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'line',
        name: '외국인 누적',
        data: line3,
        color: '#FB9804',
        yAxis: 1,
        zIndex: 3,
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'column',
        name: '개인',
        data: volume2,
        color: '#0080FF',
        yAxis: 3,
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'column',
        name: '기관',
        data: volume3,
        color: '#000000',
        yAxis: 3,
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        type: 'column',
        name: '외국인',
        data: volume4,
        color: '#FB9804',
        yAxis: 3,
        dataGrouping: {
          groupPixelWidth: 500
        }
      }, {
        name: '황금추세 상선',
        data: HsmaSum,
        zIndex: 1,
        color: '#FF607B',
        tooltip: {
          valueDecimals: 0
        },
      }, {
        name: '황금추세 하선',
        data: SsmaSum,
        zIndex: 1,
        color: '#5F7AFF',
        tooltip: {
          valueDecimals: 0
        }
      }];

      // create the chart
      _chart = new Highcharts.stockChart({
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
                  var color = 'rgba(89, 203, 123, 0.70)';
                  if (candle.close > candle.open) {
                    color = 'rgba(89, 203, 123, 0.70)';
                  } else if (candle.close < candle.open) {
                    color = 'rgba(89, 203, 123, 0.70)';
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
        navigator: {
          height: 15
        },
        rangeSelector: {
          selected: 1,
          inputEnabled: false, // it supports only days
        },
        yAxis: [{
          labels: {
            align: 'left',
            x: 5
          },
          height: '50%',
          lineWidth: 2,
          resize: {
            enabled: true
          },
          tooltip: false
        }, {
          labels: {
            align: 'right',
            x: -5
          },
          top: '50%',
          height: '34%',
          offset: 0,
          lineWidth: 2,
          opposite: false
        }, {
          labels: {
            align: 'left',
            x: 5
          },
          top: '50%',
          height: '34%',
          offset: 0,
          lineWidth: 2
        }, {
          labels: {
            align: 'left',
            x: 5
          },
          top: '85%',
          height: '15%',
          offset: 0,
          lineWidth: 2
        }],

        tooltip: {
          // pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 0,
          split: true
        },
        // tooltip: {
        //     split: true
        // },

        plotOptions: {
          candlestick: {
            lineColor: 'black',
            // color: 'blue',
            upColor: 'red',
            upLineColor: 'black',
          },
          series: {
            animation: false,
            dataGrouping: {
              units: [
                ['month', [1]]
              ]
            },
          },
          line: {
            animation: false,
            lineWidth: 3
          }
        },
        series: series
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
        var ohlc = [],
          line1 = [],
          line2 = [],
          line3 = [],
          volume = [],
          volume2 = [],
          volume3 = [],
          volume4 = [],
          dataLength = data.length,
					Hsma = [],
					HsmaSum = [],
					SsmaSum = [],
					Ssma = [],
          // set the allowed units for data grouping
          groupingUnits = [
            [
              'week', // unit name
              [1] // allowed multiples
            ],
            [
              'month', [1, 2, 3, 4, 6]
            ]
          ];

        var sum = [0, 0, 0];
        var max = 0;
        min = 0;
        var avg = 0;
        for (var i = 0; i < dataLength; i++) {
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
          volume2.push([
            data[i][0], // the date
            data[i][6] // the volume
          ]);
          volume3.push([
            data[i][0], // the date
            data[i][7] // the volume
          ]);
          volume4.push([
            data[i][0], // the date
            data[i][8] // the volume
          ]);
          Hsma.push([
            data[i][0],
            data[i][2]
          ]);
          Ssma.push([
            data[i][0],
            data[i][3]
          ]);

          sum[0] += data[i][6];
          sum[1] += data[i][7];
          sum[2] += data[i][8];
          try {
            line1.push([
              data[i][0], // the date
              sum[0] // the volume
            ]);
            line2.push([
              data[i][0], // the date
              sum[1] // the volume
            ]);
            line3.push([
              data[i][0], // the date
              sum[2] // the volume
            ]);
          } catch (error) {
            console.error(i + " : " + error.message);
          }
        }

        var Hresult = 0;
        var Hcusma = 0;
        var Sresult = 0;
        var Scusma = 0;
        var index = 0;
        for (var i = Hsma.length - 1; i >= 12; i--) {
          for (var j = 1; j < 13; j++) {
            Hcusma += parseFloat(Hsma[i - j][1]);
            Scusma += parseFloat(Ssma[i - j][1]);
          }
          Hresult = (Hcusma / 12) * 1.0988;
          Hresult = (Math.ceil(Hresult));
          Hcusma = 0;
          Sresult = (Scusma / 12) * 0.891;
          Sresult = (Math.ceil(Sresult));
          Scusma = 0;
          HsmaSum.push([Hsma[i][0], Hresult]);
          SsmaSum.push([Ssma[i][0], Sresult]);
        }
        HsmaSum = HsmaSum.reverse();
        SsmaSum = SsmaSum.reverse();

        _chart.series[0].setData(ohlc);
				_chart.series[1].setData(volume);
				_chart.series[2].setData(line1);
				_chart.series[3].setData(line2);
				_chart.series[4].setData(line3);
				_chart.series[5].setData(volume2);
        _chart.series[6].setData(volume3);
				_chart.series[7].setData(volume4);
				_chart.series[8].setData(HsmaSum);
				_chart.series[9].setData(SsmaSum);
      },
      cache: false
    });
    console.log("ajax 호출");
  }
  $(document).ready(function() {
    $('input[name=buttons]').change(function() {
      clearInterval(test);
    });
  });
});
