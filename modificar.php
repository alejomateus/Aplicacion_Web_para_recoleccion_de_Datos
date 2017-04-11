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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<?php
require 'Crud.php';
require 'Conexion.php';

$model = new Crud();
$model->select='*';
$model->from ='encuesta';
$model->condicion=" estado_encuesta like '%Camp%' or estado_encuesta like '%Dise%' ";
$model->Leer();
$filas = $model->rows;
$total=  count($filas);
?>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Actualizar</title>

<!-- Bootstrap CSS -->
<link href="bootstrap/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/css/no-theme/jquery-ui-1.10.3.custom.min.css"/>
<link rel="stylesheet" type ="text/css" href="administrador.css" />
<link rel="stylesheet" type ="text/css" href="estilo.css" />
<link href="modificar.css" type="text/css" rel="stylesheet" />
<!-- jQuery -->
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<!-- jQuery UI CSS 
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>-->
<script type="text/javascript" src="php-js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="modificar.js "></script>
<script type="text/javascript">
window.onbeforeunload = function exitAlert()
	{
	var textillo = "Los datos pueden quedar incompletos o sin guardar";
	return textillo;
	}
</script>
<script>  
      $('#id-pregunta').bind("cut copy paste",function(e) {
      e.preventDefault();
  });
    </script>
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
                <li><a href="crear_encuesta.php"><span class="icon icon-file-text2"></span>Crear estudio</a>
                    <li><a href="modificar.php"><span class="icon icon-pencil2"></span>Actualizar estudios</a>
                <li><a href="desarrollador.php"><span class="icon icon-home3"></span>Inicio</a>
            </ul>
        </nav>
</header>
<div class="body">
    <div class="texto">
        <br>
        <div id="cargar" class="text-center">
    <div class="text-center">
 <div id="listacampo">
          <span>En el momento que tenga que actualizar un estudio puede seleccionarlo.  <br>
           Al seleccionar podra modificar el orden de las preguntas, editarlas, eliminarlas o agregar una nueva. </span>
     <br><br>
           <select id="encuestas">
               <option value="">Seleccione un estudio</option>
    <?php
    if($total>0){
foreach ($filas as $fila){
    echo '<option value="'.$fila["nombre_encuesta"].'">'.$fila["nombre_encuesta"].'</option>';
}}
?>
    </select>
        </div>
        <div id="div-estado" class="text-center">
            <br>El estado anterior estara pre-seleccionado para cambiar seleccione el otro estado
                <br> </br>
              <form name="estadoencuesta" id="estadoencuesta" action="" method="POST">
	<input type="radio" name="estado" id="estado" value="Diseño"> En diseño
	<input type="radio" name="estado" id="estado" value="Campo"> Para Campo
<label id="error-estado" class='validacion' style='display:none;'>Seleccione un estado!!</label>    
    </form>
            <input type="submit" id="cambiar" value="Cambiar Estado" class="btn btn-primary"></input>
            &nbsp;             &nbsp;&nbsp; 
                 <button id="no-cambiar"class="btn btn-danger">Cancelar</button>
        </div>
      <div id="div-eliminar" class="text-center">
            <strong><label id="escrito"></label></strong>
             <br>
             <input type="submit" id="eli" value="Eliminar"class="btn btn-primary"></input>
            &nbsp;&nbsp;              
                 <button id="no-eli"class="btn btn-danger">Cancelar</button>
        </div>
        <div id="tablapreguntas" style="display: none"><br>
            <button id="agregar" name="agregar" class="btn btn-primary">Agregue una Nueva pregunta </button>
            <input type="button" id="cambiar-estado" value="Cambiar estado" class="btn btn-default" />
      <br>
        <h2  id="titulo" >Sortable table</h2>

            <table class="table table-bordered" id="tablapreg">
                <thead>
                    <tr><th>Numero</th><th>Id_pregunta</th><th> Editar </th><th> Eliminar </th></tr>
                </thead>
                <tbody id="listapreguntas">
				  </tbody>
            </table>
        </div>
        <div id="tipo-pregunta" style='display:none;'>
            <br>
<h3 id="nom-encu" style='display:none;'>Estudio </h3>
<div class="form-inline">
    <input type="text" name="id-pregunta"  onselectstart="return false;" ondragstart="return false;" id="id-pregunta" style="width:650px;" placeholder="Digite el nombre de la pregunta"><br><br>
   <label id="error-id-pre" class='validacion' style='display:none;'>Este campo no puede estar en blanco</label>
   <textarea type="text" name="nom-pregunta" id="nom-pregunta" style="width:650px;" placeholder="Escribe el texto de la pregunta"></textarea><br>
<label id="error-pre" class='validacion' style='display:none;'>Este campo no puede estar en blanco</label>
&nbsp;&nbsp;&nbsp;
<form method="post" id="formulario" enctype="multipart/form-data">
    <div id="modif-arch" style='display:none;'>
        <input type="checkbox" id="mostrar-arch" value="Si" >Modificar o agregar una imagen o video</input>
     <br>
     <input type="checkbox" id="elim-arch" value="No" >Eliminar archivo subido</input>
         <br>
    </div>
    <input type="file" class="file" id="file" name="file[]" ></input>
    <br> <label id="error-arch" class='validacion' style='display:none;'>Archivo muy grande</label> 
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
    <form name="radiovarios" id="radiovarios" action="" method="POST" style='display:none;'>
	<input type="radio" name="tipovarios" id="tipovarios" value="Multiple"> Multiple
	<input type="radio" name="tipovarios" id="tipovarios" value="Unica"> Unica
<label id="error-rad-varios" class='validacion' style='display:none;'>Seleccione algun tipo</label>    
</form  ><br>
    <br> <textarea name="encuesta" id="opciones" style="height: 300px; width:300px;" placeholder="Escribe las opciones y separelas con un interlineado"></textarea>
    <label id="error-opc" class='validacion' style='display:none;'>Ingrese opciones a la lista</label>
    <br>        
</div>
<div id="pregunta-grilla"  style='display:none;'>
    <br><form name="radiogrilla" id="radiogrilla" action="" method="POST">
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
&nbsp;&nbsp;
<input type="button" id="editar-pregunta" value="Guardar cambios" class="btn btn-primary" style='display:none;'/>
<input type="button" id="cargar-lista" value="Cargar lista " class="btn btn-default" />
<br>
</div><br>
 <div id="p-corre" class="form-inline" style='display:none;'>
     <label class="confirmacion"><img src="imagenes/confirmar.jpg" align="center" height="30px" width="30px">Pregunta agregada correctamente</label>
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
