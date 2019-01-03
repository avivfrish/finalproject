<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

//'".$_GET['selectedFile']."'

$sql= /** @lang text */
    "bulk insert companies from  with (rowterminator = '\\n',fieldterminator = ',')";
    //echo ($sql );

$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE) {
    echo ("false");
    //return (sqlsrv_errors());
}
else {
    echo ("true");
}

$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name'=>$row['name']
    );
}
sqlsrv_free_stmt($getResults);
//echo json_encode($array);