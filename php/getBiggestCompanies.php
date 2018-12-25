<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 25/12/2018
 * Time: 18:02
 */

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

// GET top 5 of companies with the biggest number of connection
$sql= /** @lang text */
    "SELECT top 5 records as name, count(relation) as count from connections group by records order by count(relation) desc";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$arrayOfNames = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    array_push($arrayOfNames, $row['name']);
}
sqlsrv_free_stmt($getResults);
//echo json_encode(array_values($arrayOfNames));

$resultArray = array();
for ($i = 0; $i <= count($arrayOfNames); $i++){
    $name = $arrayOfNames[$i];
    //echo($name);
    $sql= /** @lang text */
        "SELECT relation, count(relation) as count
    from connections
    where records = '".$name."'".
    "group by relation";
    $getResults= sqlsrv_query($conn, $sql);
    if ($getResults == FALSE)
        return (sqlsrv_errors());
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $resultArray[] = array(
            'name'=>$name,
            'relation'=>$row['relation'],
            'count'=>$row['count'],
            'id'=>$i+1
        );
    }
    sqlsrv_free_stmt($getResults);
}

echo json_encode(array_values($resultArray));



