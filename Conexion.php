<?php
class Conexion{
    public function conectar(){
    $usuario='Alejandro';
    $clave='123456';
    $host='localhost';
    $db='dataplus';
    return $conexion= new PDO("mysql:host=$host;dbname=$db", $usuario, $clave);
    }
}