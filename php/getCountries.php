<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 18/11/2018
 * Time: 11:34
 */


$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);



$sql= /** @lang text */
    "select distinct COUNTRY from companiesNIC Where COUNTRY!='None'";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'country'=>$row['COUNTRY']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);



