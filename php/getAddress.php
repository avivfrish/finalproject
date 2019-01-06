<?php
/**
 * Created by PhpStorm.
 * User: CORAL SCHARF
 * Date: 02/12/2018
 * Time: 18:02
 */

$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0,"CharacterSet" => "UTF-8");
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

$searchBy = $_POST["searchBy"];
$sql= /** @lang text */
    "select name, street, city, state, country, wiki_name, wiki_img, wiki_first, Products, Type, TradedAs, Industry, Founded, Revenue,
     NumberOfEmployees from company_prod where ";

if($searchBy == 'Name'){
    $name = $_POST["name"];
    $cik = $_POST["cik"];
    $id = $_POST["id"];
    $filterBy = $_POST["filterBy"];

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
else if ($searchBy=="graph")
{
    $comp = $_POST['company_graph'];
    $sql="select * from company_prod where name='$comp'";
}
else{

    $country = $_POST["country"];
    $state = $_POST["state"];
    $city = $_POST["city"];
    $street = $_POST["street"];

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
$count=0;
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

    $array[] = array(
        'name'=>str_replace("'","",$row['name']),
        'street'=>str_replace("'","",$row['street']),
        'city'=>str_replace("'","",$row['city']),
        'state'=>str_replace("'","",$row['state']),
        'country'=>str_replace("'","",$row['country']),
        'wiki_name'=>str_replace("'","",$row['wiki_name']),
        'logo'=>str_replace("'","",$row['wiki_img']),
        'summary'=>str_replace("'","",$row['wiki_first']),
        'products'=>str_replace("'","",$row['Products']),
        'type'=>str_replace("'","",$row['Type']),
        'TradedAs'=>str_replace("'","",$row['TradedAs']),
        'industry'=>str_replace("'","",$row['Industry']),
        'founded'=>str_replace("'","",$row['Founded']),
        'revenue'=>str_replace("'","",$row['Revenue']),
        'numOfEmployee'=>str_replace("'","",$row['NumberOfEmployees'])
    );
    $count=$count+1;

}

sqlsrv_free_stmt($getResults);

#echo json_encode($array);
$json  = json_encode($array);
$error = json_last_error();
if ($error == 0)
{
    echo $json;
}
else
{
    echo $error;
}