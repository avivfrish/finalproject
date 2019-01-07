<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$companyToUpdate = $_GET["compToUpdate"];
$selectedNameValue = $_GET["nameInserted"];
$selectedIDValue = $_GET["rssd_idInserted"];

$sql= /** @lang text */
    "update company_prod set isNew = 1 where ";

if ($companyToUpdate){
    //echo (" company to update ");
    $sql = $sql."id = ".$companyToUpdate." ";
    //echo ($sql);
}
else if ($selectedNameValue){
    //echo (" selected name ");
    $sql = $sql."name = '".$selectedNameValue."' ";
    //echo ($sql);
}
else if ($selectedIDValue){
    //echo (" selected id ");
    $sql = $sql."RSSD_ID = ".$selectedIDValue." ";
    //echo ($sql);
}
//echo ($sql);
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE){
    echo ("false");
    //return (sqlsrv_errors());
}
else {
    echo ("true");
}

/*$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name'=>$row['name']
    );
}*/
sqlsrv_free_stmt($getResults);
//echo json_encode($array);