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
require 'Crud.php';
require 'Conexion.php';
$model3 = new Crud();
$model3->select='*';
$model3->from ='total1';
$model3->condicion="";
$model3->Leer();
$filas3 = $model3->rows;
$total3=  count($filas3);
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
<script  src="proyectos.js"></script>

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
    <div class="text-center ">    
  
         <div id="div-eliminar" class="text-center">
            <strong><label id="escrito"></label></strong>
            
             <br>
             <strong><label id="complemento"></label></strong>
             <a href='#'  id="enlace-descarga" class="enlace-descarga" color="blue">Descargue aqui una copia de los datos de esta encuesta</a><br>
             <br><input type="submit" id="eli" value="Eliminar"class="btn btn-primary"></input>
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
        <h3>Terminar y Eliminar Estudios</h3>
        <span>En el momento que decida Terminar un proyecto este cambiara su estado y no podra asignarlo a los encuestadores del sistema<br>
               Si desea eliminarlo. Recuerde que se eliminaran todos los datos de la encuesta seleccionada y no se podran recuperar</span>
        <h3>Listado de Estudios</h3>
        <section>
            <table class="table table-bordered table-striped table-condensed table-hover">
            	<thead>   
                	<tr class="bordes_n">
                        <th>Nombre de Encuesta</th>
                        <th>Cantidad de Encuestas</th>
                        <th>Estado de Encuesta</th>
                        <th>Terminar Proyectos</th>
                        <th>Eliminar Proyectos</th>
                     </tr>
                </thead>
                <tbody id="listaencuestas">
                	<?php if($total3>0){
    $mensaje="BAD";$x=2;$valor="success";
foreach ($filas3 as $fila3){
    if($x==2){$valor="warning"; }
    if($x==3){$valor="info"; }
    echo '<tr class="'.$valor.'">
<td>'.$fila3["encuesta"].'</td>
<td>'.$fila3['cantidad'].'</td>
<td>'.$fila3['estado'].'</td>    
<td><a id="editar" class="btn btn-primary" >Finalizar</a></td>
<td><a id="eliminar" class="btn btn-danger" >Eliminar</a></td>
</tr>';
    $x++;
    if($x>3 ){$x=2;}
}}
 else {
     echo '<tr> <td colspan="7">No hay proyectos en el momento </td> </tr>';
} ?>
                </tbody>
            </table>
        </section>
       
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
 <!--   <script  src="proyectos.js"></script>-->
</body>
</html>