<?php
session_start();
if(isset($_SESSION['user'])) {
    header('Location: /aviv');
                }
?>

<html lang="en"  >
<title>FEI</title>
<head>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <!--<link rel="stylesheet" href="css/project.css">-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="../js/angular.min.js"></script>
    <!--<script src="js/angular.js"></script>-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

    <!--<script src="js/bootstrap.min.js"></script>-->

    <script src="../js/canvasjs.min.js"></script>
    <script src="../js/Chart.bundle.min.js"></script>

    <!--<script src="js/canvasjs.min.js"></script>-->
    <script src="../js/angular-chart.js"></script>
    <script src="../js/project.js" ></script>
    <script src="../js/3d-force/src/3d-force-graph.min.js"></script>

    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>

    <link rel="stylesheet" href="../css/project.css">
    <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet">

</head>
<body id="allBody" style="text-align: center" ng-controller='ng-cases' ng-init="init_case();">
    <div id="loginForm">
        <div class="container">
            <h1 class="form-heading">
                <img src="../img/fei_logo.png" height="45" width="90" style="float: left">
            </h1>
            <div class="login-form">
                <div class="main-div">
                    <div class="panel">
                        <h2>User Login</h2>
                        <p>Please enter your email and password</p>
                        <p><?php echo $msg; ?></p>
                    </div>
                    <form id="Login" action='check_login.php' method='post' accept-charset='UTF-8'>
                        <div class="form-group">
                            <input type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="Email Address">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="inputPassword" name="inputPassword" placeholder="Password">
                        </div>
                        <div class="forgot">
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>

                    </form>
                </div>
            </div>
        </div>
    </div>

</body>
</html>