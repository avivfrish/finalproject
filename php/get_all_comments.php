<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-30
 * Time: 11:04
 */

session_start();

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);



$sql= "select * from comments";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {


    $array[] = array(
        'name'=>$row['name'],
        'email'=>$row['email'],
        'comment'=>$row['comment'],

    );

}
sqlsrv_free_stmt($getResults);
echo json_encode($array);
