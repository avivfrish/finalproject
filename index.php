<?php
session_start();
$now = time();
if(!isset($_SESSION['user']))
{
    session_destroy();
    header('Location: /roni/login');
}
/*if ($now > $_SESSION['time']) {
    session_destroy();
    header('Location: /login');
}*/
?>


<html lang="en" ng-app="template" >
<title>FEI</title>
<head>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <!--<link rel="stylesheet" href="css/project.css">-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="js/angular.min.js"></script>
    <!--<script src="js/angular.js"></script>-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

    <!--<script src="js/bootstrap.min.js"></script>-->

    <script src="js/canvasjs.min.js"></script>
    <script src="js/Chart.bundle.min.js"></script>

    <!--<script src="js/canvasjs.min.js"></script>-->
    <script src="js/angular-chart.js"></script>
    <script src="js/project.js" ></script>
    <script src="js/3d-force/src/3d-force-graph.min.js"></script>

    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <link rel="stylesheet" href="css/project.css">
    <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet">

</head>
<body id="allBody" style="text-align: center" ng-controller='ng-cases' ng-init="init_case();">
    
	<?php

		include "html/home.html";
		include "html/nav.html";
		include "html/industry.html";
		include "html/searchByName.html";
        include "html/searchByCity.html";
        include "html/searchResults.html";
        include "html/searchModals.html";
        include "html/graph.html";
        include "html/login.html";

		include "html/updateComp.html";
        include "html/insertNewComp.html";
        include "html/deleteComp.html";
        include "html/insertNewFile.html";
	?>
</body>
</html>