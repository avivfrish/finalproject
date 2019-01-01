<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-25
 * Time: 10:28
 */

$name=stripcslashes($_POST["name"]);
$email=stripcslashes($_POST["email"]);
$password=md5(stripcslashes($_POST["password"]));
$password_confirmation=md5(stripcslashes($_POST["password-confirmation"]));
$err="";
if ($password!==$password_confirmation)
{
    header('Location: /coral/login/?code=1');
    return false;
}



$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$sql="INSERT into users ([user],[password],full_name,isAdmin) OUTPUT Inserted.uid values ('$email','$password','$name',0)";

$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    header('Location: /aviv/login');
else
{
    $uid="";
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $uid=$row['uid'];
    }
        session_start();
    $_SESSION['uid'] = $uid;
    $_SESSION['full_name'] = $name;
    $_SESSION['user'] = $email;
    $_SESSION['isAdmin'] = 0;
    $_SESSION['time'] = time();
    if(isset($_SESSION['user']))
    {
        header('Location: /coral');
    }


}
