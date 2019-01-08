<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2019-01-03
 * Time: 21:27
 */


session_start();

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);



$sql= "select [user],upload_time,file_name,status from uploads";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $time_date=$row['upload_time']->format("d-m-Y");
    $time_h=$row['upload_time']->format("H")+2;
    $time_m=$row['upload_time']->format("i");
    $time_s=$row['upload_time']->format("s");
    $time_correct=$time_date." ".$time_h.":".$time_m.":".$time_s;
    $array[] = array(
        'user'=>$row['user'],
        'file_name'=>$row['file_name'],
        'time'=>$time_correct,
        'status'=>$row['status'],

    );

}
sqlsrv_free_stmt($getResults);
echo json_encode($array);
