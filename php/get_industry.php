<?php

session_start();

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);


$target_dir = "D:\home\\site\\wwwroot\\aviv\\csv\\";
$name = $_POST['file'];
//print_r($_FILES);
$new_name=time().'_'.basename($_FILES["file"]["name"]);
$target_file = $target_dir .$new_name;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    $sql="INSERT INTO uploads([user], upload_time, file_name, status) VALUES ('".$_SESSION['user']."',GETDATE(),
        '$new_name','Waiting')";

    $getResults= sqlsrv_query($conn, $sql);
    if ($getResults == FALSE)
        echo 1;
    else{
        echo 0;
    }

}
else
{
    echo 1;

}
die();

/*echo "obi";
$csv= file_get_contents("csv/res.csv");
$array = array_map("str_getcsv", explode("\n", $csv));
$json = json_encode($array);
echo $json;
return($json);*/

