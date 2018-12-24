<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-24
 * Time: 23:33
 */
if (!isset($_SESSION))
{
    session_start();
}

$sessions = array();

//$sessions['user'] = $_SESSION['user'];

header('Content-Type: application/json');
echo json_encode($_SESSION['user']);