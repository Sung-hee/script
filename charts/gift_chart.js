var _chart;
var selected = "http://13.125.147.26/phps/giftChart";

$(function stock(){
  Highcharts.setOptions({
    global : {
        useUTC : false
      }
  });
    var test;
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
    // $.getJSON(selected + "?companycode=" + companycode, function(data) {
    $.getJSON(selected, function(data) {

      // split the data set into ohlc and volume
      var volumeColor = '';
      var ohlc = [],
          volume = [],
          Hsma = [],
          HsmaSum = [],
          SsmaSum = [],
          Ssma = [],
          gHsmaSum = [],
          gSsmaSum = [],
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
        Hsma.push([
          data[i][0],
          data[i][2]
        ]);
        Ssma.push([
          data[i][0],
          data[i][3]
        ]);
        // console.log(volume);
    }
    var Hresult = 0;
    var Hcusma = 0;
    var Sresult = 0;
    var Scusma = 0;
    for(var i = Hsma.length-1; i >= 11; i--){
      for(var j = 1; j < 12; j++){
        Hcusma += parseFloat(Hsma[i-j][1]);
        Scusma += parseFloat(Ssma[i-j][1]);
      }
      Hresult = (Hcusma / 11) * 1.00095;
      // Hresult = (Math.ceil(Hresult));
      Hcusma = 0;
      Sresult = (Scusma / 11) * 0.99899;
      // Sresult = (Math.ceil(Sresult));
      Scusma = 0;
      HsmaSum.push([Hsma[i][0],Hresult]);
      SsmaSum.push([Ssma[i][0],Sresult]);
    }
    HsmaSum = HsmaSum.reverse();
    SsmaSum = SsmaSum.reverse();

    var gHresult = 0;
    var gHcusma = 0;
    var gSresult = 0;
    var gScusma = 0;
    for(var i = Hsma.length-1; i >= 29; i--){
      for(var j = 1; j < 30; j++){
        gHcusma += parseFloat(Hsma[i-j][1]);
        gScusma += parseFloat(Ssma[i-j][1]);
      }
      gHresult = (gHcusma / 30) * 1.03586;
      // Hresult = (Math.ceil(Hresult));
      gHcusma = 0;
      console.log(gHresult);
      gSresult = (gScusma / 30) * 1.0331;
      // Sresult = (Math.ceil(Sresult));
      gScusma = 0;
      gHsmaSum.push([Hsma[i][0],gHresult]);
      gSsmaSum.push([Ssma[i][0],gSresult]);
    }
    gHsmaSum = gHsmaSum.reverse();
    gSsmaSum = gSsmaSum.reverse();

    console.log("차트 데이터 저장");
    _chart = new Highcharts.StockChart({
      chart: {
        resetZoomButton: {
          theme: {
            display: 'none'
          }
        },
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
            test= setInterval(ftest, 5000);
          }
        }
      },
      title: {
      },
      rangeSelector: {
        selected: 1,
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
        tickPixelInterval: 150,
        labels: {
          enabled: false
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
          upLineColor: 'black'
          },
        series: {
          animation: false,
          dataGrouping: {
            units: [ ['second', [1]] ]
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
        name: '황금추세 상선',
        data: HsmaSum,
        zIndex: 1,
        color: '#FF607B',
        tooltip: {
             valueDecimals: 2
         }
      }, {
        name: '황금추세 하선',
        data: SsmaSum,
        zIndex: 1,
        color: '#5F7AFF',
        tooltip: {
             valueDecimals: 2
         }
       }, {
         name: '황금추세 상선',
         data: gHsmaSum,
         zIndex: 1,
         color: '#A0A0A0',
         tooltip: {
              valueDecimals: 2
          }
       }, {
         name: '황금추세 하선',
         data: gSsmaSum,
         zIndex: 1,
         color: '#A0A0A0',
         tooltip: {
              valueDecimals: 2
          }
      }]
    });
    console.log("차트그리기");
  });
  function ftest() {
    $.ajax({
        url: selected,
        type: "GET",
        dataType: "json",
        async: true,
        success: function(data) {
          // split the data set into ohlc and volume
          var volumeColor = '';
          var ohlc = [],
              volume = [],
              Hsma = [],
              HsmaSum = [],
              SsmaSum = [],
              Ssma = [],
              gHsmaSum = [],
              gSsmaSum = [],
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
            Hsma.push([
              data[i][0],
              data[i][2]
            ]);
            Ssma.push([
              data[i][0],
              data[i][3]
            ]);
            // console.log(volume);
          }
          var Hresult = 0;
          var Hcusma = 0;
          var Sresult = 0;
          var Scusma = 0;
          for(var i = Hsma.length-1; i >= 11; i--){
            for(var j = 1; j < 12; j++){
              Hcusma += parseFloat(Hsma[i-j][1]);
              Scusma += parseFloat(Ssma[i-j][1]);
            }
            Hresult = (Hcusma / 11) * 1.00095;
            // Hresult = (Math.ceil(Hresult));
            Hcusma = 0;
            Sresult = (Scusma / 11) * 0.99899;
            // Sresult = (Math.ceil(Sresult));
            Scusma = 0;
            HsmaSum.push([Hsma[i][0],Hresult]);
            SsmaSum.push([Ssma[i][0],Sresult]);
          }
          HsmaSum = HsmaSum.reverse();
          SsmaSum = SsmaSum.reverse();

          var gHresult = 0;
          var gHcusma = 0;
          var gSresult = 0;
          var gScusma = 0;
          for(var i = Hsma.length-1; i >= 29; i--){
            for(var j = 1; j < 30; j++){
              gHcusma += parseFloat(Hsma[i-j][1]);
              gScusma += parseFloat(Ssma[i-j][1]);
            }
            gHresult = (gHcusma / 30) * 1.0359;
            // Hresult = (Math.ceil(Hresult));
            gHcusma = 0;
            gSresult = (gScusma / 30) * 1.0331;
            // Sresult = (Math.ceil(Sresult));
            gScusma = 0;
            gHsmaSum.push([Hsma[i][0],gHresult]);
            gSsmaSum.push([Ssma[i][0],gSresult]);
          }
          gHsmaSum = gHsmaSum.reverse();
          gSsmaSum = gSsmaSum.reverse();

          _chart.series[0].setData(ohlc);
          _chart.series[1].setData(volume);
          _chart.series[2].setData(HsmaSum);
          _chart.series[3].setData(SsmaSum);
          _chart.series[4].setData(gHsmaSum);
          _chart.series[5].setData(gSsmaSum);
          // console.log(data);
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
