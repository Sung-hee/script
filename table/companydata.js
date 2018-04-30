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
  $.getJSON('http://13.125.147.26/phps/now?name=' + companycode, function(data){
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
});
