<?php
require 'Crud.php';
require 'Conexion.php';
$respuesta="";
	$mensaje="";
	$ContenidoHTML="";
        if($_POST['Op']=="eliminar"){
     $model = new Crud;
    $model->deletefrom=$_POST['tabla'];
    $model->condicion=$_POST['condici'];
    $model->eliminar();
    $respuesta=$model->mensaje;
    }
    if($_POST['Op']=="eliminar2"){
     $model = new Crud;
    $model->deletefrom=$_POST['tablax'];
    $model->condicion=$_POST['condicix'];
    $model->eliminar();
    $respuesta=$model->mensaje;
    }
if($_POST['Op']=="insertar"){
    $model = new Crud;
    $model->insertInto=$_POST['tabla'];
    $model->insertValues=$_POST['values'];
    $model->Crear();
    $respuesta=$model->mensaje;
    $variable=">>>>".$_POST['values'].$_POST['tabla'];
}
function EliminarDir($ruta){
    foreach (glob($ruta."/*")as $elemento){
        if(is_dir($elemento)){
            EliminarDir($elemento);
        }
        else{
            unlink($elemento);
        }
    }
    rmdir($ruta);
}
if($_POST['Op']=="correo"){
    $correo=$_POST["correo"];
    $asunto="Recuperacion de Contraseña";
    $valor=rand(10000000,99999999);
    $codigo=sha1($valor);
    $mensaje="Para recuperar tu contraseña ingresa este codigo en el campo de la clave y cambie la contraseña "
            . "inmediatamente para evitar inconvenientes posterormente. \n\n\n"
            . "Codigo: ".$valor." ";
    $model = new Crud;
    $model->update="usuario ";
    $model->set=" usur_clave_recup='".$codigo."'";
    $model->condicion=" usur_nombre= '".$correo."'";
    $model->actualizar();
    mail($correo,$asunto,$mensaje);
    $respuesta=$model->mensaje;
    }
if($_POST['Op']=="borrar"){
    $ruta=$_POST["ruta"];
    EliminarDir($ruta);
}
if($_POST['Op']=="copiar"){
 $ruta=$_POST["ruta"];
 $ruta2=$_POST["ruta2"];
 $carpeta=$_POST["carpeta"];
 $carpeta2=$_POST["carpeta2"];
 if($ruta!=$ruta2){
 if (!file_exists($carpeta)) {
    mkdir($carpeta, 0777, true);}
 rename ($ruta,$ruta2);
 EliminarDir($carpeta2);}
}
if($_POST['Op']=="actualizar"){
    $model = new Crud;
    $model->update=$_POST['tabla'];
    $model->set=$_POST['values'];
    $model->condicion=$_POST['condici'];
    $model->actualizar();
    $respuesta=$model->mensaje;
}
      if($_POST['Op']=="varios"){
          $tablas=  json_decode(stripcslashes($_POST['tablax']));
     $model = new Crud;
     foreach ($tablas as $tabla){
    $model->deletefrom=$tabla;
    $model->condicion=$_POST['condici'];
     $model->eliminar();
     $respuesta=$model->mensaje;
     }
}
if($_POST['Op']=="guiaactualizada"){
    $model = new Crud;
    $model->update=$_POST['tabla'];
    $id = $_POST['id'];
  $guia = $_POST['guia'];
   $tabla=$_POST['tabla'];
  $x=0;$var;
   foreach ($guia as $val) {
    $model->set="id_guia_pregunta= '".$val."'";
    $model->condicion="numero_pregunta = '".$id[$x]."'";
    $model->actualizar();
    $respuesta=$model->mensaje;
    $x++;
}   
}
if($_POST['Op'] =="bloque"){
    $bloque=  $_POST["bloque"];
    $model= new Conexion();
        $conexion= $model->conectar();
   foreach ($bloque as $sql){
    $respuesta=$sql;
        $consulta=$conexion->prepare($sql);
         if (!$consulta) {
        $respuesta="BAD".$sql;}
        else{    
            $consulta->execute();
            $respuesta="GOOD";
        }
    }
}
if($_POST['leer'] =="read"){
    $model = new Crud();
$model->select=$_POST['columnas'];
$model->from =$_POST['tabla'];
$model->condicion=$_POST['condicion'];
$model->Leer();
$filas = $model->rows;
$total=  count($filas);
$respuesta=$model->mensaje;
if($_POST['tabla']=="pregunta"){
    if($total>0){
   $mensaje="".($total+1);
foreach ($filas as $fila){
   $ContenidoHTML[0]=$fila["nombre_pregunta"];
   $ContenidoHTML[1]=$fila["tipo_pregunta"];
   $ContenidoHTML[2]=$fila["video_imagen_pregunta"];
   $ContenidoHTML[3]=$fila["numero_grilla"];
   $ContenidoHTML[4]=" ";
   $ContenidoHTML[5]=$fila["numero_pregunta"];
  }
    }
    else{
        $mensaje="".($total+1);
    }
}
if($_POST['tabla']=="encuesta"){    
    if($total>0){ 
      $mensaje="BAD";
foreach ($filas as $fila){
   $ContenidoHTML=$fila["estado_encuesta"];
}
           
}
else{
     $mensaje="GOOD";
}
}
if($_POST['tabla']=="usuario"){
if($total>0){
    $mensaje="BAD";
foreach ($filas as $fila){
$ContenidoHTML.='<tr>
<td>'.$fila["usur_nombre"].'</td>
<td>'.$fila["usur_nombre_persona"].'</td>
<td>'.$fila["usur_tipo"].'</td>
<td><a id="editar" class="btn btn-primary" >Editar</a></td>
<td><a id="eliminar" class="btn btn-danger" >Eliminar</a></td>
</tr>';}}
 else {
     $mensaje="GOOD";
    $ContenidoHTML='<tr> <td colspan="7">No hay usuarios con esta descripcion  <a id="ver_todo" class="btn btn-warning" >Ver lista total</a> </td> </tr>';
}
if($total==1){
    $mensaje="BAD";
foreach ($filas as $fila){
$ContenidoHTML=$fila["usur_nombre_persona"];}}
 else {
     $mensaje="GOOD";
}
 }
 if($_POST['tabla']=="guia_pregunta"){
if($total>0){
    $mensaje="BAD";
foreach ($filas as $fila){
$tutorial = explode('-'.$fila["nombre_encuesta"],$fila["numero_pregunta"]);
$ContenidoHTML.='<tr>
<td class="priority">'.$fila["id_guia_pregunta"].'</td>
<td class="dato">'.$tutorial[0].'</td>
<td><a id="editar" class="btn btn-primary" >Editar</a></td>
<td><a id="eliminar" class="btn btn-danger" >Eliminar</a></td>
</tr>';}}
 else {
     $mensaje="GOOD";
    $ContenidoHTML='<tr> <td colspan="7">No hay preguntas actualmente en esta encuesta </td> </tr>';
}
}
}
if($_POST['leer'] =="leer"){
    $model = new Crud();
$model->select=$_POST['columnas'];
$model->from =$_POST['tabla'];
$model->condicion=$_POST['condicion'];
$model->Leer();
$filas = $model->rows;
$total=  count($filas);
$respuesta=$model->mensaje;
if($_POST['tabla']=="usuario"){
if($total>0){
    $mensaje="BAD";
foreach ($filas as $fila){
$ContenidoHTML.='<tr>
<td>'.$fila["usur_nombre"].'</td>
<td>'.$fila["usur_nombre_persona"].'</td>
<td>'.$fila["usur_tipo"].'</td>
<td><a id="editar" class="btn btn-primary" >Editar</a></td>
<td><a id="eliminar" class="btn btn-danger" >Eliminar</a></td>
</tr>';}}
 else {
     $mensaje="GOOD";
    $ContenidoHTML='<tr> <td colspan="7">No hay Usuarios con esta descripcion  <a id="ver_todo" class="btn btn-warning" >Ver lista total</a> </td> </tr>';
}
 }
if($_POST['tabla']=="encuesta_usuario"){
$x=0;
if($total>0){
foreach ($filas as $fila){
$ContenidoHTML[$x]=$fila["usur_nombre"];
    $x++;
}
}
else{
    $ContenidoHTML="1";
}
}
if($_POST['tabla']=="disponible"){
if($total>0){
        $mensaje="BAD";$x=2;$valor="success";
foreach ($filas as $fila){
    if($x==2){$valor="warning"; }
    if($x==3){$valor="info"; }
$ContenidoHTML.='<tr class='.$valor.'>
    <td>'.$fila["nombre"].'</td>
<td>'.$fila["usuario"].'</td>
    <td>'.$fila["numero"].'</td>
<td><input id="t[]" name="t[]" type="checkbox" value='.$fila["usuario"].'></td>
</tr>';
    $x++;
    if($x>3 ){$x=2;}
    }}
 else {
     $mensaje="GOOD";
    $ContenidoHTML='<tr> <td colspan="7">No encuestadores disponibles en este momento </td> </tr>';
}}
if($_POST['tabla']=="total1"){    
$ContenidoHTML= $total;
        $mensaje="BAD";$x=2;$valor="success";
        if($total>0){ 
foreach ($filas as $fila){
    if($x==2){$valor="warning"; }
    if($x==3){$valor="info"; }
 $ContenidoHTML.= '<tr class='.$valor.'>
<td>'.$fila["encuesta"].'</td>
<td>'.$fila['cantidad'].'</td>
<td>'.$fila['estado'].'</td> 
<td><a id="editar" class="btn btn-primary" >Finalizar</a></td>
<td><a id="eliminar" class="btn btn-danger" >Eliminar</a></td>
</tr>';
    $x++;
    if($x>3){$x=2;}
        }}
 else {
    $ContenidoHTML= '<tr> <td colspan="7">No hay proyectos en el momento </td> </tr>';
}
}
if($_POST['tabla']=="encuesta"){  
    $ContenidoHTML.='  <select id="encuestas">
               <option value="">Seleccione una encuesta</option>';
    if($total>0){ 
      $mensaje="BAD";
foreach ($filas as $fila){
   $ContenidoHTML.='<option value="'.$fila["nombre_encuesta"].'">'.$fila["nombre_encuesta"].'</option>';
}
           $ContenidoHTML.='</select>';        
}
else{
     $mensaje="GOOD";
}
}
if($_POST['tabla']=="pregunta"){
    $numero;
    if($total>0){ 
      $mensaje="BAD";
      $x=0;
foreach ($filas as $fila){
   $ContenidoHTML[$x]=$fila["numero_pregunta"];
   $x++;
  }       
}
else{
     $mensaje="GOOD";
}
}
if($_POST['tabla']=="guia_pregunta"){
    $numero;
    if($total>0){ 
      $mensaje="".($total+1);   
      $x=0;
foreach ($filas as $fila){
   $ContenidoHTML[$x]=$fila["numero_pregunta"];
   $x++;
  }      
}
else{
     $mensaje="".($total+1);
}
}
if($_POST['tabla']=="cantidad_encuestas"){
    $numero;
    if($total>0){ 
      $mensaje="BAD";
$ContenidoHTML="".($total+1);
}
else{
     $mensaje="GOOD";
     $ContenidoHTML="".($total+1);

}
}
if($_POST['tabla']=="opcion"){
    $numero;
    if($total>0){ 
      $mensaje="BAD";
      $x=0;
foreach ($filas as $fila){
   $ContenidoHTML[$x]=$fila["nombre_opcion"];
   $x++;
  }
         
}
else{
     $mensaje="GOOD";
}
}
if($_POST['tabla']=="grilla"){
    $numero;
    if($total>0){ 
      $mensaje="BAD";
      $x=0;
foreach ($filas as $fila){
   $ContenidoHTML=$fila["tipo_grilla"];
  }
}
else{
     $mensaje="GOOD";
}
}
if($_POST['tabla']=="filas_grilla"){
    $numero;
    if($total>0){ 
      $mensaje="BAD";
      $x=0;
foreach ($filas as $fila){
   $ContenidoHTML[$x]=$fila["nombre_fila_grilla"];
   $x++;
  }
}
else{
     $mensaje="GOOD";
}
}
if($_POST['tabla']=="columnas_grilla"){
    $numero;
    if($total>0){ 
      $mensaje="BAD";
      $x=0;
foreach ($filas as $fila){
   $ContenidoHTML[$x]=$fila["nombre_columnas_grilla"];
   $x++;
  }  
}
else{
     $mensaje="GOOD";
}
}
}
$salidaJSON=array("respuesta" => $respuesta,"mensaje" => $mensaje,"contenido" => $ContenidoHTML);
echo json_encode($salidaJSON);
?>