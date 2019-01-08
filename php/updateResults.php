<?php

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$compName = $_GET["name"];
$compID = $_GET["id"];
$updateResultsFilterBy = $_GET["updateResFilterBy"];

$sql= /** @lang text */
    "select ID, name, street, city, country, state, RSSD_ID from company_prod where ";

$operator = '=';
$char = '';

if ($updateResultsFilterBy == 'Contains'){
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
else if ($updateResultsFilterBy == 'Equals'){
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
if ($getResults == FALSE){
    echo ("false");
    //return (sqlsrv_errors());
}
else if ($getResults == TRUE) {
    $rows = sqlsrv_has_rows($getResults);
    if ($rows == true) {
        $array = array();
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
            $array[] = array(
                'id' => $row['ID'],
                'name' => $row['name'],
                'street' => $row['street'],
                'city' => $row['city'],
                'country' => $row['country'],
                'state' => $row['state'],
                'RSSD_ID' => $row['RSSD_ID']
            );
        }
        sqlsrv_free_stmt($getResults);
        echo json_encode($array);
    } else {
        echo("no_rows");
    }
}



/*$getResults= sqlsrv_query($conn, $sql);

if ($getResults == FALSE){
    echo ("false");
    //return (sqlsrv_errors());
}
else if ($getResults == TRUE) {
    $array = array();
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        $array[] = array(
            'id'=>$row['ID'],
            'name'=>$row['name'],
            'street'=>$row['street'],
            'city'=>$row['city'],
            'country'=>$row['country'],
            'state'=>$row['state'],
            'RSSD_ID'=>$row['RSSD_ID']
        );
    }
    sqlsrv_free_stmt($getResults);
    echo json_encode($array);
}*/