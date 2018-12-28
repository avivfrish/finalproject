<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 25/12/2018
 * Time: 18:02
 */

$distinctConnections = $_POST['distinctConnections'];
//echo(json_encode($distinctConnections));

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
            $whereStatement = $whereStatement."or relation = '".$name."' ";
        }
        else{
            $whereStatement = $whereStatement."relation = '".$name."' ";
            $firstStatWhere = true;
        }
    }
}
$whereStatement = $whereStatement.") ";


// GET top 5 of companies with the biggest number of connection
$sql= /** @lang text */
    "SELECT top 5 records as name, count(relation) as count 
    from connections ".$whereStatement."group by records order by count(relation) desc";
//echo ("SQL ".$sql);
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$arrayOfNames = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    array_push($arrayOfNames, $row['name']);
}
sqlsrv_free_stmt($getResults);

$resultArray = array();
for ($i = 0; $i <= count($arrayOfNames); $i++){
    $name = $arrayOfNames[$i];
    $sql= /** @lang text */
        "SELECT relation, count(relation) as count
    from connections ".$whereStatement.
    "and (records = '".$name."') ".
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



