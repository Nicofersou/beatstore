<?php
/*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
$usuario = 'root';
$clave = '';

try {

    //En este fichero recogemos todos los datos de la tabla beats y los enviamos en formato JSON
    //Instacia de la clase PDO para crear una conexion con la bd 
    $bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));
    $consulta = "SELECT * FROM beats";
    $datos = $bd->query($consulta)->fetchAll();

    $beatsData = json_encode($datos);
    echo $beatsData;

} catch (PDOException $ex) {
    //write_log($ex->getMessage());
}
