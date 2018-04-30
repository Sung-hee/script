function clearAll() {
	var max = setTimeout(function () { }, 1);
	for (var i = 1; i <= max; i++) {
		window.clearInterval(i);
		window.clearTimeout(i);
		if (window.mozCancelAnimationFrame) window.mozCancelAnimationFrame(i); // Firefox
	}
}

var botListUrl = 'http://13.125.147.26/phps/botList';
// var botListUrl = 'https://charttest-sungheeek.c9users.io/botList.json';

function botListGetJson() {
	$.getJSON(botListUrl, function (data) {
		$('#bot-list').empty();

		var json_data = '';
		$.each(data, function (key, value) {
			json_data += '<a class="a-to-proStock" href="./proStock.html?bot=' + value.name + '&type=' + value.type + '" style="color: black;">';
			json_data += '<div class="row list-group-item mx-0 px-2">';
			json_data += '<img src="' + value.imgUrl + '" width="20%" />';
			json_data += '<div class="col-auto px-1" style="display: inline-block">';
			json_data += '<div>' + value.nickname + ' [' + value.name + ']</div>';
			json_data += '<div><small class="text-secondary">' + value.propensity + '</small></div>';
			json_data += '</div>';
			json_data += '<h4 class="text-danger float-right px-0" style="display: inline-block">' + value.priceEarningsRatio + '</h4>';
			json_data += '</div>';
			json_data += '</a>';
		});
		$('#bot-list').append(json_data);
	});
}


$(document).ready(function () {
	clearAll();
	botListGetJson();
});
