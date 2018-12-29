<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$selectedNameValue = $_GET["nameInserted"];
$selectedIDValue = $_GET["rssd_idInserted"];

$sql= /** @lang text */
    "select * from company_prod where name = "."'".$selectedNameValue."' and RSSD_ID = "."'".$selectedIDValue."'";
    //echo ($sql);
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE) {
    echo ("false");
}
else {
    $rows = sqlsrv_has_rows($getResults);
    if ($rows == true){
        echo ("true");
    }
    else {
        echo ("false");
    }

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