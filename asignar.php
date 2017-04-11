<?php
session_start();
$mensaje=null;
if($_SESSION['administrador']==true)
{
   // header('location:administrador.php');
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
require 'usuarios/Crud.php';
require 'usuarios/Conexion.php';
$model = new Crud();
$model->select='*';
$model->from ='disponible';
$model->condicion="";
$model->Leer();
$filas = $model->rows;
$total=  count($filas);

$model2 = new Crud();
$model2->select='*';
$model2->from ='encuesta';
$model2->condicion="estado_encuesta like '%Camp%'";
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
<script type="text/javascript" src="proyectos.js"></script>
<script type="text/javascript" src="php-js/jquery-ui-1.10.3.custom/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="php-js/sha1.js"></script>
<title>Proyectos</title>
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
                <li><a href="usuarios.php"><span class="icon icon-users"></span>Panel De Usuarios</a>
                <li><a href="asignar.php"><span class="icon icon-clipboard"></span>Asignar Encuestas</a></li>
                <li><a href="proyectos.php"><span class="icon icon-briefcase"></span>Proyectos</a></li>
                <li><a href="administrador.php"><span class="icon icon-home3"></span>Inicio</a></li>
            </ul>
        </nav>
</header>
    <br>
        <div class="body">
    <div class="texto">
        <br>
        <div id="cargar" class="text-center">
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
        </div>
        <br>
        
        <span>Cada vez que seleccione una opcion, se listaran los encuestadores <br>
                que no tienen la escuesta asignada y se mostrara la carga de trabajo que tiene  cada uno</span>
        <h3>Lista de Encuestadores</h3>
        <section>
            <table class="table table-bordered table-striped table-condensed table-hover">
            	<thead>   
                	<tr class="bordes_n">
                        <th>Nombre completo</th>
                        <th>Correo electronico</th>
                        <th>Proyectos</th>
                        <th id="columna" style="display: none">Asignar</th>
                     </tr>
                </thead>
                <tbody id="listausuarios">
                	<?php if($total>0){
    $mensaje="BAD";$x=2;$valor="success";
foreach ($filas as $fila){
    if($x==2){$valor="warning"; }
    if($x==3){$valor="info"; }
    echo '<tr class="'.$valor.'">
        <td>'.$fila["nombre"].'</td>
<td>'.$fila["usuario"].'</td>
    <td>'.$fila["numero"].'</td>
    </tr>';
    $x++;
    if($x>3 ){$x=2;}
}}
 else {
     echo '<tr> <td colspan="7">No hay encuestadores en la Base de Datos  </td> </tr>';
} ?>
                </tbody>
            </table>
        </section>
            <button id="boton" class="btn btn-default" style='display:none;'>Asignar encuestas</button>
            <button id="ver_todo" class="btn btn-primary" style='display:none;'>Ver lista general</button>
            <br>
            <br> <label id='error-check' class='validacion2' style='display:none;' >
               Seleccione algun usuario</label>
         <div id="div-eliminar" class="text-center">
            <strong><label id="escrito"></label></strong>
            
             <br>
             <strong><label id="complemento"></label></strong>
             <br>
             <input type="submit" id="eli" value="Eliminar"class="btn btn-primary"></input>
            &nbsp;&nbsp;              
                 <button id="no-eli"class="btn btn-danger">Cancelar</button>
        </div>
         <div id="div-terminar" class="text-center">
            <strong><label id="escrito-u"></label></strong>
            
             <br>
             <strong><label id="complemento-u"></label></strong>
             <br>
             <input type="submit" id="termi" value="Terminar"class="btn btn-primary"></input>
            &nbsp;&nbsp;              
                 <button id="no-termi"class="btn btn-danger">Cancelar</button>
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