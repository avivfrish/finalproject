<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

//echo ("hello roni");

if(!empty($_FILES)){
    $path = 'upload/'.$_FILES['file']['name'];
    //echo ($path);
    if(move_uploaded_file($_FILES['file']['tmp_name'], $path)){
        echo ("file moved");
        $sql= /** @lang text */
            "insert into companies(name) values ('".$_FILES['file']['name']."')";
        $getResults= sqlsrv_query($conn, $sql);
        if ($getResults == FALSE){
            echo ("cant upload");
        }
        else {
            echo ("file uploaded");
        }
    }
}
else {
    echo ("error!!!");
}

//$sql= /** @lang text */
   /* "select name from companies";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name'=>$row['name']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);*/