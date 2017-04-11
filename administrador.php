<?php
session_start();
$mensaje=null;
if($_SESSION['administrador']==true)
{
    $mensaje='Bienvenido Señor '.$_SESSION['nombre'];
}
else{
if (isset($_SESSION['analista'])){
    header('location:analista.php');
}
else if (isset($_SESSION['desarrollador'])){
    header('location:desarrollador.php');
}
else if (isset($_SESSION['encuestador'])){
    header('location:encuestador.php');
}
 else {
    session_unset();
    session_destroy();
    header('location:index.php');
}

 }
 if (isset($_POST['cerrar'])){
session_start();
        session_destroy();
        header('location:index.php');
 }      
?>
<!doctype html>
<html >
<head>
    <link rel="shortcut icon" type="image/x-icon" href="Imagenes/logo.png">
    <title>Administrador </title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" type ="text/css" href="bootstrap/bootstrap/css/bootstrap.min.css" />
     <link rel="stylesheet" type ="text/css" href="administrador.css" />
    <link rel="stylesheet" type ="text/css" href="estilo.css" />
    <link rel="stylesheet" type ="text/css" href="Accesos.css" />   
    <script src="http://code.jquery.com/jquery-latest.js"></script>
     <script src="js/jquery-2.1.4.min.js"></script>
</head>
<body>
<div class="body_wrapper">      
    <div class="H1Data"><img src="imagenes/logoV.png" wight="28" height="28" top="20" left ="10" > DATAPLUS COLOMBIA S.A.S.</div>
<header>
    <div class="menu_bar">
	<a href="#" class="bt-menu"><span class="icon-home3"></span>Menú</a>
        <br>
    </div>
    <nav>
            <ul id="usuarios"> 
                <li class="submenu">
                    <a><span class="icon icon-menu3"></span>Mi cuenta</a>
                        <ul class="children">
                            <li><a href="datos.php"><span class="icon icon-profile"></span>Datos</a></li>
                            <li><a href="Manual-de-usuario.pdf" download="Manual de Usuario"><span class="icon icon-book"></span>Manual</a></li>
                            <li id="Cerrar"><a href="cerrar.php" id="Cerrar"><span class="icon-switch"></span>Cerrar</a></li>
			</ul>
		</li>
                <li><a href="usuarios.php"><span class="icon icon-users"></span>Panel De Usuarios</a>
                <li><a href="asignar.php"><span class="icon icon-clipboard"></span>Asignar Encuestas</a></li>
                <li><a href="proyectos.php"><span class="icon icon-briefcase"></span>Proyectos</a></li>
                <li><a href="administrador.php"><span class="icon icon-home3"></span>Inicio</a></li>
            </ul>
        </nav>
</header>
<div class="body" id="cde">
    <div class="texto">
        <div id="cargar" class="text-center form-control">
            <br><br>
            <h2><?php  echo $mensaje; ?></h2>
            <span>Este panel esta diseñado para que usted pueda administrar los usuarios que podran acceder al sistema, ademas de realizar<br>
            la asignacion de cuestionarios a los encuestadores disponibles y llevar un control sobre los proyectos en el sistema
             </span><br>
            <br>
        </div>
    </div>
    <div class="linea" id="linea"></div>
    <div class="Cajas" id ="Cajas">
	<div class="box-bg margin-bot img-responsive">
		<div class="wrapper">
			<div class="col-1">
				<div class="box first">
					<div class="pad">
						<div class="wrapper indent-bot">
							<strong class="numb img-indent2">
                                                            <cufon class="cufon cufon-canvas" alt="01" ><cufontext>01</cufontext></cufon></strong>
								<div class="extra-wrap">
									<h3 class="color-1"><strong>
                                                                                <cufon class="cufon cufon-canvas"><canvas style="width: 119px; height: 31px; top: 1px; left: -2px;"></canvas><cufontext>Panel de</cufontext></cufon></strong>
                                                                                <cufon class="cufon cufon-canvas"><canvas style="width: 125px; height: 31px; top: 1px; left: -2px;"></canvas><cufontext>Usuarios</cufontext></cufon></h3>
								</div>
						</div>
						<div class="wrapper">
                                                    <a class="button img-indent-r" href="usuarios.php">&gt;&gt;</a>
							<div class="extra-wrap form-control">
                                                                Administracion de los usuarios registrados.
							</div>
                                                </div>
					</div>
				</div>
			</div>
			<div class="col-1">
				<div class="box second">
					<div class="pad">
						<div class="wrapper indent-bot">
							<strong class="numb img-indent2">
                                                            <cufon class="cufon cufon-canvas"><cufontext>02</cufontext></cufon></strong>
								<div class="extra-wrap">
									<h3 class="color-2"><strong>
                                                                                <cufon class="cufon cufon-canvas"><canvas style="width: 93px; height: 31px; top: 1px; left: -2px;"></canvas><cufontext>Asignar</cufontext></cufon></strong>
                                                                                <cufon class="cufon cufon-canvas"><canvas style="width: 135px; height: 31px; top: 1px; left: -2px;"></canvas><cufontext>Encuestas</cufontext></cufon></h3>
								</div>
						</div>
						<div class="wrapper">
							<a class="button img-indent-r" href="asignar.php"></a>
								<div class="extra-wrap form-control">
								Asignacion de cuestionarios disponibles.
								</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-1">
                                <div class="box third">
                                        <div class="pad">
                                                <div class="wrapper indent-bot">
                                                        <strong class="numb img-indent2">
                                                            <cufon class="cufon cufon-canvas"><cufontext>03</cufontext></cufon></strong>
                                                                <div class="extra-wrap">
                                                                        <h3 class="color-3"><strong>
                                                                                <cufon class="cufon cufon-canvas"><canvas style="width: 93px; height: 31px; top: 1px; left: -2px;"></canvas><cufontext>Control de</cufontext></cufon></strong>
                                                                                <cufon class="cufon cufon-canvas"><canvas style="width: 135px; height: 31px; top: 1px; left: -2px;"></canvas><cufontext>Proyectos</cufontext></cufon></h3>
                                                                </div>
                                                </div>
                                                <div class="wrapper">
                                                        <a class="button img-indent-r" href="proyectos.php">&gt;&gt;</a>
                                                                <div class="extra-wrap form-control">
								Administracion de proyectos en el sistema.
                                                                </div>
                                                </div>
                                        </div>
                                </div>
			</div>
		</div>
	</div>
    </div>   
</div> 
    <div class="footer">
	<div class="container"> 
                <img src="imagenes/logoV.png" width="30" height="30" /><br>
                <strong>DATAPLUS - COLOMBIA</strong>
                <h5>Copyright © 2016</h5>
	</div>
    </div> 
</div> 
 
</body>
</html>

