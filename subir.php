<?php
if (isset($_FILES["file"])) {
    $reporte=null;
    $ruta=$_GET['ruta'];
    if (!file_exists($ruta)) {
    mkdir($ruta, 0777, true);}
    
    for ($x=0;$x<count($_FILES["file"]["name"]);$x++){
    $file = $_FILES["file"];
    $nombre = $file["name"][$x];
    $tipo = $file["type"][$x];
    $ruta_provisional = $file["tmp_name"][$x];
    $size = $file["size"][$x];
    $dimensiones=  getimagesize($ruta_provisional);
    $carpeta=$ruta;
if($tipo!='image/jpeg'&&$tipo!='image/jpg'
               && $tipo!='image/png'&& $tipo!='image/gif'
               && $tipo!='video/mp4'&& $tipo!='video/avi'
               && $tipo!='video/wmv'){
    $reporte.="<p style='color:red'>El archivo $nombre tiene formato incorrecto";
               }
               else if ($size >40* 1024*1024){
                   $reporte.="<p style='color:red'>El archivo $nombre tiene el maximo tamaño admitido";
               }
               else{
               
                   $src=$carpeta.$nombre;
                   move_uploaded_file($ruta_provisional, $src);
                   echo "<p style='color:red'>El archivo $nombre se ha subido correctamente";
}}
echo $reporte;
}

if (isset($_FILES["file2"])) {
    $reporte=null;
    $ruta=$_GET['ruta'];
    if (!file_exists($ruta)) {
    mkdir($ruta, 0777, true);}
    $rutas=$_GET['rutas'];
    if (!file_exists($rutas)) {
    mkdir($rutas, 0777, true);}
    for ($x=0;$x<count($_FILES["file2"]["name"]);$x++){
    $file = $_FILES["file2"];
    $nombre = $file["name"][$x];
    $tipo = $file["type"][$x];
    $ruta_provisional = $file["tmp_name"][$x];
    $size = $file["size"][$x];
    $dimensiones=  getimagesize($ruta_provisional);
    $carpeta=$ruta;
if($tipo!='image/jpeg'&&$tipo!='image/jpg'
               && $tipo!='image/png'&& $tipo!='image/gif'
               && $tipo!='video/mp4'&& $tipo!='video/avi'
               && $tipo!='video/wmv'){
    $reporte.="<p style='color:red'>El archivo $nombre tiene formato incorrecto";
               }
               else if ($size > 1024*1024){
                   $reporte.="<p style='color:red'>El archivo $nombre tiene el maximo tamaño admitido";
               }
               else{
               
                   $src=$carpeta.$nombre;
                   move_uploaded_file($ruta_provisional, $src);
                   echo "<p style='color:red'>El archivo $nombre se ha subido correctamente";
}}
echo $reporte;
}

