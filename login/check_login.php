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
    header('Location: /pnina');
}


$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);


$user=$_POST['inputEmail'];
$pass=md5($_POST['inputPassword']);

$sql = "SELECT * from users where [user]='$user' and [password] ='$pass'";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    header('Location: /roni/login');
$usr=array();
if (sqlsrv_has_rows($getResults)===false)
{
    header('Location: /roni/login/?code=2');
}
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $usr[]=array(
        'uid' => $row['uid'],
        'user_name' => $row['user'],
        'full_name' => $row['full_name'],
        'isAdmin' => $row['isAdmin'],
    );
}
echo json_encode($usr);
session_start();
$_SESSION['uid'] = $usr[0]['uid'];
$_SESSION['user'] = $usr[0]['user_name'];
$_SESSION['full_name'] = $usr[0]['full_name'];
$_SESSION['time'] = time();
$_SESSION['isAdmin'] = $usr[0]['isAdmin'];
if(isset($_SESSION['user']))
{
    header('Location: /roni');
}
else{
    echo $row['uid'];
}
return true;


