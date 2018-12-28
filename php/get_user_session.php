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

$session = array(
    'uid' => $_SESSION['uid'],
    'user' => $_SESSION['user'],
    'time' => $_SESSION['time'],
    'isAdmin' => $_SESSION['isAdmin'],
    'full_name' => $_SESSION['full_name']
);

header('Content-Type: application/json');
echo json_encode($session);