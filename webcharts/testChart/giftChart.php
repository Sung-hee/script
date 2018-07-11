<?php
header('Access-Control-Allow-Origin:*');
 date_default_timezone_set("Asia/Seoul");
$currentday = date("Ymd", time());
$si = 0;
$go = 0;
$ju = 0;
$zo = 0;
$gu = 0;

$serverName = "218.144.61.8"; //serverName\instanceName
$connectionInfo2 = array( "Database"=>"DB_Bong", "UID"=>"vl2000vk", "PWD"=>"373758","CharacterSet" => "UTF-8");
$conn2 = sqlsrv_connect( $serverName, $connectionInfo2);
$sql2="SELECT * FROM tbl_futic WHERE 일자 LIKE '%".$currentday."%' ORDER BY 일자 ASC;";




$stmt2=sqlsrv_query($conn2,$sql2);
$i = 0;


while( $row2 = sqlsrv_fetch_array( $stmt2,SQLSRV_FETCH_NUMERIC )) {



$current = date("Ymd", time());

$fmt = strtotime($current. str_replace(':','',substr($row2[4],-8)));

$nowS = (int)$fmt *1000;


     $bong[$i] = array($nowS,(float)$row2[5],(float)$row2[6],(float)$row2[7],(float)$row2[8],(float)$row2[2]);
    $i = $i +1;


}






 sqlsrv_free_stmt($stmt2);

sqlsrv_close($conn2);




/*
date_default_timezone_set("Asia/Seoul");
$current = date("Ymd", time());
$fmt_time = strtotime($current);

$nowStamp = (int)$fmt_time *1000;



if($go == '0')
{
    $si == $zo;
      $go == $zo;
        $ju == $zo;
}


$bong[$i] = array($nowStamp, $si, $go, $ju, $zo, $gu);
*/
$group_data = $bong;

// Print
$output_data = json_encode($group_data, JSON_UNESCAPED_UNICODE + JSON_PRETTY_PRINT);

header('Content-Type: application/json');
print($output_data);
?>
