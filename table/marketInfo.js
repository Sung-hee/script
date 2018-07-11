function clearAll(){
    var max = setTimeout(function(){},1);
    for (var i = 1; i <= max ; i++) {
        window.clearInterval(i);
        window.clearTimeout(i);
        if(window.mozCancelAnimationFrame)window.mozCancelAnimationFrame(i); // Firefox
    }
  }

  function foreignAjax(){
    $.ajax({
      url: "http://www.roooot.info/phps/marketInfoJ.php",
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data){
        // 코스피 코스닥 등락
        $.each(data.dig, function(key, value){
          $('#kospi-um').html("↑ " + value.spiUm);
          $('#kospi-dm').html("↓ " + value.spiDm);
          $('#kospi-bm').html(value.spiBm);
          $('#kosdaq-um').html("↑ " + value.daqUm);
          $('#kosdaq-dm').html("↓ " + value.daqDm);
          $('#kosdaq-bm').html(value.daqBm);
          
          $('#kospi-um').css("color", "red");
          $('#kospi-dm').css("color", "blue");
          $('#kosdaq-um').css("color", "red");
          $('#kosdaq-dm').css("color", "blue");
        });

        // 코스피
        $.each(data.spiFactorNow, function(key, value){
          $('#kospi-current').html(value.spiNowm);
          $('#kospi-variance').html(value.spiPokm);
          $('#kospi-variance_per').html(value.spiPerm);
          $('#kospi-high').html(value.spiVolm);

          if (value.spiPokm.substring(0, 1) == "▲") {
            $('#kospi-variance').css("color", "red");
            $('#kospi-variance_per').css("color", "red");
          }
          else if (value.spiPokm.substring(0, 1) == "▼") {
            $('#kospi-variance').css("color", "blue");
            $('#kospi-variance_per').css("color", "blue");
          }
          else {
            $('#kospi-variance').css("color", "black");
            $('#kospi-variance_per').css("color", "black");
          }
        });

        // 코스닥
        $.each(data.daqFactorNow, function(key, value){
            $('#kosdaq-current').html(value.daqNowm);
            $('#kosdaq-variance').html(value.daqPokm);
            $('#kosdaq-variance_per').html(value.daqPerm);
            $('#kosdaq-high').html(value.daqVolm);

            if (value.daqPokm.substring(0, 1) == "▲") {
              $('#kosdaq-variance').css("color", "red");
              $('#kosdaq-variance_per').css("color", "red");
            }
            else if (value.daqPokm.substring(0, 1) == "▼") {
              $('#kosdaq-variance').css("color", "blue");
              $('#kosdaq-variance_per').css("color", "blue");
            }
            else {
              $('#kosdaq-variance').css("color", "black");
              $('#kosdaq-variance_per').css("color", "black");
            }
        });

        // F-KOSPI200
        $.each(data.fuFactorNow, function(key, value){
            $('#fkospi200-current').html(value.fuNowm);
            $('#fkospi200-variance').html(value.fuPokm);
            $('#fkospi200-variance_per').html(value.fuPerm);
            $('#fkospi200-high').html(value.fuVolm);

            if (value.fuPokm.substring(0, 1) == "▲") {
              $('#fkospi200-variance').css("color", "red");
              $('#fkospi200-variance_per').css("color", "red");
            }
            else if (value.fuPokm.substring(0, 1) == "▼") {
              $('#fkospi200-variance').css("color", "blue");
              $('#fkospi200-variance_per').css("color", "blue");
            }
            else {
              $('#fkospi200-variance').css("color", "black");
              $('#fkospi200-variance_per').css("color", "black");
            }
        });

        // 투자매매동향 거래소
        $.each(data.spiFactorHead, function(key, value){
          $('#exchange-personal').html(value.spiPrim);
          $('#exchange-agency').html(value.spiInm);
          $('#exchange-foreigner').html(value.spiForm);
          $('#exchange-Netforeigners').html(value.spiBkForm);
          $('#exchange-Netforeigners').html(value.spiPuForm);

          // 개인
          if(parseFloat(value.spiPrim) > 0){
            $('#exchange-personal').css("color", "red");
          }
          else if(parseFloat(value.spiPrim) < 0){
            $('#exchange-personal').css("color", "blue");
          }
          else {
            $('#exchange-personal').css("color", "black");
          }
          // 기관계
          if(parseFloat(value.spiInm) > 0){
            $('#exchange-agency').css("color", "red");
            // $('#exchange-agency').css("padding-left", "2.0rem");
          }
          else if(parseFloat(value.spiInm) < 0){
            $('#exchange-agency').css("color", "blue");
            // $('#exchange-agency').css("padding-left", "1.5rem");
          }
          else {
            $('#exchange-agency').css("color", "black");
            // $('#exchange-agency').css("padding-left", "2.0rem");
          }
          // 외국인
          if(parseFloat(value.spiForm) > 0){
            $('#exchange-foreigner').css("color", "red");
            // $('#exchange-foreigner').css("padding-left", "2.5rem");
          }
          else if(parseFloat(value.spiForm) < 0){
            $('#exchange-foreigner').css("color", "blue");
            // $('#exchange-foreigner').css("padding-left", "1.5rem");
          }
          else {
            $('#exchange-foreigner').css("color", "black");
            // $('#exchange-foreigner').css("padding-left", "2.5rem");
          }
          // 순외국인
          if(parseFloat(value.spiBkForm) > 0){
            $('#exchange-Netforeigners').css("color", "red");
            // $('#exchange-Netforeigners').css("padding-left", "1.5rem");
          }
          else if(parseFloat(value.spiBkForm) < 0){
            $('#exchange-Netforeigners').css("color", "blue");
            // $('#exchange-Netforeigners').css("padding-left", "1.0rem");
          }
          else {
            $('#exchange-Netforeigners').css("color", "black");
            // $('#exchange-Netforeigners').css("padding-left", "1.5rem");
          }
          // 국내외국계
          if(parseFloat(value.spiPuForm) > 0){
            $('#exchange-DomesticForeign').css("color", "red");
            // $('#exchange-DomesticForeign').css("padding-left", "2rem");
          }
          else if(parseFloat(value.spiPuForm) < 0){
            $('#exchange-DomesticForeign').css("color", "blue");
            // $('#exchange-DomesticForeign').css("padding-left", "2rem");
          }
          else {
            $('#exchange-DomesticForeign').css("color", "black");
            // $('#exchange-DomesticForeign').css("padding-left", "2rem");
          }
        });

        // 투자매매동향 코스닥
        $.each(data.daqFactorHead, function(key, value){
          $('#kosdaq-personal').html(value.daqPrim);
          $('#kosdaq-agency').html(value.daqInm);
          $('#kosdaq-foreigner').html(value.daqForm);
          $('#kosdaq-Netforeigners').html(value.daqBkForm);
          $('#kosdaq-DomesticForeign').html(value.daqPuForm);

          // 개인
          if(parseFloat(value.daqPrim) > 0){
            $('#kosdaq-personal').css("color", "red");
          }
          else if(parseFloat(value.daqPrim) < 0){
            $('#kosdaq-personal').css("color", "blue");
          }
          else {
            $('#kosdaq-personal').css("color", "black");
          }
          // 기관계
          if(parseFloat(value.daqInm) > 0){
            $('#kosdaq-agency').css("color", "red");
            // $('#kosdaq-agency').css("padding-left", "2.5rem");
          }
          else if(parseFloat(value.daqInm) < 0){
            $('#kosdaq-agency').css("color", "blue");
            // $('#kosdaq-agency').css("padding-left", "1.5rem");
          }
          else {
            $('#kosdaq-agency').css("color", "black");
            // $('#kosdaq-agency').css("padding-left", "2.5rem");
          }
          // 외국인
          if(parseFloat(value.daqForm) > 0){
            $('#kosdaq-foreigner').css("color", "red");
            // $('#kosdaq-foreigner').css("padding-left", "2.0rem");
          }
          else if(parseFloat(value.daqForm) < 0){
            $('#kosdaq-foreigner').css("color", "blue");
            // $('#kosdaq-foreigner').css("padding-left", "1.5rem");
          }
          else {
            $('#kosdaq-foreigner').css("color", "black");
            // $('#kosdaq-foreigner').css("padding-left", "2.0rem");
          }
          // 순외국인
          if(parseFloat(value.daqBkForm) > 0){
            $('#kosdaq-Netforeigners').css("color", "red");
            // $('#kosdaq-Netforeigners').css("padding-left", "1.5rem");
          }
          else if(parseFloat(value.daqBkForm) < 0){
            $('#kosdaq-Netforeigners').css("color", "blue");
            // $('#kosdaq-Netforeigners').css("padding-left", "1.0rem");
          }
          else {
            $('#kosdaq-Netforeigners').css("color", "black");
            // $('#kosdaq-Netforeigners').css("padding-left", "1.5rem");
          }
          // 국내기관계
          if(parseFloat(value.daqPuForm) > 0){
            $('#kosdaq-DomesticForeign').css("color", "red");
            // $('#kosdaq-DomesticForeign').css("padding-left", "2rem");
          }
          else if(parseFloat(value.daqPuForm) < 0){
            $('#kosdaq-DomesticForeign').css("color", "blue");
            // $('#kosdaq-DomesticForeign').css("padding-left", "2rem");
          }
          else {
            $('#kosdaq-DomesticForeign').css("color", "black");
            // $('#kosdaq-DomesticForeign').css("padding-left", "2rem");
          }
        });
      }
    });
  }

  $(document).ready(function(){
    clearAll();

    var foreignInterval = setInterval(foreignAjax, 2000);
    $('#korea_fluctuation_table').DataTable({
      "paging": false,
      "scrollY": '100rem',
      "scrollX": true,
      "scrollCollapse": true,
      "autoWidth": false,
      // "columnDefs": [
      //   { "width": "2rem", "targets": 0 },
      //   { "width": "3rem", "targets": 1 },
      //   { "width": "3rem", "targets": 2 },
      //   { "width": "4rem", "targets": 3 },
      // ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });
    $('#korea_table').DataTable({
      "paging": false,
      "scrollY": '100rem',
      "scrollX": true,
      "scrollCollapse": true,
      "autoWidth": false,
      "columnDefs": [
        { "width": "4rem", "targets": 0 },
        { "width": "3rem", "targets": 1 },
        { "width": "3rem", "targets": 2 },
        { "width": "4rem", "targets": 3 },
        { "width": "5rem", "targets": 4 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });

    $('#supply_table').DataTable({
      "paging": false,
      "scrollY": '100rem',
      "scrollX": true,
      "scrollCollapse": true,
      "autoWidth": false,
      "columnDefs": [
        { "width": "5rem", "targets": 0 },
        { "width": "5rem", "targets": 1 },
        { "width": "4rem", "targets": 2 },
        { "width": "4rem", "targets": 3 },
        { "width": "5rem", "targets": 4 },
        { "width": "5rem", "targets": 5 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });


    $('#financial_trend_table').DataTable({
      "paging": false,
      "scrollY": '100rem',
      "scrollX": true,
      "scrollCollapse": true,
      "autoWidth": false,
      "columnDefs": [
        { "width": "4rem", "targets": 0 },
        { "width": "8rem", "targets": 1 },
        { "width": "6rem", "targets": 2 },
        { "width": "7rem", "targets": 3 },
        { "width": "7rem", "targets": 4 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });
  });