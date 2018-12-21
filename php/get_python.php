<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-20
 * Time: 22:37
 */

$command="D:\home\site\wwwroot\aviv\scripts\cluster.exe \"KATY BRANCH\"";
//echo $command;
$out= shell_exec ( $command);

//$out= shell_exec ("D:\home\site\wwwroot\aviv\scripts\cluster.exe \"BANK OF AMERICA CORPORATION\"" );
//exec( "D:\home\site\wwwroot\aviv\scripts\cluster.exe \"BANK OF AMERICA CORPORATION\"", $output,$ret);
//exec( "D:\home\site\wwwroot\aviv\scripts\hello.exe", $output,$ret);
//echo $ret;
echo $out;

