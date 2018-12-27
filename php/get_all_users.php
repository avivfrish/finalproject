<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-25
 * Time: 16:42
 */

session_start();

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);



$sql= "select uid,[user],full_name,isAdmin from users";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

    $isCurUser=0;
    if ($row['uid']===$_SESSION['uid'])
    {
        $isCurUser=1;
    }
    $array[] = array(
        'uid'=>$row['uid'],
        'email'=>$row['user'],
        'full_name'=>$row['full_name'],
        'isAdmin'=>$row['isAdmin'],
        'isCurUser'=>$isCurUser,
        'isChecked'=>$row['isAdmin']
    );

}
sqlsrv_free_stmt($getResults);
echo json_encode($array);
