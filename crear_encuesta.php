<?php
session_start();
if($_SESSION['desarrollador']==true)
{
   $mensaje='Bienvenido Señor '.$_SESSION['nombre'];
   
}
else{
if (isset($_SESSION['analista'])){
    header('location:analista.php');
}
else if (isset($_SESSION['administrador'])){
    header('location:administrador.php');
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
<meta charset="utf-8">
<!-- linkear css-->
<link rel="stylesheet" href="bootstrap/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/css/no-theme/jquery-ui-1.10.3.custom.min.css"/>
<link rel="stylesheet" href="crear_encuesta.css"/>
<link rel="stylesheet" type ="text/css" href="administrador.css" />
<link rel="stylesheet" type ="text/css" href="estilo.css" />
<!--linkear JAVASCRIPT-->
<script type="text/javascript" src="php-js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
   <script  src="crear_encuesta.js"></script>
   <script type="text/javascript">
window.onbeforeunload = function exitAlert()
	{
	var textillo = "Los datos pueden quedar incompletos o sin guardar";
	
	return textillo;
	}
</script>
<script>$('#encuesta').bind("cut copy paste",function(e) {
      e.preventDefault();
    });
</script>
<title>Crear</title>
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
                <li><a href="crear_encuesta.php"><span class="icon icon-file-text2"></span>Crear encuesta</a>
                    <li><a href="modificar.php"><span class="icon icon-pencil2"></span>Actualizar estudios</a>
                <li><a href="desarrollador.php"><span class="icon icon-home3"></span>Inicio</a>
            </ul>
        </nav>
</header>
<div class="body">
    <div class="texto">
        <div id="cargar" class="text-center">
    <div class="text-center ">  
        <h2>Crear Estudios</h2>
        <div class="form-inline" id="verifi-encuesta">
            <span>En esta pagina podra crear sus estudios asignados, para esto debe establecer un nombre de encuesta y confirmarlo.<br>
                Despues de esto tendra que ir subiendo las preguntas con su respectivo id llenando los campos correctamente.</span>
            <br><br>
            <div class="linea"></div><br>
            <input type="text" name="encuesta"  onselectstart="return false;" ondragstart="return false;" id="encuesta" style="height:30px;" placeholder="Escribe el nombre del estudio" />
             &nbsp;
             <input type="button" id="crear_encuesta" value="Crear estudio" class="btn btn-primary" /> </div>
<label id="error-e" class='validacion' style='display:none;'>Esta estudio ya fue creada, ingrese otro nombre</label>

<div id="tipo-pregunta" style='display:none;'>
    <div id="e-corre" class="form-inline" style='display:none;'>
        <label class="confirmacion"><img src="imagenes/confirmar.jpg" align="center" height="30px" width="30px">Estudio agregado correctamente</label>
    </div>
<br>
<div id="mensaj">
<span  >A continuacion podra ingresar las preguntas del cuestionario, llenando los campos requeridos de acuerdo al tipo de pregunta adecuado.<br>
       Para la edicion de preguntas, acceder al menu Actualizar estudios ubicado en la barra de navegacion. </span><br><br></div>
<h3 id="nom-encu" style='display:none;'>Estudio </h3>
<div class="form-inline">
    <input type="text" onselectstart="return false;" ondragstart="return false;" name="id-pregunta" id="id-pregunta" style="width:500px;" class="form-control" placeholder="Digite el id de la pregunta"><br>
   <label id="error-id-pre" class='validacion' style='display:none;'>Este campo no puede estar en blanco</label><br>
   <textarea  name="nom-pregunta" id="nom-pregunta" style="width:500px;" class="form-control" placeholder="Escribe el texto de la pregunta"></textarea><br>
<label id="error-pre" class='validacion' style='display:none;'>Este campo no puede estar en blanco</label>
&nbsp;&nbsp;&nbsp;
<form method="post" id="formulario" enctype="multipart/form-data">
    <input type="file" class="file" id="file" name="file[]" >
    <label id="error-arch" class='validacion' style='display:none;'>Archivo muy grande</label> 
     </form>
<div id="vista-previa"></div>
<div id="respuesta" ></div>
</div>
<select id="tipodepregunta" class='validacion' >
<option value ="">Seleccione un tipo de pregunta</option> 
<option value ="Abierta">Abierta</option> 
<option value ="Multiple">Multiple</option>
<option value ="Unica">Unica</option>
<option value ="Numerica">Numerica</option>
<option value ="Grilla">Grilla</option>
</select>
<label id="error-tip" class='validacion' style='display:none;'>Seleccione un tipo de pregunta</label>
<div id="pregunta-varias"  style='display:none;'>
    <br>
    <textarea name="encuesta" id="opciones" style="height: 300px; width:300px;" placeholder="Escribe las opciones y separelas con un interlineado"></textarea>
    <label id="error-opc" class='validacion' style='display:none;'>Ingrese opciones a la lista</label>
    <br>        
</div>
<div id="pregunta-grilla"  style='display:none;'>
    <br>
    <form name="radiogrilla" id="radiogrilla" action="" method="POST">
	<input type="radio" name="tipogrilla" id="tipogrilla" value="Multiple"> Multiple
	<input type="radio" name="tipogrilla" id="tipogrilla" value="Unica"> Unica
<label id="error-rad-grilla" class='validacion' style='display:none;'>Seleccione algun tipo</label>    
    </form><textarea name="encuesta" id="preguntasg" style="height: 300px; width:300px;" placeholder="Escribe las preguntas y separelas con un interlineado"></textarea>
    &nbsp;&nbsp;<textarea name="encuesta" id="opcionesg" style="height: 300px; width:300px;" placeholder="Escribe las opciones y separelas con un interlineado"></textarea>
    <label id="error-opcg" class='validacion' style='display:none;'>Ingrese opciones a la lista</label>
     <label id="error-preg" class='validacion' style='display:none;'>Ingrese pregunta a la lista</label>
  <br>        
</div>
<br>
<input type="button" id="agregar-pregunta" value="Agregar pregunta" class="btn btn-primary" style='display:none;'/>
<br>
</div><br>
 <div id="p-corre" class="form-inline" style='display:none;'>
        <label class="confirmacion"><img src="imagenes/confirmar.jpg" align="center" height="30px" width="30px">Pregunta agregada correctamente</label>
    </div>
    </div>
    <div id="div-terminar" class="text-center">
        <label id="escrito"></label>¿ Desea terminar este estudio ?
        <br><br>
        Si desea terminarlo por favor seleccione un estado
        <br><br>
                
        <form name="estadoencuesta" id="estadoencuesta" action="" method="POST">
            <input type="radio" name="estado" id="estado" value="En Diseño"> En diseño
            <input type="radio" name="estado" id="estado" value="Para Campo"> Para Campo
            <label id="error-estado" class='validacion' style='display:none;'>Seleccione un estado!!</label>    
        </form>
            <input type="submit" id="termi" value="Terminar" class="btn btn-primary"></input>
            &nbsp;             &nbsp;&nbsp; 
                 <button id="no-termi"class="btn btn-danger">Cancelar</button>
    </div>
    <div class="text-center">
    <button id="terminar" class="btn btn-danger" style='display:none;'>Terminar encuesta</button>
    </div><br><br><br><br><br><br><br><br>
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