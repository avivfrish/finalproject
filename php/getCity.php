<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 09/12/2018
 * Time: 17:16
 */

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$selectedCountry = $_GET["selectedCountry"];
$selectedState = $_GET["selectedState"];

$sql= /** @lang text */
    "select distinct city from company_prod where city is not null and country = "."'".$selectedCountry."'";

if($selectedState){
    $sql = $sql." and state = '".$selectedState."'";
}
//echo ($sql);
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'city'=>$row['city']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);