<?php
//Fichero que gestiona 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
   
    $name = htmlspecialchars(trim(strip_tags($_POST["username"])), ENT_QUOTES, "ISO-8859-1");
    $password = $_POST["password"];

    try {
        /*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
$usuario = 'root';
$clave = '';

        $bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));
        $consulta = "SELECT * FROM users WHERE username='" . $name . "'";
        $user = $bd->query($consulta);
        
        if ($user->rowCount() > 0) {
            foreach ($user as $value) {
                if ($value['username'] == $name) {
                    if (password_verify($password, $value['password'])) {
                        session_start();
                        $_SESSION['user'] = $name;
                        echo true;
                    }
                }
            }
            echo false;
        }else{
            echo false;
        }
    } catch (PDOException $ex) {
        //print_r($ex->getMessage());
    }
}



