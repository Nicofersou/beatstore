<?php
/*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
$usuario = 'root';
$clave = '';

try {

    session_start();
    $user = $_SESSION['user'];
    $beatID = $_SESSION['beatid'];
    $license = $_SESSION['license'];;

	$bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));
	$insert = "INSERT INTO `usersbeats` (`id`, `usuario`, `beat`, `licencia`, `fecha`) VALUES (NULL, '$user', '$beatID', '$license', current_timestamp());";
	$bd->query($insert);
} catch (PDOException $ex) {
	//write_log($ex->getMessage());
}
?>