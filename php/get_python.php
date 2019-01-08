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



$sql= "select * from connections where comp1='" .$company."' or word='".$company."'";
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());
$comp_conn= array();
$nodes=array();
$nodes_for_unique=array();
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
    if (!in_array($row['records'],$nodes_for_unique))
    {
        $nodes[] = array(
            'id' => $row['records'],
        );
        $nodes_for_unique[]=$row['records'];
    }
    if (!in_array($row['word'],$nodes_for_unique))
    {
        $nodes[] = array(
            'id' => $row['word'],
        );
        $nodes_for_unique[]=$row['word'];
    }
    $comp_conn[] = array(
        'source'=>$row['records'],
        'target'=>$row['word'],
        'label'=>$row['relation'],
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

