<?php
class Conexion{
    public function conectar(){
    $usuario='a2527027_alejo';
    $clave='manolo805';
    $host='mysql4.000webhost.com';
    $db='a2527027_Dataplu';
    return $conexion= new PDO("mysql:host=$host;dbname=$db", $usuario, $clave);
    }
}