function clearAll() {
	var max = setTimeout(function () { }, 1);
	for (var i = 1; i <= max; i++) {
		window.clearInterval(i);
		window.clearTimeout(i);
		if (window.mozCancelAnimationFrame) window.mozCancelAnimationFrame(i); // Firefox
	}
}

var getParams = function (key) {
	var _parammap = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}
		_parammap[decode(arguments[1])] = decode(arguments[2]);
	});

	return _parammap[key];
};

var bot = getParams('bot');
var type = getParams('type');
var botStr = bot.replace(" ", "");
var proStockUrl = 'http://13.125.147.26/phps/botStock';
var height = ($(window).height() * 0.888) - 280;

function proStockGetJson() {
	$.getJSON(proStockUrl + "?bot=" + bot, function (data) {
		$('#img-bot').attr('src', data.bot.imgUrl);
		$('#model').html(data.bot.model);
		$('#winning-rate').html(data.bot.winningRate);
		$('#price-earnings-ratio').html("누적 <span class='text-danger'><big>" + data.bot.priceEarningsRatio + "</big></span> <small>(30거래일기준)</small>");
		$('#propensity').html(data.bot.propensity);

		$('#capture-stock').empty();

		if (type == "elw") {
			$('#bot-info-table').empty();
			var table_data = '';
			table_data += '<tbody>';
			table_data += '<tr>';
			table_data += '<th style="width: 20%;">모델</th>';
			table_data += '<td id="model">' + data.bot.model + '</td>';
			table_data += '</tr>';
			table_data += '<tr>';
			table_data += '<th style="width: 20%;">설명</th>';
			table_data += '<td id="propensity">' + data.bot.propensity + '</td>';
			table_data += '</tr>';
			table_data += '</tbody>';
			$('#bot-info-table').append(table_data);

			$('#info').remove();
			$('#div-buttons').remove();

			var json_data = '';
			var call_data = '';
			var put_data = '';
			$.each(data.stock, function (key, value) {
				if (value.name.includes("콜")){
					if (value.paidOffPrice == "1") {
						call_data += '<div class="text-center text-danger mt-3"><big>' + value.name + '</big></div>';
					}
					else if (value.paidOffPrice == "2") {
						call_data += '<div class="text-center text-danger">' + value.name + '</div>';
					}
					else if (value.paidOffPrice == "3") {
						call_data += '<div class="text-center text-danger mb-3"><small>' + value.name + '</small></div>';
					}
				}
				else if (value.name.includes("풋")) {
					if (value.paidOffPrice == "1") {
						put_data += '<div class="text-center text-primary mt-3"><big>' + value.name + '</big></div>';
					}
					else if (value.paidOffPrice == "2") {
						put_data += '<div class="text-center text-primary">' + value.name + '</div>';
					}
					else if (value.paidOffPrice == "3") {
						put_data += '<div class="text-center text-primary mb-3"><small>' + value.name + '</small></div>';
					}
				}

			});
			json_data += '<div class="card-body">';
			json_data += '<div class="card">';
			json_data += call_data;
			json_data += '</div>';
			json_data += '</div>';
			json_data += '<div class="card-body">';
			json_data += '<div class="card">';
			json_data += put_data;
			json_data += '</div>';
			json_data += '</div>';
			$('#div-main').append(json_data);
		}
		else{
			var json_data = '';

			if (data.stock.length == 0) {
				json_data += '<div class="card">';
				json_data += '<div class="list-group-item">';
				json_data += '<span>현재 포착 종목이 없습니다.</span>';
				json_data += '</div>';
				json_data += '</div>';
			}
			else {
				json_data += '<div class="card" style="height:15rem; overflow:hidden; overflow-y:scroll;">';
				$.each(data.stock, function (key, value) {
					json_data += '<a onClick="ChangeData(';
					json_data += "'" + value.name + "', ";
					json_data += "'" + value.buyingPrice + "', ";
					json_data += "'" + value.targetPrice + "', ";
					json_data += "'" + value.paidOffPrice + "', ";
					json_data += "'" + value.captureTime;
					json_data += "'";
					json_data += ');" >';
					json_data += '<div class="list-group-item">';
					json_data += '<span>' + value.captureTime + '</span>';
					json_data += ' ';
					json_data += '<span>' + value.name + '</span>';
					json_data += ' ';
					json_data += '<span>' + value.code + '</span>';
					json_data += '</div>';
					json_data += '</a>';
				});
				json_data += '</div>';
			}
			$('#div-main').append(json_data);
		}

	});
}

function ChangeData(name, buyingPrice, targetPrice, paidOffPrice, captureTime) {
	$('#charts-button').attr('href', '/home/charts?name=' + name);
	$('#buyingPrice').html(buyingPrice);
	$('#targetPrice').html(targetPrice);
	$('#paidOffPrice').html(paidOffPrice);
	$('#captureTime').html(captureTime);
}

$(document).ready(function () {
	clearAll();
	proStockGetJson();
});
