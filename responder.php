<?php
session_start();
if($_SESSION['encuestador']==true)
{
       $mensaje='Bienvenido Señor '.$_SESSION['nombre'].$_SESSION['usuario'];
       
}
else{
if (isset($_SESSION['analista'])){
    header('location:analista.php');
}
else if (isset($_SESSION['administrador'])){
    header('location:administrador.php');
}
else if (isset($_SESSION['desarrollador'])){
    header('location:desarrollador.php');
}
 else {
    session_unset();
    session_destroy();
    header('location:index.php');
}}
?>
<!DOCTYPE html>
<html >
  <head>
      <?php
require 'Crud.php';
require 'Conexion.php';
$model2 = new Crud();
$model2->select='*';
$model2->from ='encuesta_usuario';
$model2->condicion="usur_nombre='".$_SESSION['usuario']."'";
$model2->Leer();
$filas2 = $model2->rows;
$total2=  count($filas2);
?>
      <link rel="stylesheet" href="bootstrap/bootstrap/css/bootstrap.min.css" />
      <link rel="stylesheet" href="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/css/no-theme/jquery-ui-1.10.3.custom.min.css"/>
    <link rel="stylesheet" href="responder.css"/>
    <link rel="stylesheet" type ="text/css" href="administrador.css" />
    <link rel="stylesheet" type ="text/css" href="estilo.css" />
<!--linkear JAVASCRIPT-->
<script type="text/javascript" src="php-js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="php-js/sha1.js"></script>
<script src="responder.js"></script>
    <meta charset="UTF-8">
    <title>responder</title>

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
                            <li><a href="datos.php"><span class="icon icon-profile" ></span>Datos</a></li>
                            <li><a href="Manual-de-usuario.pdf" download="Manual de Usuario"><span class="icon icon-book"></span>Manual</a></li>
                            <li id="Cerrar"><a href="cerrar.php" id="Cerrar"><span class="icon-switch"></span>Cerrar</a></li>
			</ul>
		</li>
                <li><a href="responder.php"><span class="icon icon-pencil2"></span>Resolver encuestas</a>
                    <li><a href="encuestador.php"><span class="icon icon-home3"></span>Inicio</a></li>
            </ul>
        </nav>
</header>

<div class="body">
    <div class="texto">
        <div id="cargar" class="text-center">    <br>
      <div class="text-center">
          <span>En esta pagina podra resolver los cuationarios asigandos, para esto debe seleccionar de la lista el nombre del estudio.<br>
                Para posteriormente ir resolviendo las preguntas de acuerdo al cuestionario.</span><br><br>
 <div id="listaencuestas">
            <div class="form-inline">
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
          &nbsp;&nbsp; <button id="elegir" class="btn btn-primary" style='display:none;'>Cargar encuesta</button>
           </div><label id='error-elegir' class='validacion2' style='display:none;' >
               Seleccione alguna encuesta </label>
        </div>
          <div id="contenedor" class="contenedor" > 
        </div>
          <div id="p-corre" class="form-inline" style='display:none;'>
              <br>
        <label class="confirmacion"><img src="imagenes/confirmar.jpg" align="center" height="40px" width="40px">Encuesta Terminada</label>
    </div>
        <div id="div-terminar" class="text-center">
           <label id="escrito"></label>Desea terminar esta encuesta
                <br><br>
            <input type="submit" id="termi" value="Terminar" class="btn btn-primary"></input>
            &nbsp;             &nbsp;&nbsp; 
                 <button id="no-termi"class="btn btn-danger">Cancelar</button>
        </div>
          <br><br>
      <div class="text-center">
    <button id="terminar" class="btn btn-danger" style='display:none;'>Terminar encuesta</button>
    </div>
          <br>
  </div>
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
    <!--<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'></script>
      --> 
  </body>
</html>
