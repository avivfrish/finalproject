<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-24
 * Time: 21:32
 */

session_start();
if(isset($_SESSION['login_user']))
{
    header('Location: /aviv');
}


$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);


$user=$_POST['inputEmail'];
$pass=$_POST['inputPassword'];

$sql = "SELECT * from users where [user]='$user' and [password] ='$pass'";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    header('Location: /aviv/login');
$usr=array();
if (sqlsrv_has_rows($getResults)===false)
{
    header('Location: /aviv/login');
}
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $usr[]=array(
        'uid' => $row['uid'],
        'user_name' => $row['user'],

    );
}
echo json_encode($usr);
session_start();
$_SESSION['user'] = $usr[0]['user_name'];
$_SESSION['time'] = time();
if(isset($_SESSION['user']))
{
    header('Location: /aviv');
}
else{
    echo $row['uid'];
}
return true;


