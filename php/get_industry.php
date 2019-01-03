<?php

session_start();


$target_dir = "D:\home\\site\\wwwroot\\aviv\\csv\\";
$name = $_POST['file'];
//print_r($_FILES);
$new_name=time().'_'.basename($_FILES["file"]["name"]);
$target_file = $target_dir .$new_name;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    $sql="INSERT INTO uploads([user], upload_time, file_name, status) VALUES ('".$_SESSION['user']."',GETDATE(),
        $new_name,'Waiting')";
    echo $sql;
    $getResults= sqlsrv_query($conn, $sql);
    if ($getResults == FALSE)
        return (sqlsrv_errors());
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

