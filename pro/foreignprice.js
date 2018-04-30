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
      url: "http://61.72.187.6/phps/forNowJ",
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data){
        // 투자매매동향 거래소
        $.each(data.investExchange, function(key, value){
          $('#exchange-personal').html(value.personal);
          $('#exchange-agency').html(value.agency);
          $('#exchange-foreigner').html(value.foreigner);
          $('#exchange-Netforeigners').html(value.Netforeigners);
          $('#exchange-DomesticForeign').html(value.DomesticForeign);

          // 개인
          if(parseFloat(value.personal) > 0){
            $('#exchange-personal').css("color", "red");
            $('#exchange-personal').css("padding-left", "1.5rem");
          }
          else if(parseFloat(value.personal) < 0){
            $('#exchange-personal').css("color", "blue");
            $('#exchange-personal').css("padding-left", "1.0rem");
          }
          else {
            $('#exchange-personal').css("color", "black");
            $('#exchange-personal').css("padding-left", "1.5rem");
          }
          // 기관계
          if(parseFloat(value.foreigner) > 0){
            $('#exchange-agency').css("color", "red");
            $('#exchange-agency').css("padding-left", "2.0rem");
          }
          else if(parseFloat(value.foreigner) < 0){
            $('#exchange-agency').css("color", "blue");
            $('#exchange-agency').css("padding-left", "1.5rem");
          }
          else {
            $('#exchange-agency').css("color", "black");
            $('#exchange-agency').css("padding-left", "2.0rem");
          }
          // 외국인
          if(parseFloat(value.agency) > 0){
            $('#exchange-foreigner').css("color", "red");
            $('#exchange-foreigner').css("padding-left", "2.5rem");
          }
          else if(parseFloat(value.agency) < 0){
            $('#exchange-foreigner').css("color", "blue");
            $('#exchange-foreigner').css("padding-left", "1.5rem");
          }
          else {
            $('#exchange-foreigner').css("color", "black");
            $('#exchange-foreigner').css("padding-left", "2.5rem");
          }
          // 순외국인
          if(parseFloat(value.Netforeigners) > 0){
            $('#exchange-Netforeigners').css("color", "red");
            $('#exchange-Netforeigners').css("padding-left", "1.5rem");
          }
          else if(parseFloat(value.Netforeigners) < 0){
            $('#exchange-Netforeigners').css("color", "blue");
            $('#exchange-Netforeigners').css("padding-left", "1.0rem");
          }
          else {
            $('#exchange-Netforeigners').css("color", "black");
            $('#exchange-Netforeigners').css("padding-left", "1.5rem");
          }
          // 국내외국계
          if(parseFloat(value.DomesticForeign) > 0){
            $('#exchange-DomesticForeign').css("color", "red");
            $('#exchange-DomesticForeign').css("padding-left", "2rem");
          }
          else if(parseFloat(value.DomesticForeign) < 0){
            $('#exchange-DomesticForeign').css("color", "blue");
            $('#exchange-DomesticForeign').css("padding-left", "1.5rem");
          }
          else {
            $('#exchange-DomesticForeign').css("color", "black");
            $('#exchange-DomesticForeign').css("padding-left", "2rem");
          }
        });

        // 투자매매동향 코스닥
        $.each(data.investKosdaq, function(key, value){
          $('#kosdaq-personal').html(value.personal);
          $('#kosdaq-agency').html(value.agency);
          $('#kosdaq-foreigner').html(value.foreigner);
          $('#kosdaq-Netforeigners').html(value.Netforeigners);
          $('#kosdaq-DomesticForeign').html(value.DomesticForeign);

          // 개인
          if(parseFloat(value.personal) > 0){
            $('#kosdaq-personal').css("color", "red");
            $('#kosdaq-personal').css("padding-left", "1.5rem");
          }
          else if(parseFloat(value.personal) < 0){
            $('#kosdaq-personal').css("color", "blue");
            $('#kosdaq-personal').css("padding-left", "1.0rem");
          }
          else {
            $('#kosdaq-personal').css("color", "black");
            $('#kosdaq-personal').css("padding-left", "1.5rem");
          }
          // 기관계
          if(parseFloat(value.agency) > 0){
            $('#kosdaq-agency').css("color", "red");
            $('#kosdaq-agency').css("padding-left", "2.5rem");
          }
          else if(parseFloat(value.agency) < 0){
            $('#kosdaq-agency').css("color", "blue");
            $('#kosdaq-agency').css("padding-left", "1.5rem");
          }
          else {
            $('#kosdaq-agency').css("color", "black");
            $('#kosdaq-agency').css("padding-left", "2.5rem");
          }
          // 외국인
          if(parseFloat(value.foreigner) > 0){
            $('#kosdaq-foreigner').css("color", "red");
            $('#kosdaq-foreigner').css("padding-left", "2.0rem");
          }
          else if(parseFloat(value.foreigner) < 0){
            $('#kosdaq-foreigner').css("color", "blue");
            $('#kosdaq-foreigner').css("padding-left", "1.5rem");
          }
          else {
            $('#kosdaq-foreigner').css("color", "black");
            $('#kosdaq-foreigner').css("padding-left", "2.0rem");
          }
          // 순외국인
          if(parseFloat(value.Netforeigners) > 0){
            $('#kosdaq-Netforeigners').css("color", "red");
            $('#kosdaq-Netforeigners').css("padding-left", "1.5rem");
          }
          else if(parseFloat(value.Netforeigners) < 0){
            $('#kosdaq-Netforeigners').css("color", "blue");
            $('#kosdaq-Netforeigners').css("padding-left", "1.0rem");
          }
          else {
            $('#kosdaq-Netforeigners').css("color", "black");
            $('#kosdaq-Netforeigners').css("padding-left", "1.5rem");
          }
          // 국내기관계
          if(parseFloat(value.DomesticForeign) > 0){
            $('#kosdaq-DomesticForeign').css("color", "red");
            $('#kosdaq-DomesticForeign').css("padding-left", "2rem");
          }
          else if(parseFloat(value.DomesticForeign) < 0){
            $('#kosdaq-DomesticForeign').css("color", "blue");
            $('#kosdaq-DomesticForeign').css("padding-left", "1rem");
          }
          else {
            $('#kosdaq-DomesticForeign').css("color", "black");
            $('#kosdaq-DomesticForeign').css("padding-left", "2rem");
          }
        });

        // 코스피
        $.each(data.KOSPI, function(key, value){
          $('#kospi-current').html(value.current);
          $('#kospi-variance').html(value.variance);
          $('#kospi-variance_per').html(value.variance_per);
          $('#kospi-high').html(value.high);
          $('#kospi-low').html(value.low);
          $('#kospi-hours').html(value.hours);

          if(parseFloat(value.variance_per) > 0){
            $('#kospi-variance').css("color", "red");
            $('#kospi-variance_per').css("color", "red");
          }
          else if(parseFloat(value.variance_per) < 0){
            $('#kospi-variance').css("color", "blue");
            $('#kospi-variance_per').css("color", "blue");
          }
          else {
            $('#kospi-variance').css("color", "black");
            $('#kospi-variance_per').css("color", "black");
          }
        });

        // 코스닥
        $.each(data.KOSDAQ, function(key, value){
            $('#kosdaq-current').html(value.current);
            $('#kosdaq-variance').html(value.variance);
            $('#kosdaq-variance_per').html(value.variance_per);
            $('#kosdaq-high').html(value.high);
            $('#kosdaq-low').html(value.low);
            $('#kosdaq-hours').html(value.hours);

            if(parseFloat(value.variance) > 0){
              $('#kosdaq-variance').css("color", "red");
              $('#kosdaq-variance_per').css("color", "red");
            }
            else if(parseFloat(value.variance) < 0){
              $('#kosdaq-variance').css("color", "blue");
              $('#kosdaq-variance_per').css("color", "blue");
            }
            else {
              $('#kosdaq-variance').css("color", "black");
              $('#kosdaq-variance_per').css("color", "black");
            }
        });

				// // 선물지수
				// 다우존스
				$.each(data.dji, function(key, value){
					$('#dji-current').html(value.current);
					$('#dji-variance').html(value.variance);
					$('#dji-variance_per').html(value.variance_per);
					$('#dji-high').html(value.high);
					$('#dji-low').html(value.low);
					$('#dji-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#dji-variance').css("color", "red");
						$('#dji-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#dji-variance').css("color", "blue");
						$('#dji-variance_per').css("color", "blue");
					}
					else {
						$('#dji-variance').css("color", "black");
						$('#dji-variance_per').css("color", "black");
					}
				});

				// S&P 500
        $.each(data.sp500, function(key, value){
					$('#sp500-current').html(value.current);
					$('#sp500-variance').html(value.variance);
					$('#sp500-variance_per').html(value.variance_per);
					$('#sp500-high').html(value.high);
					$('#sp500-low').html(value.low);
					$('#sp500-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#sp500-variance').css("color", "red");
						$('#sp500-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#sp500-variance').css("color", "blue");
						$('#sp500-variance_per').css("color", "blue");
					}
					else {
						$('#sp500-variance').css("color", "black");
						$('#sp500-variance_per').css("color", "black");
					}
        });

				// 나스닥 100
        $.each(data.nasdaq, function(key, value){
					$('#nasdaq-current').html(value.current);
					$('#nasdaq-variance').html(value.variance);
					$('#nasdaq-variance_per').html(value.variance_per);
					$('#nasdaq-high').html(value.high);
					$('#nasdaq-low').html(value.low);
					$('#nasdaq-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#nasdaq-variance').css("color", "red");
						$('#nasdaq-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#nasdaq-variance').css("color", "blue");
						$('#nasdaq-variance_per').css("color", "blue");
					}
					else {
						$('#nasdaq-variance').css("color", "black");
						$('#nasdaq-variance_per').css("color", "black");
					}
        });

        // // 세계주요지수
        // 닛케이
        $.each(data.nikkei, function(key, value){
          $('#nikkei-current').html(value.current);
					$('#nikkei-variance').html(value.variance);
					$('#nikkei-variance_per').html(value.variance_per);
					$('#nikkei-high').html(value.high);
					$('#nikkei-low').html(value.low);
					$('#nikkei-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#nikkei-variance').css("color", "red");
						$('#nikkei-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#nikkei-variance').css("color", "blue");
						$('#nikkei-variance_per').css("color", "blue");
					}
					else {
						$('#nikkei-variance').css("color", "black");
						$('#nikkei-variance_per').css("color", "black");
					}
        });

				// 상하이종합
        $.each(data.ssec, function(key, value){
          $('#ssec-current').html(value.current);
					$('#ssec-variance').html(value.variance);
					$('#ssec-variance_per').html(value.variance_per);
					$('#ssec-high').html(value.high);
					$('#ssec-low').html(value.low);
					$('#ssec-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#ssec-variance').css("color", "red");
						$('#ssec-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#ssec-variance').css("color", "blue");
						$('#ssec-variance_per').css("color", "blue");
					}
					else {
						$('#ssec-variance').css("color", "black");
						$('#ssec-variance_per').css("color", "black");
					}
        });

				// // 실시간 상품
				// 금
        $.each(data.gold, function(key, value){
          $('#gold-current').html(value.current);
					$('#gold-variance').html(value.variance);
					$('#gold-variance_per').html(value.variance_per);
					$('#gold-high').html(value.high);
					$('#gold-low').html(value.low);
					$('#gold-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#gold-variance').css("color", "red");
						$('#gold-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#gold-variance').css("color", "blue");
						$('#gold-variance_per').css("color", "blue");
					}
					else {
						$('#gold-variance').css("color", "black");
						$('#gold-variance_per').css("color", "black");
					}
        });

				// WTI유
        $.each(data.wti, function(key, value){
          $('#wti-current').html(value.current);
					$('#wti-variance').html(value.variance);
					$('#wti-variance_per').html(value.variance_per);
					$('#wti-high').html(value.high);
					$('#wti-low').html(value.low);
					$('#wti-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#wti-variance').css("color", "red");
						$('#wti-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#wti-variance').css("color", "blue");
						$('#wti-variance_per').css("color", "blue");
					}
					else {
						$('#wti-variance').css("color", "black");
						$('#wti-variance_per').css("color", "black");
					}
        });

				// // 환율
				// 미국 달러
				$.each(data.usdkrw, function(key, value){
					$('#usdkrw-current').html(value.current);
					$('#usdkrw-variance').html(value.variance);
					$('#usdkrw-variance_per').html(value.variance_per);
					$('#usdkrw-high').html(value.high);
					$('#usdkrw-low').html(value.low);
					$('#usdkrw-hours').html(value.hours);

					if(parseFloat(value.variance) > 0){
						$('#usdkrw-variance').css("color", "red");
						$('#usdkrw-variance_per').css("color", "red");
					}
					else if(parseFloat(value.variance) < 0){
						$('#usdkrw-variance').css("color", "blue");
						$('#usdkrw-variance_per').css("color", "blue");
					}
					else {
						$('#usdkrw-variance').css("color", "black");
						$('#usdkrw-variance_per').css("color", "black");
					}
				});
      }
    });
  }

  $(document).ready(function(){
    clearAll();

    var foreignInterval = setInterval(foreignAjax, 2000);
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

    $('#korea_table').DataTable({
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
        { "width": "6rem", "targets": 6 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });

    $('#us_table').DataTable({
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
        { "width": "6rem", "targets": 6 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });

    $('#asia_table').DataTable({
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
        { "width": "6rem", "targets": 6 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });

    $('#product_table').DataTable({
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
        { "width": "6rem", "targets": 6 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });

    $('#dollar_table').DataTable({
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
        { "width": "6rem", "targets": 6 },
      ],
      "ordering": false,
      "fixedColumns": true,
      "bInfo" : false,
      // "sinfo": false,
      "bFilter": false,
    //   "bDestroy": true
    });
  });
