<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$compName = $_GET["name"];
$compID = $_GET["id"];
$deleteResultsFilterBy = $_GET["deleteResFilterBy"];

$sql= /** @lang text */
    "select name, street, city, country, state, RSSD_ID from test where ";

$operator = '=';
$char = '';

if ($deleteResultsFilterBy == 'Contains'){
    $operator = 'LIKE';
    $char = '%';
    if ($compName and !$compID){
        $sql = $sql."name ".$operator." '".$char.$compName.$char."' ";
    }
    else if ($compID and !$compName){
        $sql = $sql."RSSD_ID ".$operator." '".$char.$compID.$char."' ";
    }
    else if ($compName and $compID){
        $sql = $sql."name ".$operator." '".$char.$compName.$char."' ";
        $sql = $sql."and ";
        $sql = $sql."RSSD_ID ".$operator." '".$char.$compID.$char."' ";
    }
}
else if ($deleteResultsFilterBy == 'Equals'){
    if ($compName and !$compID){
        $sql = $sql."name = '".$compName."' ";
    }
    else if ($compID and !$compName){
        $sql = $sql."RSSD_ID = '".$compID."' ";
    }
    else if ($compName and $compID){
        $sql = $sql."name = '".$compName."' ";
        $sql = $sql."and ";
        $sql = $sql."RSSD_ID = '".$compID."' ";
    }
}

$getResults= sqlsrv_query($conn, $sql);
if($deleteResultsFilterBy == ''){
    echo ("no_filter");
}
else if ($getResults == FALSE){
    echo ("false");
    //return (sqlsrv_errors());
}
else if ($getResults == TRUE) {
    $array = array();
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $array[] = array(
            'name'=>$row['name'],
            'street'=>$row['street'],
            'city'=>$row['city'],
            'country'=>$row['country'],
            'state'=>$row['state'],
            'id'=>$row['RSSD_ID']
        );
    }
    sqlsrv_free_stmt($getResults);
    echo json_encode($array);
}
