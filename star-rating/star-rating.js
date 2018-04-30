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


$(document).ready(function(){
  $.getJSON('http://61.72.187.6/phps/now?name=' + companycode, function(data){
    var json_data = '';

    $.each(data, function(key, value){
        const ratings = {
          hotel_a : value.gold,
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
        json_data += '<span style="font-size: 25px; color:#FF4500">&nbsp;&nbsp;'+value.gold+'</span>';
    });
    $('#company_score').append(json_data);
  });

  $.getJSON('http://61.72.187.6/phps/now?name=' + companycode, function(data){
    var score_data = '';
    score_data += '<div class="row text-center">';

    $.each(data, function(key, value){

      //파워
      score_data += '<div class="card-body d-inline-block text-center"><div class="h4">파워등급</div>';

      if(value.power == "1 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade1" class="rounded d-inline-block" alt="1등급">';
      }
      else if (value.power == "1.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade2" class="rounded d-inline-block" alt="1.5등급">';
      }
      else if(value.power == "2 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade3" class="rounded d-inline-block" alt="2등급">';
      }
      else if (value.power == "2.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade4" class="rounded d-inline-block" alt="2.5등급">';
      }
      else if(value.power == "3 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade5" class="rounded d-inline-block" alt="3등급">';
      }
      else if (value.power == "3.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade6" class="rounded d-inline-block" alt="3.5등급">';
      }
      else if(value.power == "4 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade7" class="rounded d-inline-block" alt="4등급">';
      }
      else if (value.power == "4.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade8" class="rounded d-inline-block" alt="4.5등급">';
      }
      else if(value.power == "5 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade9" class="rounded d-inline-block" alt="5등급">';
      }
      else if (value.power == "5.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade10" class="rounded d-inline-block" alt="5.5등급">';
      }
      else {
        score_data += '<img src="http://61.72.187.6/images/gay/grade11" class="rounded d-inline-block" alt="낙제">';
      }
      score_data += '<div class="h5">' + value.power + '</div></div>';

      //수급
      score_data += '<div class="card-body d-inline-block text-center"><div class="h4">수급등급</div>';

      if(value.supl == "1 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade1" class="rounded d-inline-block" alt="1등급">';
      }
      else if (value.supl == "1.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade2" class="rounded d-inline-block" alt="1.5등급">';
      }
      else if(value.supl == "2 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade3" class="rounded d-inline-block" alt="2등급">';
      }
      else if (value.supl == "2.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade4" class="rounded d-inline-block" alt="2.5등급">';
      }
      else if(value.supl == "3 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade5" class="rounded d-inline-block" alt="3등급">';
      }
      else if (value.supl == "3.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade6" class="rounded d-inline-block" alt="3.5등급">';
      }
      else if(value.supl == "4 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade7" class="rounded d-inline-block" alt="4등급">';
      }
      else if (value.supl == "4.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade8" class="rounded d-inline-block" alt="4.5등급">';
      }
      else if(value.supl == "5 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade9" class="rounded d-inline-block" alt="5등급">';
      }
      else if (value.supl == "5.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade10" class="rounded d-inline-block" alt="5.5등급">';
      }
      else {
        score_data += '<img src="http://61.72.187.6/images/gay/grade11" class="rounded d-inline-block" alt="낙제">';
      }
      score_data += '<div class="h5">' + value.supl + '</div></div>';

      //실적
      score_data += '<div class="card-body d-inline-block text-center"><div class="h4">실적등급</div>';

      if(value.perform == "1 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade1" class="rounded d-inline-block" alt="1등급">';
      }
      else if (value.perform == "1.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade2" class="rounded d-inline-block" alt="1.5등급">';
      }
      else if(value.perform == "2 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade3" class="rounded d-inline-block" alt="2등급">';
      }
      else if (value.perform == "2.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade4" class="rounded d-inline-block" alt="2.5등급">';
      }
      else if(value.perform == "3 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade5" class="rounded d-inline-block" alt="3등급">';
      }
      else if (value.perform == "3.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade6" class="rounded d-inline-block" alt="3.5등급">';
      }
      else if(value.perform == "4 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade7" class="rounded d-inline-block" alt="4등급">';
      }
      else if (value.perform == "4.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade8" class="rounded d-inline-block" alt="4.5등급">';
      }
      else if(value.perform == "5 등급"){
        score_data += '<img src="http://61.72.187.6/images/gay/grade9" class="rounded d-inline-block" alt="5등급">';
      }
      else if (value.perform == "5.5 등급") {
        score_data += '<img src="http://61.72.187.6/images/gay/grade10" class="rounded d-inline-block" alt="5.5등급">';
      }
      else {
        score_data += '<img src="http://61.72.187.6/images/gay/grade11" class="rounded d-inline-block" alt="낙제">';
      }
      score_data += '<div class="h5">' + value.perform + '</div></div>';
    });
    $('#power_score').append(score_data);
  });
});
