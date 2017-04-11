<?php
require 'usuarios/Conexion.php';
require 'usuarios/Seleccionar.php';
session_start();
if (isset($_SESSION['administrador'])){
    header('location:administrador.php');
}
else if (isset($_SESSION['analista'])){
    header('location:analista.php');
}
else if (isset($_SESSION['desarrollador'])){
    header('location:desarrollador.php');
}
else if (isset($_SESSION['encuestador'])){
    header('location:encuestador.php');
}
$mensaje=null;
if(isset($_POST['login'])){ 
    $model = new Seleccionar;
    $model->usuario =  htmlspecialchars($_POST['usuario']);
    $model->clave =  sha1(htmlspecialchars($_POST['clave']));
    $model->login();
$mensaje = $model->mensaje;}
        ?>
<!DOCTYPE HTML>
<html>
<head> 
<meta charset="utf-8">
<link rel="shortcut icon" type="image/x-icon" href="Imagenes/logo.png">
<!-- linkear css-->
<link rel="stylesheet" href="bootstrap/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/css/no-theme/jquery-ui-1.10.3.custom.min.css"/>
<link rel="stylesheet" href="assets/css/main.css" />
<link rel="stylesheet" href="index.css" />
<!--linkear JAVASCRIPT-->
<script type="text/javascript" src="php-js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="php-js/sha1.js"></script>
<title>Dataplus</title>
</head>
<body>
    <section id="banner">
	<h2>DATAPLUS COLOMBIA S.A.S.</h2>
	<p>Este espacio es unicamente para los empleados en DataPlus Colombia S.A.S<br>
        Si desea conocer mas sobre nuestros servicios vaya al siguiente enlace <a href="http://www.dataplus.com.co" target ="_blank" class="enlace">http://www.dataplus.com.co</a></p>
   <div id="div-recuperar" >
       <form name="frm-recuperar" id="frm-recuperar" action="" method="post">
            <fieldset> 
           	<label for="correo">Escriba el correo electronico registrado en el sistema</label>
                <input type="text" style="width:80%; height:35px" name="correo" id="correo"  />
                <label id='error-correo' class='validacioncorreo' style='display:none;' >
                Este Correo no esta registrado en el sistema</label>
                <input type="button" id="enviar" value="Enviar" class="btn btn-primary"/>
                <input type="button" id="cancelar" value="Cancelar" class="btn btn-danger"/>
            </fieldset>    
            </form>
        </div>
        <div class="text-center ">
        <div id="div-inicio" class="div-inicio">
        <br>    
        <form action="?" method="post">
            <div class="bloque">
                <fieldset>
                    <div >
                        <?php 
                        if($mensaje=="BAD"){
                            echo "<label id='error' class='validacion' >
                            Usuario y/o Contraseña Incorrectos </label> ";
                            echo "<script></script>";
                        } 
                    ?></div>
                    <!--<label for="usuario">Nombre de Usuario</label>-->
                    <input class="input-block-level" type="text" name="usuario" placeholder="Correo electronico" id="usuario" required/>
                    <!--<label id='u-error' class='validacion' style='display:none;' >
                    No puedes dejar este campo en blanco.</label>
                    <label for="clave">Contraseña </label>-->
                    <input class="input-block-level" type="password"  placeholder="Contraseña" name="clave" id="clave" required/>
                    <!--<label id='c-error' class='validacion' style='display:none;'>
                    No puedes dejar este campo en blanco.</label>-->
                </fieldset>  
                <ul class="actions">
                <input type='hidden' name='login'>
                    <input type="submit" id="logeo" value="Iniciar sesión" class="button"/>
                <a class="enlace2" id="olvidar" >¿Olvidaste tu contraseña?</a> </ul>
            </div> 
        </form>  
        </div>
    </div>
    </section>
    <!-- Footer -->
    <footer id="footer">
	<ul class="icons" style="margin-bottom: 0px">
        	<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
		<li><a href="https://www.facebook.com/dataplusColombia/?fref=ts" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
		<li><a href="#" class="icon fa-google-plus"><span class="label">Google+</span></a></li>
	</ul>
        <ul class="copyright">
            <li><a href="http://www.dataplus.com.co/">Dataplus S.A.S.</a></li>
        </ul>
    </footer>
</body>
</html>

