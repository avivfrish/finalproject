<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 08/01/2019
 * Time: 16:08
 */

$companyName = $_POST['name'];

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$sql= /** @lang text */
    "select * from companyNews where name = '".$companyName."'";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$arrayOfNews = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $arrayOfNews[] = array(
        'name'=>$row['name'],
        'address1'=>$row['address1'],
        'title1'=>$row['title1'],
        'description1'=>$row['description1'],
        'address2'=>$row['address2'],
        'title2'=>$row['title2'],
        'description2'=>$row['description2'],
        'address3'=>$row['address3'],
        'title3'=>$row['title3'],
        'description3'=>$row['description3'],
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode(array_values($arrayOfNews));