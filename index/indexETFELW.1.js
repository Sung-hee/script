var etfElwUrl = 'http://www.roooot.info/phps/EtfElwJ.php';


$.getJSON(etfElwUrl, function (data) {
  $('#index-elw-list').empty();

  var elw_data = '';
  var valuePer = '';

  // ELWCall1
  $.each(data.ELWCall1, function (key, value) {

    if (parseFloat(value.per) > 0) {
      valuePer = '<font class="text-danger">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = '<font class="text-primary">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else {
      valuePer = '<font>' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }

    elw_data += '<a class="list-group-item list-group-item-action" href="/home/EtfElwInfo">';
    elw_data += '<div class="float-right">';
    elw_data += valuePer;
    elw_data += '</div>';
    elw_data += '<div>';
    elw_data += value.title;
    elw_data += '</div>';
    elw_data += '</a>';
  });

  // ELWCall2
  $.each(data.ELWCall2, function (key, value) {

    if (parseFloat(value.per) > 0) {
      valuePer = '<font class="text-danger">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = '<font class="text-primary">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else {
      valuePer = '<font>' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }

    elw_data += '<a class="list-group-item list-group-item-action" href="/home/EtfElwInfo">';
    elw_data += '<div class="float-right">';
    elw_data += valuePer;
    elw_data += '</div>';
    elw_data += '<div>';
    elw_data += value.title;
    elw_data += '</div>';
    elw_data += '</a>';
  });

  // ELWPut1
  $.each(data.ELWPut1, function (key, value) {

    if (parseFloat(value.per) > 0) {
      valuePer = '<font class="text-danger">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = '<font class="text-primary">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else {
      valuePer = '<font>' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }

    elw_data += '<a class="list-group-item list-group-item-action" href="/home/EtfElwInfo">';
    elw_data += '<div class="float-right">';
    elw_data += valuePer;
    elw_data += '</div>';
    elw_data += '<div>';
    elw_data += value.title;
    elw_data += '</div>';
    elw_data += '</a>';
  });

  // ELWPut2
  $.each(data.ELWPut2, function (key, value) {

    if (parseFloat(value.per) > 0) {
      valuePer = '<font class="text-danger">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = '<font class="text-primary">' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }
    else {
      valuePer = '<font>' + value.now + ' ( ' + value.semo + value.per + '% )</font>';
    }

    elw_data += '<a class="list-group-item list-group-item-action" href="/home/EtfElwInfo">';
    elw_data += '<div class="float-right">';
    elw_data += valuePer;
    elw_data += '</div>';
    elw_data += '<div>';
    elw_data += value.title;
    elw_data += '</div>';
    elw_data += '</a>';
  });

  $('#index-elw-list').append(elw_data);
});
