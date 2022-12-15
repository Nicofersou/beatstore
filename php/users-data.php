<?php
//Fichero para c
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    /*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
$usuario = 'root';
$clave = '';
    session_start();
    $name = $_SESSION["user"];

    try {

        $bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));
        if (isset($_POST["newUser"])) {
            $newUsername = htmlspecialchars(trim(strip_tags($_POST["newUser"])), ENT_QUOTES, "ISO-8859-1");

            $consulta = $bd->prepare("UPDATE users SET username=? WHERE username=? ");
            $resultado = $consulta->execute(array($newUsername, $name));

            if ($resultado) {
                $_SESSION["user"] = $newUsername;
            }
            echo $resultado;
        } else if (isset($_POST["newPass"])) {
            $oldpass = htmlspecialchars(trim(strip_tags($_POST["oldPass"])), ENT_QUOTES, "ISO-8859-1");
            $newpass = htmlspecialchars(trim(strip_tags($_POST["newPass"])), ENT_QUOTES, "ISO-8859-1");
            $hash = password_hash($newpass, PASSWORD_DEFAULT);


            $consulta = "SELECT * FROM users WHERE username='" . $name . "'";
            $user = $bd->query($consulta);

            if ($user->rowCount() > 0) {
                foreach ($user as $value) {
                    if ($value['username'] == $name) {
                        if (password_verify($oldpass, $value['password'])) {
                            $consulta = $bd->prepare("UPDATE users SET password=? WHERE username=? ");
                            $resultado = $consulta->execute(array($hash, $name));
                            echo $resultado;
                        }
                    }
                }
                echo false;
            } else {
                echo false;
            }
        } else if (isset($_POST["userToDelete"])) {
            $userToDelete = htmlspecialchars(trim(strip_tags($_POST["userToDelete"])), ENT_QUOTES, "ISO-8859-1");

            $consulta = $bd->prepare("DELETE FROM users WHERE username = ?");
            $resultado = $consulta->execute(array($userToDelete));
            echo $resultado;

            if ($resultado) {
                $_SESSION["user"] = "";
                session_destroy();
                
            }
        }
    } catch (PDOException $ex) {
        print_r($ex->getMessage());
    }
} else {
    session_start();
    echo $_SESSION["user"];
}
