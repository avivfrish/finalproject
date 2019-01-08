<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-30
 * Time: 09:45
 */



$name=$_POST['name'];
$email=$_POST['email'];
$comment=$_POST['comment'];

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$sql="INSERT INTO comments(name, email, comment) values ('$name','$email','$comment')";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE) {
    echo 0;
    die();
}
else{
    sqlsrv_free_stmt($getResults);
    echo 1;
}

