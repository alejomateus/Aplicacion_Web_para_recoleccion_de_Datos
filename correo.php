<?php
    $correo=$_POST["correo"];
    $asunto="Recuperacion de Contraseña";
    $codigo=rand(10000000,99999999);
    $mensaje="Para recuperar tu contraseña ingresa este codigo en el campo de la clave y cambie la contraseña "
            . "inmediatamente para evitar inconvenientes posterormente. \n\n\n"
            . "Codigo: "+$codigo;
    mail($correo,$asunto,$mensaje,"X-Mailer: PHP/" . phpversion());
    mail($correo,$asunto,$mensaje);
    header("location:index.php");
?>    