<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 02/12/2018
 * Time: 18:02
 */

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$searchBy = $_GET["searchBy"];
$sql= /** @lang text */
    "select name, country, wiki_img, Type, Industry from company_prod where ";

if($searchBy == 'Name'){
    $name = $_GET["name"];
    $cik = $_GET["cik"];
    $id = $_GET["id"];
    $filterBy = $_GET["filterBy"];

    $operator = '=';
    $char = '';
    if ($filterBy == 'Contains'){
        $operator = 'LIKE';
        $char = '%';
    }

    if ($name){
        $sql = $sql."name ".$operator." '".$char.$name.$char."' ";
    }
    if ($cik){
        if($name){
            $sql = $sql."AND ";
        }
        //$sql = $sql."SEC_CIK ".$operator." '".$char.$cik.$char."' ";
    }
    if ($id){
        if($name or $cik){
            $sql = $sql."AND ";
        }
        $sql = $sql."RSSD_ID ".$operator." '".$char.$id.$char."' ";
    }
}
else{
    $country = $_GET["country"];
    $state = $_GET["state"];
    $city = $_GET["city"];
    $street = $_GET["street"];

    if ($country){
        $sql = $sql."country = '".$country."' ";
    }
    if ($state){
        if($country){
            $sql = $sql."AND ";
        }
        $sql = $sql."state = '".$state."' ";
    }
    if ($city){
        if($country or $state){
            $sql = $sql."AND ";
        }
        $sql = $sql."city = '".$city."' ";
    }
    if ($street){
        if($city or $country or $state){
            $sql = $sql."AND ";
        }
        $sql = $sql."street = '".$street."' ";
    }
}

$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$array = array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    $array[] = array(
        'name'=>$row['name'],
        'country'=>$row['country'],
        'state'=>"l",//$row['StateLong'],
        'logo'=>$row['wiki_img'],
        'type'=>$row['Type'],
        'industry'=>$row['Industry']
    );
}
sqlsrv_free_stmt($getResults);
echo json_encode($array);