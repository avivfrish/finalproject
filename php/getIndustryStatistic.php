<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 01/01/2019
 * Time: 19:17
 */

$industries = $_POST['industries'];

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$resultArray = array();
foreach ($industries as $key=>$value) {
    $industry = $industries[$key];

    $sql= /** @lang text */
        "select count(*) as count from company_prod where Industry LIKE '%".$industry."%'";
    //echo ($sql);
    $getResults= sqlsrv_query($conn, $sql);
    if ($getResults == FALSE)
        return (sqlsrv_errors());
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $resultArray[] = array(
            'industry'=>$industry,
            'count'=>$row['count']
        );
    }
    sqlsrv_free_stmt($getResults);
}

echo json_encode($resultArray);