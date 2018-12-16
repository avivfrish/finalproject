<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$selectedIdValue = $_GET["selectedID"];
$selectedCompDetails = $_GET["compDetails"];
$selectedNewInfo = $_GET["newInfo"];

$sql= /** @lang text */
    "update companies set $selectedCompDetails = "."'".$selectedNewInfo."' where id = "."'".$selectedIdValue."'";

    $getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE) {
    echo ("false");
}
else {
    echo ("true");
}
    //return (sqlsrv_errors());
/*$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name'=>$row['name']
    );
}*/
sqlsrv_free_stmt($getResults);
//echo json_encode($array);