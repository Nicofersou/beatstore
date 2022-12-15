<?php

try {
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {

		/*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

		$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
		$usuario = 'root';
		$clave = '';
		$bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));

		$name = htmlspecialchars(trim(strip_tags($_POST["register_username"])), ENT_QUOTES, "ISO-8859-1");
		$password = $_POST["register_password"];
		$hash = password_hash($password, PASSWORD_DEFAULT);

		$ins = "insert into users(username, password) VALUES ('$name', '$hash')";
		$resul = $bd->query($ins);

		if ($resul) {
			echo true;
		} else {
			echo false;
		}
	}
} catch (PDOException $ex) {
	//echo $ex->getMessage();
}
