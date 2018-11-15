// PHP Data Objects(PDO) Sample Code:
<?php
try {
    $conn = new PDO("sqlsrv:server = tcp:avifinalproject.database.windows.net,1433; Database = finalProject", "finalproject", "1qaZ2wsX");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "{your_password_here}", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);



$sql= /** @lang text */
    "select name from companies";
$getResults= sqlsrv_query($conn, $sql);
echo ("Reading data from table" . PHP_EOL);
if ($getResults == FALSE)
    echo (sqlsrv_errors());
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    echo ($row. PHP_EOL);
}
sqlsrv_free_stmt($getResults);

?>