<?php
$encuesta=$_GET['encuesta'];
header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=Campo encuesta '".$encuesta."'.xls");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>LISTA DE DATOS</title>
</head>
<body>
<table width="100%" border="1" cellspacing="0" cellpadding="0">
  <tr>
  <td colspan="10" bgcolor="#E5E5E5"><CENTER><strong>REPORTE DE LOS DATOS DE LA ENCUESTA "<?php echo $encuesta;?> " </strong></CENTER></td>
  </tr>
  <tr><td></td>
<?php
require 'Crud.php';
require 'Conexion.php';
$model5 = new Crud();
$model5->select='*';
$model5->from ='guia_pregunta';
$model5->condicion="nombre_encuesta='".$encuesta."' order by id_guia_pregunta";
$model5->Leer();
$filas5 = $model5->rows;
$total5=  count($filas5);
if($total5>0){
foreach ($filas5 as $fila5){
$model2 = new Crud();
$model2->select='*';
$model2->from ='pregunta';
$model2->condicion="numero_pregunta='".$fila5["numero_pregunta"]."'";
$model2->Leer();
$filas2 = $model2->rows;
$total2=  count($filas2);
foreach ($filas2 as $fila2){
    if($fila2["tipo_pregunta"]=="Abierta"||$fila2["tipo_pregunta"]=="Numerica"||$fila2["tipo_pregunta"]=="Unica"){
        echo '<td>'.$fila2["nombre_pregunta"].' </td>'; 
    }
    if($fila2["tipo_pregunta"]=="Multiple"){
$model3 = new Crud();
$model3->select='*';
$model3->from ='opcion';
$model3->condicion="numero_pregunta='".$fila2["numero_pregunta"]."' order by contador_opcion";
$model3->Leer();
$filas3 = $model3->rows;
$total3=  count($filas3);
foreach ($filas3 as $fila3){
echo '<td>'.$fila2["nombre_pregunta"].'-'.$fila3["nombre_opcion"].' </td>'; 
}
    }
    if($fila2["tipo_pregunta"]=="Grilla"){
        $model = new Crud();
$model->select='*';
$model->from ='grilla';
$model->condicion="numero_grilla ='".$fila2["numero_pregunta"]."'";
$model->Leer();
$filas = $model->rows;
$total=  count($filas2);
$model3 = new Crud();
$model3->select='*';
$model3->from ='filas_grilla';
$model3->condicion="numero_grilla ='".$fila2["numero_pregunta"]."' order by contador_opcion";
$model3->Leer();
$filas3 = $model3->rows;
$total3=  count($filas3);
$model4 = new Crud();
$model4->select='*';
$model4->from ='columnas_grilla';
$model4->condicion="numero_grilla ='".$fila2["numero_pregunta"]."' order by contador_opcion";
$model4->Leer();
$filas4 = $model4->rows;
$total4=  count($filas4);
foreach ($filas as $fila){
if($fila["tipo_grilla"]=="Multiple"){
foreach ($filas3 as $fila3){
    foreach ($filas4 as $fila4){
               echo '<td>'.$fila2["nombre_pregunta"].'-'.$fila3["nombre_fila_grilla"].'-'.$fila4["nombre_columnas_grilla"].' </td>'; 
}}}
if($fila["tipo_grilla"]=="Unica"){
foreach ($filas3 as $fila3){  
               echo '<td>'.$fila2["nombre_pregunta"].'-'.$fila3["nombre_fila_grilla"].' </td>'; 
}}
    }
    }
}}}else{}
?></tr>
    <?php
$mode = new Crud();
$mode->select='*';
$mode->from ='cantidad_encuestas';
$mode->condicion="nombre_encuesta ='".$encuesta."'";
$mode->Leer();
$fil = $mode->rows;
$tota=  count($fil);
if($tota>0){
foreach ($fil as $xfil){
$var= explode("-",$xfil["numero_encuesta"]);
echo '<tr>';
echo '<td>'.$var[0].'</td>';
$model5 = new Crud();
$model5->select='*';
$model5->from ='datos';
$model5->condicion="numero_encuesta='".$xfil["numero_encuesta"]."'";
$model5->Leer();
$filas5 = $model5->rows;
$total5=  count($filas5);
foreach ($filas5 as $fila5){
echo     '<td>'.$fila5["numero_opcion"].'</td>';
}
echo '</tr>';
}}
else{
}
?>
</table>
</body>
</html>