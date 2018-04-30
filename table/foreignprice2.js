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
      url: "http://13.125.147.26/phps/forNowJ",
      type: "GET",
      dataType: "json",
      async: true,
      success: function(data){
        // 코스피
        $.each(data.KOSPI, function(key, value){
          $('#kospi-current').html(value.current);
          $('#kospi-high').html(value.high);
          $('#kospi-low').html(value.low);
          $('#kospi-variance').html(value.variance);
          $('#kospi-variance_per').html(value.variance_per);
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
            $('#kosdaq-high').html(value.high);
            $('#kosdaq-low').html(value.low);
            $('#kosdaq-variance').html(value.variance);
            $('#kosdaq-variance_per').html(value.variance_per);
            $('#kosdaq-hours').html(value.hours);

            if(parseFloat(value.variance_per) > 0){
              $('#kosdaq-variance').css("color", "red");
              $('#kosdaq-variance_per').css("color", "red");
            }
            else if(parseFloat(value.variance_per) < 0){
              $('#kosdaq-variance').css("color", "blue");
              $('#kosdaq-variance_per').css("color", "blue");
            }
            else {
              $('#kosdaq-variance').css("color", "black");
              $('#kosdaq-variance_per').css("color", "black");
            }
        });

        $('#korea_table').DataTable({
          "paging": false,
          "scrollY": 500,
          "scrollX": true,
          "scrollCollapse": true,
          "columnDefs": [
              {  targets: 0 }
          ],
          "ordering": false,
          "fixedColumns": true,
          "bInfo" : false,
          // "sinfo": false,
          "bFilter": false,
        //   "bDestroy": true
        });

        // // 선물지수
        // json_data += '<tr style="background-color:#F0F0F0">'
        // json_data += '<th>종목</th>';
        // json_data += '<th>월물</th>';
        // json_data += '<th>현재가</th>';
        // json_data += '<th>고가</th>';
        // json_data += '<th>저가</th>';
        // json_data += '<th>변동</th>';
        // json_data += '<th>변동 %</th>';
        // json_data += '<th>시간</th>';
        // json_data += '</tr>'
        // $.each(data.dji, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>'+value.date+'</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });

        // $.each(data.sp500, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>'+value.date+'</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });

        // $.each(data.nasdaq, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>'+value.date+'</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });

        // // // 세계주요지수
        // json_data += '<tr style="background-color:#F0F0F0">'
        // json_data += '<th>지수</th>';
        // json_data += '<th>-</th>';
        // json_data += '<th>현재가</th>';
        // json_data += '<th>고가</th>';
        // json_data += '<th>저가</th>';
        // json_data += '<th>변동</th>';
        // json_data += '<th>변동 %</th>';
        // json_data += '<th>시간</th>';
        // json_data += '</tr>'

        // $.each(data.nikkei, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>-</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });

        // $.each(data.ssec, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>-</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });

        // json_data += '<tr style="background-color:#F0F0F0">'
        // json_data += '<th>상품</th>';
        // json_data += '<th>월물</th>';
        // json_data += '<th>종가</th>';
        // json_data += '<th>고가</th>';
        // json_data += '<th>저가</th>';
        // json_data += '<th>변동</th>';
        // json_data += '<th>변동 %</th>';
        // json_data += '<th>시간</th>';
        // json_data += '</tr>'

        // // // 실시간 상품
        // $.each(data.gold, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>'+value.date+'</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });

        // $.each(data.wti, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>'+value.date+'</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });

        // json_data += '<tr style="background-color:#F0F0F0">'
        // json_data += '<th>종목</th>';
        // json_data += '<th>종목</th>';
        // json_data += '<th>현재가</th>';
        // json_data += '<th>고가</th>';
        // json_data += '<th>저가</th>';
        // json_data += '<th>변동</th>';
        // json_data += '<th>변동 %</th>';
        // json_data += '<th>시간</th>';
        // json_data += '</tr>'

        // // // 달러

        // $.each(data.usdkrw, function(key, value){
        //   json_data += '<tr>'
        //   json_data += '<td>'+value.title+'</td>';
        //   json_data += '<td>'+value.date+'</td>';
        //   json_data += '<td>'+value.current+'</td>';
        //   json_data += '<td>'+value.high+'</td>';
        //   json_data += '<td>'+value.low+'</td>';
        //   if(value.variance.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance+'</td>';
        //   }
        //   else if(value.variance.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance+'</td>';
        //   }
        //   if(value.variance_per.charAt(0) == '+'){
        //     json_data += '<td style="color:red">'+value.variance_per+'</td>';
        //   }
        //   else if(value.variance_per.charAt(0) == '-'){
        //     json_data += '<td style="color:blue">'+value.variance_per+'</td>';
        //   }
        //   else {
        //     json_data += '<td>'+value.variance_per+'</td>';
        //   }
        //   json_data += '<td>'+value.hours+'</td>';
        //   json_data += '</tr>';
        // });
        // json_data += '</tbody>';
        // $('#foreignprice_table').html(json_data);
        // $('#foreignprice_table').DataTable({
        //   "paging": false,
        //   // "scrollY": height,
        //   "scrollX": true,
        //   "scrollCollapse": true,
        //   "columnDefs": [
        //       {  width: '20%', targets: 0 }
        //   ],
        //   "ordering": false,
        //   "fixedColumns": true,
        //   "bInfo" : false,
        //   // "sinfo": false,
        //   "bFilter": false,
        //   "bDestroy": true
        // });
      }
    });
  }

  $(document).ready(function(){
    clearAll();
    var foreignInterval = setInterval(foreignAjax, 2000);
  });
