<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-20
 * Time: 22:37
 */


$company=stripcslashes($_GET["company"]);


$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);



$sql="select * from connections_prod where comp1='".$company."' or comp2='".$company."'";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$comp_conn= array();
$nodes=array();
$nodes_for_unique=array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

    if (!in_array($row['comp1'],$nodes_for_unique))
    {
        $g1="0";
        $comp=strtolower($company);
        if ($comp==strtolower($row['comp1']))
        {
            $g1="1";
        }
        $nodes[] = array(
            'id' => $row['comp1'],
            'group' => $g1
        );
        $nodes_for_unique[]=$row['comp1'];
    }
    if (!in_array($row['comp2'],$nodes_for_unique))
    {
        $g2="0";
        $comp=strtolower($company);
        if ($comp==strtolower($row['comp2']))
        {
            $g2="1";
        }
        $nodes[] = array(
            'id' => $row['comp2'],
            'group' => $g2
        );
        $nodes_for_unique[]=$row['comp2'];
    }
    $comp_conn[] = array(
        'source'=>$row['comp1'],
        'target'=>$row['comp2'],
        'label'=>$row['conn_type'],

    );

}

$to_graph=array(
    'nodes' =>  $nodes,
    'links' => $comp_conn
);
//$command="D:\home\site\wwwroot\aviv\scripts\cluster.exe \"KATY BRANCH\"";
//echo $command;
//$out= shell_exec ( $command);

//$out= shell_exec ("D:\home\site\wwwroot\aviv\scripts\cluster.exe \"BANK OF AMERICA CORPORATION\"" );
//exec( "D:\home\site\wwwroot\aviv\scripts\cluster.exe \"BANK OF AMERICA CORPORATION\"", $output,$ret);
//exec( "D:\home\site\wwwroot\aviv\scripts\hello.exe", $output,$ret);
//echo $ret;
echo json_encode($to_graph);

