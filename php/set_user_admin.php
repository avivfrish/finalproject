<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-26
 * Time: 15:34
 */


session_start();
$users=$_POST['users'];


$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
//echo $users[4];
for ($i=0;$i<sizeof($users);$i++ )
{

    //echo $users[$i]['isChecked'];
    if ($users[$i]['isAdmin']!=$users[$i]['isChecked'])
    {
        $sql="UPDATE users set isAdmin=".$users[$i]['isChecked']." where uid=".$users[$i]['uid'];
        $getResults= sqlsrv_query($conn, $sql);
        if ($getResults == FALSE) {
            echo 0;
            die();
        }
        else{
            sqlsrv_free_stmt($getResults);
            echo 1;
        }

    }

}
//echo "vfv!!!!";