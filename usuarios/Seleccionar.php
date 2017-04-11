<?php
class Seleccionar
{
    public $usuario;
    public $clave;
    public $mensaje;
    public $tipo;
    public function login()    {
        $model= new Conexion;
        $conexion=$model->conectar();
        $sql = 'SELECT * FROM usuario WHERE ';
         $sql .="usur_nombre=:usuario AND (usur_clave=:clave or usur_clave_recup=:clave)";
        $consulta = $conexion->prepare($sql);
        $consulta->bindParam(':usuario',  $this->usuario, PDO::PARAM_STR);
        $consulta->bindParam(':clave',  $this->clave, PDO::PARAM_STR);
        $consulta->execute();
        $total=$consulta->rowCount();
        if($total==0){
        $this->mensaje="BAD";
         // header('location:index.php');
           
        }
        else{
                      $this->mensaje="GOOD";
                      
            $fila= $consulta->fetch();
            $this->tipo=$fila['usur_tipo'];
             $_SESSION['nombre']=$fila['usur_tipo'];
             $_SESSION['usuario']=$fila['usur_nombre'];
            if ($fila['usur_tipo']=='Administrador'){
                session_start();
                $_SESSION['administrador']=$fila['usur_tipo'];
            header('location:administrador.php');
            }
            else if ($fila['usur_tipo']=='Analista'){
                session_start();
                $_SESSION['analista']=$fila['usur_tipo'];
            header('location:analista.php');
            }
            else if ($fila['usur_tipo']=='Desarrollador'){
                session_start();
                $_SESSION['desarrollador']=$fila['usur_tipo'];
                header('location:desarrollador.php');
            }
            else if ($fila['usur_tipo']=='Encuestador'){
                session_start();
                $_SESSION['encuestador']=$fila['usur_tipo'];
                header('location:encuestador.php');
            }
        }
        }
      
}

