<?php
    session_start();
    if(isset($_SESSION['user']))
    {
        header('Location: /roni');
    }

    $err=stripcslashes($_GET["code"]);
    $msg="";
    if ($err==="1")
    {
        $msg="Passwords Do Not Match!";
    }
    else if ($err==="2")
    {
        $msg="Wrong User Or Password!";
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

                    </div>
                    <form id="Login" action='check_login.php' method='post' accept-charset='UTF-8'>
                        <div class="form-group">
                            <input type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="Email Address">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="inputPassword" name="inputPassword" placeholder="Password">
                        </div>
                        <div class="forgot">
                            <a href="#" data-toggle="modal" data-target="#register_modal">Not Registered?</a>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                        <p style="color:#ff3b00"><?php echo $msg ?></p>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="register_modal" tabindex="-1" role="dialog" aria-labelledby="Register Modal" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" >Register New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" method="POST" action="registration.php">
                        <div class="row">
                            <div class="col-md-3 field-label-responsive">
                                <label for="name">Name</label>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6rem;padding-top: 10px"><i class="fa fa-user"></i></div>
                                        <input type="text" name="name" class="form-control" id="name"
                                               placeholder="John Doe" required autofocus>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 field-label-responsive">
                                <label for="email">E-Mail Address</label>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6rem;padding-top: 10px"><i class="fa fa-at"></i></div>
                                        <input type="text" name="email" class="form-control" id="email"
                                               placeholder="you@example.com" required autofocus>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 field-label-responsive">
                                <label for="password">Password</label>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group has-danger">
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6rem;padding-top: 10px"><i class="fa fa-key"></i></div>
                                        <input type="password" name="password" class="form-control" id="password"
                                               placeholder="Password" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 field-label-responsive">
                                <label for="password">Confirm Password</label>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <div class="input-group-addon" style="width: 2.6rem;padding-top: 10px">
                                            <i class="fa fa-repeat"></i>
                                        </div>
                                        <input type="password" name="password-confirmation" class="form-control"
                                               id="password-confirm" placeholder="Password" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6">
                                <button type="submit" class="btn btn-success"><i class="fa fa-user-plus"></i> Register</button>
                            </div>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>




</body>
</html>