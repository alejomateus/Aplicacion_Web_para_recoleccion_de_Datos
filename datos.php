<!DOCTYPE HTML>
<html>
<?php
session_start();
$mensaje=null;
if(isset($_SESSION['administrador'])||isset($_SESSION['desarrollador'])||isset($_SESSION['analista'])||isset($_SESSION['encuestador']))
{
    $mensaje='Bienvenido Señor '.$_SESSION['nombre']." ".$_SESSION['usuario'];
}

else{

    session_unset();
    session_destroy();
    header('location:index.php');

 }
 if (isset($_POST['cerrar'])){
session_start();
        session_destroy();
        header('location:index.php');
 }      
?>
    <head>
<?php
require 'Crud.php';
require 'Conexion.php';
$model = new Crud();
$model->select='*';
$model->from ='usuario';
$model->condicion=" usur_nombre='".$_SESSION['usuario']."'";
$model->leer();
$filas = $model->rows;
$total=  count($filas);
?>
<meta charset="utf-8">
<!-- linkear css-->
<link rel="shortcut icon" type="image/x-icon" href="Imagenes/logo.png">
<link rel="stylesheet" href="bootstrap/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/css/no-theme/jquery-ui-1.10.3.custom.min.css"/>
<link rel="stylesheet" href="datos.css"/>
    <link rel="stylesheet" type ="text/css" href="administrador.css" />
    <link rel="stylesheet" type ="text/css" href="estilo.css" />
<!--linkear JAVASCRIPT-->
<script type="text/javascript" src="php-js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="datos.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="php-js/sha1.js"></script>
<title>Tus Datos</title>
</head>
<body>
<div class="body_wrapper">
    <div class="alinear">
    </div><div class="H1Data"><img src="imagenes/logoV.png" wight="28" height="28" top="20" left ="10" > DATAPLUS COLOMBIA S.A.S.</div>
<header>
    <div class="menu_bar">
	<a href="#" class="bt-menu"><span class="icon-home3"></span>Menú</a>
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
                <?php if (isset($_SESSION['administrador'])){
                   echo ' <li><a href="usuarios.php"><span class="icon icon-users"></span>Panel De Usuarios</a>'.
                '<li><a href="asignar.php"><span class="icon icon-clipboard"></span>Asignar Encuestas</a></li>'.
                '<li><a href="proyectos.php"><span class="icon icon-briefcase"></span>Proyectos</a></li>'.
                '<li><a href="administrador.php"><span class="icon icon-home3"></span>Inicio</a></li>';
                }
               else if (isset($_SESSION['encuestador'])){
                    echo '<li><a href="responder.php"><span class="icon icon-pencil2"></span>Resolver encuestas</a>'.
                '<li><a href="encuestador.php"><span class="icon icon-home3"></span>Inicio</a></li>';
               }
               else if (isset($_SESSION['desarrollador'])){
                 echo  ' <li><a href="crear_encuesta.php"><span class="icon icon-file-text2"></span>Crear encuesta</a>'.
                    '<li><a href="modificar.php"><span class="icon icon-pencil2"></span>Actualizar estudios</a>'.
               ' <li><a href="desarrollador.php"><span class="icon icon-home3"></span>Inicio</a>';
               }
               else if (isset($_SESSION['analista'])){
                echo   ' <li><a href="descargar.php"><span class="icon icon-download2"></span>Reportes</a>'.
                   ' <li><a href="analista.php"><span class="icon icon-home3"></span>Inicio</a></li>';
               }?>
            </ul>
        </nav>
</header>
        <div class="body">
    <div class="texto">
        <br>
        <div id="cargar" class="text-center">
     <br>
    <div class="text-center " >
        
   <?php
    foreach ($filas as $fila){
echo '<label class="h2" id="nom">Hola '.$fila["usur_nombre_persona"];
echo '</label><br> <br> <div class="linea"></div><br><br> <div class="caja text-left">'.
    
   ' <div class="form-inline"><label > <strong>Tu Nombre de Usuario: </strong><label id="user">'.$fila["usur_nombre"].'</label></label></div><br>'.
      ' <div class="form-inline"><label > <strong>Tu Nombre Personal: </strong><label id="nombre">'.$fila["usur_nombre_persona"].'</label></label></div><br>'.
            ' <label> <strong> Tu Cargo: </strong>'.$fila["usur_tipo"].'</label><br>';
    }
    
?>
        
        </div>
    
        <div class="lineas ">
            <div id="div-actualizar " class="div-actualizar text-left" ><br>
                <label class="h2" id="nom">Actualiza tus datos</label><br>
            <form name="frm_update" id="frm_update" action="" method="post">
            <fieldset>
                <label for="usuario-u">Tu nombre personal</label>
                <input type="text" name="usuario-u" id="usuario-u" <?php echo "value='".$fila["usur_nombre_persona"]."'" ?>/>
                <label id='u-error-u' class='validacion2' style='display:none;'>
                No puedes dejar este campo en blanco. </label>
                <label for="clave-u">Contraseña Anterior</label>
                <input type="password" name="clave-u" id="clave-u"  />
                <label id='c-error-u' class='validacion2' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
               
                <label for="n-clave-u">Nueva Contraseña</label>
                <input type="password" name="n-clave-u" id="n-clave-u"  />
                <label id='n-error-u' class='validacion2' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
                 <label for="co-clave-u">Confirmar Nueva Contraseña</label>
                 <input type="password" name="co-clave-u" id="co-clave-u"  />
                <label id='co-error-u' class='validacion2' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
            </fieldset>
                <fieldset >
                <input type="button" id="continua" value="Continuar" class="btn btn-primary"/>
                </fieldset>
            </form>
        </div>
              <div id="e-corre" class="form-inline" style='display:none;'>
        
        <label class="confirmacion"><img src="imagenes/confirmar.jpg" align="center" height="30px" width="30px">Tus datos han sido actualizados correctamente</label>
    </div>
            <div class="lineas "><br><br>
    </div>
        </div>
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
</body>
</html>