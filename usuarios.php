<?php
session_start();
$mensaje=null;
if($_SESSION['administrador']==true)
{
    //header('location:administrador.php');
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
<!DOCTYPE HTML>
<html>
<head>
<?php
require 'Crud.php';
require 'Conexion.php';
$model = new Crud();
$model->select='*';
$model->from ='usuario';
$model->condicion="";
$model->Leer();
$filas = $model->rows;
$total=  count($filas);
?>
<meta charset="utf-8">
<!-- linkear css-->
 <link rel="shortcut icon" type="image/x-icon" href="Imagenes/logo.png">
    <title>Usuarios </title>
<link rel="stylesheet" href="bootstrap/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/css/no-theme/jquery-ui-1.10.3.custom.min.css"/>
<link rel="stylesheet" href="usuarios.css"/>
<link rel="stylesheet" type ="text/css" href="administrador.css" />
<link rel="stylesheet" type ="text/css" href="estilo.css" />
<!--linkear JAVASCRIPT-->
<script type="text/javascript" src="php-js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="myjavascript.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="php-js/sha1.js"></script>
<title></title>
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
                <li><a href="usuarios.php"><span class="icon icon-users"></span>Panel De Usuarios</a>
                <li><a href="asignar.php"><span class="icon icon-clipboard"></span>Asignar Encuestas</a></li>
                <li><a href="proyectos.php"><span class="icon icon-briefcase"></span>Proyectos</a></li>
                <li><a href="administrador.php"><span class="icon icon-home3"></span>Inicio</a></li>
            </ul>
        </nav>
</header>
    <div class="body">
    <div class="texto">
        <div id="cargar" class="text-center">
           
    <br>
    <div class="text-center ">
        <form name="buscardatos" id="buscardatos" action="" method="post">
        <div class="form-inline">
       	<label for="buscar">Buscar por nombre</label>
            <input type="search" style="width:250px;" placeholder="Buscar..." name="buscar" id="buscar" />
            <br><br>
    <div class="form-inline">
            <label for="t-buscar">Buscar por tipo</label>
            <select name="t-buscar" id="t-buscar" >
                    <option value="">Seleccione el tipo de usuario</option>
                    <option value="Analista">Analista</option>
                    <option value="Encuestador">Encuestador</option>
                    <option value="Desarrollador">Desarrollador</option>
                    <option value="Administrador">Administrador</option>
                </select>        </div>
        <br>
        <label id='u-error-b' class='validacion2' style='display:none;' >
                !! Por favor llene al menos uno de los campos !!</label>
        <input type="submit" id="busqueda" value="Buscar" class="btn btn-primary"/>
        &nbsp;&nbsp;<a id="ver_todo-p" class="btn btn-default" style='display:none;'>Ver lista total</a>
        </div></form>
        
        <div id="div-frm" >
            <form name="frm_user" id="frm_user" action="" method="post">
            <fieldset>
            	<label for="usuario">Correo electronico</label>
                <input type="text" name="usuario" id="usuario" style="width:250px;" />
                <label id='u-error-a' class='validacion' style='display:none;' >
                El nombre de usuario ya existe ingrese uno nuevo</label>
                <label for="clave">Contraseña </label>
                <input type="password" name="clave" id="clave" style="width:250px;" />
                <label id='c-error-a' class='validacion' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
                <label for="nombre">Nombre Completo del Usuario</label>
                 <input type="text" name="nombre" id="nombre" style="width:250px;" />
                <label id='n-error-a' class='validacion' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
                 <label for="tipo">Tipo de Usuario</label>
                <select name="tipo" id="tipo" style="width:250px;">
                <option value="">Seleccione el tipo de usuario</option>
                <option value="Analista">Analista</option>
                <option value="Encuestador">Encuestador</option>
                <option value="Desarrollador">Desarrollador</option>
                <option value="Administrador">Administrador</option>
                </select>
                <label id='t-error-a' class='validacion' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
                </fieldset>
                <input type="submit" id="enviar" value="Continuar" class="btn btn-primary"/>
                <input type="button" id="cancelar" value="Cancelar" class="btn btn-danger"/>
                </form>
        </div>
        <div>
        	<button id="agregar" name="agregar" class="btn btn-primary">Agregue un nuevo Usuario </button>
        </div>
        
        <h2>Lista de Usuarios</h2>
        <section>
            <table class="table table-bordered table-condensed table-hover">
            	<thead>   
                	<tr class="bordes_n">
                    	<th>Correo electronico</th>
                        <th>Nombre completo</th>
                        <th>Tipo de Usuario</th>
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody id="listausuarios">
                	<?php if($total>0){
    $mensaje="BAD";
foreach ($filas as $fila){
    echo '<tr>
<td>'.$fila["usur_nombre"].'</td>
<td>'.$fila["usur_nombre_persona"].'</td>
<td>'.$fila["usur_tipo"].'</td>
<td><a id="editar" class="btn btn-primary" >Editar</a></td>
<td><a id="eliminar" class="btn btn-danger" >Eliminar</a></td>
</tr>';}}
 else {
     echo '<tr> <td colspan="7">No hay Registros en la Base de Datos  <a id="ver_todo" class="btn btn-warning" >Ver lista total</a> </td> </tr>';
} ?>
                </tbody>
            </table>
        </section>
    </div>
        <div id="div-eliminar" class="text-center">
            <strong><label id="escrito"></label></strong>
             <br>
             <input type="submit" id="eli" value="Eliminar"class="btn btn-primary"></input>
            &nbsp;&nbsp;              
                 <button id="no-eli"class="btn btn-danger">Cancelar</button>
        </div>
          <div id="div-actualizar" >
            <form name="frm_update" id="frm_update" action="" method="post">
            <fieldset>
                <label for="usuario-u">Correo electronico</label>
                <input type="text" name="usuario-u" id="usuario-u"  style="width:250px;"/>
                <label id='u-error-u' class='validacion' style='display:none;'>
                Este usuario </label>
                <label for="nombre-u">Nombre Completo del Usuario</label>
                <input type="text" name="nombre-u" id="nombre-u"  style="width:250px;"/>
                <label id='n-error-u' class='validacion' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
                <label for="tipo-u">Tipo de Usuario</label>
                <select name="tipo-u" id="tipo-u" style="width:250px;">
                    <option value="">Seleccione el tipo de usuario</option>
                    <option value="Analista">Analista</option>
                    <option value="Encuestador">Encuestador</option>
                    <option value="Desarrollador">Desarrollador</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <label id='t-error-u' class='validacion' style='display:none;'>
                No puedes dejar este campo en blanco.</label>
            </fieldset>
                <fieldset>
                <input type="submit" id="continua" value="Continuar" class="btn btn-primary"/>
                <input type="button" id="cancelar-u" value="Cancelar" class="btn btn-danger"/>
                </fieldset>
            </form>
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
  <!--  <script  src="myjavascript.js"></script>
--></body>
</html>