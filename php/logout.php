<?php
/**
 * Created by PhpStorm.
 * User: avivf
 * Date: 2018-12-22
 * Time: 16:32
 */


session_start();

session_destroy();
header('Location: /aviv/login');
exit();