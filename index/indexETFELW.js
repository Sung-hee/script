var etfElwUrl = 'http://www.roooot.info/phps/EtfElwJ.php';


$.getJSON(etfElwUrl, function (data) {
  var elw_data = '';
  var valuePer = '';

  // ELWCall1
  $.each(data.ELWCall1, function (key, value) {
    if (parseFloat(value.per) > 0) {
      valuePer = "<span style='font-size:1.3em; color:red;'>" + value.now + "</span> <span style='font-size:0.75em; color:red;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = "<span style='font-size:1.3em; color:blue;'>" + value.now + "</span> <span style='font-size:0.75em; color:blue;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else {
      valuePer = "<span style='font-size:1.3em;'>" + value.now + "</span> <span style='font-size:0.75em;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }

    elw_data += "<span style='font-size:1.0em; color:black;'>" + value.title + " </span>";
    elw_data += valuePer;
    elw_data += "</br>";
  });

  // ELWCall2
  $.each(data.ELWCall2, function (key, value) {
    if (parseFloat(value.per) > 0) {
      valuePer = "<span style='font-size:1.3em; color:red;'>" + value.now + "</span> <span style='font-size:0.75em; color:red;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = "<span style='font-size:1.3em; color:blue;'>" + value.now + "</span> <span style='font-size:0.75em; color:blue;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else {
      valuePer = "<span style='font-size:1.3em;'>" + value.now + "</span> <span style='font-size:0.75em;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }

    elw_data += "<span style='font-size:1.0em; color:black;'>" + value.title + " </span>";
    elw_data += valuePer;
    elw_data += "</br>";
  });

  // ELWPut1
  $.each(data.ELWPut1, function (key, value) {
    if (parseFloat(value.per) > 0) {
      valuePer = "<span style='font-size:1.3em; color:red;'>" + value.now + "</span> <span style='font-size:0.75em; color:red;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = "<span style='font-size:1.3em; color:blue;'>" + value.now + "</span> <span style='font-size:0.75em; color:blue;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else {
      valuePer = "<span style='font-size:1.3em;'>" + value.now + "</span> <span style='font-size:0.75em;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }

    elw_data += "<span style='font-size:1.0em; color:black;'>" + value.title + " </span>";
    elw_data += valuePer;
    elw_data += "</br>";
  });

  // ELWPut2
  $.each(data.ELWPut2, function (key, value) {
    if (parseFloat(value.per) > 0) {
      valuePer = "<span style='font-size:1.3em; color:red;'>" + value.now + "</span> <span style='font-size:0.75em; color:red;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else if (parseFloat(value.per) < 0) {
      valuePer = "<span style='font-size:1.3em; color:blue;'>" + value.now + "</span> <span style='font-size:0.75em; color:blue;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }
    else {
      valuePer = "<span style='font-size:1.3em;'>" + value.now + "</span> <span style='font-size:0.75em;'> ( " + value.semo + " " + value.per + "% ) </span>";
    }

    elw_data += "<span style='font-size:1.0em; color:black;'>" + value.title + " </span>";
    elw_data += valuePer;
    elw_data += "</br>";
  });

  $('#index-elw-list').html(elw_data);
});
