<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$companyToUpdate = $_GET["compToUpdate"];
$selectedCompDetailsToUpdateBySearch = $_GET["compDetailsUpdateBySearch"];
$selectedNewInfoToUpdateBySearch = $_GET["newInfoUpdateBySearch"];
//echo ($companyToDelete);

$sql= /** @lang text */
    "update test set $selectedCompDetailsToUpdateBySearch = "."'".$selectedNewInfoToUpdateBySearch."' where RSSD_ID = "."'".$companyToUpdate."'";
//echo ($sql);
$getResults= sqlsrv_query($conn, $sql);

if ($getResults == FALSE) {
    echo ("false");
//echo (sqlsrv_errors());
}
else {
    echo ("true");
};
/* $array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name'=>$row['name']
    );
} */
sqlsrv_free_stmt($getResults);