<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 25/12/2018
 * Time: 18:02
 */

$distinctConnections = $_POST['distinctConnections'];

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$whereStatement = "where (";
$firstStatWhere = false;
foreach ($distinctConnections as $key=>$value){
    $isChecked = $distinctConnections[$key]['isChecked'];
    $name = $distinctConnections[$key]['name'];
    //echo ("IS CHECKED ".$isChecked." NAME".$name);
    if($isChecked == 1){
        if ($firstStatWhere){
            $whereStatement = $whereStatement."or conn_type = '".$name."' ";
        }
        else{
            $whereStatement = $whereStatement."conn_type = '".$name."' ";
            $firstStatWhere = true;
        }
    }
}
$whereStatement = $whereStatement.") ";

// GET top 5 of companies with the biggest number of connection
$sql= /** @lang text */
    "SELECT top 5 oneCompany as name, count(conn_type) as count
    from (SELECT distinct comp1 as oneCompany,comp2 as twoCompany,conn_type from connections_prod
           Union
           SELECT distinct comp2 as oneCompany,comp1 as twoCompany,conn_type from connections_prod) as compConnections "
    .$whereStatement."group by oneCompany order by count(conn_type) desc";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$arrayOfNames = array();
$j = 1;
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $arrayOfNames[] = array(
        'id'=>$j,
        'name'=>$row['name'],
    );
    $j++;
}
sqlsrv_free_stmt($getResults);

$resultArray = array();
foreach ($arrayOfNames as $key=>$value) {
    $name = $arrayOfNames[$key]['name'];
    $id = $arrayOfNames[$key]['id'];
    $sql= /** @lang text */
        "SELECT conn_type as relation, count(conn_type) as count
    from connections_prod ".$whereStatement.
        "and (comp1 = '".$name."' or comp2 = '".$name."') ".
        "group by conn_type";
    $getResults= sqlsrv_query($conn, $sql);
    if ($getResults == FALSE)
        return (sqlsrv_errors());
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $resultArray[] = array(
            'name'=>$name,
            'relation'=>$row['relation'],
            'count'=>$row['count'],
            'id'=>$id
        );
    }
    sqlsrv_free_stmt($getResults);
}

echo json_encode(array_values($resultArray));



