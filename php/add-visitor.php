<?php
/*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
$usuario = 'root';
$clave = '';
//Este fichero se encarga de realizar un inserccion en la base de datos cada vez que se carga el indice para tener 
//una estimacion del tráfico de la web
try {

	$bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));
	$consulta = "SELECT * FROM visitor_counter WHERE id=1";
	$datos = $bd->query($consulta);
	foreach ($datos as $value) {

		$number = $value["visits"];
		$number = $number + 1;
		$insert = "UPDATE visitor_counter SET visits='".$number."'";
		$bd->query($insert);

	}
} catch (PDOException $ex) {
	//write_log($ex->getMessage());
}
?>