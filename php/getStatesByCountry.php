<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 25/11/2018
 * Time: 10:59
 */

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$selectedCountry = $_GET["selectedCountry"];
//echo($_GET["selectedCountry"]);

$sql= /** @lang text */
    "select distinct StateLong from companiesNIC where StateLong!='None' and COUNTRY = "."'".$selectedCountry."'";
//echo ($sql);
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'state'=>$row['StateLong']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);