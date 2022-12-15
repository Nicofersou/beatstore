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
    $bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));
    $username = $_SESSION['user'];
    $consulta = "SELECT b.name, b.imagepath, b.scale, b.bpm, ub.licencia, ub.fecha, b.audiopath FROM `usersbeats` as ub LEFT JOIN beats as b on b.id=ub.beat where ub.usuario='" . $username . "';";
    $datos = $bd->query($consulta)->fetchAll();

    $beatsData = json_encode($datos);
    echo $beatsData;

} catch (PDOException $ex) {
    //write_log($ex->getMessage());
}
