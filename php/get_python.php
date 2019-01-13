<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-20
 * Time: 22:37
 */


$company=stripcslashes($_GET["company"]);


$connectionInfo = array("UID" => "finalproject@avifinalproject", "pwd" => "1qaZ2wsX", "Database" => "finalProject", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0,"CharacterSet" => "UTF-8");
$serverName = "tcp:avifinalproject.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
$nodes=array();
$nodes_for_unique=array();
$comp_conn= array();

$checkIsMother="select isMother,mother_comp from company_prod where name='".$company."'";
$getResultsIsMother= sqlsrv_query($conn, $checkIsMother);
$isMother = "";
$mother_comp = "";
if ($getResultsIsMother == FALSE)
    return (sqlsrv_errors());
else{
    if (sqlsrv_has_rows($getResultsIsMother)) {

        while ($row = sqlsrv_fetch_array($getResultsIsMother, SQLSRV_FETCH_ASSOC)) {
            $isMother = $row['isMother'];
            $mother_comp = $row['mother_comp'];
        }
    }
}
if ($isMother == 0)
{

    $getSisters="select name from company_prod where mother_comp='".$mother_comp."' and name!='".$company."'";
    $getResultsSister= sqlsrv_query($conn, $getSisters);
    if ($getResultsSister == FALSE)
        return (sqlsrv_errors());
    else
    {
        if (sqlsrv_has_rows($getResultsSister)) {
            $comp = trim(strtolower($company));
            $nodes[] = array(
                'id' => $comp,
                'group' => "1",

            );
            $nodes_for_unique[] = strtolower($company);
            $count_sis=0;
            while ($row = sqlsrv_fetch_array($getResultsSister, SQLSRV_FETCH_ASSOC)) {

                if (!in_array(trim(strtolower($row['name'])), $nodes_for_unique)) {
                    if ( trim(strtolower($row['name'])) !== trim(strtolower($mother_comp)))
                    {
                        if ($count_sis>30)
                        {

                            continue;
                        }
                        $count_sis=$count_sis+1;
                        $g1 = "0";
                        $comp = trim(strtolower($company));
                        if ($comp == trim(strtolower($row['name']))) {
                            $g1 = "1";
                        }

                        $nodes[] = array(
                            'id' => trim(strtolower($row['name'])),
                            'group' => $g1,

                        );
                        $nodes_for_unique[] = trim(strtolower($row['name']));
                        $comp_conn[] = array(
                            'source'=>trim(strtolower($comp)),
                            'target'=>trim(strtolower($row['name'])),
                            'label'=>"Sisters",
                            'curvature' => 0.8,
                            'rotation' => 0.2

                        );


                    }



                }


            }


        }


    }
}


$sisterCount=0;

$sql="select * from connections_prod where (comp1='".$company."' or comp2='".$company."') and conn_type!='Sisters'";
//echo $sql;
$getResults= sqlsrv_query($conn, $sql);
if ($getResults == FALSE)
    return (sqlsrv_errors());

$count_sub=0;
$count_comptition=0;
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC))
{

    $comp1=strtolower($row['comp1']);
    $comp2=strtolower($row['comp2']);
    $comp1=trim($comp1);
    $comp2=trim($comp2);
    //echo $comp1.";".$comp2.";".$row['conn_type']."^";
    if ($row['conn_type']==="Subsidiaries" and $count_sub>30)
    {
        continue;
    }
    if ($row['conn_type']==="Competition" and $count_comptition>30)
    {

        continue;
    }
    $count_sub=$count_sub+1;
    $count_comptition= $count_comptition+1;
    if (!in_array(trim(strtolower($row['comp1'])),$nodes_for_unique))
    {

        $g1="0";
        $comp=trim(strtolower($company));

        if ($comp==$comp1)
        {
            $g1="1";
        }

        $nodes[] = array(
            'id' => $comp1,
            'group' => $g1,

        );
        $nodes_for_unique[]=$comp1;
    }
    if (!in_array(trim(strtolower($row['comp2'])),$nodes_for_unique))
    {
        $g2="0";
        $comp=trim(strtolower($company));

        if ($comp==$comp2)
        {
            $g2="1";
        }

        $nodes[] = array(
            'id' => $comp2,
            'group' => $g2,

        );
        $nodes_for_unique[]=$comp2;
    }
    $comp_conn[] = array(
        'source'=>$comp1,
        'target'=>$comp2,
        'label'=>$row['conn_type'],
        'curvature' => 0.8,
        'rotation' => 0.2

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

