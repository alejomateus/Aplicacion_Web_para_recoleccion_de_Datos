<?php
session_start();
if($_SESSION['analista']==true)
{
   $mensaje='Bienvenido Señor '.$_SESSION['nombre'];
   
}
else{
if (isset($_SESSION['administrador'])){
    header('location:administrador.php');
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
}}

?>
<!DOCTYPE HTML>
<html>
<head>
<?php
require 'usuarios/Crud.php';
require 'usuarios/Conexion.php';

$model2 = new Crud();
$model2->select='*';
$model2->from ='encuesta';
$model2->condicion="estado_encuesta like '%Camp%' or estado_encuesta like '%termi%'";
$model2->Leer();
$filas2 = $model2->rows;
$total2=  count($filas2);
?>
<meta charset="utf-8">
<!-- linkear css-->
<link rel="stylesheet" href="bootstrap/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/css/no-theme/jquery-ui-1.10.3.custom.min.css"/>
<link rel="stylesheet" href="proyectos.css"/>
    <link rel="stylesheet" type ="text/css" href="administrador.css" />
    <link rel="stylesheet" type ="text/css" href="estilo.css" />
<!--linkear JAVASCRIPT-->
<script type="text/javascript" src="php-js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="descarga.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="php-js/sha1.js"></script>
<title>Descarga</title>
</head>
<body>
<div class="body_wrapper">
    <div class="alinear">
    </div><div class="H1Data"><img src="imagenes/logoV.png" wight="28" height="28" top="20" left ="10" > DATAPLUS COLOMBIA S.A.S.</div>
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
                <li><a href="descargar.php"><span class="icon icon-download2"></span>Reportes</a>
                <li><a href="analista.php"><span class="icon icon-home3"></span>Inicio</a></li>
            </ul>
        </nav>
</header>

<div class="body">
    <div class="texto">
        <div id="cargar" class="text-center">
    <br>
    <div class="text-center ">    
        <div id="listacampo">
           <select id="encuestas">
               <option value="">Seleccione una encuesta</option>
    <?php
    if($total2>0){
foreach ($filas2 as $fila2){
    echo '<span>'.$total2.'</span>';
    echo '<option value="'.$fila2["nombre_encuesta"].'">'.$fila2["nombre_encuesta"].'</option>';
}}
?>
    </select>
            &nbsp;&nbsp; <button id="elegir" class="btn btn-primary" style='display:none;'>Cargar datos</button>
        </div>
        <br>
        
        <span>Cada vez que seleccione una encuesta podra descargar los datos en formato xls.</span>
        <div id="contenedor"></div>
    </div>
    
    <br><br><br><br><br>
    </div>
        </div>
    </div>
    <div class="footer">
	<div class="container"> 
                <img src="imagenes/logoV.png" width="30" height="30" />
                <h5>DATAPLUS - COLOMBIA
                <h5>Copyright © 2016</h5>
	</div>
    </div> 
</div> 
</body>
</html>