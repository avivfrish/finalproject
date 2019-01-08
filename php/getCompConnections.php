<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$compToDeleteFromConnections = $_GET["comp"];

$sql= /** @lang text */
    "select id, comp1, comp2 from connections_prod where comp1 = "."'".$compToDeleteFromConnections."' or comp2 = "."'".$compToDeleteFromConnections."' ";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE){
    echo ("false get connections sql ");
}
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'id'=>$row['id'],
        'comp1'=>$row['comp1'],
        'comp2'=>$row['comp2']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);