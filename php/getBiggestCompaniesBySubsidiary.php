<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 28/12/2018
 * Time: 13:07
 */


$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);


$sql= /** @lang text */
    "SELECT name from company_prod where isMother = '1' ";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$mothersCompanies = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    array_push($mothersCompanies, $row['name']);
}
sqlsrv_free_stmt($getResults);

$resultArray = array();
for ($i = 0; $i < count($mothersCompanies); $i++){
    $name = $mothersCompanies[$i];
    //echo($name);
    $sql= /** @lang text */
        "SELECT distinct count(*) as count
        from connections_prod
        where (comp1 = '".$name."' or
       comp2 = '".$name."') and (conn_type = 'subsidiary')";
    $getResults= sqlsrv_query($conn, $sql);
    if ($getResults == FALSE)
        return (sqlsrv_errors());
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $resultArray[] = array(
            'name'=>$name,
            'count'=>$row['count']
        );
    }
    sqlsrv_free_stmt($getResults);
}

echo json_encode($resultArray);