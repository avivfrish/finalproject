<html lang="en" ng-app="template" >
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<!--<link rel="stylesheet" href="css/project.css">-->
	<script src="js/bootstrap.min.js"></script>
	<script src="js/project.js"></script>
		
</head>
<body ng-controller='ng-cases' ng-init="init_case();">
    <!-- SEEeeee ME? -->
	<!--<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
		<ul class="navbar-nav col-sm-12">
			<li class="col-sm-4">
				<a href="index.html">Home</a>
			</li>
			<li class="col-sm-2">
				<a href="about-us.html">about us</a>
			</li>
			<li class="col-sm-2">
				<span ng-click="get_companies()">industry</span>
			</li>
			<li class="col-sm-2">
				<a href="service.html">services</a>
			</li>
			<li class="col-sm-2">
				<a href="contact-us.html">Contact us</a>
			</li>
		</ul>

	</nav>-->

    
	<?php
		include "html/home.html";
		include "html/nav.html";
		include "html/industry.html";
		include "html/search.html";
	?>		
</body>
</html>