var _chart;
var selected = "http://13.124.230.32/attn/maker2.php";

var getParam = function (key) {
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

$.getJSON("http://www.roooot.info/phps/now.php?name=" + companycode, function (data) {
	var json_data = "";

	$.each(data, function (key, value) {
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
					}
					catch (exception) {
						console.log("Error Message: " + exception.message);
					}
				}
			}
		};
		$.getJSON(selected + "?companycode=" + json_data, function (data) {

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
				// set the allowed units for data grouping
				groupingUnits = [[
					'week',                         // unit name
					[1]                             // allowed multiples
				], [
					'month',
					[1, 2, 3, 4, 6]
				]];

			var sum = [0, 0, 0];
			var max = 0; min = 0;
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

			var series = [{
				type: 'candlestick',
				name: 'AAPL',
				id: 'price',
				data: ohlc,
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
				name: '거래량',
				id: 'volume',
				data: volume,
				color: 'green',
				yAxis: 2,
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
			}];

			$(".supply-cbx").change(function () {
				if (this.checked) {
					if (this.name == "ga") {
						var item = {
							type: 'column',
							name: '개인',
							data: volume2,
							color: '#0080FF',
							yAxis: 3,
							dataGrouping: {
								groupPixelWidth: 500
							}
						};
					}
					else if (this.name == "gi") {
						var item = {
							type: 'column',
							name: '기관',
							data: volume3,
							color: '#000000',
							yAxis: 3,
							dataGrouping: {
								groupPixelWidth: 500
							}
						};
					}
					else if (this.name == "fo") {
						var item = {
							type: 'column',
							name: '외국인',
							data: volume4,
							color: '#FB9804',
							yAxis: 3,
							dataGrouping: {
								groupPixelWidth: 500
							}
						};
					}
					else if (this.name == "su") {
						document.getElementById("ga").checked = true;
						document.getElementById("gi").checked = true;
						document.getElementById("fo").checked = true;

						series = [{
							type: 'candlestick',
							name: 'AAPL',
							id: 'price',
							data: ohlc,
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
							name: '거래량',
							id: 'volume',
							data: volume,
							color: 'green',
							yAxis: 2,
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
						}];
					}
					if (this.name != "su") {
						series.push(item);
					}
				}
				else {
					if (this.name == "ga") {
						var item = {
							type: 'column',
							name: '개인',
							data: volume2,
							color: '#0080FF',
							yAxis: 3,
							dataGrouping: {
								groupPixelWidth: 500
							}
						};
					}
					else if (this.name == "gi") {
						var item = {
							type: 'column',
							name: '기관',
							data: volume3,
							color: '#000000',
							yAxis: 3,
							dataGrouping: {
								groupPixelWidth: 500
							}
						};
					}
					else if (this.name == "fo") {
						var item = {
							type: 'column',
							name: '외국인',
							data: volume4,
							color: '#FB9804',
							yAxis: 3,
							dataGrouping: {
								groupPixelWidth: 500
							}
						};
					}
					else if (this.name == "su") {
						document.getElementById("ga").checked = false;
						document.getElementById("gi").checked = false;
						document.getElementById("fo").checked = false;
						console.log(this.name);
						series = [{
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
						}];
					}
					if (this.name != "su") {
						for (var i = 0; i < series.length; i++) {
							if (series[i].name == item.name) series.splice(i, 1);
						}
					}
				}

				clearInterval(test);

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
								var volSeries = this.series.find(function (s) {
									return s.userOptions.id === 'volume';
								});
								// Override the poitAttribs function on the volume series.
								volSeries.pointAttribs = (function (original) {
									return function (point, state) {
										// Call the original pointAttribs function.
										var attribs = original.apply(this, arguments);

										// Get the price series using the id.
										var priceSeries = point.series.chart.series.find(function (s) {
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
										var color = 'rgba(255, 255, 255, 0.50)';
										if (candle.close > candle.open) {
											color = 'rgba(255, 255, 255, 0.50)';
										} else if (candle.close < candle.open) {
											color = 'rgba(255, 255, 255, 0.50)';
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
						height: '65%',
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
						top: '65%',
						height: '20%',
						offset: 0,
						lineWidth: 2,
						opposite: false
					}, {
						labels: {
							align: 'left',
							x: 5
						},
						top: '65%',
						height: '20%',
						offset: 0,
						lineWidth: 2
					}, {
						labels: {
							align: 'left',
							x: 5
						},
						top: '85%',
						height: '20%',
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
								units: [['day', [1]]]
							},
						}
					},
					series: series
				});
			});
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
							var volSeries = this.series.find(function (s) {
								return s.userOptions.id === 'volume';
							});
							// Override the poitAttribs function on the volume series.
							volSeries.pointAttribs = (function (original) {
								return function (point, state) {
									// Call the original pointAttribs function.
									var attribs = original.apply(this, arguments);

									// Get the price series using the id.
									var priceSeries = point.series.chart.series.find(function (s) {
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
					height: '65%',
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
					top: '65%',
					height: '20%',
					offset: 0,
					lineWidth: 2,
					opposite: false
				}, {
					labels: {
						align: 'left',
						x: 5
					},
					top: '65%',
					height: '20%',
					offset: 0,
					lineWidth: 2
				}, {
					labels: {
						align: 'left',
						x: 5
					},
					top: '85%',
					height: '20%',
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
					line: {
						lineWidth: 3
					},
					series: {
						animation: false,
						dataGrouping: {
							units: [['day', [1]]]
						},
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
			success: function (data) {
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
					// set the allowed units for data grouping
					groupingUnits = [[
						'week',                         // unit name
						[1]                             // allowed multiples
					], [
						'month',
						[1, 2, 3, 4, 6]
					]];

				var sum = [0, 0, 0];
				var max = 0; min = 0;
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
				_chart.series[0].setData(ohlc);
				if (_chart.series[4] != undefined) {
					_chart.series[4].setData(volume);
				}
			},
			cache: false
		});
		console.log("ajax 호출");
	}
	$(document).ready(function () {
		$('input[name=buttons]').change(function () {
			clearInterval(test);
		});
	});
});
