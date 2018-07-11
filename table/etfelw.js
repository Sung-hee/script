function clearAll() {
  var max = setTimeout(function () { }, 1);
  for (var i = 1; i <= max; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
    if (window.mozCancelAnimationFrame) window.mozCancelAnimationFrame(i); // Firefox
  }
}

function etfElwAjax() {
  $.ajax({
    url: "http://www.roooot.info/phps/EtfElwJ.php",
    type: "GET",
    dataType: "json",
    async: true,
    success: function (data) {
      // ETF1
      $.each(data.ETF1, function (key, value) {
        $('#etf1').html(value.title);

        var etf1Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#etf1Value').html(etf1Value);

        if (value.semo == "▲") {
          $('#etf1Value').css("color", "red");
        }
        else if (value.semo == "▼") {
          $('#etf1Value').css("color", "blue");
        }
        else {
          $('#etf1Value').css("color", "black");
        }
      });

      // ETF2
      $.each(data.ETF2, function (key, value) {
        $('#etf2').html(value.title);

        var etf2Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#etf2Value').html(etf2Value);

        if (value.semo == "▲") {
          $('#etf2Value').css("color", "red");
        }
        else if (value.semo == "▼") {
          $('#etf2Value').css("color", "blue");
        }
        else {
          $('#etf2Value').css("color", "black");
        }
      });

      // ETF3
      $.each(data.ETF3, function (key, value) {
        $('#etf3').html(value.title);

        var etf3Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#etf3Value').html(etf3Value);

        if (value.semo == "▲") {
          $('#etf3Value').css("color", "red");
        }
        else if (value.semo == "▼") {
          $('#etf3Value').css("color", "blue");
        }
        else {
          $('#etf3Value').css("color", "black");
        }
      });
      // ETF4
      $.each(data.ETF4, function (key, value) {
        $('#etf4').html(value.title);

        var etf4Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#etf4Value').html(etf4Value);

        // kodex200
        if (value.semo == "▲") {
          $('#etf4Value').css("color", "red");
        }
        else if (value.semo == "▼") {
          $('#etf4Value').css("color", "blue");
        }
        else {
          $('#etf4Value').css("color", "black");
        }
      });

      // ETF5
      $.each(data.ETF5, function (key, value) {
        $('#etf5').html(value.title);

        var etf5Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#etf5Value').html(etf5Value);

        if (value.semo == "▲") {
          $('#etf5Value').css("color", "red");
        }
        else if (value.semo == "▼") {
          $('#etf5Value').css("color", "blue");
        }
        else {
          $('#etf5Value').css("color", "black");
        }
      });

      // ELWCall1
      $.each(data.ELWCall1, function (key, value) {
        var valueTitme = value.title;
        var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("red");

        $('#elwCall1').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);


        var elwCallValue1 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#elwCallValue1').html(elwCallValue1);

        if (value.semo == "▲") {
          // $('#elwCall1').css("color", "red");
          $('#elwCallValue1').css("color", "red");
        }
        else if (value.semo == "▼") {
          // $('#elwCall1').css("color", "blue");
          $('#elwCallValue1').css("color", "blue");
        }
        else {
          // $('#elwCall1').css("color", "black");
          $('#elwCallValue1').css("color", "black");
        }
      });

      // ELWCall2
      $.each(data.ELWCall2, function (key, value) {
        var valueTitme = value.title;
        var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("red");

        $('#elwCall2').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);

        var elwCallValue2 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#elwCallValue2').html(elwCallValue2);

        if (value.semo == "▲") {
          // $('#elwCall2').css("color", "red");
          $('#elwCallValue2').css("color", "red");
        }
        else if (value.semo == "▼") {
          // $('#elwCall2').css("color", "blue");
          $('#elwCallValue2').css("color", "blue");
        }
        else {
          // $('#elwCall2').css("color", "black");
          $('#elwCallValue2').css("color", "black");
        }
      });

      // ELWPut1
      $.each(data.ELWPut1, function (key, value) {
        var valueTitme = value.title;
        var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("blue");

        $('#elwPut1').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);

        var elwPutValue1 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#elwPutValue1').html(elwPutValue1);

        if (value.semo == "▲") {
          // $('#elwPut1').css("color", "red");
          $('#elwPutValue1').css("color", "red");
        }
        else if (value.semo == "▼") {
          // $('#elwPut1').css("color", "blue");
          $('#elwPutValue1').css("color", "blue");
        }
        else {
          // $('#elwPut1').css("color", "black");
          $('#elwPutValue1').css("color", "black");
        }
      });

      // ELWPut2
      $.each(data.ELWPut2, function (key, value) {
        var valueTitme = value.title;
        var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("blue");

        $('#elwPut2').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);

        var elwPutValue2 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
        $('#elwPutValue2').html(elwPutValue2);

        if (value.semo == "▲") {
          // $('#elwPut2').css("color", "red");
          $('#elwPutValue2').css("color", "red");
        }
        else if (value.semo == "▼") {
          // $('#elwPut2').css("color", "blue");
          $('#elwPutValue2').css("color", "blue");
        }
        else {
          // $('#elwPut2').css("color", "black");
          $('#elwPutValue2').css("color", "black");
        }
      });
    }
  });
}


var etfElwJUrl = 'http://www.roooot.info/phps/EtfElwJ.php';

$(document).ready(function () {
  clearAll();

  $.getJSON(etfElwJUrl, function (data) {

    // ETF1
    $.each(data.ETF1, function (key, value) {
      $('#etf1').html(value.title);

      var etf1Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#etf1Value').html(etf1Value);

      if (value.semo == "▲") {
        $('#etf1Value').css("color", "red");
      }
      else if (value.semo == "▼") {
        $('#etf1Value').css("color", "blue");
      }
      else {
        $('#etf1Value').css("color", "black");
      }
    });

    // ETF2
    $.each(data.ETF2, function (key, value) {
      $('#etf2').html(value.title);

      var etf2Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#etf2Value').html(etf2Value);

      if (value.semo == "▲") {
        $('#etf2Value').css("color", "red");
      }
      else if (value.semo == "▼") {
        $('#etf2Value').css("color", "blue");
      }
      else {
        $('#etf2Value').css("color", "black");
      }
    });

    // ETF3
    $.each(data.ETF3, function (key, value) {
      $('#etf3').html(value.title);

      var etf3Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#etf3Value').html(etf3Value);

      if (value.semo == "▲") {
        $('#etf3Value').css("color", "red");
      }
      else if (value.semo == "▼") {
        $('#etf3Value').css("color", "blue");
      }
      else {
        $('#etf3Value').css("color", "black");
      }
    });
    // ETF4
    $.each(data.ETF4, function (key, value) {
      $('#etf4').html(value.title);

      var etf4Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#etf4Value').html(etf4Value);

      if (value.semo == "▲") {
        $('#etf4Value').css("color", "red");
      }
      else if (value.semo == "▼") {
        $('#etf4Value').css("color", "blue");
      }
      else {
        $('#etf4Value').css("color", "black");
      }
    });

    // ETF5
    $.each(data.ETF5, function (key, value) {
      $('#etf5').html(value.title);

      var etf5Value = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#etf5Value').html(etf5Value);

      // kodex200
      if (value.semo == "▲") {
        $('#etf5Value').css("color", "red");
      }
      else if (value.semo == "▼") {
        $('#etf5Value').css("color", "blue");
      }
      else {
        $('#etf5Value').css("color", "black");
      }
    });

    // ELWCall1
    $.each(data.ELWCall1, function (key, value) {
      var valueTitme = value.title;
      var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("red");

      $('#elwCall1').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);


      var elwCallValue1 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#elwCallValue1').html(elwCallValue1);

      if (value.semo == "▲") {
        // $('#elwCall1').css("color", "red");
        $('#elwCallValue1').css("color", "red");
      }
      else if (value.semo == "▼") {
        // $('#elwCall1').css("color", "blue");
        $('#elwCallValue1').css("color", "blue");
      }
      else {
        // $('#elwCall1').css("color", "black");
        $('#elwCallValue1').css("color", "black");
      }
    });

    // ELWCall2
    $.each(data.ELWCall2, function (key, value) {
      var valueTitme = value.title;
      var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("red");

      $('#elwCall2').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);

      var elwCallValue2 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#elwCallValue2').html(elwCallValue2);

      if (value.semo == "▲") {
        // $('#elwCall2').css("color", "red");
        $('#elwCallValue2').css("color", "red");
      }
      else if (value.semo == "▼") {
        // $('#elwCall2').css("color", "blue");
        $('#elwCallValue2').css("color", "blue");
      }
      else {
        // $('#elwCall2').css("color", "black");
        $('#elwCallValue2').css("color", "black");
      }
    });

    // ELWPut1
    $.each(data.ELWPut1, function (key, value) {
      var valueTitme = value.title;
      var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("blue");

      $('#elwPut1').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);

      var elwPutValue1 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#elwPutValue1').html(elwPutValue1);

      if (value.semo == "▲") {
        // $('#elwPut1').css("color", "red");
        $('#elwPutValue1').css("color", "red");
      }
      else if (value.semo == "▼") {
        // $('#elwPut1').css("color", "blue");
        $('#elwPutValue1').css("color", "blue");
      }
      else {
        // $('#elwPut1').css("color", "black");
        $('#elwPutValue1').css("color", "black");
      }
    });

    // ELWPut2
    $.each(data.ELWPut2, function (key, value) {
      var valueTitme = value.title;
      var titleLast = valueTitme.substr(valueTitme.length - 1).fontcolor("blue");

      $('#elwPut2').html(valueTitme.substr(0, valueTitme.length - 1) + titleLast);

      var elwPutValue2 = value.now + '( ' + value.semo + ' ' + value.per + '% )';
      $('#elwPutValue2').html(elwPutValue2);

      if (value.semo == "▲") {
        // $('#elwPut2').css("color", "red");
        $('#elwPutValue2').css("color", "red");
      }
      else if (value.semo == "▼") {
        // $('#elwPut2').css("color", "blue");
        $('#elwPutValue2').css("color", "blue");
      }
      else {
        // $('#elwPut2').css("color", "black");
        $('#elwPutValue2').css("color", "black");
      }
    });
  });

  var etfElwInterval = setInterval(etfElwAjax, 60000);
  $('#etf_table').DataTable({
    "paging": false,
    "scrollY": '100rem',
    "scrollX": true,
    "scrollCollapse": true,
    "autoWidth": false,
    "columnDefs": [
      { "width": "1rem", "targets": 0 },
      { "width": "15rem", "targets": 1 },
      { "width": "5rem", "targets": 2 },
      // { "width": "4rem", "targets": 3 },
      // { "width": "5rem", "targets": 4 },
      // { "width": "5rem", "targets": 5 },
    ],
    "ordering": false,
    "fixedColumns": true,
    "bInfo": false,
    // "sinfo": false,
    "bFilter": false,
    //   "bDestroy": true
  });

  $('#elw_table').DataTable({
    "paging": false,
    "scrollY": '100rem',
    "scrollX": true,
    "scrollCollapse": true,
    "autoWidth": false,
    "columnDefs": [
      { "width": "1rem", "targets": 0 },
      { "width": "15rem", "targets": 1 },
      { "width": "5rem", "targets": 2 },
      // { "width": "10rem", "targets": 3 },
      // { "width": "5rem", "targets": 4 },
      //   { "width": "6rem", "targets": 5 },
      //   { "width": "3rem", "targets": 6 },
    ],
    "ordering": false,
    "fixedColumns": true,
    "bInfo": false,
    // "sinfo": false,
    "bFilter": false,
    //   "bDestroy": true
  });
});
