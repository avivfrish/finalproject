<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 30/12/2018
 * Time: 10:45
 */

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);


$sql= /** @lang text */
    "select top 50 name,Revenue from company_prod where Revenue!='NA' and Revenue not like '%|%' order by CONVERT(int, Revenue) desc";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name'=>$row['name'],
        'revenue'=>(int)$row['Revenue']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);