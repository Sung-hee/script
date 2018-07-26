__customIndicators = [
	{
		name: "SLine12H",
		metainfo: {
			"_metainfoVersion": 40,
			"id": "SLine12H@tv-basicstudies-1",
			"scriptIdPart": "",
			"name": "SLine12H",
			"description": "SLine12H",
			"shortDescription": "SLine12H",

			"is_hidden_study": true,
			"is_price_study": true,
			"isCustomIndicator": true,

			"plots": [{ "id": "plot_0", "type": "line" }],
			"defaults": {
				"styles": {
					"plot_0": {
						"linestyle": 0,
						"visible": true,

						// Make the line thinner
						"linewidth": 1,

						// Plot type is Line
						"plottype": 5,

						// Show price line
						"trackPrice": true,

						"transparency": 40,

						// Set the plotted line color to dark red
						"color": "rgba(0, 0, 255, 0.2)",
					}
				},

				// Precision is set to one digit, e.g. 777.77
				"precision": 2,

				"inputs": {}
			},
			"styles": {
				"plot_0": {
					// Output name will be displayed in the Style window
					"title": "SLine12H value",
					"histogramBase": 0,
				}
			},
			"inputs": [],
		},

		constructor: function () {
			this.init = function (context, inputCallback) {
				this._context = context;
				this._input = inputCallback;

				var symbol = this._context.symbol.ticker;
				this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
			};

			this.main = function (context, inputCallback) {
				this._context = context;
				this._input = inputCallback;

				this._context.select_sym(1);

				var high = parseFloat(PineJS.Std.high(this._context).substr(0, 5));
				var sLine12High = (parseFloat(PineJS.Std.open(this._context).substr(6, 5)) / 100).toFixed(2);

				var v = 0;

				v = sLine12High >= high ? high : PineJS.Std.na(this._context);

				return [v];
			}
		}
	},
	{
		name: "SLine12L",
		metainfo: {
			"_metainfoVersion": 40,
			"id": "SLine12L@tv-basicstudies-1",
			"scriptIdPart": "",
			"name": "SLine12L",
			"description": "SLine12L",
			"shortDescription": "SLine12L",

			"is_hidden_study": true,
			"is_price_study": true,
			"isCustomIndicator": true,

			"plots": [{ "id": "plot_0", "type": "line" }],
			"defaults": {
				"styles": {
					"plot_0": {
						"linestyle": 0,
						"visible": true,

						// Make the line thinner
						"linewidth": 1,

						// Plot type is Line
						"plottype": 5,

						// Show price line
						"trackPrice": true,

						"transparency": 40,

						// Set the plotted line color to dark red
						"color": "rgba(255, 0, 0, 0.2)"
					}
				},

				// Precision is set to one digit, e.g. 777.77
				"precision": 2,

				"inputs": {}
			},
			"styles": {
				"plot_0": {
					// Output name will be displayed in the Style window
					"title": "SLine12L value",
					"histogramBase": 0,
				}
			},
			"inputs": [],
		},
		constructor: function () {
			this.init = function (context, inputCallback) {
				this._context = context;
				this._input = inputCallback;

				var symbol = `${PineJS.Std.tickerid(this._context)}`;
				this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
			};

			this.main = function (context, inputCallback) {
				this._context = context;
				this._input = inputCallback;

				this._context.select_sym(1);

				var low = parseFloat(PineJS.Std.low(this._context).substr(0, 5));
				var sLine12Low = (parseFloat(PineJS.Std.open(this._context).substr(6, 5)) / 100).toFixed(2);

				var v = 0;

				v = sLine12Low >= low ? low : PineJS.Std.na(this._context);

				return [v];
			}
		}
	},
	{
		// Replace the <study name> with your study name
		// The name will be used internally by the Charting Library
		name: "c1",
		metainfo: {
			"_metainfoVersion": 40,
			"id": "c1@tv-basicstudies-1",
			"scriptIdPart": "",
			"name": "c1",

			// This description will be displayed in the Indicators window
			// It is also used as a "name" argument when calling the createStudy method
			"description": "c1",

			// This description will be displayed on the chart
			"shortDescription": "c1",

			"is_hidden_study": false,
			"is_price_study": true,
			"isCustomIndicator": true,

			"plots": [
				{ "id": "plot_0", "type": "line" },
				{ "id": "plot_1", "type": "line" }
			],
			"area": [
				{ "name": "plot_0" },
				{ "name": "plot_1" },
			],
			"defaults": {
				"styles": {
					"plot_0": {
						"linestyle": 0,
						"visible": true,

						// Plot line width.
						"linewidth": 1,

						// Plot type:
						//    1 - Histogramm
						//    2 - Line
						//    3 - Cross
						//    4 - Area
						//    5 - Columns
						//    6 - Circles
						//    7 - Line With Breaks
						//    8 - Area With Breaks
						"plottype": 2,

						// Show price line?
						"trackPrice": false,

						// Plot transparency, in percent.
						"transparency": 40,

						// Plot color in #RRGGBB format
						"color": "blue"
					},
					"plot_1": {
						"linestyle": 0,
						"visible": true,

						// Plot line width.
						"linewidth": 1,

						// Plot type:
						//    1 - Histogramm
						//    2 - Line
						//    3 - Cross
						//    4 - Area
						//    5 - Columns
						//    6 - Circles
						//    7 - Line With Breaks
						//    8 - Area With Breaks
						"plottype": 2,

						// Show price line?
						"trackPrice": false,

						// Plot transparency, in percent.
						"transparency": 40,

						// Plot color in #RRGGBB format
						"color": "blue"
					}
				},

				// Area default style
				"areaBackground": {
					"backgroundColor": "#ebf7fc",
					"fillBackground": true,
					"transparency": 0
				},

				// Precision of the study's output values
				// (quantity of digits after the decimal separator).
				"precision": 2,

				"inputs": {}
			},
			"styles": {
				"plot_0": {
					// Output names will be displayed in the Style window
					"title": "c1 h",
					"histogramBase": 0,
				},
				"plot_1": {
					"title": "c1 l",
					"histogramBase": 0,
				}
			},
			"inputs": [],
		},

		constructor: function () {
			this.init = function (context, inputCallback) {
				this._context = context;
				this._input = inputCallback;

				var symbol = `${PineJS.Std.ticker(this._context)}`;
				this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
			};

			this.main = function (context, inputCallback) {
				this._context = context;
				this._input = inputCallback;

				this._context.select_sym(1);
				var h = PineJS.Std.low(this._context);
				var l = PineJS.Std.close(this._context);

				var hStr = h.toString();
				var lStr = l.toString();

				if (hStr.length < 14) {
					for (var i = hStr.length; i < 14; i++) {
						hStr += "0";
					}
				}
				var c1h = "";
				var c1l = "";

				if (hStr.substr(7, 1) != "0") {
					c1h = parseFloat(c1h) / Math.pow(10, hStr.substr(7, 1));
				}
				if (lStr.substr(7, 1) != "0") {
					c1l = parseFloat(c1l) / Math.pow(10, lStr.substr(7, 1));
				}

				if (hStr.substr(6, 1) == "1") {
					c1h = "-" + c1h;
				}
				else if (hStr.substr(6, 1) == "2") {
					c1h = c1h;
				}
				else if (hStr.substr(6, 1) == "3") {
					c1h = 0;
				}

				if (lStr.substr(6, 1) == "1") {
					c1l = "-" + c1l;
				}
				else if (lStr.substr(6, 1) == "2") {
					c1l = c1l;
				}
				else if (lStr.substr(6, 1) == "3") {
					c1l = 0;
				}

				var c = PineJS.Std.close(this._context);
				var diff = Math.abs(c1h - c1l) / 2;
				return [Math.min(c1h, c1l) - diff, Math.max(c1h, c1l) + diff];
			}
		}
	}
];
