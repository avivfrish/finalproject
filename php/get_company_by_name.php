<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-28
 * Time: 11:10
 */


$comp_name= $_POST['comp'];

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);



$sql= "select * from company_prod where name='$comp_name'";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());

if (!sqlsrv_has_rows($getResults))
{
    echo 0;
    die();
}
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name' =>$row['NAME'],
        'street' => $row['street'],
        'state' => $row['COUNTRY'],
        'city' => $row['CITY']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);